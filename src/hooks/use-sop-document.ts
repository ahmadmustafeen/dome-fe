import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useSopPatchers } from "@/hooks/use-sop-patchers";
import { getLatestSOP, saveSOP } from "@/services/sop-service";

import type { SOP } from "@/types/sop";
import type { CanonicalSopVersionApiRow } from "@/types/sop-api";

import { sopBootstrapKey } from "@/utils/sop-document-state";
import { useAppContext } from "@/context/AppContext";

type SopDocumentContextParams = {
  mode: "create" | "edit";
  sopId?: string;
  documentId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: (createdId: string) => void | Promise<void>;
};

const withReferenceTableBootstrap = (doc: SOP): SOP => ({
  ...doc,
  // references: bootstrapEmptySopReferenceTables(doc.references||[]),
});

const createEmptySop = (): SOP =>
  withReferenceTableBootstrap({
    id: "",
    references: {},
  } as SOP);

export const useSopDocument = (ctx: SopDocumentContextParams) => {
  const {
    mode,
    sopId,
    documentId,
    onAfterPersist,
    onCreateSaveSuccess,
  } = ctx;


  const { site } = useAppContext()
  /**
   * ----------------------------------------------------------------
   * STATE
   * ----------------------------------------------------------------
   */

  const [sop, setSop] = useState<SOP>(() => createEmptySop());

  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const [sopNotFound, setSopNotFound] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);

  const [generateError, setGenerateError] = useState<string | null>(null);

  const [viewingArchivedVersionNumber, setViewingArchivedVersionNumber] =
    useState<number | null>(null);

  /**
   * ----------------------------------------------------------------
   * REFS
   * ----------------------------------------------------------------
   */

  const latestSopRef = useRef<SOP | null>(null);

  const preArchiveDraftRef = useRef<SOP | null>(null);

  const archiveSessionActiveRef = useRef(false);

  /**
   * ----------------------------------------------------------------
   * BOOTSTRAP
   * ----------------------------------------------------------------
   */

  const key = sopBootstrapKey(mode, sopId);

  const isBootstrapping = loadedKey !== key;

  const isReadOnly = viewingArchivedVersionNumber !== null;


  const patchers = useSopPatchers(setSop);

  const runStandaloneGenerateFlow = useCallback(async () => {
    try {
      setGenerateError(null);

      setIsGenerating(true);
      const evtSource = new EventSource(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sop/generate?documentId=${documentId}`,
      );

      evtSource.addEventListener("allData", (e) => {
        const data = JSON.parse(e.data);
        const next = withReferenceTableBootstrap(data);
        console.log({ data, next });



        setSop((prev) => ({
          ...prev,
          ...next,
        }));

        // setSop((prev: any) => ({
        //   ...prev,
        //   ...data,
        //   equipment: {},
        //   procedure: {},
        //   document: {},
        // }));
      });

      evtSource.addEventListener('sectionOne', (e) => {
        const data = JSON.parse(e.data);

        setSop((prev) => ({
          ...prev,
          equipment: data.equipment,
          procedure: data.procedure,
          document: data.document,
        }));

      })

      evtSource.addEventListener("siteDetails", (e) => {
        const data = JSON.parse(e.data);
        if (data?.error) {
          toast.error("siteDetails failed");
          return;
        }

        setSop((prev) => ({
          ...prev,
          site: data,
        }));
      });

      evtSource.addEventListener("done", () => {
        toast.success("Succesfully generated, Please save the document manually.");
        setIsGenerating(false)
        // setMop((prev: any) => ({
        //   ...prev,
        //   loading: false,
        // }));

        evtSource.close();
      });

      evtSource.addEventListener("error", () => {
        setGenerateError("Streaming failed");
        evtSource.close();
      });


      setSop((prev) => ({
        ...createEmptySop(),
        ...prev,
        loading: true,
      }));


      // const generated = await generateSOP();

      // const next = withReferenceTableBootstrap(generated);


      // setSop((prev) => ({
      //   ...prev,
      //   ...next,
      // }));

      // latestSopRef.current = next;


      setSop((prev) => ({
        ...prev,
        loading: false,
      }));

      setIsGenerating(false);

      toast.success(
        "Successfully generated SOP. Please save the document manually.",
      );
    } catch (err: unknown) {
      setGenerateError(
        err instanceof Error ? err.message : "SOP generation failed",
      );

      setIsGenerating(false);

      toast.error(
        err instanceof Error ? err.message : "Failed to generate SOP.",
      );
    }
  }, [documentId]);

  /**
   * ----------------------------------------------------------------
   * INITIAL LOAD
   * ----------------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoadedKey(null);

      setGenerateError(null);

      setSopNotFound(false);

      /**
       * CREATE MODE
       */

      if (mode === "create") {
        await runStandaloneGenerateFlow();

        if (!cancelled) {
          setLoadedKey(key);
        }

        return;
      }

      /**
       * EDIT MODE
       */

      try {
        const loaded = await getLatestSOP(sopId ?? "");

        if (cancelled) {
          return;
        }

        if (loaded === null) {
          setSop(createEmptySop());

          setSopNotFound(true);

          return;
        }

        const next = withReferenceTableBootstrap(loaded);

        setSop(next);

        latestSopRef.current = next;

        preArchiveDraftRef.current = null;

        archiveSessionActiveRef.current = false;

        setViewingArchivedVersionNumber(null);
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(
            err instanceof Error ? err.message : "Could not load SOP.",
          );

          setSop(createEmptySop());

          setSopNotFound(true);
        }
      } finally {
        if (!cancelled) {
          setLoadedKey(key);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [mode, sopId, key, runStandaloneGenerateFlow]);

  /**
   * ----------------------------------------------------------------
   * RESET
   * ----------------------------------------------------------------
   */

  const resetSop = useCallback(async () => {
    setLoadedKey(null);

    /**
     * CREATE MODE
     */

    if (mode === "create") {
      await runStandaloneGenerateFlow();

      setLoadedKey(key);

      return;
    }

    /**
     * EDIT MODE
     */

    try {
      const loaded = await getLatestSOP(sopId ?? "");

      if (loaded === null) {
        setSop(createEmptySop());

        latestSopRef.current = null;
      } else {
        const next = withReferenceTableBootstrap(loaded);

        setSop(next);

        latestSopRef.current = next;
      }

      preArchiveDraftRef.current = null;

      archiveSessionActiveRef.current = false;

      setViewingArchivedVersionNumber(null);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reload SOP.");
    } finally {
      setLoadedKey(key);
    }
  }, [mode, sopId, key, runStandaloneGenerateFlow]);

  /**
   * ----------------------------------------------------------------
   * RETRY GENERATION
   * ----------------------------------------------------------------
   */

  const retryGenerate = useCallback(async () => {
    setLoadedKey(null);

    await runStandaloneGenerateFlow();

    setLoadedKey(key);
  }, [key, runStandaloneGenerateFlow]);

  /**
   * ----------------------------------------------------------------
   * SAVE
   * ----------------------------------------------------------------
   */

  const persistSop = useCallback(async () => {
    const id = mode === "create" ? "new" : sopId?.trim() ?? "";

    if (id === "") {
      throw new Error("SOP id is required to save");
    }

    const saved = await saveSOP(sop, id, site?._id);

    const next = withReferenceTableBootstrap(saved);

    setSop(next);

    latestSopRef.current = next;

    preArchiveDraftRef.current = next;

    archiveSessionActiveRef.current = false;

    setViewingArchivedVersionNumber(null);

    await onAfterPersist?.();

    if (mode === "create") {
      await onCreateSaveSuccess?.(saved.id);
    }

    return saved;
  }, [sop, mode, sopId, onAfterPersist, onCreateSaveSuccess]);

  /**
   * ----------------------------------------------------------------
   * VERSION SWITCHING
   * ----------------------------------------------------------------
   */

  const applyCanonicalVersionRow = useCallback(
    (row: CanonicalSopVersionApiRow) => {
      setSop((prev) => {
        if (row.isLatest === true) {
          archiveSessionActiveRef.current = false;

          const stash = preArchiveDraftRef.current;

          preArchiveDraftRef.current = null;

          const chosen = stash !== null ? stash : row.sop;

          const next = withReferenceTableBootstrap(chosen);

          latestSopRef.current = next;

          return next;
        }

        if (archiveSessionActiveRef.current === false) {
          preArchiveDraftRef.current = prev;

          archiveSessionActiveRef.current = true;
        }

        return withReferenceTableBootstrap(row.sop);
      });

      setViewingArchivedVersionNumber(
        row.isLatest === true ? null : row.versionNumber,
      );
    },
    [],
  );

  /**
   * ----------------------------------------------------------------
   * RESUME EDITING
   * ----------------------------------------------------------------
   */

  const resumeEditingLatestSop = useCallback(() => {
    const next = preArchiveDraftRef.current ?? latestSopRef.current;

    if (next !== null) {
      setSop(withReferenceTableBootstrap(next));
    }

    preArchiveDraftRef.current = null;

    archiveSessionActiveRef.current = false;

    setViewingArchivedVersionNumber(null);
  }, []);

  /**
   * ----------------------------------------------------------------
   * RETURN
   * ----------------------------------------------------------------
   */

  return {
    sop,

    isBootstrapping,

    isGenerating,

    generateError,

    retryGenerate,

    sopNotFound,

    isReadOnly,

    viewingArchivedVersionNumber,

    applyCanonicalVersionRow,

    resumeEditingLatestSop,

    ...patchers,

    resetSop,

    persistSop,
  };
};
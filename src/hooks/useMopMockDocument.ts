import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { generateMOP, getLatestMOP, saveMOP } from "@/services/mop-service";
import { createEmptyMop } from "@/services/mop-mock-service";
import type { CanonicalMopVersionApiRow } from "@/types/mop-api";
import type {
  MOP,
  MOPAssumptions,
  MOPDocument,
  MOPEquipment,
  MopFacilityEffectRow,
  MOPProcedure,
  MOPSafety,
  MOPSection03Overview,
  MOPSection07Details,
  MOPSection08BackOut,
  MOPSection09MopApproval,
  MOPSection10MopComments,
  MOPSection11References,
  MOPSignOff,
  MOPSiteSection,
  MOPStep,
} from "@/types/mop";

export type MopDocumentContextParams = {
  mode: "create" | "edit";
  /** Required when `mode === "edit"` — canonical `mopId` from the URL. */
  mopId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: () => void | Promise<void>;
};

const bumpModified = (m: MOP): MOP => ({
  ...m,
  document: {
    ...m.document,
    lastModified: new Date().toISOString(),
  },
});

const bootstrapKey = (mode: "create" | "edit", mopId: string | undefined) =>
  `${mode}|${mopId ?? ""}`;

export const useMopMockDocument = (ctx: MopDocumentContextParams) => {
  const { mode, mopId, onAfterPersist, onCreateSaveSuccess } = ctx;
  const [mop, setMop] = useState<MOP>(() => createEmptyMop());
  const [loadedBootstrapKey, setLoadedBootstrapKey] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [mopNotFound, setMopNotFound] = useState(false);
  const [viewingArchivedVersionNumber, setViewingArchivedVersionNumber] = useState<number | null>(
    null,
  );

  const key = bootstrapKey(mode, mopId);
  const isBootstrapping = loadedBootstrapKey !== key;

  const latestSavedCanonicalRef = useRef<MOP | null>(null);
  const preArchiveDraftRef = useRef<MOP | null>(null);
  const archiveSessionActiveRef = useRef(false);

  const runStandaloneGenerate = useCallback(async (): Promise<boolean> => {
    setGenerateError(null);
    try {
      const data = await generateMOP({ documentId: "69f88d94118cad90ca6f60fb" });
      setMop(data);
      latestSavedCanonicalRef.current = null;
      setViewingArchivedVersionNumber(null);
      archiveSessionActiveRef.current = false;
      preArchiveDraftRef.current = null;
      setMopNotFound(false);
      return true;
    } catch (err: unknown) {
      setGenerateError(err instanceof Error ? err.message : "Generation failed.");
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoadedBootstrapKey(null);
      setGenerateError(null);
      setMopNotFound(false);

      if (mode === "create") {
        await runStandaloneGenerate();
        if (!cancelled) {
          setLoadedBootstrapKey(key);
        }
        return;
      }

      const id = mopId?.trim() ?? "";
      if (id === "") {
        if (!cancelled) {
          setMop(createEmptyMop());
          setLoadedBootstrapKey(key);
        }
        return;
      }

      try {
        const remote = await getLatestMOP(id);
        if (cancelled) {
          return;
        }
        if (remote !== null) {
          latestSavedCanonicalRef.current = remote;
          setMop(remote);
          setMopNotFound(false);
        } else {
          setMop(createEmptyMop());
          setMopNotFound(true);
        }
        setViewingArchivedVersionNumber(null);
        archiveSessionActiveRef.current = false;
        preArchiveDraftRef.current = null;
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Could not load MOP.");
          setMop(createEmptyMop());
          setMopNotFound(true);
          setLoadedBootstrapKey(key);
        }
        return;
      }
      if (!cancelled) {
        setLoadedBootstrapKey(key);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [mode, mopId, key, runStandaloneGenerate]);

  const patchDocument = useCallback((partial: Partial<MOPDocument>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        document: { ...prev.document, ...partial },
      }),
    );
  }, []);

  const patchEquipment = useCallback((partial: Partial<MOPEquipment>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        equipment: { ...prev.equipment, ...partial },
      }),
    );
  }, []);

  const patchProcedure = useCallback((partial: Partial<MOPProcedure>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        procedure: { ...prev.procedure, ...partial },
      }),
    );
  }, []);

  const patchSignOff = useCallback((partial: Partial<MOPSignOff>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        signOff: { ...prev.signOff, ...partial },
      }),
    );
  }, []);

  const patchSite = useCallback((partial: Partial<MOPSiteSection>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        site: { ...prev.site, ...partial },
      }),
    );
  }, []);

  const patchOverview = useCallback((partial: Partial<MOPSection03Overview>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        overview: { ...prev.overview, ...partial },
      }),
    );
  }, []);

  const patchSafety = useCallback((partial: Partial<MOPSafety>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        safety: { ...prev.safety, ...partial },
      }),
    );
  }, []);

  const patchAssumptions = useCallback((partial: Partial<MOPAssumptions>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        assumptions: { ...prev.assumptions, ...partial },
      }),
    );
  }, []);

  const patchMopDetails = useCallback((partial: Partial<MOPSection07Details>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        mopDetails: { ...prev.mopDetails, ...partial },
      }),
    );
  }, []);

  const patchBackOut = useCallback((partial: Partial<MOPSection08BackOut>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        backOut: { ...prev.backOut, ...partial },
      }),
    );
  }, []);

  const patchMopApproval = useCallback((partial: Partial<MOPSection09MopApproval>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        mopApproval: { ...prev.mopApproval, ...partial },
      }),
    );
  }, []);

  const patchMopComments = useCallback((partial: Partial<MOPSection10MopComments>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        mopComments: { ...prev.mopComments, ...partial },
      }),
    );
  }, []);

  const patchMopReferences = useCallback((partial: Partial<MOPSection11References>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        references: { ...prev.references, ...partial },
      }),
    );
  }, []);

  const patchFacilityEffects = useCallback((rows: MopFacilityEffectRow[]) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        facilityEffects: rows,
      }),
    );
  }, []);

  const patchSteps = useCallback((rows: MOPStep[]) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        steps: rows,
      }),
    );
  }, []);

  const resetMop = useCallback(async () => {
    if (mode === "create") {
      setLoadedBootstrapKey(null);
      const ok = await runStandaloneGenerate();
      if (ok) {
        toast.info("Form reset to a fresh generated draft.");
      }
      setLoadedBootstrapKey(key);
      return;
    }
    const id = mopId?.trim() ?? "";
    if (id === "") {
      return;
    }
    setLoadedBootstrapKey(null);
    try {
      const remote = await getLatestMOP(id);
      if (remote !== null) {
        setMop(remote);
        latestSavedCanonicalRef.current = remote;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reload MOP.");
    } finally {
      setLoadedBootstrapKey(key);
    }
  }, [mode, mopId, key, runStandaloneGenerate]);

  const retryGenerate = useCallback(async () => {
    setLoadedBootstrapKey(null);
    await runStandaloneGenerate();
    setLoadedBootstrapKey(key);
  }, [key, runStandaloneGenerate]);

  const persistMop = useCallback(async (): Promise<{ success: boolean }> => {
    if (mode === "create") {
      const saved = await saveMOP(mop, "new");
      setMop(saved);
      latestSavedCanonicalRef.current = saved;
      preArchiveDraftRef.current = saved;
      setViewingArchivedVersionNumber(null);
      archiveSessionActiveRef.current = false;
      await onAfterPersist?.();
      await onCreateSaveSuccess?.();
      return { success: true };
    }
    const id = mopId?.trim() ?? "";
    if (id === "") {
      throw new Error("MOP id is required to save");
    }
    const saved = await saveMOP(mop, id);
    setMop(saved);
    latestSavedCanonicalRef.current = saved;
    preArchiveDraftRef.current = saved;
    setViewingArchivedVersionNumber(null);
    archiveSessionActiveRef.current = false;
    await onAfterPersist?.();
    return { success: true };
  }, [mode, mop, mopId, onAfterPersist, onCreateSaveSuccess]);

  const applyCanonicalVersionRow = useCallback((row: CanonicalMopVersionApiRow) => {
    setMop((prev) => {
      if (row.isLatest === true) {
        archiveSessionActiveRef.current = false;
        const stash = preArchiveDraftRef.current;
        preArchiveDraftRef.current = null;
        latestSavedCanonicalRef.current = row.mop;
        return stash !== null ? stash : row.mop;
      }
      if (archiveSessionActiveRef.current === false) {
        preArchiveDraftRef.current = prev;
        archiveSessionActiveRef.current = true;
      }
      return row.mop;
    });
    setViewingArchivedVersionNumber(row.isLatest === true ? null : row.versionNumber);
  }, []);

  const resumeEditingLatestMop = useCallback(() => {
    const stash = preArchiveDraftRef.current;
    const fallback = latestSavedCanonicalRef.current;
    const next = stash ?? fallback;
    if (next !== null) {
      setMop(next);
    }
    preArchiveDraftRef.current = null;
    archiveSessionActiveRef.current = false;
    setViewingArchivedVersionNumber(null);
  }, []);

  const isReadOnly =
    viewingArchivedVersionNumber !== null && viewingArchivedVersionNumber !== undefined;

  return {
    mop,
    isBootstrapping,
    generateError,
    retryGenerate,
    mopNotFound,
    isReadOnly,
    viewingArchivedVersionNumber,
    applyCanonicalVersionRow,
    resumeEditingLatestMop,
    patchDocument,
    patchEquipment,
    patchProcedure,
    patchSignOff,
    patchSite,
    patchOverview,
    patchSafety,
    patchAssumptions,
    patchMopDetails,
    patchBackOut,
    patchMopApproval,
    patchMopComments,
    patchMopReferences,
    patchFacilityEffects,
    patchSteps,
    resetMop,
    persistMop,
  };
};

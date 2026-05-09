import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useSopPatchers } from "@/hooks/use-sop-patchers";
import { generateSOP, getLatestSOP, saveSOP } from "@/services/sop-service";
import type { SOP } from "@/types/sop";
import type { CanonicalSopVersionApiRow } from "@/types/sop-api";
import { sopBootstrapKey } from "@/utils/sop-document-state";

type SopDocumentContextParams = {
  mode: "create" | "edit";
  sopId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: (createdId: string) => void | Promise<void>;
};

export const useSopDocument = (ctx: SopDocumentContextParams) => {
  const { mode, sopId, onAfterPersist, onCreateSaveSuccess } = ctx;
  const [sop, setSop] = useState<SOP | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [sopNotFound, setSopNotFound] = useState(false);
  const [viewingArchivedVersionNumber, setViewingArchivedVersionNumber] =
    useState<number | null>(null);
  const latestSopRef = useRef<SOP | null>(null);
  const preArchiveDraftRef = useRef<SOP | null>(null);
  const archiveSessionActiveRef = useRef(false);

  const key = sopBootstrapKey(mode, sopId);
  const isBootstrapping = loadedKey !== key;
  const isReadOnly = viewingArchivedVersionNumber !== null;
  const patchers = useSopPatchers(setSop);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoadedKey(null);
      setSopNotFound(false);
      try {
        const loaded =
          mode === "create" ? await generateSOP() : await getLatestSOP(sopId ?? "");
        if (cancelled) {
          return;
        }
        if (loaded === null) {
          setSop(null);
          setSopNotFound(true);
          return;
        }
        setSop(loaded);
        latestSopRef.current = loaded;
        preArchiveDraftRef.current = null;
        archiveSessionActiveRef.current = false;
        setViewingArchivedVersionNumber(null);
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Could not load SOP.");
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
  }, [mode, sopId, key]);

  const resetSop = useCallback(async () => {
    setLoadedKey(null);
    try {
      const loaded =
        mode === "create" ? await generateSOP() : await getLatestSOP(sopId ?? "");
      setSop(loaded);
      latestSopRef.current = loaded;
      preArchiveDraftRef.current = null;
      archiveSessionActiveRef.current = false;
      setViewingArchivedVersionNumber(null);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reload SOP.");
    } finally {
      setLoadedKey(key);
    }
  }, [mode, sopId, key]);

  const persistSop = useCallback(async () => {
    if (sop === null) {
      throw new Error("SOP is not loaded");
    }
    const id = mode === "create" ? "new" : sopId?.trim() ?? "";
    if (id === "") {
      throw new Error("SOP id is required to save");
    }
    const saved = await saveSOP(sop, id);
    setSop(saved);
    latestSopRef.current = saved;
    preArchiveDraftRef.current = saved;
    archiveSessionActiveRef.current = false;
    setViewingArchivedVersionNumber(null);
    await onAfterPersist?.();
    if (mode === "create") {
      await onCreateSaveSuccess?.(saved.id);
    }
    return saved;
  }, [sop, mode, sopId, onAfterPersist, onCreateSaveSuccess]);

  const applyCanonicalVersionRow = useCallback((row: CanonicalSopVersionApiRow) => {
    setSop((prev) => {
      if (row.isLatest === true) {
        archiveSessionActiveRef.current = false;
        const stash = preArchiveDraftRef.current;
        preArchiveDraftRef.current = null;
        latestSopRef.current = row.sop;
        return stash !== null ? stash : row.sop;
      }
      if (archiveSessionActiveRef.current === false) {
        preArchiveDraftRef.current = prev;
        archiveSessionActiveRef.current = true;
      }
      return row.sop;
    });
    setViewingArchivedVersionNumber(
      row.isLatest === true ? null : row.versionNumber,
    );
  }, []);

  const resumeEditingLatestSop = useCallback(() => {
    const next = preArchiveDraftRef.current ?? latestSopRef.current;
    if (next !== null) {
      setSop(next);
    }
    preArchiveDraftRef.current = null;
    archiveSessionActiveRef.current = false;
    setViewingArchivedVersionNumber(null);
  }, []);

  return {
    sop,
    isBootstrapping,
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

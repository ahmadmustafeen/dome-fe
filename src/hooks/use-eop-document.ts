import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { generateEOP, getLatestEOP, saveEOP } from "@/services/eop-service";
import type { CanonicalEopVersionApiRow } from "@/types/eop-api";
import type {
  EOP,
  EOPDocument,
  EOPEquipment,
  EOPProcedure,
  EOPSection03Overview,
  EOPSection04InternalDiagnostics,
  EOPSection04PreActionSafety,
  EOPSection05ExternalActions,
  EOPSection06Communication,
  EOPSection07Recovery,
  EOPSection08SupportingInformation,
  EOPSection09ApprovalReview,
  EOPSignOff,
  EOPSiteSection,
} from "@/types/eop";

type EopDocumentContextParams = {
  mode: "create" | "edit";
  eopId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: (createdId: string) => void | Promise<void>;
};

const bumpModified = (e: EOP): EOP => ({
  ...e,
  document: { ...e.document, lastModified: new Date().toISOString() },
});

const patch = <E>(prev: EOP | null, key: keyof EOP, partial: Partial<E>): EOP | null => {
  if (prev === null) {
    return prev;
  }
  return bumpModified({ ...prev, [key]: { ...(prev[key] as object), ...partial } });
};

const bootstrapKey = (mode: "create" | "edit", id: string | undefined) =>
  `${mode}|${id ?? ""}`;

export const useEopDocument = (ctx: EopDocumentContextParams) => {
  const { mode, eopId, onAfterPersist, onCreateSaveSuccess } = ctx;
  const [eop, setEop] = useState<EOP | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [eopNotFound, setEopNotFound] = useState(false);
  const [viewingArchivedVersionNumber, setViewingArchivedVersionNumber] =
    useState<number | null>(null);

  const latestSavedRef = useRef<EOP | null>(null);
  const preArchiveDraftRef = useRef<EOP | null>(null);
  const archiveSessionActiveRef = useRef(false);

  const key = bootstrapKey(mode, eopId);
  const isBootstrapping = loadedKey !== key;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoadedKey(null);
      setEopNotFound(false);
      try {
        if (mode === "create") {
          const generated = await generateEOP();
          if (!cancelled) {
            setEop(generated);
            latestSavedRef.current = null;
            preArchiveDraftRef.current = null;
            archiveSessionActiveRef.current = false;
            setViewingArchivedVersionNumber(null);
          }
          return;
        }
        const id = eopId?.trim() ?? "";
        if (id === "") {
          if (!cancelled) {
            setEop(null);
            setEopNotFound(true);
          }
          return;
        }
        const loaded = await getLatestEOP(id);
        if (cancelled) {
          return;
        }
        if (loaded === null) {
          setEopNotFound(true);
          setEop(null);
          return;
        }
        setEop(loaded);
        latestSavedRef.current = loaded;
        preArchiveDraftRef.current = null;
        archiveSessionActiveRef.current = false;
        setViewingArchivedVersionNumber(null);
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Could not load EOP.");
          setEopNotFound(true);
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
  }, [mode, eopId, key]);

  const patchDocument = useCallback((p: Partial<EOPDocument>) => {
    setEop((prev) => patch<EOPDocument>(prev, "document", p));
  }, []);
  const patchEquipment = useCallback((p: Partial<EOPEquipment>) => {
    setEop((prev) => patch<EOPEquipment>(prev, "equipment", p));
  }, []);
  const patchProcedure = useCallback((p: Partial<EOPProcedure>) => {
    setEop((prev) => patch<EOPProcedure>(prev, "procedure", p));
  }, []);
  const patchSignOff = useCallback((p: Partial<EOPSignOff>) => {
    setEop((prev) => patch<EOPSignOff>(prev, "signOff", p));
  }, []);
  const patchSite = useCallback((p: Partial<EOPSiteSection>) => {
    setEop((prev) => patch<EOPSiteSection>(prev, "site", p));
  }, []);
  const patchOverview = useCallback((p: Partial<EOPSection03Overview>) => {
    setEop((prev) => patch<EOPSection03Overview>(prev, "overview", p));
  }, []);
  const patchExternalActions = useCallback(
    (p: Partial<EOPSection05ExternalActions>) => {
      setEop((prev) => patch<EOPSection05ExternalActions>(prev, "externalActions", p));
    },
    [],
  );
  const patchCommunication = useCallback((p: Partial<EOPSection06Communication>) => {
    setEop((prev) => patch<EOPSection06Communication>(prev, "communication", p));
  }, []);
  const patchRecovery = useCallback((p: Partial<EOPSection07Recovery>) => {
    setEop((prev) => patch<EOPSection07Recovery>(prev, "recovery", p));
  }, []);
  const patchSupportingInformation = useCallback(
    (p: Partial<EOPSection08SupportingInformation>) => {
      setEop((prev) =>
        patch<EOPSection08SupportingInformation>(prev, "supportingInformation", p),
      );
    },
    [],
  );
  const patchApprovalReview = useCallback((p: Partial<EOPSection09ApprovalReview>) => {
    setEop((prev) => patch<EOPSection09ApprovalReview>(prev, "approvalReview", p));
  }, []);

  const patchPreActionSafety = useCallback(
    (p: Partial<EOPSection04PreActionSafety>) => {
      setEop((prev) =>
        prev === null
          ? prev
          : bumpModified({
              ...prev,
              immediateActions: {
                ...prev.immediateActions,
                preActionSafety: { ...prev.immediateActions.preActionSafety, ...p },
              },
            }),
      );
    },
    [],
  );
  const patchInternalDiagnostics = useCallback(
    (p: Partial<EOPSection04InternalDiagnostics>) => {
      setEop((prev) =>
        prev === null
          ? prev
          : bumpModified({
              ...prev,
              immediateActions: {
                ...prev.immediateActions,
                internalDiagnostics: {
                  ...prev.immediateActions.internalDiagnostics,
                  ...p,
                },
              },
            }),
      );
    },
    [],
  );

  const resetEop = useCallback(async () => {
    setLoadedKey(null);
    try {
      if (mode === "create") {
        const generated = await generateEOP();
        setEop(generated);
        return;
      }
      const id = eopId?.trim() ?? "";
      if (id === "") {
        return;
      }
      const loaded = await getLatestEOP(id);
      if (loaded !== null) {
        setEop(loaded);
        latestSavedRef.current = loaded;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reload EOP.");
    } finally {
      setLoadedKey(key);
    }
  }, [mode, eopId, key]);

  const persistEop = useCallback(async () => {
    if (eop === null) {
      throw new Error("EOP is not loaded");
    }
    const id = mode === "create" ? "new" : eopId?.trim() ?? "";
    if (id === "") {
      throw new Error("EOP id is required to save");
    }
    const saved = await saveEOP(eop, id);
    setEop(saved);
    latestSavedRef.current = saved;
    preArchiveDraftRef.current = saved;
    archiveSessionActiveRef.current = false;
    setViewingArchivedVersionNumber(null);
    await onAfterPersist?.();
    if (mode === "create") {
      await onCreateSaveSuccess?.(saved.id);
    }
    return saved;
  }, [eop, mode, eopId, onAfterPersist, onCreateSaveSuccess]);

  const applyCanonicalVersionRow = useCallback((row: CanonicalEopVersionApiRow) => {
    setEop((prev) => {
      if (row.isLatest === true) {
        archiveSessionActiveRef.current = false;
        const stash = preArchiveDraftRef.current;
        preArchiveDraftRef.current = null;
        latestSavedRef.current = row.eop;
        return stash !== null ? stash : row.eop;
      }
      if (archiveSessionActiveRef.current === false) {
        preArchiveDraftRef.current = prev;
        archiveSessionActiveRef.current = true;
      }
      return row.eop;
    });
    setViewingArchivedVersionNumber(
      row.isLatest === true ? null : row.versionNumber,
    );
  }, []);

  const resumeEditingLatestEop = useCallback(() => {
    const next = preArchiveDraftRef.current ?? latestSavedRef.current;
    if (next !== null) {
      setEop(next);
    }
    preArchiveDraftRef.current = null;
    archiveSessionActiveRef.current = false;
    setViewingArchivedVersionNumber(null);
  }, []);

  const isReadOnly = viewingArchivedVersionNumber !== null;

  return {
    eop,
    isBootstrapping,
    eopNotFound,
    isReadOnly,
    viewingArchivedVersionNumber,
    applyCanonicalVersionRow,
    resumeEditingLatestEop,
    patchDocument,
    patchEquipment,
    patchProcedure,
    patchSignOff,
    patchSite,
    patchOverview,
    patchPreActionSafety,
    patchInternalDiagnostics,
    patchExternalActions,
    patchCommunication,
    patchRecovery,
    patchSupportingInformation,
    patchApprovalReview,
    resetEop,
    persistEop,
  };
};

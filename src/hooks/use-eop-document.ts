import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createEOP, generateEOP, getLatestEOP, saveEOP } from "@/services/eop-service";
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
  onCreateSaveSuccess?: (createdId: string) => void | Promise<void>;
};

const bumpVersionDate = (eop: EOP): EOP => ({
  ...eop,
  document: {
    ...eop.document,
    createdDate: eop.document.createdDate,
  },
});

export const useEopDocument = (ctx: EopDocumentContextParams) => {
  const { mode, eopId, onCreateSaveSuccess } = ctx;
  const [eop, setEop] = useState<EOP | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [eopNotFound, setEopNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsBootstrapping(true);
      setEopNotFound(false);
      try {
        if (mode === "create") {
          const generated = await generateEOP();
          if (!cancelled) {
            setEop(generated);
          }
          return;
        }
        const id = eopId?.trim() ?? "";
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
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Could not load EOP.");
        }
      } finally {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [mode, eopId]);

  const patchDocument = useCallback((partial: Partial<EOPDocument>) => {
    setEop((prev) => (prev === null ? prev : bumpVersionDate({ ...prev, document: { ...prev.document, ...partial } })));
  }, []);

  const patchEquipment = useCallback((partial: Partial<EOPEquipment>) => {
    setEop((prev) => (prev === null ? prev : bumpVersionDate({ ...prev, equipment: { ...prev.equipment, ...partial } })));
  }, []);

  const patchProcedure = useCallback((partial: Partial<EOPProcedure>) => {
    setEop((prev) => (prev === null ? prev : bumpVersionDate({ ...prev, procedure: { ...prev.procedure, ...partial } })));
  }, []);

  const patchSignOff = useCallback((partial: Partial<EOPSignOff>) => {
    setEop((prev) => (prev === null ? prev : bumpVersionDate({ ...prev, signOff: { ...prev.signOff, ...partial } })));
  }, []);

  const patchSite = useCallback((partial: Partial<EOPSiteSection>) => {
    setEop((prev) => (prev === null ? prev : bumpVersionDate({ ...prev, site: { ...prev.site, ...partial } })));
  }, []);

  const patchOverview = useCallback((partial: Partial<EOPSection03Overview>) => {
    setEop((prev) =>
      prev === null ? prev : bumpVersionDate({ ...prev, overview: { ...prev.overview, ...partial } }),
    );
  }, []);

  const patchPreActionSafety = useCallback((partial: Partial<EOPSection04PreActionSafety>) => {
    setEop((prev) =>
      prev === null
        ? prev
        : bumpVersionDate({
            ...prev,
            immediateActions: {
              ...prev.immediateActions,
              preActionSafety: {
                ...prev.immediateActions.preActionSafety,
                ...partial,
              },
            },
          }),
    );
  }, []);

  const patchInternalDiagnostics = useCallback(
    (partial: Partial<EOPSection04InternalDiagnostics>) => {
      setEop((prev) =>
        prev === null
          ? prev
          : bumpVersionDate({
              ...prev,
              immediateActions: {
                ...prev.immediateActions,
                internalDiagnostics: {
                  ...prev.immediateActions.internalDiagnostics,
                  ...partial,
                },
              },
            }),
      );
    },
    [],
  );

  const patchExternalActions = useCallback(
    (partial: Partial<EOPSection05ExternalActions>) => {
      setEop((prev) =>
        prev === null
          ? prev
          : bumpVersionDate({
              ...prev,
              externalActions: { ...prev.externalActions, ...partial },
            }),
      );
    },
    [],
  );

  const patchCommunication = useCallback((partial: Partial<EOPSection06Communication>) => {
    setEop((prev) =>
      prev === null
        ? prev
        : bumpVersionDate({
            ...prev,
            communication: { ...prev.communication, ...partial },
          }),
    );
  }, []);

  const patchRecovery = useCallback((partial: Partial<EOPSection07Recovery>) => {
    setEop((prev) =>
      prev === null
        ? prev
        : bumpVersionDate({
            ...prev,
            recovery: { ...prev.recovery, ...partial },
          }),
    );
  }, []);

  const patchSupportingInformation = useCallback(
    (partial: Partial<EOPSection08SupportingInformation>) => {
      setEop((prev) =>
        prev === null
          ? prev
          : bumpVersionDate({
              ...prev,
              supportingInformation: {
                ...prev.supportingInformation,
                ...partial,
              },
            }),
      );
    },
    [],
  );

  const patchApprovalReview = useCallback((partial: Partial<EOPSection09ApprovalReview>) => {
    setEop((prev) =>
      prev === null
        ? prev
        : bumpVersionDate({
            ...prev,
            approvalReview: { ...prev.approvalReview, ...partial },
          }),
    );
  }, []);

  const resetEop = useCallback(async () => {
    if (mode === "create") {
      const generated = await generateEOP();
      setEop(generated);
      return;
    }
    const id = eopId?.trim() ?? "";
    const loaded = await getLatestEOP(id);
    if (loaded !== null) {
      setEop(loaded);
    }
  }, [mode, eopId]);

  const persistEop = useCallback(async () => {
    if (eop === null) {
      throw new Error("EOP is not loaded");
    }
    if (mode === "create") {
      const created = await createEOP(eop);
      setEop(created);
      await onCreateSaveSuccess?.(created.id);
      return created;
    }
    const id = eopId?.trim() ?? "";
    if (id === "") {
      throw new Error("EOP id is required to save");
    }
    const saved = await saveEOP(eop, id);
    setEop(saved);
    return saved;
  }, [eop, mode, eopId, onCreateSaveSuccess]);

  return {
    eop,
    isBootstrapping,
    eopNotFound,
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

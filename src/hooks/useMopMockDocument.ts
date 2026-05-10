import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { resolveMopComments } from "@/constants/mop-section10-comments";
import { useAppContext } from "@/context/AppContext";
import { createEmptyMop } from "@/services/mop-mock-service";
import { getLatestMOP, saveMOP } from "@/services/mop-service";
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
import type { CanonicalMopVersionApiRow } from "@/types/mop-api";

export type MopDocumentContextParams = {
  mode: "create" | "edit";
  /** Required when `mode === "edit"` — canonical `mopId` from the URL. */
  mopId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: () => void | Promise<void>;
  documentId?: string;
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
  const { mode, mopId, onAfterPersist, onCreateSaveSuccess, documentId } = ctx;
  const [mop, setMop] = useState<MOP>(() => createEmptyMop());
  const [asset, setAsset] = useState({ name: "" });
  const [loadedBootstrapKey, setLoadedBootstrapKey] = useState<string | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [mopNotFound, setMopNotFound] = useState(false);
  const [viewingArchivedVersionNumber, setViewingArchivedVersionNumber] =
    useState<number | null>(null);

  const key = bootstrapKey(mode, mopId);
  const isBootstrapping = loadedBootstrapKey !== key;

  const latestSavedCanonicalRef = useRef<MOP | null>(null);
  const preArchiveDraftRef = useRef<MOP | null>(null);
  const archiveSessionActiveRef = useRef(false);

  const runStandaloneGenerateStream = useCallback(() => {
    setGenerateError(null);

    const evtSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/mop/generate?documentId=${documentId}`,
    );

    // initialize empty structure
    setMop((prev: any) => ({
      ...prev,
      loading: true,
    }));

    setIsGenerating(true);

    evtSource.addEventListener("allData", (e) => {
      const data = JSON.parse(e.data);

      setMop((prev: any) => ({
        ...prev,
        ...data,
        equipment: {},
        procedure: {},
        document: {},
      }));
    });

    evtSource.addEventListener("sectionOne", (e) => {
      const data = JSON.parse(e.data);

      setMop((prev: any) => ({
        ...prev,
        equipment: data.equipment,
        procedure: data.procedure,
        document: data.document,
      }));
    });

    evtSource.addEventListener("sectionThree", (e) => {
      const data = JSON.parse(e.data);

      setMop((prev: any) => ({
        ...prev,
        overview: {
          ...prev?.overview,
          ...data.overview,
        },
      }));
    });

    evtSource.addEventListener("sectionFivePPE", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionFivePPE failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        safety: {
          ...prev?.safety,
          ppeRequirementRows: data || [],
        },
      }));
    });

    evtSource.addEventListener("assetData", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("assetData failed");
        return;
      }

      setAsset({ ...data, name: data.assetName });
    });

    evtSource.addEventListener("siteDetails", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("siteDetails failed");
        return;
      }

      setMop((prev) => ({
        ...prev,
        site: data,
      }));
    });

    evtSource.addEventListener('sectionFour', (e) => {
      const data = JSON.parse(e.data);

      setMop((prev) => ({
        ...prev,
        facilityEffects: data.facilityEffects,
      }));

    })

    evtSource.addEventListener("sectionFiveSafetyProcedure", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionFiveSafetyProcedure failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        safety: {
          ...prev?.safety,
          safetyProcedureRows: data || [],
        },
      }));
    });

    evtSource.addEventListener("sectionFiveToolsRequired", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionFiveToolsRequired failed");
        return;
      }
      setMop((prev: any) => ({
        ...prev,
        safety: {
          ...prev?.safety,
          toolRequirementRows: data || [],
        },
      }));
    });

    evtSource.addEventListener("sectionSixProjectKeyAssumptions", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionSixProjectKeyAssumptions failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        assumptions: {
          ...prev.assumptions,
          assumptionRows: data || [],
        },
      }));
    });

    evtSource.addEventListener("sectionSixCriticalDecisionPoint", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionSixCriticalDecisionPoint failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        assumptions: {
          ...prev.assumptions,
          criticalDecisionPointItems: data || [],
        },
      }));
    });

    evtSource.addEventListener("sectionSevenProcedureSteps", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionSevenProcedureSteps failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        steps: data,
      }));
    });

    evtSource.addEventListener("sectionSevenDetailedProcedureSteps", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionSevenProcedureSteps failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        mopDetails: {
          ...prev.mopDetails,
          detailedProcedures: {
            ...prev.mopDetails.detailedProcedures,
            stepRows: data.steps,
            criticalStepNotes: data.criticalStepNotes,
          },
        },
      }));
    });

    evtSource.addEventListener("sectionTenComments", (e) => {
      const data = JSON.parse(e.data);
      if (data?.error) {
        toast.error("sectionTenComments failed");
        return;
      }

      setMop((prev: any) => ({
        ...prev,
        mopComments: resolveMopComments({
          ...prev.mopComments,
          mopCommentsText:
            typeof data.mopComments === "string"
              ? data.mopComments
              : prev.mopComments.mopCommentsText,
          additionalNotes:
            typeof data.additionalNotes === "string"
              ? data.additionalNotes
              : prev.mopComments.additionalNotes,
          postMaintenanceBullets:
            Array.isArray(data.postmaintenenaceRequirements) === true
              ? data.postmaintenenaceRequirements
              : prev.mopComments.postMaintenanceBullets,
        }),
      }));
    });

    evtSource.addEventListener("done", () => {
      toast.success("Succesfully generated, Please save the document manually.");
      setIsGenerating(false);
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
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoadedBootstrapKey(null);
      setGenerateError(null);
      setMopNotFound(false);

      if (mode === "create") {
        runStandaloneGenerateStream();
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
          toast.error(
            err instanceof Error ? err.message : "Could not load MOP.",
          );
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
  }, [mode, mopId, key, runStandaloneGenerateStream]);

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

  const patchOverview = useCallback(
    (partial: Partial<MOPSection03Overview>) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          overview: { ...prev.overview, ...partial },
        }),
      );
    },
    [],
  );

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

  const patchMopDetails = useCallback(
    (partial: Partial<MOPSection07Details>) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          mopDetails: { ...prev.mopDetails, ...partial },
        }),
      );
    },
    [],
  );

  const patchBackOut = useCallback((partial: Partial<MOPSection08BackOut>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        backOut: { ...prev.backOut, ...partial },
      }),
    );
  }, []);

  const patchMopApproval = useCallback(
    (partial: Partial<MOPSection09MopApproval>) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          mopApproval: { ...prev.mopApproval, ...partial },
        }),
      );
    },
    [],
  );

  const patchMopComments = useCallback(
    (partial: Partial<MOPSection10MopComments>) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          mopComments: { ...prev.mopComments, ...partial },
        }),
      );
    },
    [],
  );

  const patchMopReferences = useCallback(
    (partial: Partial<MOPSection11References>) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          references: { ...prev.references, ...partial },
        }),
      );
    },
    [],
  );
  const { site } = useAppContext();

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
      runStandaloneGenerateStream();
      // const ok = await runStandaloneGenerateStream();
      // if (ok) {
      //   toast.info("Form reset to a fresh generated draft.");
      // }
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
  }, [mode, mopId, key, runStandaloneGenerateStream]);

  const retryGenerate = useCallback(async () => {
    setLoadedBootstrapKey(null);
    await runStandaloneGenerateStream();
    setLoadedBootstrapKey(key);
  }, [key, runStandaloneGenerateStream]);

  const persistMop = useCallback(
    async (documentId?: string): Promise<{ success: boolean }> => {
      if (mode === "create") {
        const saved = await saveMOP(mop, "new", documentId, site?._id);
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
      const saved = await saveMOP(mop, id, undefined, site?._id);
      setMop(saved);
      latestSavedCanonicalRef.current = saved;
      preArchiveDraftRef.current = saved;
      setViewingArchivedVersionNumber(null);
      archiveSessionActiveRef.current = false;
      await onAfterPersist?.();
      return { success: true };
    },
    [mode, mop, mopId, onAfterPersist, onCreateSaveSuccess],
  );

  const applyCanonicalVersionRow = useCallback(
    (row: CanonicalMopVersionApiRow) => {
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
      setViewingArchivedVersionNumber(
        row.isLatest === true ? null : row.versionNumber,
      );
    },
    [],
  );

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
    viewingArchivedVersionNumber !== null &&
    viewingArchivedVersionNumber !== undefined;

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
    asset,
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
    isGenerating,
    patchSteps,
    resetMop,
    persistMop,
  };
};

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { getLatestEOP, saveEOP } from "@/services/eop-service";

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
import { useAppContext } from "@/context/AppContext";
import { Asset } from "@/components";

type EopDocumentContextParams = {
  mode: "create" | "edit";
  eopId?: string;
  onAfterPersist?: () => void | Promise<void>;
  onCreateSaveSuccess?: (createdId: string) => void | Promise<void>;
  documentId?: string
};

const bumpModified = (e: EOP): EOP => ({
  ...e,
  document: {
    ...e.document,
    lastModified: new Date().toISOString(),
  },
});

const patch = <E>(
  prev: EOP,
  key: keyof EOP,
  partial: Partial<E>,
): EOP => {
  return bumpModified({
    ...prev,
    [key]: {
      ...(prev[key] as object),
      ...partial,
    },
  });
};

const bootstrapKey = (
  mode: "create" | "edit",
  id: string | undefined,
) => `${mode}|${id ?? ""}`;

const createEmptyEop = (): EOP =>
({
  id: "",
} as EOP);

export const useEopDocument = (
  ctx: EopDocumentContextParams,
) => {
  const {
    mode,
    eopId,
    onAfterPersist,
    onCreateSaveSuccess,
    documentId,
  } = ctx;

  /**
   * ------------------------------------------------
   * STATE
   * ------------------------------------------------
   */

  const [eop, setEop] = useState<EOP>(() =>
    createEmptyEop(),
  );

  const [loadedKey, setLoadedKey] =
    useState<string | null>(null);

  const [eopNotFound, setEopNotFound] =
    useState(false);

  const [assetData, setAssetData] = useState<Asset | null>(null)

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [generateError, setGenerateError] =
    useState<string | null>(null);

  const [
    viewingArchivedVersionNumber,
    setViewingArchivedVersionNumber,
  ] = useState<number | null>(null);

  /**
   * ------------------------------------------------
   * REFS
   * ------------------------------------------------
   */

  const latestSavedRef = useRef<EOP | null>(null);

  const preArchiveDraftRef =
    useRef<EOP | null>(null);

  const archiveSessionActiveRef = useRef(false);

  /**
   * ------------------------------------------------
   * BOOTSTRAP
   * ------------------------------------------------
   */

  const key = bootstrapKey(mode, eopId);
  const { site } = useAppContext()


  const isBootstrapping = loadedKey !== key;

  const isReadOnly =
    viewingArchivedVersionNumber !== null;

  /**
   * ------------------------------------------------
   * GENERATION FLOW
   * ------------------------------------------------
   */

  const runStandaloneGenerateFlow =
    useCallback(async () => {
      try {
        setGenerateError(null);

        setIsGenerating(true);

        /**
         * ------------------------------------------------
         * FUTURE SSE STREAM
         * ------------------------------------------------
         */

        const evtSource = new EventSource(
          `${process.env.NEXT_PUBLIC_BASE_URL}/eop/generate?documentId=${documentId}`
        );

        /**
         * ------------------------------------------------
         * FUTURE EVENT LISTENERS
         * ------------------------------------------------
         */


        evtSource.addEventListener("allData", (e) => {
          const data = JSON.parse(e.data);
          setEop((prev) => ({
            ...prev,
            ...data,
          }));
        });
        evtSource.addEventListener("assetData", (e) => {
          const data = JSON.parse(e.data);

          setAssetData((prev) => ({
            ...prev,
            ...data,
            name: data.assetName,
          }));
        });

        evtSource.addEventListener("sectionOne", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            equipment: data?.equipment,
            procedure: data?.procedure,
            document: data?.document,
          }));
        });

        evtSource.addEventListener("siteDetails", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            site: data,
          }));
        });

        evtSource.addEventListener("sectionThree", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            overview: data?.overview,
          }));
        });

        evtSource.addEventListener("sectionFourPreActionSafety", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            immediateActions: {
              ...(prev?.immediateActions || {}),
              preActionSafety: {
                ...(prev?.immediateActions?.preActionSafety || {}),
                ppeIntroText: data?.ppeIntroText,
              },
            },
          }));
        });

        evtSource.addEventListener("sectionFourPPE", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            immediateActions: {
              ...(prev?.immediateActions || {}),
              preActionSafety: {
                ...(prev?.immediateActions?.preActionSafety || {}),
                ppeRows: data,
              },
            },
          }));
        });

        evtSource.addEventListener("sectionFourTools", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            immediateActions: {
              ...(prev?.immediateActions || {}),
              preActionSafety: {
                ...(prev?.immediateActions?.preActionSafety || {}),
                toolRows: data,
              },
            },
          }));
        });

        evtSource.addEventListener("sectionFourSafetyRequirements", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            immediateActions: {
              ...(prev?.immediateActions || {}),
              preActionSafety: {
                ...(prev?.immediateActions?.preActionSafety || {}),
                safetyChecklistItems: data,
              },
            },
          }));
        });

        evtSource.addEventListener("sectionFourDiagnostics", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            immediateActions: {
              ...(prev?.immediateActions || {}),
              internalDiagnostics: {
                ...(prev?.immediateActions?.internalDiagnostics || {}),
                diagnosticRows: data,
              },
            },
          }));
        });

        evtSource.addEventListener("sectionFiveResponseActions", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            externalActions: {
              ...(prev?.externalActions || {}),
              actionRows: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSixEmergency", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            communication: {
              ...(prev?.communication || {}),
              emergencyContactRows: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenRecovery", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              resolutionVerificationItems: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenPreCheck", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              preStartSafetyItems: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenRestart", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              restartSequenceItems: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenVerification", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              functionalityRows: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenPerformance", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              performanceValidationItems: data,
            },
          }));
        });

        evtSource.addEventListener("sectionSevenNormalOperations", (e) => {
          const data = JSON.parse(e.data);

          setEop((prev) => ({
            ...prev,
            recovery: {
              ...(prev?.recovery || {}),
              returnToNormalItems: data,
            },
          }));
        });

        evtSource.addEventListener("policyDocuments", (e) => {
          try {

            const data = JSON.parse(e.data);

            setEop((prevEop) => ({
              ...prevEop,
              supportingInformation: {
                ...prevEop.supportingInformation,
                policyDocuments: data
              }

            }));
          } catch (err) {
            console.error(err)
          }
        });

        evtSource.addEventListener("relatedDocuments", (e) => {
          try {

            const data = JSON.parse(e.data);

            setEop((prevEop) => ({
              ...prevEop,
              supportingInformation: {
                ...prevEop.supportingInformation,
                relatedDocuments: data
              }

            }));
          } catch (err) {
            console.error(err)
          }
        });

        evtSource.addEventListener("done", () => {
          toast.success(
            "Successfully generated, Please save the document manually."
          );

          setIsGenerating(false);

          evtSource.close();
        });

        evtSource.addEventListener("error", () => {
          setGenerateError("Streaming failed");

          setIsGenerating(false);

          evtSource.close();
        });

        setEop((prev) => ({
          ...createEmptyEop(),
          ...prev,
        }));

      } catch (err: unknown) {
        setGenerateError(
          err instanceof Error
            ? err.message
            : "EOP generation failed",
        );

        toast.error(
          err instanceof Error
            ? err.message
            : "Failed to generate EOP.",
        );
      }
    }, []);

  /**
   * ------------------------------------------------
   * INITIAL LOAD
   * ------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoadedKey(null);

      setGenerateError(null);

      setEopNotFound(false);

      /**
       * ------------------------------------------------
       * CREATE MODE
       * ------------------------------------------------
       */

      if (mode === "create") {
        await runStandaloneGenerateFlow();

        if (!cancelled) {
          latestSavedRef.current = null;

          preArchiveDraftRef.current = null;

          archiveSessionActiveRef.current = false;

          setViewingArchivedVersionNumber(null);

          setLoadedKey(key);
        }

        return;
      }

      /**
       * ------------------------------------------------
       * EDIT MODE
       * ------------------------------------------------
       */

      try {
        const id = eopId?.trim() ?? "";

        if (id === "") {
          if (!cancelled) {
            setEop(createEmptyEop());

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

          setEop(createEmptyEop());

          return;
        }

        setAssetData(loaded.asset);

        setEop(loaded);

        latestSavedRef.current = loaded;

        preArchiveDraftRef.current = null;

        archiveSessionActiveRef.current = false;

        setViewingArchivedVersionNumber(null);
      } catch (err: unknown) {
        if (!cancelled) {
          toast.error(
            err instanceof Error
              ? err.message
              : "Could not load EOP.",
          );

          setEop(createEmptyEop());

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
  }, [
    mode,
    eopId,
    key,
    runStandaloneGenerateFlow,
  ]);

  /**
   * ------------------------------------------------
   * PATCHERS
   * ------------------------------------------------
   */

  const patchDocument = useCallback(
    (p: Partial<EOPDocument>) => {
      setEop((prev) =>
        patch<EOPDocument>(prev, "document", p),
      );
    },
    [],
  );

  const patchEquipment = useCallback(
    (p: Partial<EOPEquipment>) => {
      setEop((prev) =>
        patch<EOPEquipment>(prev, "equipment", p),
      );
    },
    [],
  );

  const patchProcedure = useCallback(
    (p: Partial<EOPProcedure>) => {
      setEop((prev) =>
        patch<EOPProcedure>(prev, "procedure", p),
      );
    },
    [],
  );

  const patchSignOff = useCallback(
    (p: Partial<EOPSignOff>) => {
      setEop((prev) =>
        patch<EOPSignOff>(prev, "signOff", p),
      );
    },
    [],
  );

  const patchSite = useCallback(
    (p: Partial<EOPSiteSection>) => {
      setEop((prev) =>
        patch<EOPSiteSection>(prev, "site", p),
      );
    },
    [],
  );

  const patchOverview = useCallback(
    (p: Partial<EOPSection03Overview>) => {
      setEop((prev) =>
        patch<EOPSection03Overview>(
          prev,
          "overview",
          p,
        ),
      );
    },
    [],
  );

  const patchExternalActions = useCallback(
    (p: Partial<EOPSection05ExternalActions>) => {
      setEop((prev) =>
        patch<EOPSection05ExternalActions>(
          prev,
          "externalActions",
          p,
        ),
      );
    },
    [],
  );

  const patchCommunication = useCallback(
    (p: Partial<EOPSection06Communication>) => {
      setEop((prev) =>
        patch<EOPSection06Communication>(
          prev,
          "communication",
          p,
        ),
      );
    },
    [],
  );

  const patchRecovery = useCallback(
    (p: Partial<EOPSection07Recovery>) => {
      setEop((prev) =>
        patch<EOPSection07Recovery>(
          prev,
          "recovery",
          p,
        ),
      );
    },
    [],
  );

  const patchSupportingInformation =
    useCallback(
      (
        p: Partial<EOPSection08SupportingInformation>,
      ) => {
        setEop((prev) =>
          patch<EOPSection08SupportingInformation>(
            prev,
            "supportingInformation",
            p,
          ),
        );
      },
      [],
    );

  const patchApprovalReview = useCallback(
    (p: Partial<EOPSection09ApprovalReview>) => {
      setEop((prev) =>
        patch<EOPSection09ApprovalReview>(
          prev,
          "approvalReview",
          p,
        ),
      );
    },
    [],
  );

  const patchPreActionSafety = useCallback(
    (p: Partial<EOPSection04PreActionSafety>) => {
      setEop((prev) =>
        bumpModified({
          ...prev,
          immediateActions: {
            ...prev.immediateActions,
            preActionSafety: {
              ...prev.immediateActions
                ?.preActionSafety,
              ...p,
            },
          },
        }),
      );
    },
    [],
  );

  const patchInternalDiagnostics =
    useCallback(
      (
        p: Partial<EOPSection04InternalDiagnostics>,
      ) => {
        setEop((prev) =>
          bumpModified({
            ...prev,
            immediateActions: {
              ...prev.immediateActions,
              internalDiagnostics: {
                ...prev.immediateActions
                  .internalDiagnostics,
                ...p,
              },
            },
          }),
        );
      },
      [],
    );

  /**
   * ------------------------------------------------
   * RESET
   * ------------------------------------------------
   */

  const resetEop = useCallback(async () => {
    setLoadedKey(null);

    /**
     * ------------------------------------------------
     * CREATE MODE
     * ------------------------------------------------
     */

    if (mode === "create") {
      await runStandaloneGenerateFlow();

      setLoadedKey(key);

      return;
    }

    /**
     * ------------------------------------------------
     * EDIT MODE
     * ------------------------------------------------
     */

    try {
      const id = eopId?.trim() ?? "";

      if (id === "") {
        setEop(createEmptyEop());

        latestSavedRef.current = null;

        return;
      }

      const loaded = await getLatestEOP(id);

      if (loaded === null) {
        setEop(createEmptyEop());

        latestSavedRef.current = null;
      } else {
        setEop(loaded);

        latestSavedRef.current = loaded;
      }

      preArchiveDraftRef.current = null;

      archiveSessionActiveRef.current = false;

      setViewingArchivedVersionNumber(null);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to reload EOP.",
      );
    } finally {
      setLoadedKey(key);
    }
  }, [
    mode,
    eopId,
    key,
    runStandaloneGenerateFlow,
  ]);

  /**
   * ------------------------------------------------
   * RETRY GENERATION
   * ------------------------------------------------
   */

  const retryGenerate = useCallback(async () => {
    setLoadedKey(null);

    await runStandaloneGenerateFlow();

    setLoadedKey(key);
  }, [key, runStandaloneGenerateFlow]);

  /**
   * ------------------------------------------------
   * SAVE
   * ------------------------------------------------
   */

  const persistEop = useCallback(async (generatedDocumentId?: string) => {
    const id =
      mode === "create"
        ? "new"
        : eopId?.trim() ?? "";

    if (id === "") {
      throw new Error(
        "EOP id is required to save",
      );
    }

    const saved = await saveEOP(eop, id, site?._id, documentId ?? generatedDocumentId);

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
  }, [
    eop,
    mode,
    eopId,
    onAfterPersist,
    onCreateSaveSuccess,
  ]);

  /**
   * ------------------------------------------------
   * VERSION SWITCHING
   * ------------------------------------------------
   */

  const applyCanonicalVersionRow =
    useCallback(
      (row: CanonicalEopVersionApiRow) => {
        setEop((prev) => {
          if (row.isLatest === true) {
            archiveSessionActiveRef.current =
              false;

            const stash =
              preArchiveDraftRef.current;

            preArchiveDraftRef.current = null;

            latestSavedRef.current = row.eop;

            return stash !== null
              ? stash
              : row.eop;
          }

          if (
            archiveSessionActiveRef.current ===
            false
          ) {
            preArchiveDraftRef.current = prev;

            archiveSessionActiveRef.current =
              true;
          }

          return row.eop;
        });

        setViewingArchivedVersionNumber(
          row.isLatest === true
            ? null
            : row.versionNumber,
        );
      },
      [],
    );

  /**
   * ------------------------------------------------
   * RESUME EDITING
   * ------------------------------------------------
   */

  const resumeEditingLatestEop =
    useCallback(() => {
      const next =
        preArchiveDraftRef.current ??
        latestSavedRef.current;

      if (next !== null) {
        setEop(next);
      }

      preArchiveDraftRef.current = null;

      archiveSessionActiveRef.current = false;

      setViewingArchivedVersionNumber(null);
    }, []);

  /**
   * ------------------------------------------------
   * RETURN
   * ------------------------------------------------
   */

  return {
    eop,

    isBootstrapping,

    isGenerating,

    generateError,

    retryGenerate,

    eopNotFound,

    isReadOnly,

    viewingArchivedVersionNumber,

    applyCanonicalVersionRow,

    resumeEditingLatestEop,

    assetData,
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
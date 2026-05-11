"use client";

import { History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, ScreenLoader, SectionWrapper, Typography } from "@/components/common";
import { ProcedureVersionHistory } from "@/components/version-history/ProcedureVersionHistory";
import { VersionHistoryDrawer } from "@/components/version-history/VersionHistoryDrawer";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useEopDocument } from "@/hooks/use-eop-document";
import { useEopVersionHistoryPanel } from "@/hooks/use-eop-version-history-panel";
import type { CanonicalEopVersionApiRow } from "@/types/eop-api";

import { EopDocumentForm } from "./EopDocumentForm";

type EopManagementClientProps = {
  eopId?: string;
  documentId?: string;
};

export const EopManagementClient = ({ eopId, documentId }: EopManagementClientProps) => {
  const router = useRouter();
  const isEdit = eopId !== undefined && eopId.trim() !== "";
  const resolvedEopId = isEdit ? eopId.trim() : undefined;
  const [isSaving, setIsSaving] = useState(false);

  const applyVersionRef = useRef<(row: CanonicalEopVersionApiRow) => void>(
    () => { },
  );

  const {
    historyOpen,
    setHistoryOpen,
    resetHistoryPanel,
    historyLoading,
    historyError,
    currentRecord,
    archives,
    activeVersionId,
    versionCount,
    handleLoadVersion,
    refetchVersionHistory,
  } = useEopVersionHistoryPanel(resolvedEopId, {
    onSelectCanonicalRow: (row) => applyVersionRef.current(row),
  });

  const {
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
    isGenerating,
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
    assetData,
  } = useEopDocument({
    mode: isEdit ? "edit" : "create",
    eopId: resolvedEopId,
    documentId,
    onAfterPersist: () => void refetchVersionHistory(),
    onCreateSaveSuccess: async () => {
      toast.success("EOP saved successfully");
      router.push(DASHBOARD_ROUTES.EOP_MANAGEMENT);
    },
  });

  applyVersionRef.current = applyCanonicalVersionRow;

  const showVersionHistory = isEdit && resolvedEopId !== undefined;
  const readOnlyForm = isReadOnly === true;

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await persistEop();
      if (isEdit) {
        toast.success("EOP updated successfully");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save EOP.");
    } finally {
      setIsSaving(false);
    }
  }, [persistEop, isEdit]);

  const handleClear = useCallback(() => {
    void resetEop();
  }, [resetEop]);

  if (isEdit && eopNotFound === true && isBootstrapping === false) {
    return (
      <SectionWrapper className="flex min-h-0 flex-1 flex-col">
        <Typography variant="h1" className="mb-2">
          EOP not found
        </Typography>
        <Typography variant="p" className="mb-4 text-gray-600">
          This EOP may have been deleted or the link is invalid.
        </Typography>
        <Link
          href={DASHBOARD_ROUTES.EOP_MANAGEMENT}
          className="font-medium text-primary underline"
        >
          Back to EOP listing
        </Link>
      </SectionWrapper>
    );
  }

  if (eop === null) {
    return (
      <SectionWrapper>
        <Typography variant="p" className="text-gray-500">
          Loading EOP…
        </Typography>
      </SectionWrapper>
    );
  }

  return (
    <>
      {historyOpen ? (
        <VersionHistoryDrawer
          versionCount={versionCount}
          onClose={() => {
            resetHistoryPanel();
            setHistoryOpen(false);
          }}
        >
          {historyError !== null ? (
            <Typography variant="p" className="text-red-600">
              {historyError}
            </Typography>
          ) : showVersionHistory ? (
            <ProcedureVersionHistory
              currentRecord={currentRecord}
              history={archives}
              activeVersionId={activeVersionId}
              onLoadVersion={handleLoadVersion}
              isLoading={historyLoading}
              showTitle={false}
            />
          ) : (
            <Typography variant="p" className="text-gray-600">
              Version history will be available after you save an EOP.
            </Typography>
          )}
        </VersionHistoryDrawer>
      ) : null}

      <SectionWrapper className="flex min-h-full flex-col">
        {
          isGenerating ? <ScreenLoader heading="EOP is being generated" description="Selected EOP is being generated, do not switch or refresh the page, and once the document is generated, remember to save the generated document." /> : null
        }
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <Typography variant="h1" className="min-w-0 flex-1">
            Emergency Operating Procedure (EOP)
          </Typography>
          <AppButton
            variant="default"
            icon={<History className="h-4 w-4" />}
            title="Version History"
            onClick={() => setHistoryOpen(true)}
            disabled={isBootstrapping || showVersionHistory === false}
            className="shrink-0"
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 pb-24">
            {readOnlyForm === true && viewingArchivedVersionNumber !== null ? (
              <div
                role="status"
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950"
              >
                <Typography variant="span" className="font-medium">
                  {`You are viewing Version ${viewingArchivedVersionNumber} — this version is read-only. Click Resume Editing to return to the latest version.`}
                </Typography>
                <button
                  type="button"
                  className="shrink-0 font-semibold underline decoration-amber-800 hover:text-amber-900"
                  onClick={resumeEditingLatestEop}
                >
                  Resume Editing
                </button>
              </div>
            ) : null}
            <fieldset
              disabled={readOnlyForm}
              className={
                readOnlyForm === true
                  ? "min-w-0 border-0 p-0 opacity-95"
                  : "min-w-0 border-0 p-0"
              }
            >
              <EopDocumentForm
                eop={eop}
                isBootstrapping={isBootstrapping}
                patchDocument={patchDocument}
                patchEquipment={patchEquipment}
                patchProcedure={patchProcedure}
                assetName={assetData?.assetName}
                patchSignOff={patchSignOff}
                patchSite={patchSite}
                patchOverview={patchOverview}
                patchPreActionSafety={patchPreActionSafety}
                patchInternalDiagnostics={patchInternalDiagnostics}
                patchExternalActions={patchExternalActions}
                patchCommunication={patchCommunication}
                patchRecovery={patchRecovery}
                patchSupportingInformation={patchSupportingInformation}
                patchApprovalReview={patchApprovalReview}
              />
            </fieldset>
          </section>
        </div>

        <footer
          className="sticky bottom-0 z-10 -mx-4 mt-auto border-t border-gray-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          aria-label="EOP form actions"
        >
          <div className="flex flex-wrap items-center justify-end gap-2">
            <AppButton
              variant="ghost"
              title="Clear"
              disabled={isSaving || isBootstrapping || readOnlyForm}
              onClick={handleClear}
            />
            <AppButton
              variant="secondary"
              title={isSaving ? "Saving…" : "Save"}
              disabled={isSaving || isBootstrapping || readOnlyForm}
              onClick={() => {
                void handleSave();
              }}
            />
          </div>
        </footer>
      </SectionWrapper>
    </>
  );
};

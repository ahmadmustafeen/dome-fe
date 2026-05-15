"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { ScreenLoader, SectionWrapper, Typography } from "@/components/common";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useSopDocument } from "@/hooks/use-sop-document";
import { useSopVersionHistoryPanel } from "@/hooks/use-sop-version-history-panel";
import type { CanonicalSopVersionApiRow } from "@/types/sop-api";

import { SopArchivedVersionBanner } from "./SopArchivedVersionBanner";
import { SopDocumentForm } from "./SopDocumentForm";
import { SopFormActionsFooter } from "./SopFormActionsFooter";
import { SopManagementHeader } from "./SopManagementHeader";
import { SopNotFoundState } from "./SopNotFoundState";
import { SopVersionHistoryDrawer } from "./SopVersionHistoryDrawer";

type SopManagementClientProps = {
  sopId?: string;
  documentId?: string
};

export const SopManagementClient = ({ sopId, documentId }: SopManagementClientProps) => {
  const router = useRouter();
  const isEdit = sopId !== undefined && sopId.trim() !== "";
  const resolvedSopId = isEdit ? sopId.trim() : undefined;
  const [isSaving, setIsSaving] = useState(false);
  const applyVersionRef = useRef<(row: CanonicalSopVersionApiRow) => void>(
    () => { },
  );

  const handleSelectCanonicalRow = useCallback(
    (row: CanonicalSopVersionApiRow) => applyVersionRef.current(row),
    [],
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
  } = useSopVersionHistoryPanel(resolvedSopId, {
    onSelectCanonicalRow: handleSelectCanonicalRow,
  });

  const {
    sop,
    isBootstrapping,
    sopNotFound,
    isGenerating,
    isReadOnly,
    viewingArchivedVersionNumber,
    applyCanonicalVersionRow,
    resumeEditingLatestSop,
    patchDocument,
    patchEquipment,
    patchProcedure,
    patchSignOff,
    patchSite,
    patchOverview,
    patchFacilityEffects,
    patchSafety,
    patchRisksAssumptions,
    patchDetails,
    patchBackOutProcedures,
    patchApproval,
    patchComments,
    patchReferences,
    resetSop,
    persistSop,
  } = useSopDocument({
    mode: isEdit ? "edit" : "create",
    sopId: resolvedSopId,
    documentId,
    onAfterPersist: () => void refetchVersionHistory(),
    onCreateSaveSuccess: async (createdId) => {
      if (createdId.trim() === "") {
        toast.error("SOP saved but no id returned from the API.");
        return;
      }
      toast.success("SOP saved successfully");
      router.push(DASHBOARD_ROUTES.SOP_MANAGEMENT);
    },
  });

  applyVersionRef.current = applyCanonicalVersionRow;

  const showVersionHistory = isEdit && resolvedSopId !== undefined;
  const readOnlyForm = isReadOnly === true;

  const handleOpenHistory = useCallback(() => {
    setHistoryOpen(true);
  }, [setHistoryOpen]);

  const handleCloseHistory = useCallback(() => {
    resetHistoryPanel();
    setHistoryOpen(false);
  }, [resetHistoryPanel, setHistoryOpen]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await persistSop();
      if (isEdit) {
        toast.success("SOP updated successfully");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save SOP.");
    } finally {
      setIsSaving(false);
    }
  }, [persistSop, isEdit]);

  const handleClear = useCallback(() => {
    void resetSop();
  }, [resetSop]);

  const handleSaveClick = useCallback(() => {
    void handleSave();
  }, [handleSave]);

  if (isEdit && sopNotFound === true && isBootstrapping === false) {
    return <SopNotFoundState />;
  }

  if (sop === null) {
    return (
      <SectionWrapper>
        <Typography variant="p" className="text-gray-500">
          Loading SOP...
        </Typography>
      </SectionWrapper>
    );
  }

  return (
    <>

      {historyOpen ? (
        <SopVersionHistoryDrawer
          versionCount={versionCount}
          historyError={historyError}
          showVersionHistory={showVersionHistory}
          currentRecord={currentRecord}
          archives={archives}
          activeVersionId={activeVersionId}
          historyLoading={historyLoading}
          onClose={handleCloseHistory}
          onLoadVersion={handleLoadVersion}
        />
      ) : null}

      <SectionWrapper className="flex min-h-full flex-col">
        {
          isGenerating ? <ScreenLoader heading="SOP is being generated" description="Selected SOP is being generated, do not switch or refresh the page, and once the document is generated, remember to save the generated document." /> : null
        }
        <SopManagementHeader
          isBootstrapping={isBootstrapping}
          showVersionHistory={showVersionHistory}
          onOpenHistory={handleOpenHistory}
        />

        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 pb-24">
          {viewingArchivedVersionNumber !== null ? (
            <SopArchivedVersionBanner
              versionNumber={viewingArchivedVersionNumber}
              onResumeLatest={resumeEditingLatestSop}
            />
          ) : null}
          <fieldset
            disabled={readOnlyForm}
            className={
              readOnlyForm === true
                ? "min-w-0 border-0 p-0 opacity-95"
                : "min-w-0 border-0 p-0"
            }
          >
            <SopDocumentForm
              sop={sop}
              isBootstrapping={isBootstrapping}
              patchDocument={patchDocument}
              patchEquipment={patchEquipment}
              patchProcedure={patchProcedure}
              patchSignOff={patchSignOff}
              patchSite={patchSite}
              patchOverview={patchOverview}
              patchFacilityEffects={patchFacilityEffects}
              patchSafety={patchSafety}
              patchRisksAssumptions={patchRisksAssumptions}
              patchDetails={patchDetails}
              patchBackOutProcedures={patchBackOutProcedures}
              patchApproval={patchApproval}
              patchComments={patchComments}
              patchReferences={patchReferences}
            />
          </fieldset>
        </section>

        <SopFormActionsFooter
          isSaving={isSaving}
          isGenerating={isGenerating}
          isBootstrapping={isBootstrapping}
          readOnlyForm={readOnlyForm}
          onClear={handleClear}
          onSave={handleSaveClick}
        />
      </SectionWrapper>
    </>
  );
};

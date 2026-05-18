"use client";

import { Download, History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  AppButton,
  DeleteConfirmationScreen,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useMopMockDocument } from "@/hooks/useMopMockDocument";
import { useMopVersionHistoryPanel } from "@/hooks/useMopVersionHistoryPanel";
import type { CanonicalMopVersionApiRow } from "@/types/mop-api";

import { MopDocumentForm } from "./MopDocumentForm";
import { MopVersionHistory } from "./MopVersionHistory";
import { MopVersionHistoryDrawer } from "./MopVersionHistoryDrawer";

interface MopManagementClientProps {
  mopId?: string;
  documentId?: string;
  noDownload: boolean;
}

export const MopManagementClient = ({
  mopId,
  noDownload,
  documentId,
}: MopManagementClientProps) => {
  const router = useRouter();
  const isEdit = mopId !== undefined && mopId.trim() !== "";
  const mode = isEdit ? "edit" : "create";
  const resolvedMopId = isEdit ? mopId.trim() : undefined;
  const [isDownloading, setIsDownloading] = useState(false)

  const applyVersionRef = useRef<(row: CanonicalMopVersionApiRow) => void>(
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
  } = useMopVersionHistoryPanel(resolvedMopId, {
    onSelectCanonicalRow: (row) => applyVersionRef.current(row),
  });

  const {
    mop,
    isBootstrapping,
    createGenerateFailed,
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
    asset,
    isGenerating,
    persistMop,
  } = useMopMockDocument({
    mode,
    mopId: resolvedMopId,
    documentId,
    onAfterPersist: () => void refetchVersionHistory(),
    onCreateSaveSuccess: async () => {
      toast.success("MOP saved successfully");
      router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT);
    },
  });

  applyVersionRef.current = applyCanonicalVersionRow;

  const [isSaving, setIsSaving] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await persistMop(documentId);
      if (isEdit) {
        toast.success("MOP updated successfully");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }, [persistMop, isEdit]);

  const handleClearConfirmed = useCallback(() => {
    void resetMop();
    setShowClearConfirm(false);
  }, [resetMop]);


  const onDownload = async () => {
    setIsDownloading(true)
    const res = await fetch(`/api/mops/${mopId}/pdf`);

    if (!res.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${mop.document.title}-${new Date().toISOString()}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
    setIsDownloading(false)
  }

  const readOnlyForm = isReadOnly === true;
  const showVersionHistory = isEdit && resolvedMopId !== undefined;

  if (isEdit && mopNotFound === true && isBootstrapping === false) {
    return (
      <SectionWrapper className="flex min-h-0 flex-1 flex-col">
        <Typography variant="h1" className="mb-2">
          MOP not found
        </Typography>
        <Typography variant="p" className="mb-4 text-gray-600">
          This MOP may have been deleted or the link is invalid.
        </Typography>
        <Link
          href={DASHBOARD_ROUTES.MOP_MANAGEMENT}
          className="font-medium text-primary underline"
        >
          Back to MOP listing
        </Link>
      </SectionWrapper>
    );
  }

  return (
    <>
      {
        isGenerating ? <ScreenLoader heading="MOP is being generated" description="Selected MOP is being generated, do not switch or refresh the page, and once the document is generated, remember to save the generated document." /> : null
      }
      {showClearConfirm ? (
        <DeleteConfirmationScreen
          heading="Reset MOP Form"
          description={
            mode === "create"
              ? "Current form data will be discarded and replaced with a freshly generated MOP from the server."
              : "Current unsaved edits will be discarded and the last saved version will be reloaded."
          }
          confirmLabel="Reset"
          confirmVariant="danger"
          handleCancel={() => setShowClearConfirm(false)}
          handleContinue={handleClearConfirmed}
        />
      ) : null}

      {historyOpen ? (
        <MopVersionHistoryDrawer
          versionCount={versionCount}
          onClose={() => {
            resetHistoryPanel();
            setHistoryOpen(false);
          }}
        >
          {historyError ? (
            <Typography variant="p" className="text-red-600">
              {historyError}
            </Typography>
          ) : showVersionHistory ? (
            <MopVersionHistory
              currentRecord={currentRecord}
              history={archives}
              activeVersionId={activeVersionId}
              onLoadVersion={handleLoadVersion}
              isLoading={historyLoading}
              showTitle={false}
            />
          ) : (
            <Typography variant="p" className="text-gray-600">
              Version history is available after you save a MOP.
            </Typography>
          )}
        </MopVersionHistoryDrawer>
      ) : null}

      <SectionWrapper className="flex min-h-full flex-col">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <Typography variant="h1" className="min-w-0 flex-1">
            Method of Procedure (MOP)
          </Typography>
          {!noDownload ? <AppButton
            variant="secondary"
            icon={<Download className="h-4 w-4" />}
            title={isDownloading ? "Downloading..." : "Download"}
            onClick={onDownload}
            disabled={isBootstrapping || isDownloading}
            className="shrink-0"
          /> : null}
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
                  onClick={resumeEditingLatestMop}
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
              <MopDocumentForm
                mop={mop}
                asset={asset}
                isBootstrapping={isBootstrapping}
                patchDocument={patchDocument}
                patchEquipment={patchEquipment}
                patchProcedure={patchProcedure}
                patchSignOff={patchSignOff}
                patchSite={patchSite}
                patchOverview={patchOverview}
                patchSafety={patchSafety}
                patchAssumptions={patchAssumptions}
                patchMopDetails={patchMopDetails}
                patchBackOut={patchBackOut}
                patchMopApproval={patchMopApproval}
                patchMopComments={patchMopComments}
                patchMopReferences={patchMopReferences}
                patchFacilityEffects={patchFacilityEffects}
                patchSteps={patchSteps}
              />
            </fieldset>
          </section>
        </div>

        <footer
          className="sticky bottom-0 z-10 -mx-4 mt-auto border-t border-gray-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          aria-label="MOP form actions"
        >
          {isGenerating ? null : <div className="flex flex-wrap items-center justify-end gap-2">
            <AppButton
              variant="ghost"
              title="Clear"
              disabled={isSaving || isBootstrapping || readOnlyForm || isGenerating}
              onClick={() => setShowClearConfirm(true)}
            />
            <AppButton
              variant="secondary"
              title={isSaving ? "Saving…" : "Save"}
              onClick={() => {
                void handleSave();
              }}
              disabled={
                isSaving ||
                isBootstrapping ||
                readOnlyForm ||
                isGenerating
                ||
                (mode === "create" && createGenerateFailed)
              }
            />
          </div>}
        </footer>
      </SectionWrapper>
    </>
  );
};

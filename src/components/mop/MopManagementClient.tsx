"use client";

import { History } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import {
  AppButton,
  DeleteConfirmationScreen,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { useAppContext } from "@/context/AppContext";
import { useMopMockDocument } from "@/hooks/useMopMockDocument";
import { useMopVersionHistoryPanel } from "@/hooks/useMopVersionHistoryPanel";

import { MopDocumentForm } from "./MopDocumentForm";
import { MopVersionHistory } from "./MopVersionHistory";
import { MopVersionHistoryDrawer } from "./MopVersionHistoryDrawer";

interface MopManagementClientProps {
  mopId?: string;
}

export const MopManagementClient = ({ mopId }: MopManagementClientProps) => {
  const { site, client } = useAppContext();
  const {
    mop,
    isBootstrapping,
    patchDocument,
    patchEquipment,
    patchProcedure,
    patchSignOff,
    patchSite,
    patchOverview,
    resetMop,
    persistMop,
  } = useMopMockDocument({
    clientName: client?.name,
    siteName: site?.name,
    siteId: site?._id,
  });

  const {
    historyOpen,
    setHistoryOpen,
    historyLoading,
    historyError,
    currentRecord,
    archives,
    activeVersionId,
    versionCount,
    handleLoadVersion,
  } = useMopVersionHistoryPanel(mopId);

  const [isSaving, setIsSaving] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await persistMop();
      if (res.success) {
        toast.success("Saved (mock service).");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }, [persistMop]);

  const handleClearConfirmed = useCallback(() => {
    resetMop();
    setShowClearConfirm(false);
    toast.info("Form reset to mock defaults.");
  }, [resetMop]);

  return (
    <>
      {showClearConfirm ? (
        <DeleteConfirmationScreen
          heading="Reset MOP Form"
          description="All entered data will be lost and the form will reload mock defaults. This cannot be undone."
          confirmLabel="Reset"
          confirmVariant="danger"
          handleCancel={() => setShowClearConfirm(false)}
          handleContinue={handleClearConfirmed}
        />
      ) : null}

      {historyOpen ? (
        <MopVersionHistoryDrawer
          versionCount={versionCount}
          onClose={() => setHistoryOpen(false)}
        >
          {historyError ? (
            <Typography variant="p" className="text-red-600">
              {historyError}
            </Typography>
          ) : mopId ? (
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
              Open a saved MOP from the list to load server version history. The
              form below still uses the mock document layer.
            </Typography>
          )}
        </MopVersionHistoryDrawer>
      ) : null}

      <SectionWrapper className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <Typography variant="h1" className="min-w-0 flex-1">
            Method of Procedure (MOP)
          </Typography>
          <AppButton
            variant="default"
            icon={<History className="h-4 w-4" />}
            title="Version History"
            onClick={() => setHistoryOpen(true)}
            disabled={isBootstrapping}
            className="shrink-0"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:h-[calc(100vh-12rem)]">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
            <MopDocumentForm
              mop={mop}
              isBootstrapping={isBootstrapping}
              patchDocument={patchDocument}
              patchEquipment={patchEquipment}
              patchProcedure={patchProcedure}
              patchSignOff={patchSignOff}
              patchSite={patchSite}
              patchOverview={patchOverview}
            />
            <div className="flex shrink-0 flex-wrap gap-2 pt-1">
              <AppButton
                variant="secondary"
                title={isSaving ? "Saving…" : "Save"}
                onClick={handleSave}
                disabled={isSaving || isBootstrapping}
              />
              <AppButton
                variant="ghost"
                title="Clear"
                disabled={isSaving || isBootstrapping}
                onClick={() => setShowClearConfirm(true)}
              />
            </div>
          </section>
        </div>
      </SectionWrapper>
    </>
  );
};

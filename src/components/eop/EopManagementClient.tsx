"use client";

import { History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { ProcedureVersionHistory } from "@/components/version-history/ProcedureVersionHistory";
import { VersionHistoryDrawer } from "@/components/version-history/VersionHistoryDrawer";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useEopDocument } from "@/hooks/use-eop-document";
import { useEopVersionHistoryPanel } from "@/hooks/use-eop-version-history-panel";

import { EopDocumentForm } from "./EopDocumentForm";

type EopManagementClientProps = {
  eopId?: string;
};

export const EopManagementClient = ({ eopId }: EopManagementClientProps) => {
  const router = useRouter();
  const isEdit = eopId !== undefined && eopId.trim() !== "";
  const resolvedEopId = isEdit ? eopId.trim() : undefined;
  const [isSaving, setIsSaving] = useState(false);

  const {
    eop,
    isBootstrapping,
    eopNotFound,
    patchDocument,
    patchEquipment,
    patchProcedure,
    patchSignOff,
    patchSite,
    patchOverview,
    resetEop,
    persistEop,
  } = useEopDocument({
    mode: isEdit ? "edit" : "create",
    eopId: resolvedEopId,
    onCreateSaveSuccess: async () => {
      toast.success("EOP saved successfully");
      router.push(DASHBOARD_ROUTES.EOP_MANAGEMENT);
    },
  });

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
  } = useEopVersionHistoryPanel(resolvedEopId);

  const showVersionHistory = isEdit && resolvedEopId !== undefined;
  const readOnlyForm = false;

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
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <Typography variant="h1" className="min-w-0 flex-1">
            Emergency Operating Procedure (EOP)
          </Typography>
          <AppButton
            variant="default"
            icon={<History className="h-4 w-4" />}
            title="Version History"
            onClick={() => setHistoryOpen(true)}
            disabled={showVersionHistory === false}
            className="shrink-0"
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 pb-24">
            <fieldset
              disabled={readOnlyForm}
              className="min-w-0 border-0 p-0"
            >
              <EopDocumentForm
                eop={eop}
                isBootstrapping={isBootstrapping}
                patchDocument={patchDocument}
                patchEquipment={patchEquipment}
                patchProcedure={patchProcedure}
                patchSignOff={patchSignOff}
                patchSite={patchSite}
                patchOverview={patchOverview}
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
              disabled={isSaving || isBootstrapping}
              onClick={handleClear}
            />
            <AppButton
              variant="secondary"
              title={isSaving ? "Saving…" : "Save"}
              disabled={isSaving || isBootstrapping}
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

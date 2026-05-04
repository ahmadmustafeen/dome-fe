"use client";

import { History } from "lucide-react";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { ProcedureVersionHistory } from "@/components/version-history/ProcedureVersionHistory";
import { VersionHistoryDrawer } from "@/components/version-history/VersionHistoryDrawer";
import { useEopVersionHistoryPanel } from "@/hooks/use-eop-version-history-panel";

type EopManagementClientProps = {
  eopId?: string;
};

export const EopManagementClient = ({ eopId }: EopManagementClientProps) => {
  const isEdit = eopId !== undefined && eopId.trim() !== "";
  const resolvedEopId = isEdit ? eopId.trim() : undefined;

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
            <Typography variant="p" className="text-gray-600">
              EOP form sections will be added in a follow-up. This page mirrors the MOP shell:
              heading, sticky actions, and version history drawer.
            </Typography>
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
              disabled={true}
              onClick={() => undefined}
            />
            <AppButton
              variant="secondary"
              title="Save (coming soon)"
              disabled={true}
              onClick={() => undefined}
            />
          </div>
        </footer>
      </SectionWrapper>
    </>
  );
};

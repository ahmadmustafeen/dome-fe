"use client";

import { Typography } from "@/components/common";
import { ProcedureVersionHistory } from "@/components/version-history/ProcedureVersionHistory";
import { VersionHistoryDrawer } from "@/components/version-history/VersionHistoryDrawer";
import type {
  MopVersionHistoryArchiveRecord,
  MopVersionHistoryCurrentRecord,
} from "@/types/mop-api";

type SopVersionHistoryDrawerProps = {
  versionCount: number;
  historyError: string | null;
  showVersionHistory: boolean;
  currentRecord: MopVersionHistoryCurrentRecord | null;
  archives: MopVersionHistoryArchiveRecord[];
  activeVersionId: string | null;
  historyLoading: boolean;
  onClose: () => void;
  onLoadVersion: (
    record: MopVersionHistoryCurrentRecord | MopVersionHistoryArchiveRecord,
  ) => void;
};

export const SopVersionHistoryDrawer = ({
  versionCount,
  historyError,
  showVersionHistory,
  currentRecord,
  archives,
  activeVersionId,
  historyLoading,
  onClose,
  onLoadVersion,
}: SopVersionHistoryDrawerProps) => {
  return (
    <VersionHistoryDrawer versionCount={versionCount} onClose={onClose}>
      {historyError !== null ? (
        <Typography variant="p" className="text-red-600">
          {historyError}
        </Typography>
      ) : showVersionHistory ? (
        <ProcedureVersionHistory
          currentRecord={currentRecord}
          history={archives}
          activeVersionId={activeVersionId}
          onLoadVersion={onLoadVersion}
          isLoading={historyLoading}
          showTitle={false}
        />
      ) : (
        <Typography variant="p" className="text-gray-600">
          Version history will be available after you save an SOP.
        </Typography>
      )}
    </VersionHistoryDrawer>
  );
};

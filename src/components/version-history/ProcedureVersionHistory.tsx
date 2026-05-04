"use client";

import { AppButton, Typography } from "@/components/common";
import { MopStatusBadge } from "@/components/mop/MopStatusBadge";
import type {
  MopVersionHistoryArchiveRecord,
  MopVersionHistoryCurrentRecord,
} from "@/types/mop-api";

type VersionEntry =
  | { kind: "current"; record: MopVersionHistoryCurrentRecord }
  | { kind: "archive"; record: MopVersionHistoryArchiveRecord };

type ProcedureVersionHistoryProps = {
  currentRecord: MopVersionHistoryCurrentRecord | null;
  history: MopVersionHistoryArchiveRecord[];
  activeVersionId: string | null;
  onLoadVersion: (
    record: MopVersionHistoryCurrentRecord | MopVersionHistoryArchiveRecord,
  ) => void;
  isLoading?: boolean;
  showTitle?: boolean;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const VersionCard = ({
  entry,
  isActive,
  onLoad,
}: {
  entry: VersionEntry;
  isActive: boolean;
  onLoad: () => void;
}) => {
  const { record } = entry;
  const date = entry.kind === "archive" ? entry.record.archivedAt : record.updatedAt;

  return (
    <div
      className={`rounded-lg border p-3 transition-colors ${
        isActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <Typography variant="span" className="font-semibold text-gray-800">
          {`v${record.versionNumber}`}
        </Typography>
        {entry.kind === "current" ? (
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
            Latest
          </span>
        ) : null}
      </div>

      <MopStatusBadge status={record.status} className="mb-2" />

      <Typography variant="caption" className="mb-1 block">
        {formatDate(date)}
      </Typography>

      {isActive ? (
        <Typography variant="caption" className="font-medium text-blue-600">
          Currently loaded
        </Typography>
      ) : (
        <AppButton
          variant="ghost"
          title="Load this version"
          onClick={onLoad}
          className="mr-0 px-0 py-0 text-xs"
        />
      )}
    </div>
  );
};

/** Version list used by MOP and EOP management (status badges shared with MOP form). */
export const ProcedureVersionHistory = ({
  currentRecord,
  history,
  activeVersionId,
  onLoadVersion,
  isLoading = false,
  showTitle = true,
}: ProcedureVersionHistoryProps) => {
  const entries: VersionEntry[] = [
    ...(currentRecord
      ? [{ kind: "current" as const, record: currentRecord }]
      : []),
    ...history.map((r) => ({ kind: "archive" as const, record: r })),
  ];

  return (
    <div className="flex h-full flex-col gap-3">
      {showTitle ? (
        <Typography variant="h6" className="text-gray-500">
          Version History
        </Typography>
      ) : null}

      {isLoading ? (
        <Typography variant="p" className="text-gray-400">
          Loading…
        </Typography>
      ) : entries.length === 0 ? (
        <Typography variant="p" className="text-gray-400">
          No versions yet.
        </Typography>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {entries.map((entry) => (
            <VersionCard
              key={entry.record._id}
              entry={entry}
              isActive={activeVersionId === entry.record._id}
              onLoad={() => onLoadVersion(entry.record)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

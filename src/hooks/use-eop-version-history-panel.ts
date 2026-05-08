import { useCallback, useEffect, useRef, useState } from "react";

import { mopDocumentStatusToFormLabel } from "@/components/mop/mop-document-status";
import { getEOPVersions } from "@/services/eop-service";
import type { CanonicalEopVersionApiRow } from "@/types/eop-api";
import type {
  MopVersionHistoryArchiveRecord,
  MopVersionHistoryCurrentRecord,
} from "@/types/mop-api";

const canonicalRowToSyntheticId = (row: CanonicalEopVersionApiRow): string =>
  `canonical-eop-v-${row.versionNumber}-${row.isLatest === true ? "latest" : "archive"}-${row.archivedAt ?? "live"}`;

const toVersionDateIso = (row: CanonicalEopVersionApiRow): string =>
  row.archivedAt !== null && row.archivedAt !== ""
    ? row.archivedAt
    : row.eop.document.lastModified;

const toCurrentShim = (
  row: CanonicalEopVersionApiRow,
): MopVersionHistoryCurrentRecord => ({
  _id: canonicalRowToSyntheticId(row),
  updatedAt: toVersionDateIso(row),
  versionNumber: String(row.versionNumber),
  status: mopDocumentStatusToFormLabel(row.eop.document.status),
});

const toArchiveShim = (
  row: CanonicalEopVersionApiRow,
): MopVersionHistoryArchiveRecord => ({
  _id: canonicalRowToSyntheticId(row),
  archivedAt: row.archivedAt ?? row.eop.document.lastModified,
  updatedAt: toVersionDateIso(row),
  versionNumber: String(row.versionNumber),
  status: mopDocumentStatusToFormLabel(row.eop.document.status),
  mopId: "",
});

const applyRowsToState = (
  rows: CanonicalEopVersionApiRow[],
  setCurrentRecord: (r: MopVersionHistoryCurrentRecord | null) => void,
  setArchives: (r: MopVersionHistoryArchiveRecord[]) => void,
  setActiveVersionId: (id: string | null) => void,
  rowMap: Map<string, CanonicalEopVersionApiRow>,
) => {
  const nextMap = new Map<string, CanonicalEopVersionApiRow>();
  for (const r of rows) {
    nextMap.set(canonicalRowToSyntheticId(r), r);
  }
  rowMap.clear();
  for (const [k, v] of nextMap) {
    rowMap.set(k, v);
  }

  const latest = rows.find((r) => r.isLatest === true) ?? null;
  const rest = rows.filter((r) => r.isLatest === false);

  setCurrentRecord(latest !== null ? toCurrentShim(latest) : null);
  setArchives(rest.map(toArchiveShim));
  setActiveVersionId(latest !== null ? canonicalRowToSyntheticId(latest) : null);
};

export const useEopVersionHistoryPanel = (
  eopId: string | undefined,
  options: { onSelectCanonicalRow: (row: CanonicalEopVersionApiRow) => void },
) => {
  const { onSelectCanonicalRow } = options;
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [currentRecord, setCurrentRecord] =
    useState<MopVersionHistoryCurrentRecord | null>(null);
  const [archives, setArchives] = useState<MopVersionHistoryArchiveRecord[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const rowMapRef = useRef<Map<string, CanonicalEopVersionApiRow>>(new Map());

  const historyKey =
    eopId !== undefined && eopId.trim() !== "" ? eopId.trim() : "";
  const hasEop = historyKey !== "";
  const historyLoading =
    historyOpen === true && hasEop === true && isFetching === true;

  const runFetch = useCallback((key: string): Promise<void> => {
    return Promise.resolve()
      .then(() => {
        setIsFetching(true);
        return getEOPVersions(key);
      })
      .then((rows) => {
        setHistoryError(null);
        applyRowsToState(
          rows,
          setCurrentRecord,
          setArchives,
          setActiveVersionId,
          rowMapRef.current,
        );
      })
      .catch((err: unknown) => {
        setHistoryError(
          err instanceof Error ? err.message : "Could not load version history.",
        );
        setCurrentRecord(null);
        setArchives([]);
        setActiveVersionId(null);
        rowMapRef.current.clear();
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    if (historyOpen === false || hasEop === false) {
      return;
    }
    void runFetch(historyKey);
  }, [historyOpen, hasEop, historyKey, runFetch]);

  const refetchVersionHistory = useCallback(() => {
    if (hasEop === false) {
      return Promise.resolve();
    }
    return runFetch(historyKey);
  }, [hasEop, historyKey, runFetch]);

  const resetHistoryPanel = useCallback(() => {
    setHistoryError(null);
  }, []);

  const displayVersionCount =
    currentRecord === null ? archives.length : 1 + archives.length;

  const handleLoadVersion = useCallback(
    (record: MopVersionHistoryCurrentRecord | MopVersionHistoryArchiveRecord) => {
      const canonical = rowMapRef.current.get(record._id);
      if (canonical === undefined) {
        return;
      }
      setActiveVersionId(record._id);
      onSelectCanonicalRow(canonical);
    },
    [onSelectCanonicalRow],
  );

  return {
    historyOpen,
    setHistoryOpen,
    historyLoading,
    historyError,
    currentRecord,
    archives,
    activeVersionId,
    versionCount: displayVersionCount,
    handleLoadVersion,
    resetHistoryPanel,
    refetchVersionHistory,
  };
};

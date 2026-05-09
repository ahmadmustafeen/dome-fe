import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { mopDocumentStatusToFormLabel } from "@/components/mop/mop-document-status";
import { getSOPVersions } from "@/services/sop-service";
import type {
  MopVersionHistoryArchiveRecord,
  MopVersionHistoryCurrentRecord,
} from "@/types/mop-api";
import type { CanonicalSopVersionApiRow } from "@/types/sop-api";

const canonicalRowToSyntheticId = (row: CanonicalSopVersionApiRow): string =>
  `canonical-sop-v-${row.versionNumber}-${row.isLatest === true ? "latest" : "archive"}-${row.archivedAt ?? "live"}`;

const toVersionDateIso = (row: CanonicalSopVersionApiRow): string =>
  row.archivedAt !== null && row.archivedAt !== ""
    ? row.archivedAt
    : row.sop.document.lastModified;

const toCurrentShim = (
  row: CanonicalSopVersionApiRow,
): MopVersionHistoryCurrentRecord => ({
  _id: canonicalRowToSyntheticId(row),
  updatedAt: toVersionDateIso(row),
  versionNumber: String(row.versionNumber),
  status: mopDocumentStatusToFormLabel(row.sop.document.status),
});

const toArchiveShim = (
  row: CanonicalSopVersionApiRow,
): MopVersionHistoryArchiveRecord => ({
  _id: canonicalRowToSyntheticId(row),
  archivedAt: row.archivedAt ?? row.sop.document.lastModified,
  updatedAt: toVersionDateIso(row),
  versionNumber: String(row.versionNumber),
  status: mopDocumentStatusToFormLabel(row.sop.document.status),
  mopId: "",
});

type HistoryState = {
  historyError: string | null;
  currentRecord: MopVersionHistoryCurrentRecord | null;
  archives: MopVersionHistoryArchiveRecord[];
  activeVersionId: string | null;
  isFetching: boolean;
};

type HistoryRowsState = Pick<
  HistoryState,
  "currentRecord" | "archives" | "activeVersionId"
>;

type HistoryAction =
  | { type: "fetchStart" }
  | { type: "fetchSuccess"; payload: HistoryRowsState }
  | { type: "fetchError"; message: string }
  | { type: "resetError" }
  | { type: "setActiveVersionId"; id: string };

const initialHistoryState: HistoryState = {
  historyError: null,
  currentRecord: null,
  archives: [],
  activeVersionId: null,
  isFetching: false,
};

const rowsToHistoryState = (
  rows: CanonicalSopVersionApiRow[],
): HistoryRowsState => {
  const latest = rows.find((row) => row.isLatest === true) ?? null;
  const archives = rows.filter((row) => row.isLatest === false);

  return {
    currentRecord: latest !== null ? toCurrentShim(latest) : null,
    archives: archives.map(toArchiveShim),
    activeVersionId: latest !== null ? canonicalRowToSyntheticId(latest) : null,
  };
};

const historyReducer = (
  state: HistoryState,
  action: HistoryAction,
): HistoryState => {
  if (action.type === "fetchStart") {
    return { ...state, isFetching: true };
  }
  if (action.type === "fetchSuccess") {
    return { ...state, ...action.payload, historyError: null, isFetching: false };
  }
  if (action.type === "fetchError") {
    return {
      ...state,
      historyError: action.message,
      currentRecord: null,
      archives: [],
      activeVersionId: null,
      isFetching: false,
    };
  }
  if (action.type === "setActiveVersionId") {
    return { ...state, activeVersionId: action.id };
  }
  return { ...state, historyError: null };
};

export const useSopVersionHistoryPanel = (
  sopId: string | undefined,
  options: { onSelectCanonicalRow: (row: CanonicalSopVersionApiRow) => void },
) => {
  const { onSelectCanonicalRow } = options;
  const [historyOpen, setHistoryOpen] = useState(false);
  const [state, dispatch] = useReducer(historyReducer, initialHistoryState);
  const { historyError, currentRecord, archives, activeVersionId, isFetching } =
    state;

  const rowMapRef = useRef<Map<string, CanonicalSopVersionApiRow>>(new Map());

  const historyKey =
    sopId !== undefined && sopId.trim() !== "" ? sopId.trim() : "";
  const hasSop = historyKey !== "";
  const historyLoading =
    historyOpen === true && hasSop === true && isFetching === true;

  const runFetch = useCallback((key: string): Promise<void> => {
    return Promise.resolve()
      .then(() => {
        dispatch({ type: "fetchStart" });
        return getSOPVersions(key);
      })
      .then((rows) => {
        const nextMap = new Map<string, CanonicalSopVersionApiRow>();
        for (const row of rows) {
          nextMap.set(canonicalRowToSyntheticId(row), row);
        }
        rowMapRef.current.clear();
        for (const [mapKey, value] of nextMap) {
          rowMapRef.current.set(mapKey, value);
        }
        dispatch({ type: "fetchSuccess", payload: rowsToHistoryState(rows) });
      })
      .catch((err: unknown) => {
        rowMapRef.current.clear();
        dispatch({
          type: "fetchError",
          message:
            err instanceof Error ? err.message : "Could not load version history.",
        });
      });
  }, []);

  useEffect(() => {
    if (historyOpen === false || hasSop === false) {
      return;
    }
    void runFetch(historyKey);
  }, [historyOpen, hasSop, historyKey, runFetch]);

  const refetchVersionHistory = useCallback(() => {
    if (hasSop === false) {
      return Promise.resolve();
    }
    return runFetch(historyKey);
  }, [hasSop, historyKey, runFetch]);

  const resetHistoryPanel = useCallback(() => {
    dispatch({ type: "resetError" });
  }, []);

  const displayVersionCount =
    currentRecord === null ? archives.length : 1 + archives.length;

  const handleLoadVersion = useCallback(
    (record: MopVersionHistoryCurrentRecord | MopVersionHistoryArchiveRecord) => {
      const canonical = rowMapRef.current.get(record._id);
      if (canonical === undefined) {
        return;
      }
      dispatch({ type: "setActiveVersionId", id: record._id });
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

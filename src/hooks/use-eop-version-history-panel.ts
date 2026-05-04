import { useCallback, useState } from "react";

import type {
  MopVersionHistoryArchiveRecord,
  MopVersionHistoryCurrentRecord,
} from "@/types/mop-api";

/** Placeholder until `GET /eop/:id/versions` exists; return shape matches MOP hook for shared UI. */
export const useEopVersionHistoryPanel = (
  _eopId: string | undefined,
): {
  historyOpen: boolean;
  setHistoryOpen: (open: boolean) => void;
  resetHistoryPanel: () => void;
  historyLoading: boolean;
  historyError: string | null;
  currentRecord: MopVersionHistoryCurrentRecord | null;
  archives: MopVersionHistoryArchiveRecord[];
  activeVersionId: string | null;
  versionCount: number;
  handleLoadVersion: (
    record: MopVersionHistoryCurrentRecord | MopVersionHistoryArchiveRecord,
  ) => void;
  refetchVersionHistory: () => Promise<void>;
} => {
  const [historyOpen, setHistoryOpen] = useState(false);

  const resetHistoryPanel = useCallback(() => {}, []);

  const refetchVersionHistory = useCallback(async () => Promise.resolve(), []);

  const handleLoadVersion = useCallback(() => {}, []);

  return {
    historyOpen,
    setHistoryOpen,
    resetHistoryPanel,
    historyLoading: false,
    historyError: null,
    currentRecord: null,
    archives: [],
    activeVersionId: null,
    versionCount: 0,
    handleLoadVersion,
    refetchVersionHistory,
  };
};

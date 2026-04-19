import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { mopService } from "@/services/mop-service";
import type { MopApiRecord, MopArchiveApiRecord } from "@/types/mop-api";

export const useMopVersionHistoryPanel = (mopId?: string) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [currentRecord, setCurrentRecord] = useState<MopApiRecord | null>(null);
  const [archives, setArchives] = useState<MopArchiveApiRecord[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);

  useEffect(() => {
    if (!historyOpen || !mopId) {
      return;
    }
    let cancelled = false;
    setHistoryLoading(true);
    setHistoryError(null);
    void Promise.all([mopService.getById(mopId), mopService.getHistory(mopId)])
      .then(([single, hist]) => {
        if (cancelled) {
          return;
        }
        if (single.success && single.data) {
          setCurrentRecord(single.data);
          setActiveVersionId(single.data._id);
        } else {
          setCurrentRecord(null);
          setActiveVersionId(null);
        }
        setArchives(hist.success ? hist.data : []);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setHistoryError(
            err instanceof Error
              ? err.message
              : "Could not load version history.",
          );
          setCurrentRecord(null);
          setArchives([]);
          setActiveVersionId(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [historyOpen, mopId]);

  const versionCount = (currentRecord ? 1 : 0) + archives.length;

  const handleLoadVersion = (record: MopApiRecord | MopArchiveApiRecord) => {
    setActiveVersionId(record._id);
    toast.info(
      "Version history is read-only here. The editor still uses the mock document until the API is wired to the form.",
    );
  };

  return {
    historyOpen,
    setHistoryOpen,
    historyLoading,
    historyError,
    currentRecord,
    archives,
    activeVersionId,
    versionCount,
    handleLoadVersion,
  };
};

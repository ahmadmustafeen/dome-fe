import type { MOPStatus } from "@/types/mop";
import type { SOP } from "@/types/sop";

export interface CanonicalSopVersionApiRow {
  versionNumber: number;
  isLatest: boolean;
  archivedAt: string | null;
  sop: SOP;
}

export type SopListSummaryRow = {
  sopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  lastModified: string;
};

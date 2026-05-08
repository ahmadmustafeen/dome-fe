import type { EOP } from "@/types/eop";
import type { MOPStatus } from "@/types/mop";

/** One row from `GET /eop/:eopId/versions` (canonical FE EOP). */
export interface CanonicalEopVersionApiRow {
  versionNumber: number;
  isLatest: boolean;
  archivedAt: string | null;
  eop: EOP;
}

export interface CanonicalEopDeleteApiResponse {
  success: boolean;
  message?: string;
  data: {
    liveDeleted: number;
    archiveDeleted: number;
  };
}

/** Row from `GET /eop`; aligned with MOP list for shared table UX. */
export type EopListSummaryRow = {
  eopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  lastModified: string;
};

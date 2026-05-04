import type { MOPStatus } from "@/types/mop";

/** Row from `GET /eop` (when API exists); aligned with MOP list for shared table UX. */
export type EopListSummaryRow = {
  eopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  lastModified: string;
};

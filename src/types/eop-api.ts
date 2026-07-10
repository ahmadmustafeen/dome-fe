import type { EOP } from '@/types/eop';
import type { MOPStatus } from '@/types/mop';

/** One row from `GET /eop/:eopId/versions` (canonical FE EOP). */
export type CanonicalEopVersionApiRow = {
  versionNumber: number;
  isLatest: boolean;
  archivedAt: string | null;
  eop: EOP;
};

export type CanonicalEopDeleteApiResponse = {
  success: boolean;
  message?: string;
  data: {
    liveDeleted: number;
    archiveDeleted: number;
  };
};

/** Row from `GET /eop`; aligned with MOP list for shared table UX. */
export type EopListSummaryRow = {
  eopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  documentVerified?: boolean;
  lastModified: string;
};

export type EopListFilters = {
  status?: MOPStatus;
};

export type EopListQueryParams = {
  siteId?: string;
  search?: string;
  filters?: EopListFilters;
  pageNumber?: number;
  pageSize?: number;
};

export type EopListResult = {
  rows: EopListSummaryRow[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

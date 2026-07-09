import type { MOP, MOPStatus } from '@/types/mop';
import type { MopStatus } from '@/types/mop-form';

/** One row from `GET /mop/:mopId/versions` (canonical FE MOP). */
export type CanonicalMopVersionApiRow = {
  versionNumber: number;
  isLatest: boolean;
  archivedAt: string | null;
  mop: MOP;
};

export type CanonicalMopDeleteApiResponse = {
  success: boolean;
  message?: string;
  data: {
    liveDeleted: number;
    archiveDeleted: number;
  };
};

/** Row from `GET /mop` */
export type MopListSummaryRow = {
  mopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  lastModified: string;
};

export type MopListFilters = {
  status?: MOPStatus;
};

export type MopListQueryParams = {
  siteId?: string;
  search?: string;
  filters?: MopListFilters;
  pageNumber?: number;
  pageSize?: number;
};

export type MopListResult = {
  rows: MopListSummaryRow[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

/** Minimal row for version history drawer (derived from canonical API). */
export type MopVersionHistoryCurrentRecord = {
  _id: string;
  versionNumber: string;
  status: MopStatus;
  updatedAt: string;
};

export type MopVersionHistoryArchiveRecord = MopVersionHistoryCurrentRecord & {
  archivedAt: string;
  mopId: string;
};

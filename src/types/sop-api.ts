import type { MOPStatus } from '@/types/mop';
import type { SOP } from '@/types/sop';

export type CanonicalSopVersionApiRow = {
  versionNumber: number;
  isLatest: boolean;
  archivedAt: string | null;
  sop: SOP;
};

export type SopListSummaryRow = {
  sopId: string;
  title: string;
  assetName: string;
  versionNumber: number;
  status: MOPStatus;
  lastModified: string;
};

export type SopListFilters = {
  status?: MOPStatus;
};

export type SopListQueryParams = {
  siteId?: string;
  search?: string;
  filters?: SopListFilters;
  pageNumber?: number;
  pageSize?: number;
};

export type SopListResult = {
  rows: SopListSummaryRow[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type CanonicalSopDeleteApiResponse = {
  success: boolean;
  message?: string;
  data: {
    liveDeleted: number;
    archiveDeleted: number;
  };
};

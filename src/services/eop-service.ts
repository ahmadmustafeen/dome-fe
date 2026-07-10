import type { EOP } from '@/types/eop';
import type {
  CanonicalEopDeleteApiResponse,
  CanonicalEopVersionApiRow,
  EopListQueryParams,
  EopListResult,
  EopListSummaryRow,
} from '@/types/eop-api';
import { apiFetch } from '@/libs/fetcher';

type ApiSuccessEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type EopListApiData
  = | EopListSummaryRow[]
    | {
      eops?: EopListSummaryRow[];
      rows?: EopListSummaryRow[];
      data?: EopListSummaryRow[];
      total?: number;
      totalCount?: number;
      page?: number;
      pageNumber?: number;
      limit?: number;
      pageSize?: number;
      totalPages?: number;
    };

const NOT_FOUND_RE = /\bnot found\b/i;

const unwrapEnvelope = <T>(body: ApiSuccessEnvelope<T>): T => {
  if (body.success !== true) {
    throw new Error(body.message ?? 'Request failed');
  }
  if (body.data === undefined) {
    throw new Error(body.message ?? 'Response missing data');
  }
  return body.data;
};

const unwrapData = async <T>(
  promise: Promise<ApiSuccessEnvelope<T>>,
): Promise<T> => {
  const body = await promise;
  return unwrapEnvelope(body);
};

const isNotFoundError = (err: unknown): boolean =>
  err instanceof Error && NOT_FOUND_RE.test(err.message);

const normalizeEopListResult = (
  data: EopListApiData,
  fallbackPageNumber: number,
  fallbackPageSize: number,
): EopListResult => {
  if (Array.isArray(data)) {
    return {
      rows: data,
      totalCount: data.length,
      pageNumber: fallbackPageNumber,
      pageSize: fallbackPageSize,
      totalPages: Math.max(1, Math.ceil(data.length / fallbackPageSize)),
    };
  }

  const rows = data.eops ?? data.rows ?? data.data ?? [];
  const totalCount = data.totalCount ?? data.total ?? rows.length;
  const pageSize = data.pageSize ?? data.limit ?? fallbackPageSize;

  return {
    rows,
    totalCount,
    pageNumber: data.pageNumber ?? data.page ?? fallbackPageNumber,
    pageSize,
    totalPages: data.totalPages ?? Math.max(1, Math.ceil(totalCount / pageSize)),
  };
};

export const generateEOP = async (): Promise<EOP> => {
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<EOP>>('/eop/generate', { method: 'GET' }),
  );
};

export const getLatestEOP = async (eopId: string): Promise<EOP | null> => {
  const segment = encodeURIComponent(eopId.trim());
  try {
    return await unwrapData(
      apiFetch<ApiSuccessEnvelope<EOP>>(`/eop/${segment}`, { method: 'GET' }),
    );
  } catch (err: unknown) {
    return isNotFoundError(err) ? null : Promise.reject(err);
  }
};

export const saveEOP = async (eop: EOP, eopId: string, siteId?: string, documentId?: string): Promise<EOP> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<EOP>>(`/eop/${segment}`, {
      method: 'PUT',
      body: JSON.stringify({ ...eop, siteId, documentId }),
    }),
  );
};

export const getEOPVersions = async (
  eopId: string,
): Promise<CanonicalEopVersionApiRow[]> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalEopVersionApiRow[]>>(
      `/eop/${segment}/versions`,
      { method: 'GET' },
    ),
  );
};

export const deleteCanonicalEOP = async (
  eopId: string,
): Promise<CanonicalEopDeleteApiResponse['data']> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<CanonicalEopDeleteApiResponse>(`/eop/${segment}`, {
      method: 'DELETE',
    }),
  );
};

export const verifyEOPDocument = async (eopId: string): Promise<void> => {
  const segment = encodeURIComponent(eopId.trim());
  const body = await apiFetch<ApiSuccessEnvelope<unknown>>(`/eop/${segment}/verify`, {
    method: 'PUT',
  });

  if (body.success !== true) {
    throw new Error(body.message ?? 'Failed to verify EOP.');
  }
};

export const getEOPList = async (
  params?: EopListQueryParams,
): Promise<EopListResult> => {
  const pageNumber = params?.pageNumber ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const query = new URLSearchParams({
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });

  if (params?.siteId !== undefined && params.siteId.trim() !== '') {
    query.set('siteId', params.siteId.trim());
  }
  if (params?.search !== undefined && params.search.trim() !== '') {
    query.set('search', params.search.trim());
  }
  if (params?.filters !== undefined && Object.keys(params.filters).length > 0) {
    query.set('filters', JSON.stringify(params.filters));
  }

  const data = await unwrapData(
    apiFetch<ApiSuccessEnvelope<EopListApiData>>(`/eop?${query.toString()}`, { method: 'GET' }),
  );
  return normalizeEopListResult(data, pageNumber, pageSize);
};

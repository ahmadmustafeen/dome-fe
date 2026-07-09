import type { SOP } from '@/types/sop';
import type {
  CanonicalSopDeleteApiResponse,
  CanonicalSopVersionApiRow,
  SopListQueryParams,
  SopListResult,
  SopListSummaryRow,
} from '@/types/sop-api';
import { apiFetch } from '@/libs/fetcher';

type ApiSuccessEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type SopListApiData
  = | SopListSummaryRow[]
    | {
      sops?: SopListSummaryRow[];
      rows?: SopListSummaryRow[];
      data?: SopListSummaryRow[];
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

const normalizeSopListResult = (
  data: SopListApiData,
  fallbackPageNumber: number,
  fallbackPageSize: number,
): SopListResult => {
  if (Array.isArray(data)) {
    return {
      rows: data,
      totalCount: data.length,
      pageNumber: fallbackPageNumber,
      pageSize: fallbackPageSize,
      totalPages: Math.max(1, Math.ceil(data.length / fallbackPageSize)),
    };
  }

  const rows = data.sops ?? data.rows ?? data.data ?? [];
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

/** Server may omit `id` until first save (`GET /sop/generate`). */
type SopApiPayload = Omit<SOP, 'id'> & { id?: string };

const asSOP = (data: SopApiPayload): SOP => ({
  ...data,
  id: typeof data.id === 'string' && data.id.trim() !== '' ? data.id.trim() : '',
});

export const generateSOP = async (): Promise<SOP> => {
  const payload = await unwrapData(
    apiFetch<ApiSuccessEnvelope<SopApiPayload>>('/sop/generate', { method: 'GET' }),
  );
  return asSOP(payload);
};

export const getLatestSOP = async (sopId: string): Promise<SOP | null> => {
  const segment = encodeURIComponent(sopId.trim());
  try {
    const payload = await unwrapData(
      apiFetch<ApiSuccessEnvelope<SopApiPayload>>(`/sop/${segment}`, {
        method: 'GET',
      }),
    );
    return asSOP(payload);
  } catch (err: unknown) {
    return isNotFoundError(err) ? null : Promise.reject(err);
  }
};

export const saveSOP = async (sop: SOP, sopId: string, siteId?: string, documentId?: string): Promise<SOP> => {
  const segment = encodeURIComponent(sopId.trim());
  const payload = await unwrapData(
    apiFetch<ApiSuccessEnvelope<SopApiPayload>>(`/sop/${segment}`, {
      method: 'PUT',
      body: JSON.stringify({ ...sop, siteId, documentId }),
    }),
  );
  return asSOP(payload);
};

export const createSOP = async (sop: SOP): Promise<SOP> =>
  saveSOP(sop, 'new');

export const getSOPVersions = async (
  sopId: string,
): Promise<CanonicalSopVersionApiRow[]> => {
  const segment = encodeURIComponent(sopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalSopVersionApiRow[]>>(
      `/sop/${segment}/versions`,
      { method: 'GET' },
    ),
  );
};

export const deleteCanonicalSOP = async (
  sopId: string,
): Promise<CanonicalSopDeleteApiResponse['data']> => {
  const segment = encodeURIComponent(sopId.trim());
  return unwrapData(
    apiFetch<CanonicalSopDeleteApiResponse>(`/sop/${segment}`, {
      method: 'DELETE',
    }),
  );
};

export const getSOPList = async (
  params?: SopListQueryParams,
): Promise<SopListResult> => {
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
    apiFetch<ApiSuccessEnvelope<SopListApiData>>(`/sop?${query.toString()}`, {
      method: 'GET',
    }),
  );
  return normalizeSopListResult(data, pageNumber, pageSize);
};

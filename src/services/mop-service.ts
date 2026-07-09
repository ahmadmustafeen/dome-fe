import type { MOP } from '@/types/mop';
import type {
  CanonicalMopDeleteApiResponse,
  CanonicalMopVersionApiRow,
  MopListQueryParams,
  MopListResult,
  MopListSummaryRow,
} from '@/types/mop-api';
import { apiFetch } from '@/libs/fetcher';

type ApiSuccessEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type MopListApiData
  = | MopListSummaryRow[]
    | {
      mops?: MopListSummaryRow[];
      rows?: MopListSummaryRow[];
      data?: MopListSummaryRow[];
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

const unwrapData = async <T>(promise: Promise<ApiSuccessEnvelope<T>>): Promise<T> => {
  const body = await promise;
  return unwrapEnvelope(body);
};

const isNotFoundError = (err: unknown): boolean =>
  err instanceof Error && NOT_FOUND_RE.test(err.message);

const normalizeMopListResult = (
  data: MopListApiData,
  fallbackPageNumber: number,
  fallbackPageSize: number,
): MopListResult => {
  if (Array.isArray(data)) {
    return {
      rows: data,
      totalCount: data.length,
      pageNumber: fallbackPageNumber,
      pageSize: fallbackPageSize,
      totalPages: Math.max(1, Math.ceil(data.length / fallbackPageSize)),
    };
  }

  const rows = data.mops ?? data.rows ?? data.data ?? [];
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

export async function generateMOP(data: any): Promise<MOP> {
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<MOP>>('/mop/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  );
}

export async function getLatestMOP(mopId: string): Promise<MOP | null> {
  const segment = encodeURIComponent(mopId.trim());
  try {
    return await unwrapData(
      apiFetch<ApiSuccessEnvelope<MOP>>(`/mop/${segment}`, {
        method: 'GET',
      }),
    );
  } catch (e: unknown) {
    return isNotFoundError(e) ? null : Promise.reject(e);
  }
}

export async function saveMOP(mop: MOP, mopId: string, documentId?: string, siteId?: string): Promise<MOP> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<MOP>>(`/mop/${segment}`, {
      method: 'PUT',
      body: JSON.stringify({ ...mop, documentId, siteId }),
    }),
  );
}

export async function getMOPVersions(mopId: string): Promise<CanonicalMopVersionApiRow[]> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalMopVersionApiRow[]>>(`/mop/${segment}/versions`, {
      method: 'GET',
    }),
  );
}

export async function deleteCanonicalMOP(
  mopId: string,
): Promise<CanonicalMopDeleteApiResponse['data']> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<CanonicalMopDeleteApiResponse>(`/mop/${segment}`, {
      method: 'DELETE',
    }),
  );
}

export async function getMOPList(params?: MopListQueryParams): Promise<MopListResult> {
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
    apiFetch<ApiSuccessEnvelope<MopListApiData>>(`/mop?${query.toString()}`, {
      method: 'GET',
    }),
  );
  return normalizeMopListResult(data, pageNumber, pageSize);
}

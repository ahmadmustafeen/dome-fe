import { apiFetch } from "@/libs/fetcher";
import type { EOP } from "@/types/eop";
import type {
  CanonicalEopDeleteApiResponse,
  CanonicalEopVersionApiRow,
  EopListSummaryRow,
} from "@/types/eop-api";

type ApiSuccessEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const unwrapEnvelope = <T>(body: ApiSuccessEnvelope<T>): T => {
  if (body.success !== true) {
    throw new Error(body.message ?? "Request failed");
  }
  if (body.data === undefined) {
    throw new Error(body.message ?? "Response missing data");
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
  err instanceof Error && /\bnot found\b/i.test(err.message);

export const generateEOP = async (): Promise<EOP> => {
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<EOP>>("/eop/generate", { method: "GET" }),
  );
};

export const getLatestEOP = async (eopId: string): Promise<EOP | null> => {
  const segment = encodeURIComponent(eopId.trim());
  try {
    return await unwrapData(
      apiFetch<ApiSuccessEnvelope<EOP>>(`/eop/${segment}`, { method: "GET" }),
    );
  } catch (err: unknown) {
    return isNotFoundError(err) ? null : Promise.reject(err);
  }
};

export const saveEOP = async (eop: EOP, eopId: string): Promise<EOP> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<EOP>>(`/eop/${segment}`, {
      method: "PUT",
      body: JSON.stringify(eop),
    }),
  );
};

export const createEOP = async (eop: EOP): Promise<EOP> => {
  return saveEOP(eop, "new");
};

export const getEOPVersions = async (
  eopId: string,
): Promise<CanonicalEopVersionApiRow[]> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalEopVersionApiRow[]>>(
      `/eop/${segment}/versions`,
      { method: "GET" },
    ),
  );
};

export const deleteCanonicalEOP = async (
  eopId: string,
): Promise<CanonicalEopDeleteApiResponse["data"]> => {
  const segment = encodeURIComponent(eopId.trim());
  return unwrapData(
    apiFetch<CanonicalEopDeleteApiResponse>(`/eop/${segment}`, {
      method: "DELETE",
    }),
  );
};

export const getEOPList = async (
  siteId?: string,
): Promise<EopListSummaryRow[]> => {
  const url =
    siteId !== undefined && siteId.trim() !== ""
      ? `/eop?siteId=${encodeURIComponent(siteId.trim())}`
      : "/eop";
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<EopListSummaryRow[]>>(url, { method: "GET" }),
  );
};

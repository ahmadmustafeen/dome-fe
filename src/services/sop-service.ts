import { apiFetch } from "@/libs/fetcher";
import type { SOP } from "@/types/sop";
import type {
  CanonicalSopDeleteApiResponse,
  CanonicalSopVersionApiRow,
  SopListSummaryRow,
} from "@/types/sop-api";

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

/** Server may omit `id` until first save (`GET /sop/generate`). */
type SopApiPayload = Omit<SOP, "id"> & { id?: string };

const asSOP = (data: SopApiPayload): SOP => ({
  ...data,
  id: typeof data.id === "string" && data.id.trim() !== "" ? data.id.trim() : "",
});

export const generateSOP = async (): Promise<SOP> => {
  const payload = await unwrapData(
    apiFetch<ApiSuccessEnvelope<SopApiPayload>>("/sop/generate", { method: "GET" }),
  );
  return asSOP(payload);
};

export const getLatestSOP = async (sopId: string): Promise<SOP | null> => {
  const segment = encodeURIComponent(sopId.trim());
  try {
    const payload = await unwrapData(
      apiFetch<ApiSuccessEnvelope<SopApiPayload>>(`/sop/${segment}`, {
        method: "GET",
      }),
    );
    return asSOP(payload);
  } catch (err: unknown) {
    return isNotFoundError(err) ? null : Promise.reject(err);
  }
};

export const saveSOP = async (sop: SOP, sopId: string): Promise<SOP> => {
  const segment = encodeURIComponent(sopId.trim());
  const payload = await unwrapData(
    apiFetch<ApiSuccessEnvelope<SopApiPayload>>(`/sop/${segment}`, {
      method: "PUT",
      body: JSON.stringify(sop),
    }),
  );
  return asSOP(payload);
};

export const createSOP = async (sop: SOP): Promise<SOP> =>
  saveSOP(sop, "new");

export const getSOPVersions = async (
  sopId: string,
): Promise<CanonicalSopVersionApiRow[]> => {
  const segment = encodeURIComponent(sopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalSopVersionApiRow[]>>(
      `/sop/${segment}/versions`,
      { method: "GET" },
    ),
  );
};

export const deleteCanonicalSOP = async (
  sopId: string,
): Promise<CanonicalSopDeleteApiResponse["data"]> => {
  const segment = encodeURIComponent(sopId.trim());
  return unwrapData(
    apiFetch<CanonicalSopDeleteApiResponse>(`/sop/${segment}`, {
      method: "DELETE",
    }),
  );
};

export const getSOPList = async (
  siteId?: string,
): Promise<SopListSummaryRow[]> => {
  const url =
    siteId !== undefined && siteId.trim() !== ""
      ? `/sop?siteId=${encodeURIComponent(siteId.trim())}`
      : "/sop";
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<SopListSummaryRow[]>>(url, {
      method: "GET",
    }),
  );
};

import { apiFetch } from "@/libs/fetcher";
import type { MOP } from "@/types/mop";
import type {
  CanonicalMopDeleteApiResponse,
  CanonicalMopVersionApiRow,
  MopListSummaryRow,
} from "@/types/mop-api";

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

const unwrapData = async <T>(promise: Promise<ApiSuccessEnvelope<T>>): Promise<T> => {
  const body = await promise;
  return unwrapEnvelope(body);
};

const isNotFoundError = (err: unknown): boolean =>
  err instanceof Error && /\bnot found\b/i.test(err.message);

export async function generateMOP(): Promise<MOP> {
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<MOP>>("/mop/generate", {
      method: "GET",
    }),
  );
}

export async function getLatestMOP(mopId: string): Promise<MOP | null> {
  const segment = encodeURIComponent(mopId.trim());
  try {
    return await unwrapData(
      apiFetch<ApiSuccessEnvelope<MOP>>(`/mop/${segment}`, {
        method: "GET",
      }),
    );
  } catch (e: unknown) {
    return isNotFoundError(e) ? null : Promise.reject(e);
  }
}

export async function saveMOP(mop: MOP, mopId: string): Promise<MOP> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<MOP>>(`/mop/${segment}`, {
      method: "PUT",
      body: JSON.stringify(mop),
    }),
  );
}

export async function getMOPVersions(mopId: string): Promise<CanonicalMopVersionApiRow[]> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<CanonicalMopVersionApiRow[]>>(`/mop/${segment}/versions`, {
      method: "GET",
    }),
  );
}

export async function deleteCanonicalMOP(
  mopId: string,
): Promise<CanonicalMopDeleteApiResponse["data"]> {
  const segment = encodeURIComponent(mopId.trim());
  return unwrapData(
    apiFetch<CanonicalMopDeleteApiResponse>(`/mop/${segment}`, {
      method: "DELETE",
    }),
  );
}

export async function getMOPList(siteId?: string): Promise<MopListSummaryRow[]> {
  const url =
    siteId !== undefined && siteId.trim() !== ""
      ? `/mop?siteId=${encodeURIComponent(siteId.trim())}`
      : "/mop";
  return unwrapData(
    apiFetch<ApiSuccessEnvelope<MopListSummaryRow[]>>(url, {
      method: "GET",
    }),
  );
}

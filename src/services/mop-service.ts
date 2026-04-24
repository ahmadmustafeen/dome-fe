import { apiFetch } from "@/libs/fetcher";
import type {
  MopCreateInput,
  MopDeleteApiResponse,
  MopHistoryApiResponse,
  MopListApiResponse,
  MopSingleApiResponse,
  MopUpdateInput,
} from "@/types/mop-api";

export type MopQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const mopService = {
  getAll: (siteId: string, params?: MopQueryParams) => {
    const query = new URLSearchParams({
      siteId,
      page: String(params?.page ?? 1),
      limit: String(params?.limit ?? 20),
    });
    if (params?.search) {
      query.set("search", params.search);
    }
    return apiFetch<MopListApiResponse>(`/mop?${query.toString()}`, {
      method: "GET",
    });
  },

  getById: (id: string) =>
    apiFetch<MopSingleApiResponse>(`/mop/${id}`, { method: "GET" }),

  create: (payload: MopCreateInput) =>
    apiFetch<MopSingleApiResponse>("/mop", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: MopUpdateInput) =>
    apiFetch<MopSingleApiResponse>(`/mop/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  getHistory: (id: string) =>
    apiFetch<MopHistoryApiResponse>(`/mop/${id}/history`, { method: "GET" }),

  remove: (id: string) =>
    apiFetch<MopDeleteApiResponse>(`/mop/${id}`, { method: "DELETE" }),
};

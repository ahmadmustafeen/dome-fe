import type { AssetPayload } from "@/types/payload";
import { apiFetch } from "@/libs/fetcher";

export const assetService = {
  getAllAssets: () =>
    apiFetch("/assets", {
      method: "GET",
    }),
  getAllAssetsBySiteId: (
    id: string,
    params?: {
      page?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    },
  ) => {
    const query = new URLSearchParams({ page: String(params?.page || 1) });
    if (params?.search) {
      query.set("search", params.search);
    }
    if (params?.sortBy) {
      query.set("sortBy", params.sortBy);
    }
    if (params?.sortOrder) {
      query.set("sortOrder", params.sortOrder);
    }
    return apiFetch(`/assets/site/${id}?${query.toString()}`, {
      method: "GET",
    });
  },
  getAllAssetsByCategoryAndSubCategory: (
    category: string,
    subCategory: string,
  ) => {
    return apiFetch(`/assets/fetchByCategoryAndSubCategory`, {
      method: "POST",
      body: JSON.stringify({
        category: category,
        subCategory: subCategory,
      }),
    },);
  },
  getAllInvalidAssetsBySiteId: (
    id: string,
    params?: {
      page?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    },
  ) => {
    const query = new URLSearchParams({ page: String(params?.page || 1) });
    if (params?.search) {
      query.set("search", params.search);
    }
    if (params?.sortBy) {
      query.set("sortBy", params.sortBy);
    }
    if (params?.sortOrder) {
      query.set("sortOrder", params.sortOrder);
    }
    return apiFetch(`/assets/site/invalid/${id}?${query.toString()}`, {
      method: "GET",
    });
  },

  createAsset: (data: AssetPayload) =>
    apiFetch("/assets", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAsset: (id: string, data: FormData) =>
    apiFetch(`/assets/${id}`, {
      method: "PUT",
      body: data,
    }),

  deleteBulkAsset: (data: { ids: string[] }) =>
    apiFetch("/assets/delete-many", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteAsset: (id: string) =>
    apiFetch(`/assets/${id}`, {
      method: "DELETE",
    }),

  uploadAssets: (siteId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch(`/assets/site/${siteId}/upload`, {
      method: "POST",
      body: formData,
    });
  },
};

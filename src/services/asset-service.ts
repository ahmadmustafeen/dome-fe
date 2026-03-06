import { apiFetch } from "@/libs/fetcher"
import { AssetPayload } from "@/types/payload"


export const assetService = {
  getAllAssets: () =>
    apiFetch('/assets', {
      method: 'GET',
    }),
  getAllAssetsBySiteId: (id: string, page?: number) =>
    apiFetch(`/assets/site/${id}?page=${page || 1}`, {
      method: 'GET',
    }),
  getAllInvalidAssetsBySiteId: (id: string, page?: number) =>
    apiFetch(`/assets/site/invalid/${id}?page=${page || 1}`, {
      method: 'GET',
    }),

  createAsset: (data: AssetPayload) =>
    apiFetch('/assets', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAsset: (id: string, data: FormData) =>
    apiFetch(`/assets/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteBulkAsset: (data: { ids: string[] }) =>
    apiFetch('/assets/delete-many', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteAsset: (id: string) =>
    apiFetch(`/assets/${id}`, {
      method: 'DELETE',
    }),

  uploadAssets: (siteId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch(`/assets/site/${siteId}/upload`, {
      method: 'POST',
      body: formData,
    });
  },
}
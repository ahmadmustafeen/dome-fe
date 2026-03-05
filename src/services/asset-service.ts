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
  getAllInvalidAssetsBySiteId: (id: string) =>
    apiFetch(`/assets/site/invalid/${id}`, {
      method: 'GET',
    }),

  createAsset: (data: AssetPayload) =>
    apiFetch('/assets', {
      method: 'POST',
      body: JSON.stringify(data),
    }),


  updateAsset: (id: string, data: AssetPayload) =>
    apiFetch(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteAsset: (id: string) =>
    apiFetch(`/assets/${id}`, {
      method: 'DELETE',
    }),
}
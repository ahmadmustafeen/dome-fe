import type { AssetPayload } from '@/types/payload';
import { BASE_URL } from '@/constants/api';
import { apiFetch } from '@/libs/fetcher';

const fetchAssetDownload = async (endpoint: string): Promise<Blob> => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    method: 'GET',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.blob();
};

export const assetService = {
  getAllAssets: () =>
    apiFetch('/assets', {
      method: 'GET',
    }),
  getAllAssetsBySiteId: (
    id: string,
    params?: {
      page?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
  ) => {
    const query = new URLSearchParams({ page: String(params?.page || 1) });
    if (params?.search) {
      query.set('search', params.search);
    }
    if (params?.sortBy) {
      query.set('sortBy', params.sortBy);
    }
    if (params?.sortOrder) {
      query.set('sortOrder', params.sortOrder);
    }
    return apiFetch(`/assets/site/${id}?${query.toString()}`, {
      method: 'GET',
    });
  },
  getAllAssetsByCategoryAndSubCategory: (
    category: string,
    subCategory: string,
    make: string,
    siteId: string,
    currentPage: number,
    pageSize: number,
    searchQuery?: string,
  ) => {
    return apiFetch(`/assets/fetchByCategoryAndSubCategory`, {
      method: 'POST',
      body: JSON.stringify({
        category,
        subCategory,
        make,
        siteId,
        currentPage,
        pageSize,
        searchQuery,
      }),
    });
  },
  getAllInvalidAssetsBySiteId: (
    id: string,
    params?: {
      page?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
  ) => {
    const query = new URLSearchParams({ page: String(params?.page || 1) });
    if (params?.search) {
      query.set('search', params.search);
    }
    if (params?.sortBy) {
      query.set('sortBy', params.sortBy);
    }
    if (params?.sortOrder) {
      query.set('sortOrder', params.sortOrder);
    }
    return apiFetch(`/assets/site/invalid/${id}?${query.toString()}`, {
      method: 'GET',
    });
  },

  downloadAssetsBySiteId: (siteId: string) =>
    fetchAssetDownload(`/assets/site/${siteId}/download`),

  downloadInvalidAssetsBySiteId: (siteId: string) =>
    fetchAssetDownload(`/assets/site/invalid/${siteId}/download`),

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

  clearAssetsBySiteAndClient: (siteId: string, clientId: string) => {
    const query = new URLSearchParams({ siteId, clientId });
    return apiFetch(`/assets/clear?${query.toString()}`, {
      method: 'DELETE',
    });
  },

  deleteAsset: (id: string) =>
    apiFetch(`/assets/${id}`, {
      method: 'DELETE',
    }),

  uploadAssets: (siteId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiFetch(`/assets/site/${siteId}/upload`, {
      method: 'POST',
      body: formData,
    });
  },
};

import { apiFetch } from "@/libs/fetcher";
import type {
  DocumentApiRecord,
  DocumentCreateApiResponse,
  DocumentDeleteApiResponse,
  DocumentListApiResponse,
} from "@/types/document";

export type DocumentQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const documentService = {
  /**
   * GET /api/documents/site/:siteId
   * @param siteId - MongoDB site ID
   * @param params - optional query parameters
   */
  getDocumentsBySiteId: (siteId: string, params?: DocumentQueryParams) => {
    const query = new URLSearchParams({
      page: String(params?.page ?? 1),
      limit: String(params?.limit ?? 10),
    });
    if (params?.search) {
      query.set("search", params.search);
    }
    if (params?.sortBy) {
      query.set("sortBy", params.sortBy);
    }
    if (params?.sortOrder) {
      query.set("sortOrder", params.sortOrder);
    }
    return apiFetch<DocumentListApiResponse>(
      `/documents/site/${siteId}?${query.toString()}`,
      { method: "GET" },
    );
  },

  createDocument: (siteId: string, type: string, file: File) => {
    const formData = new FormData();
    formData.append("siteId", siteId);
    formData.append("type", type);
    formData.append("file", file);
    return apiFetch<DocumentCreateApiResponse>("/documents/create", {
      method: "POST",
      body: formData,
    });
  },

  deleteDocument: (id: string) =>
    apiFetch<DocumentDeleteApiResponse>(`/documents/${id}`, {
      method: "DELETE",
    }),

  deleteBulkDocuments: (ids: string[]) =>
    apiFetch<DocumentDeleteApiResponse>("/documents/delete-many", {
      method: "POST",
      body: JSON.stringify({ ids }),
    }),
};

// Re-export the API record type so callers can import from one place
export type { DocumentApiRecord };

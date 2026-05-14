import { apiFetch } from "@/libs/fetcher";
import type {
  DocumentApiRecord,
  DocumentCreateApiResponse,
  DocumentDeleteApiResponse,
  DocumentListApiResponse,
  GeneratedDocumentCreateApiResponse,
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

  getRagDocuments: (params?: DocumentQueryParams) => {
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
      `/documents/rag?${query.toString()}`,
      { method: "GET" },
    );
  },

  getApprovedDocumentsBySiteId: (siteId: string) => {

    return apiFetch<DocumentListApiResponse>(
      `/documents/site/approved/${siteId}`,
      { method: "GET" },
    );
  },

  getApprovedRagDocuments: () => {

    return apiFetch<DocumentListApiResponse>(
      '/documents/site/approved-rag/',
      { method: "GET" },
    );
  },

  createDocument: (
    siteId: string,
    type: string,
    file: File,
    clientId?: string,
  ) => {
    const formData = new FormData();
    formData.append("siteId", siteId);
    if (clientId) {
      formData.append("clientId", clientId);
    }
    formData.append("type", type);
    formData.append("file", file);
    return apiFetch<DocumentCreateApiResponse>("/documents/create", {
      method: "POST",
      body: formData,
    });
  },

  ingestDocument: (documentId: string, type: string, file: File, clientId?: string, siteId?: string) => {
    const formData = new FormData();
    if (clientId) {
      formData.append("clientId", clientId);
    }
    formData.append("type", type);
    formData.append("documentType", type);
    formData.append("file", file);
    return apiFetch<DocumentCreateApiResponse>(`/company-policy/ingest/${documentId}/${clientId}/${siteId}`, {
      method: "POST",
      body: formData,
    })
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

  fetchIngestedDocument: (id: string) =>
    apiFetch<GeneratedDocumentCreateApiResponse>(`/documents/fetch-extracted-data/${id}`, {
      method: "GET",
    }),

  updateIngestedDocument: (id: string, body: any) =>
    apiFetch<GeneratedDocumentCreateApiResponse>(`/documents/update-extracted-data/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    }),
};

// Re-export the API record type so callers can import from one place
export type { DocumentApiRecord };

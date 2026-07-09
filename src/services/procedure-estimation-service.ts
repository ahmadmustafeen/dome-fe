import { apiFetch } from "@/libs/fetcher";
import { ProcedureEstimationApiResponse } from "@/types/procedure-estimation";
// import { DocumentApiRecord } from "./document-service";
// import type {
//   DocumentApiRecord,
//   DocumentCreateApiResponse,
//   DocumentDeleteApiResponse,
//   DocumentListApiResponse,
// } from "@/types/document";

// export type DocumentQueryParams = {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// };

export const procedureEstimationService = {
  /**
   * GET /api/documents/site/:siteId
   * @param siteId - MongoDB site ID
   * @param params - optional query parameters
   */
  getProcedureEstimationBySiteId: (siteId: string) => {
    return apiFetch<ProcedureEstimationApiResponse>(
      `/maintenance-schedule/fetch/${siteId}`,
      { method: "GET" },
    );
  },

  generateProcedureEstimation: (siteId: string) => {
    return apiFetch<ProcedureEstimationApiResponse>(
      `/maintenance-schedule/generate/${siteId}`,
      { method: "GET" },
    );
  },
    clearProcedureEstimationBySiteId: (siteId: string) => {
    return apiFetch<ProcedureEstimationApiResponse>(
      `/maintenance-schedule/clear/${siteId}`,
      { method: "DELETE" },
    );
  },

  // createDocument: (siteId: string, type: string, file: File) => {
  //   const formData = new FormData();
  //   formData.append("siteId", siteId);
  //   formData.append("type", type);
  //   formData.append("file", file);
  //   return apiFetch<DocumentCreateApiResponse>("/documents/create", {
  //     method: "POST",
  //     body: formData,
  //   });
  // },

  // deleteDocument: (id: string) =>
  //   apiFetch<DocumentDeleteApiResponse>(`/documents/${id}`, {
  //     method: "DELETE",
  //   }),

  // deleteBulkDocuments: (ids: string[]) =>
  //   apiFetch<DocumentDeleteApiResponse>("/documents/delete-many", {
  //     method: "POST",
  //     body: JSON.stringify({ ids }),
  //   }),
};




// Re-export the API record type so callers can import from one place
// export type { DocumentApiRecord };

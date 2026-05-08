import { apiFetch } from "@/libs/fetcher";
import type {
  DocumentCreateApiResponse,
} from "@/types/document";



export type DocumentQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const generatedDocumentService = {
  /**
   * GET /api/documents/site/:siteId
   * @param siteId - MongoDB site ID
   * @param params - optional query parameters
   */

  createGeneratedDocument: (pdId: string, pdType: string, assetId: string, siteId: string) => {
    const data = {
      pdId,
      pdType,
      assetId,
      siteId
    }
    return apiFetch<{
      data: {
        _id: string;
        mopId?: string;
      }
    }>("generatedDocument/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
}
// ─────────────────────────────────────────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────────────────────────────────────────

export type DocumentType =
  | "Asset Maintenance and Service Documents"
  | "Asset Manuals and Diagrams"
  | "Site Diagrams and Documents"
  | "Outdated MOPs, SOPs and EOPs"
  | "Company Policies and Documents"
  | "Asset List";

export interface DocumentApiRecord {
  _id: string;
  type: string;
  /** Publicly accessible S3 URL of the uploaded file. */
  documentUrl: string;
  siteId: string;
  ingested: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// API response wrappers
// ─────────────────────────────────────────────────────────────────────────────

export interface DocumentListApiResponse {
  success: boolean;
  data: {
    documents: DocumentApiRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


export interface DocumentCreateApiResponse {
  success: boolean;
  message: string;
  data: DocumentApiRecord;
}

export interface DocumentDeleteApiResponse {
  success: boolean;
  message: string;
}

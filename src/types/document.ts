// ─────────────────────────────────────────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────────────────────────────────────────

export type DocumentType =
  | "Asset Maintenance and Service Documents"
  // | "Asset Manuals"
  | "Site Diagrams and Documents"
  | 'Site Policies'
  | 'Site Documents'
  | 'Basis of design'
  | 'Approved submittal'
  | "Company Policies and Documents"
  | 'Electrical One-Line Diagram'
  | 'Mechanical One-Line Diagram'


export interface DocumentApiRecord {
  _id: string;
  type: string;
  /** Publicly accessible S3 URL of the uploaded file. */
  documentUrl: string;
  siteId: string;
  ingested: boolean;
  verified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedDocumentApiRecord {
  _id: string;
  type: string;
  /** Publicly accessible S3 URL of the uploaded file. */
  documentUrl: string;
  siteId: string;
  ingested: boolean;
  verified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  extraction: any;
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

export interface GeneratedDocumentCreateApiResponse {
  success: boolean;
  message: string;
  data: GeneratedDocumentApiRecord;
}

export interface DocumentDeleteApiResponse {
  success: boolean;
  message: string;
}

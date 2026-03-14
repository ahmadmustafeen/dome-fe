// Document Management Types

/** The six allowed document categories. */
export type DocumentType =
  | "Asset Maintenance and Service Documents"
  | "Asset Manuals and Diagrams"
  | "Site Diagrams and Documents"
  | "Outdated MOPs, SOPs and EOPs"
  | "Company Policies and Documents"
  | "Asset List";

/** Accepted file extensions. */
export type DocumentFileExtension =
  | "pdf"
  | "doc"
  | "docx"
  | "txt"
  | "png"
  | "jpg"
  | "jpeg";

/**
 * A single document record as returned by the API.
 * Maps to the MongoDB document schema on the backend.
 */
export interface DocumentRecord {
  /** MongoDB _id string. */
  id: string;
  /** Original file name (e.g. "Maintenance_Report_Q4.pdf"). */
  name: string;
  /** One of the six allowed document categories. */
  documentType: DocumentType;
  /** File size in bytes. */
  fileSize: number;
  /** ISO 8601 timestamp of when the document was uploaded. */
  uploadDate: string;
  /** Publicly accessible file URL (e.g. S3 pre-signed URL or CDN URL). */
  fileUrl: string;
  /** Lowercase file extension without the dot. */
  fileExtension: DocumentFileExtension;
}

// ─────────────────────────────────────────────────────────────────────────────
// API Payload Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload for POST /documents
 * Send as multipart/form-data.
 */
export interface DocumentUploadPayload {
  documentType: DocumentType;
  /** The binary file. Accepted MIME types: pdf, doc, docx, txt, png, jpg, jpeg. */
  file: File;
}

// Expected response body for POST /documents (201 Created).
export interface DocumentUploadResponse {
  success: boolean;
  message: string;
  data: DocumentRecord;
}

// Expected response body for GET /documents (200 OK).
export interface DocumentsListResponse {
  success: boolean;
  data: {
    documents: DocumentRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Expected response body for DELETE /documents/:id (200 OK).
export interface DocumentDeleteResponse {
  success: boolean;
  message: string;
}

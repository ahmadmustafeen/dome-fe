/**
 * Format a byte count as a human-readable file size string.
 * e.g. 1048576 → "1.0 MB"
 * @param bytes
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Format an ISO date string as a localised date + time.
 * e.g. "2025-11-11T03:17:00Z" → "Nov 11, 2025 at 3:17 AM"
 * @param iso
 */
export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} at ${d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
};

/**
 * Extract a human-readable filename from a URL.
 * Works with both plain paths and S3 pre-signed URLs.
 * e.g. "https://bucket.s3.amazonaws.com/documents/1234-report.pdf?X-Amz-..."
 *      → "1234-report.pdf"
 * @param url
 */
export const extractDocumentName = (url: string): string => {
  try {
    const path = new URL(url)?.pathname;
    const segment = path?.split("/").filter(Boolean).pop() ?? "";
    return decodeURIComponent(segment) || url;
  } catch {
    const segment = url?.split("/")?.pop()?.split("?")[0] ?? "";
    return decodeURIComponent(segment) || url;
  }
};

/**
 * Extract the lowercase file extension (without dot) from a URL or filename.
 * e.g. "https://…/report.pdf" → "pdf"
 * Returns "pdf" as a safe default if no extension is found.
 * @param url
 */
export const extractFileExtension = (url: string): string => {
  console.log({ url });

  const name = extractDocumentName?.(url);
  const ext = name?.split(".")?.pop()?.toLowerCase() ?? "";
  return ext || "pdf";
};

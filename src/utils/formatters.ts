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

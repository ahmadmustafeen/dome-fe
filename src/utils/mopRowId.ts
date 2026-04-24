/** Stable-enough ids for MOP section tables (client + mock service). */
export const newMopRowId = (prefix: string): string =>
  typeof globalThis.crypto !== "undefined" &&
  typeof globalThis.crypto.randomUUID === "function"
    ? globalThis.crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

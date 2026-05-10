export const newProcedureRowId = (prefix: string): string =>
  typeof globalThis.crypto !== "undefined" &&
  typeof globalThis.crypto.randomUUID === "function"
    ? globalThis.crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

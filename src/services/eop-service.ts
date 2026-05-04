import type { EopListSummaryRow } from "@/types/eop-api";

/**
 * Loads EOP index rows. Replace with `apiFetch` when DOME-BE exposes `GET /eop`.
 */
export const getEOPList = async (): Promise<EopListSummaryRow[]> => {
  return Promise.resolve([]);
};

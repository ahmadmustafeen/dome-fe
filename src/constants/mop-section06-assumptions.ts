import { newMopRowId } from "@/utils/mopRowId";

import type { MopAssumptionRow, MopCriticalDecisionPointItem } from "@/types/mop";

export const MOP_SECTION_06_HEADING = "Section 06: MOP Assumptions";

export const MOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING = "Key Project Assumptions";

export const MOP_SECTION_06_CRITICAL_PREFIX =
  "Critical Decision Points for Cummins Generator (Unit: ";

export const MOP_SECTION_06_CRITICAL_SUFFIX = "):";

export const MOP_SECTION_06_DEFAULT_UNIT_LABEL = "GENERATOR 1";

/** Default blank rows for assumptions table. */
export const MOP_SECTION_06_DEFAULT_TABLE_ROW_COUNT = 3;

/** Default bullet rows under Critical Decision Points. */
export const MOP_SECTION_06_DEFAULT_DECISION_LIST_COUNT = 4;

export const newAssumptionRow = (): MopAssumptionRow => ({
  id: newMopRowId("asm"),
  category: "",
  assumption: "",
});

export const newCriticalDecisionItem = (): MopCriticalDecisionPointItem => ({
  id: newMopRowId("cdp"),
  text: "",
});

export const buildDefaultAssumptionRows = (count: number): MopAssumptionRow[] =>
  Array.from({ length: count }, () => newAssumptionRow());

export const buildDefaultCriticalDecisionItems = (
  count: number,
): MopCriticalDecisionPointItem[] =>
  Array.from({ length: count }, () => newCriticalDecisionItem());

const ensureId = <T extends { id: string }>(row: T, prefix: string): T => ({
  ...row,
  id: row.id && row.id.length > 0 ? row.id : newMopRowId(prefix),
});

export const resolveAssumptionRows = (
  rows: MopAssumptionRow[] | undefined,
): MopAssumptionRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultAssumptionRows(MOP_SECTION_06_DEFAULT_TABLE_ROW_COUNT);
  }
  return rows.map((r) => ensureId(r, "asm"));
};

export const resolveCriticalDecisionItems = (
  items: MopCriticalDecisionPointItem[] | undefined,
): MopCriticalDecisionPointItem[] => {
  if (!items || items.length === 0) {
    return buildDefaultCriticalDecisionItems(MOP_SECTION_06_DEFAULT_DECISION_LIST_COUNT);
  }
  return items.map((r) => ensureId(r, "cdp"));
};

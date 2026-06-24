import type { MopBackOutProcedureRow } from "@/types/mop";
import { newMopRowId } from "@/utils/mopRowId";

export const MOP_SECTION_08_SUBHEADING = "Section 08: Back-out Procedures";

export const MOP_SECTION_08_CRITICAL_LABEL = "Critical Back-out procedures";

export const MOP_SECTION_08_INTRO =
  "If at any point during the maintenance procedure a critical issue is discovered that could affect data center operations, follow these detailed back-out procedures:";

export const MOP_SECTION_08_DEFAULT_STEP_COUNT = 10;

/**
 * Default back-out text aligned with `generateSection08` in `section-generators.js`
 * (static template; team may override per site in the form).
 */
export const MOP_SECTION_08_DEFAULT_PROCEDURE_TEXT: readonly string[] = [];

export const newBackOutProcedureRow = (
  stepNumber: number,
  backOutProcedure: string,
): MopBackOutProcedureRow => ({
  id: newMopRowId("bo"),
  stepNumber,
  backOutProcedure,
  initials: "",
  time: "",
});

export const buildDefaultBackOutStepRows = (
  count: number = MOP_SECTION_08_DEFAULT_STEP_COUNT,
): MopBackOutProcedureRow[] => {
  const lines = MOP_SECTION_08_DEFAULT_PROCEDURE_TEXT;
  return Array.from({ length: count }, (_, i) => {
    const line: string = i < lines.length ? (lines[i] ?? "") : "";
    return newBackOutProcedureRow(i + 1, line);
  });
};

const ensureRow = (r: MopBackOutProcedureRow, index: number): MopBackOutProcedureRow => ({
  ...r,
  id: r.id && r.id.length > 0 ? r.id : newMopRowId("bo"),
  stepNumber: r.stepNumber > 0 ? r.stepNumber : index + 1,
});

export const resolveBackOutStepRows = (
  rows: MopBackOutProcedureRow[] | undefined,
): MopBackOutProcedureRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultBackOutStepRows();
  }
  return rows?.map((r, i) => ensureRow(r, i));
};

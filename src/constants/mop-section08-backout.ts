import type { MopBackOutProcedureRow } from "@/types/mop";
import { newMopRowId } from "@/utils/mopRowId";

export const MOP_SECTION_08_SUBHEADING = "Section 08: Back-out Procedures";

export const MOP_SECTION_08_CRITICAL_LABEL = "CRITICAL BACK-OUT PROCEDURES";

export const MOP_SECTION_08_INTRO =
  "If at any point during the maintenance procedure a critical issue is discovered that could affect data center operations, follow these detailed back-out procedures:";

export const MOP_SECTION_08_DEFAULT_STEP_COUNT = 10;

/**
 * Default back-out text aligned with `generateSection08` in `section-generators.js`
 * (static template; team may override per site in the form).
 */
export const MOP_SECTION_08_DEFAULT_PROCEDURE_TEXT: readonly string[] = [
  "Immediate actions: stop all work immediately and secure the area.",
  "Notify the on-site data center lead and the facility manager immediately.",
  "Assess the situation and determine if equipment can be safely returned to service.",
  "If the issue cannot be resolved at the technician level, escalate to the operations manager.",
  "If the operations manager cannot resolve, escalate to the site lead / engineering director.",
  "Contact the equipment manufacturer service representative if required; record contact details here.",
  "Document all findings and actions taken in the incident report.",
  "If safe to return to service, follow re-energization procedures.",
  "Monitor equipment for a minimum of 30 minutes after return to service.",
  "Complete the incident report and schedule follow-up maintenance if required.",
];

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
  return rows.map((r, i) => ensureRow(r, i));
};

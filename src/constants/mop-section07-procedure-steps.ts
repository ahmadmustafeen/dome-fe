import { newMopRowId } from "@/utils/mopRowId";

import type { MopDetailedProcedureStepRow, MOPStep } from "@/types/mop";

/** Subsection under Section 07 (MOP Details), not a top-level section number. */
export const MOP_SECTION_07_DETAILED_PROCEDURES_SUBHEADING = "Detailed Procedure Steps";

export const MOP_SECTION_07_CRITICAL_STEP_NOTES_HEADING =
  "Critical Step Notes (Steps requiring torque verification or electrical testing)";

export const MOP_SECTION_07_DEFAULT_DETAILED_STEP_COUNT = 6;

export const newDetailedProcedureStepRow = (
  stepNumber: number,
): MopDetailedProcedureStepRow => ({
  id: newMopRowId("dps"),
  stepNumber,
  detailedProcedure: "",
  indicator: "",
  initials: "",
  time: "",
});

export const buildDefaultDetailedProcedureRows = (
  count: number,
): MopDetailedProcedureStepRow[] =>
  Array.from({ length: count }, (_, i) => newDetailedProcedureStepRow(i + 1));

const ensureId = (r: MopDetailedProcedureStepRow, index: number): MopDetailedProcedureStepRow => ({
  ...r,
  id: r.id && r.id.length > 0 ? r.id : newMopRowId("dps"),
  stepNumber: r.stepNumber > 0 ? r.stepNumber : index + 1,
});

/**
 * If API/JSON is empty, show blank template; otherwise one row per entry with stable ids.
 */
export const resolveDetailedProcedureStepRows = (
  rows: MopDetailedProcedureStepRow[] | undefined,
): MopDetailedProcedureStepRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultDetailedProcedureRows(MOP_SECTION_07_DEFAULT_DETAILED_STEP_COUNT);
  }
  return rows?.map((r, i) => ensureId(r, i));
};

export const mapMopStepsToDetailedProcedureRows = (
  steps: MOPStep[],
): MopDetailedProcedureStepRow[] =>
  steps.map((s) => ({
    id: s.id,
    stepNumber: s.stepNumber,
    detailedProcedure: s.description,
    indicator: "",
    initials: "",
    time: "",
  }));

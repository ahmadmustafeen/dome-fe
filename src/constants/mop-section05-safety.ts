import { newMopRowId } from "@/utils/mopRowId";

import type {
  MopEmergencyContactRow,
  MopPpeRequirementRow,
  MopSafetyProcedureRow,
  MopToolRequirementRow,
} from "@/types/mop";

export const MOP_SECTION_05_HEADING = "Section 05: Safety Requirements";

export const MOP_SECTION_05_PPE_SUBHEADING =
  "REQUIRED PERSONAL PROTECTIVE EQUIPMENT (PPE)";

export const MOP_SECTION_05_PPE_INTRO =
  "PPE requirements specific to Cummins Generator maintenance:";

export const MOP_SECTION_05_TOOLS_SUBHEADING = "TOOLS REQUIRED";

export const MOP_SECTION_05_TOOLS_INTRO =
  "Specific tools required for Cummins Generator Annual Preventative Maintenance based on equipment type and task:";

export const MOP_SECTION_05_PROCEDURES_SUBHEADING = "SAFETY PROCEDURES";

export const MOP_SECTION_05_EMERGENCY_SUBHEADING = "EMERGENCY CONTACTS";

/** Blank template rows when JSON/API sends no rows for a given table. */
export const MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT = 3;

export const newPpeRequirementRow = (): MopPpeRequirementRow => ({
  id: newMopRowId("ppe"),
  category: "",
  specification: "",
  whenRequired: "",
});

export const newToolRequirementRow = (): MopToolRequirementRow => ({
  id: newMopRowId("tool"),
  toolCategory: "",
  specificToolsList: "",
  purpose: "",
});

export const newSafetyProcedureRow = (): MopSafetyProcedureRow => ({
  id: newMopRowId("proc"),
  procedure: "",
  requirements: "",
  initials: "",
  time: "",
});

export const newEmergencyContactRow = (): MopEmergencyContactRow => ({
  id: newMopRowId("emg"),
  emergencyType: "",
  contact: "",
  phoneNumber: "",
});

export const buildDefaultPpeRows = (count: number): MopPpeRequirementRow[] =>
  Array.from({ length: count }, () => newPpeRequirementRow());

export const buildDefaultToolRows = (count: number): MopToolRequirementRow[] =>
  Array.from({ length: count }, () => newToolRequirementRow());

export const buildDefaultSafetyProcedureRows = (count: number): MopSafetyProcedureRow[] =>
  Array.from({ length: count }, () => newSafetyProcedureRow());

export const buildDefaultEmergencyContactRows = (count: number): MopEmergencyContactRow[] =>
  Array.from({ length: count }, () => newEmergencyContactRow());

const ensureId = <T extends { id: string }>(row: T, prefix: string): T => ({
  ...row,
  id: row.id && row.id.length > 0 ? row.id : newMopRowId(prefix),
});

export const resolvePpeRequirementRows = (
  rows: MopPpeRequirementRow[] | undefined,
): MopPpeRequirementRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultPpeRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT);
  }
  return rows.map((r) => ensureId(r, "ppe"));
};

export const resolveToolRequirementRows = (
  rows: MopToolRequirementRow[] | undefined,
): MopToolRequirementRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultToolRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT);
  }
  return rows.map((r) => ensureId(r, "tool"));
};

export const resolveSafetyProcedureRows = (
  rows: MopSafetyProcedureRow[] | undefined,
): MopSafetyProcedureRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultSafetyProcedureRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT);
  }
  return rows.map((r) => ensureId(r, "proc"));
};

export const resolveEmergencyContactRows = (
  rows: MopEmergencyContactRow[] | undefined,
): MopEmergencyContactRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultEmergencyContactRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT);
  }
  return rows.map((r) => ensureId(r, "emg"));
};

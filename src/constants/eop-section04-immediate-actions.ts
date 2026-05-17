import type { EopSection04SafetyChecklistItem } from "@/types/eop";

export const EOP_SECTION_04_HEADING =
  "Section 04: Immediate Emergency Actions - Power Failure Diagnostics";

export const EOP_SECTION_04_SUBHEADING_PRE_ACTION =
  "Pre-Action Safety & Equipment Requirements";

export const EOP_SECTION_04_CRITICAL_CHECKPOINT_TITLE =
  "CRITICAL SAFETY CHECKPOINT - STOP Before Proceeding:";

export const EOP_SECTION_04_PPE_HEADING =
  "Equipment-Specific PPE Requirements for LENNOX HS29-060-13G:";

export const EOP_SECTION_04_TOOLS_HEADING =
  "Required Tools & Test Equipment for LENNOX HS29-060-13G:";

export const EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING =
  "LENNOX HS29-060-13G Specific Safety Requirements:";

export const EOP_SECTION_04_DO_NOT_PROCEED_BANNER =
  "DO NOT PROCEED until all safety requirements are verified for ";

export const newEopSection04PpeRow = () => ({
  id: crypto.randomUUID(),
  ppeItem: "",
  specification: "",
  verified: false,
});

export const newEopSection04ToolRow = () => ({
  id: crypto.randomUUID(),
  tool: "",
  modelType: "",
  available: false,
});

export const newEopSection04SafetyChecklistItem =
  (): EopSection04SafetyChecklistItem => ({
    id: crypto.randomUUID(),
    text: "",
    checked: false,
  });

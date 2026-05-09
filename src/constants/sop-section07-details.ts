import type { SOPPreProcedureCheckRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_07_HEADING = "Section 07: SOP Details";

export const SOP_SECTION_07_PRE_CHECKS_SUBHEADING = "7.1 Pre-Procedure Checks";

export const SOP_SECTION_07_DETAILED_STEPS_SUBHEADING =
  "7.2 Detailed Procedure Steps";

export const SOP_SECTION_07_PRE_CHECK_ROWS: readonly SOPPreProcedureCheckRow[] = [
  {
    id: "review-work-order-and-sop",
    step: 1,
    description: "Review Work Order and SOP",
    expectedResult:
      "Work order is valid and this SOP (V1) is the latest version for LENNOX HS29-060-13G Weekly System Check.",
    actualResult: "",
    actionIfNotMet: "Obtain correct work order/SOP. Do not proceed.",
  },
  {
    id: "gather-required-tools-ppe",
    step: 2,
    description: "Gather Required Tools & PPE",
    expectedResult:
      "All tools and PPE listed in Section 05 are present and in good condition.",
    actualResult: "",
    actionIfNotMet:
      "Obtain missing/damaged tools or PPE. Do not proceed without all required items.",
  },
  {
    id: "notify-stakeholders",
    step: 3,
    description: "Notify Stakeholders",
    expectedResult:
      "BMS/DCIM operator and Site Operations Manager notified of impending weekly check.",
    actualResult: "",
    actionIfNotMet: "Complete all necessary notifications before proceeding.",
  },
  {
    id: "verify-ahu-status",
    step: 4,
    description: "Verify AHU Status via BMS/Local Display",
    expectedResult:
      "LENNOX HS29-060-13G (AHU 15 CDR) is operating normally, no active alarms, and within expected temperature/pressure ranges.",
    actualResult: "",
    actionIfNotMet:
      "If alarms or abnormal status, investigate and resolve or escalate before proceeding.",
  },
  {
    id: "inspect-work-area",
    step: 5,
    description: "Inspect Work Area",
    expectedResult:
      "Area around AHU is clear of obstructions, clean, and safe for work.",
    actualResult: "",
    actionIfNotMet: "Clear obstructions or address safety hazards.",
  },
] as const;

export const buildDefaultSopPreProcedureCheckRows =
  (): SOPPreProcedureCheckRow[] =>
    SOP_SECTION_07_PRE_CHECK_ROWS.map((row) => ({ ...row }));

export const newSopPreProcedureCheckRow = (): SOPPreProcedureCheckRow => ({
  id: newProcedureRowId("sop-pre-check"),
  step: 0,
  description: "",
  expectedResult: "",
  actualResult: "",
  actionIfNotMet: "",
});

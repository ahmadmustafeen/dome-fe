import type { SOPPreProcedureCheckRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_07_HEADING = "Section 07: SOP Details";

export const SOP_SECTION_07_PRE_CHECKS_SUBHEADING = "7.1 Pre-Procedure Checks";

export const SOP_SECTION_07_DETAILED_STEPS_SUBHEADING =
  "7.2 Detailed Procedure Steps";

export const newSopPreProcedureCheckRow = (): SOPPreProcedureCheckRow => ({
  id: newProcedureRowId("sop-pre-check"),
  step: 0,
  description: "",
  expectedResult: "",
  actualResult: "",
  actionIfNotMet: "",
});

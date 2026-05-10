import type { SOPBackOutProcedureRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_08_HEADING = "Section 08: Back-out Procedures";

export const newSopBackOutProcedureRow = (): SOPBackOutProcedureRow => ({
  id: newProcedureRowId("sop-back-out"),
  step: 0,
  description: "",
  verification: "",
  actionRequired: "",
});

import type { SOPDetailedProcedureStepRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const newSopDetailedProcedureStepRow =
  (): SOPDetailedProcedureStepRow => ({
    id: newProcedureRowId("sop-detail-step"),
    step: 0,
    description: "",
    indicator: "",
    expectedRange: "",
    source: "",
    recordedValue: "",
    initials: "",
    time: "",
    actionIfOutOfRange: "",
  });

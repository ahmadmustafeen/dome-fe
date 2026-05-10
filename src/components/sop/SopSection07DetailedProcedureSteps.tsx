"use client";

import type { ProcedureFixedStepEditableColumn } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureFixedStepEditableRowsTable } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { newSopDetailedProcedureStepRow } from "@/constants/sop-section07-procedure-steps";
import type { SOPDetailedProcedureStepRow, SOPDetails } from "@/types/sop";

type SopSection07DetailedProcedureStepsProps = {
  rows: SOPDetailedProcedureStepRow[];
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

const DETAILED_PROCEDURE_STEP_COLUMNS = [
  { header: "Description", field: "description" },
  { header: "Expected Range", field: "expectedRange" },
  { header: "Source", field: "source" },
  { header: "Recorded Value", field: "recordedValue" },
  { header: "Action if Out of Range", field: "actionIfOutOfRange" },
] satisfies readonly ProcedureFixedStepEditableColumn<
  SOPDetailedProcedureStepRow,
  keyof Omit<SOPDetailedProcedureStepRow, "id" | "step">
>[];

export const SopSection07DetailedProcedureSteps = ({
  rows,
  patchDetails,
}: SopSection07DetailedProcedureStepsProps) => {
  return (
    <ProcedureFixedStepEditableRowsTable
      rows={rows}
      columns={DETAILED_PROCEDURE_STEP_COLUMNS}
      ariaLabelGroup="SOP detailed procedure steps row controls"
      newRow={newSopDetailedProcedureStepRow}
      onRowsChange={(detailedProcedureStepRows) =>
        patchDetails({ detailedProcedureStepRows })}
    />
  );
};

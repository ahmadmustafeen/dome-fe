"use client";

import type { ProcedureFixedStepEditableColumn } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureFixedStepEditableRowsTable } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { newSopPreProcedureCheckRow } from "@/constants/sop-section07-details";
import type { SOPDetails, SOPPreProcedureCheckRow } from "@/types/sop";

type SopSection07PreProcedureChecksProps = {
  rows: SOPPreProcedureCheckRow[];
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

const PRE_PROCEDURE_CHECK_COLUMNS = [
  { header: "Description", field: "description" },
  { header: "Expected Result", field: "expectedResult" },
  { header: "Actual Result", field: "actualResult" },
  { header: "Action if Not Met", field: "actionIfNotMet" },
] satisfies readonly ProcedureFixedStepEditableColumn<
  SOPPreProcedureCheckRow,
  keyof Omit<SOPPreProcedureCheckRow, "id" | "step">
>[];

export const SopSection07PreProcedureChecks = ({
  rows,
  patchDetails,
}: SopSection07PreProcedureChecksProps) => {
  return (
    <ProcedureFixedStepEditableRowsTable
      rows={rows}
      columns={PRE_PROCEDURE_CHECK_COLUMNS}
      ariaLabelGroup="SOP pre-procedure checks row controls"
      newRow={newSopPreProcedureCheckRow}
      onRowsChange={(preProcedureCheckRows) =>
        patchDetails({ preProcedureCheckRows })}
    />
  );
};

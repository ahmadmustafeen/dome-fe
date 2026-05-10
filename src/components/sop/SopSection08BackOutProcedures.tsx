"use client";

import type { ProcedureFixedStepEditableColumn } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureFixedStepEditableRowsTable } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  newSopBackOutProcedureRow,
  SOP_SECTION_08_HEADING,
} from "@/constants/sop-section08-back-out";
import type { SOPBackOutProcedureRow, SOPBackOutProcedures } from "@/types/sop";

type SopSection08BackOutProceduresProps = {
  backOutProcedures: SOPBackOutProcedures;
  patchBackOutProcedures: (partial: Partial<SOPBackOutProcedures>) => void;
};

const BACK_OUT_PROCEDURE_COLUMNS = [
  { header: "Description", field: "description" },
  { header: "Verification", field: "verification" },
  { header: "Action Required", field: "actionRequired" },
] satisfies readonly ProcedureFixedStepEditableColumn<
  SOPBackOutProcedureRow,
  keyof Omit<SOPBackOutProcedureRow, "id" | "step">
>[];

export const SopSection08BackOutProcedures = ({
  backOutProcedures,
  patchBackOutProcedures,
}: SopSection08BackOutProceduresProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_08_HEADING}>
        <ProcedureFixedStepEditableRowsTable
          rows={backOutProcedures?.rows}
          columns={BACK_OUT_PROCEDURE_COLUMNS}
          ariaLabelGroup="SOP back-out procedures row controls"
          newRow={newSopBackOutProcedureRow}
          onRowsChange={(rows) => patchBackOutProcedures({ rows })}
        />
      </ProcedureSectionCard>
    </div>
  );
};

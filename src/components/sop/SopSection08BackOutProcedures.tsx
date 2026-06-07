"use client";

import type { ProcedureFixedStepEditableColumn } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureFixedStepEditableRowsTable } from "@/components/procedure/ProcedureFixedStepEditableRowsTable";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  newSopBackOutProcedureRow,
  SOP_SECTION_08_HEADING,
} from "@/constants/sop-section08-back-out";
import type { SOPBackOutProcedureRow, SOPBackOutProcedures } from "@/types/sop";
import { Typography } from "../common";

type SopSection08BackOutProceduresProps = {
  backOutProcedures: SOPBackOutProcedures;
  patchBackOutProcedures: (partial: Partial<SOPBackOutProcedures>) => void;
};

const BACK_OUT_PROCEDURE_COLUMNS = [
  { header: "Description", field: "description" },
  { header: "Verification", field: "verification" },
  { header: "Action Required", field: "actionRequired" },
  { header: "Initials", field: "initials" },
  { header: "Time", field: "time" },
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
        <p className="font-semibold text-lg py-4">Critical back-out procedure</p>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          If a critical issue is identified during the execution of this procedure that may adversely affect personnel safety, system integrity, or data center operations, suspend the activity immediately and follow the detailed escalation, containment, and response procedures described below:
        </Typography>
        <ProcedureFixedStepEditableRowsTable
          rows={backOutProcedures?.rows}
          className="bg-[#0F4D2E]!"
          columns={BACK_OUT_PROCEDURE_COLUMNS}
          ariaLabelGroup="SOP back-out procedures row controls"
          newRow={newSopBackOutProcedureRow}
          onRowsChange={(rows) => patchBackOutProcedures({ rows })}
        />
      </ProcedureSectionCard>
    </div>
  );
};

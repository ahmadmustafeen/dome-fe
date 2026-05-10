"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopKeyAssumptionRow,
  SOP_SECTION_06_KEY_ASSUMPTION_COLUMNS,
} from "@/constants/sop-section06-risks";
import type { SOPKeyAssumptionRow, SOPRisksAssumptions } from "@/types/sop";

type SopSection06KeyAssumptionsTableProps = {
  rows: SOPKeyAssumptionRow[];
  patchRisksAssumptions: (partial: Partial<SOPRisksAssumptions>) => void;
};

export const SopSection06KeyAssumptionsTable = ({
  rows,
  patchRisksAssumptions,
}: SopSection06KeyAssumptionsTableProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      columns={SOP_SECTION_06_KEY_ASSUMPTION_COLUMNS}
      ariaLabelGroup="SOP key assumptions table row controls"
      newRow={newSopKeyAssumptionRow}
      onRowsChange={(keyAssumptionRows: SOPKeyAssumptionRow[]) =>
        patchRisksAssumptions({ keyAssumptionRows })}
    />
  );
};

"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopPpeRequirementRow,
  SOP_SECTION_05_PPE_COLUMNS,
} from "@/constants/sop-section05-safety";
import type { SOPPpeRequirementRow, SOPSafetyRequirements } from "@/types/sop";

type SopSection05PpeBlockProps = {
  rows: SOPPpeRequirementRow[];
  patchSafety: (partial: Partial<SOPSafetyRequirements>) => void;
};

export const SopSection05PpeBlock = ({
  rows,
  patchSafety,
}: SopSection05PpeBlockProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      columns={SOP_SECTION_05_PPE_COLUMNS}
      ariaLabelGroup="SOP PPE table row controls"
      newRow={newSopPpeRequirementRow}
      onRowsChange={(ppeRequirementRows: SOPPpeRequirementRow[]) =>
        patchSafety({ ppeRequirementRows })}
    />
  );
};

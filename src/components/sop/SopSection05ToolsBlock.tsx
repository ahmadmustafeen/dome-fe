"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopToolRequirementRow,
  SOP_SECTION_05_TOOL_COLUMNS,
} from "@/constants/sop-section05-safety";
import type { SOPSafetyRequirements, SOPToolRequirementRow } from "@/types/sop";

type SopSection05ToolsBlockProps = {
  rows: SOPToolRequirementRow[];
  patchSafety: (partial: Partial<SOPSafetyRequirements>) => void;
};

export const SopSection05ToolsBlock = ({
  rows,
  patchSafety,
}: SopSection05ToolsBlockProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      className="bg-[#0F4D2E]!"
      columns={SOP_SECTION_05_TOOL_COLUMNS}
      ariaLabelGroup="SOP tools table row controls"
      newRow={newSopToolRequirementRow}
      onRowsChange={(toolRequirementRows: SOPToolRequirementRow[]) =>
        patchSafety({ toolRequirementRows })}
    />
  );
};

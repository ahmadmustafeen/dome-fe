"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopRiskAnalysisRow,
  SOP_SECTION_06_RISK_COLUMNS,
} from "@/constants/sop-section06-risks";
import type { SOPRiskAnalysisRow, SOPRisksAssumptions } from "@/types/sop";

type SopSection06RiskMatrixProps = {
  rows: SOPRiskAnalysisRow[];
  patchRisksAssumptions: (partial: Partial<SOPRisksAssumptions>) => void;
};

export const SopSection06RiskMatrix = ({
  rows,
  patchRisksAssumptions,
}: SopSection06RiskMatrixProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      columns={SOP_SECTION_06_RISK_COLUMNS}
      ariaLabelGroup="SOP risk analysis table row controls"
      newRow={newSopRiskAnalysisRow}
      onRowsChange={(riskAnalysisRows: SOPRiskAnalysisRow[]) =>
        patchRisksAssumptions({ riskAnalysisRows })}
    />
  );
};

"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newRiskAnalysisRow,
  MOP_SECTION_06_RISK_MATRIX_SUBHEADING,
} from "@/constants/mop-section06-assumptions";
import type { MOPAssumptions, MopRiskAnalysisRow } from "@/types/mop";

type MopSection06RiskMatrixProps = {
  rows: MopRiskAnalysisRow[];
  patchAssumptions: (partial: Partial<MOPAssumptions>) => void;
};

export const MopSection06RiskMatrix = ({
  rows,
  patchAssumptions,
}: MopSection06RiskMatrixProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4 text-base font-semibold text-gray-900">
        {MOP_SECTION_06_RISK_MATRIX_SUBHEADING}
      </div>
      <ProcedureEditableRowsTable
        rows={rows}
        columns={[
          { header: "Risk Category", field: "category" },
          { header: "Description", field: "description" },
          { header: "Likelihood", field: "likelihood" },
          { header: "Impact", field: "impact" },
          { header: "Mitigation Strategy", field: "mitigationStrategy" },
        ]}
        className="bg-[#0F3456]!"
        ariaLabelGroup="MOP risk analysis table row controls"
        newRow={newRiskAnalysisRow}
        onRowsChange={(riskAnalysisRows: MopRiskAnalysisRow[]) =>
          patchAssumptions({ riskAnalysisRows })}
      />
    </div>
  );
};

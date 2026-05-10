"use client";

import { Typography } from "@/components/common";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  SOP_SECTION_06_CRITICAL_DECISIONS_SUBHEADING,
  SOP_SECTION_06_HEADING,
  SOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING,
  SOP_SECTION_06_RISK_MATRIX_SUBHEADING,
} from "@/constants/sop-section06-risks";
import type { SOPRisksAssumptions } from "@/types/sop";

import { SopSection06CriticalDecisionsList } from "./SopSection06CriticalDecisionsList";
import { SopSection06KeyAssumptionsTable } from "./SopSection06KeyAssumptionsTable";
import { SopSection06RiskMatrix } from "./SopSection06RiskMatrix";

type SopSection06RisksAssumptionsProps = {
  risksAssumptions: SOPRisksAssumptions;
  patchRisksAssumptions: (partial: Partial<SOPRisksAssumptions>) => void;
};

export const SopSection06RisksAssumptions = ({
  risksAssumptions,
  patchRisksAssumptions,
}: SopSection06RisksAssumptionsProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_06_HEADING}>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_06_RISK_MATRIX_SUBHEADING}
          </Typography>
          <SopSection06RiskMatrix
            rows={risksAssumptions?.riskAnalysisRows}
            patchRisksAssumptions={patchRisksAssumptions}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING}
          </Typography>
          <SopSection06KeyAssumptionsTable
            rows={risksAssumptions?.keyAssumptionRows}
            patchRisksAssumptions={patchRisksAssumptions}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_06_CRITICAL_DECISIONS_SUBHEADING}
          </Typography>
          <SopSection06CriticalDecisionsList
            items={risksAssumptions?.criticalDecisionPointItems}
            patchRisksAssumptions={patchRisksAssumptions}
          />
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_06_HEADING } from "@/constants/mop-section06-assumptions";

import type { MOPAssumptions } from "@/types/mop";

import { MopSection06CriticalDecisionsList } from "./MopSection06CriticalDecisionsList";
import { MopSection06KeyAssumptionsTable } from "./MopSection06KeyAssumptionsTable";

type MopSection06AssumptionsProps = {
  assumptions: MOPAssumptions;
  patchAssumptions: (p: Partial<MOPAssumptions>) => void;
  assetName: string
};

export const MopSection06Assumptions = ({
  assumptions,
  patchAssumptions,
  assetName,
}: MopSection06AssumptionsProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-4 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_06_HEADING}
      </Typography>
      <MopSection06KeyAssumptionsTable
        rows={assumptions.assumptionRows}
        patchAssumptions={patchAssumptions}
      />
      <MopSection06CriticalDecisionsList
        unitLabel={assumptions.criticalDecisionUnitLabel}
        items={assumptions.criticalDecisionPointItems}
        patchAssumptions={patchAssumptions}
        assetName={assetName}
      />
    </div>
  );
};

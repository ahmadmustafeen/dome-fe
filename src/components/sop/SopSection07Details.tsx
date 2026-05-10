"use client";

import { Typography } from "@/components/common";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  SOP_SECTION_07_DETAILED_STEPS_SUBHEADING,
  SOP_SECTION_07_HEADING,
  SOP_SECTION_07_PRE_CHECKS_SUBHEADING,
} from "@/constants/sop-section07-details";
import type { SOPDetails } from "@/types/sop";

import { SopSection07DetailedProcedureSteps } from "./SopSection07DetailedProcedureSteps";
import { SopSection07PreProcedureChecks } from "./SopSection07PreProcedureChecks";

type SopSection07DetailsProps = {
  details: SOPDetails;
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

export const SopSection07Details = ({
  details,
  patchDetails,
}: SopSection07DetailsProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_07_HEADING}>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_07_PRE_CHECKS_SUBHEADING}
          </Typography>
          <SopSection07PreProcedureChecks
            rows={details.preProcedureCheckRows}
            patchDetails={patchDetails}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_07_DETAILED_STEPS_SUBHEADING}
          </Typography>
          <SopSection07DetailedProcedureSteps
            rows={details.detailedProcedureStepRows}
            patchDetails={patchDetails}
          />
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

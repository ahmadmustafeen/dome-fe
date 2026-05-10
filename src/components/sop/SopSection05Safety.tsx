"use client";

import { Typography } from "@/components/common";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { SOP_SECTION_05_HAZARDS_SUBHEADING } from "@/constants/sop-section05-hazards";
import {
  SOP_SECTION_05_EMERGENCY_SUBHEADING,
  SOP_SECTION_05_HEADING,
  SOP_SECTION_05_PPE_SUBHEADING,
  SOP_SECTION_05_TOOLS_SUBHEADING,
} from "@/constants/sop-section05-safety";
import type { SOPSafetyRequirements } from "@/types/sop";

import { SopSection05EmergencyBlock } from "./SopSection05EmergencyBlock";
import { SopSection05HazardsBlock } from "./SopSection05HazardsBlock";
import { SopSection05PpeBlock } from "./SopSection05PpeBlock";
import { SopSection05ToolsBlock } from "./SopSection05ToolsBlock";

type SopSection05SafetyProps = {
  safety: SOPSafetyRequirements;
  patchSafety: (partial: Partial<SOPSafetyRequirements>) => void;
};

export const SopSection05Safety = ({
  safety,
  patchSafety,
}: SopSection05SafetyProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_05_HEADING}>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_05_PPE_SUBHEADING}
          </Typography>
          <SopSection05PpeBlock
            rows={safety?.ppeRequirementRows}
            patchSafety={patchSafety}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_05_TOOLS_SUBHEADING}
          </Typography>
          <SopSection05ToolsBlock
            rows={safety?.toolRequirementRows}
            patchSafety={patchSafety}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_05_EMERGENCY_SUBHEADING}
          </Typography>
          <SopSection05EmergencyBlock
            rows={safety?.emergencyContactRows}
            patchSafety={patchSafety}
          />
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_05_HAZARDS_SUBHEADING}
          </Typography>
          <SopSection05HazardsBlock
            rows={safety?.siteHazardRows}
            patchSafety={patchSafety}
          />
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

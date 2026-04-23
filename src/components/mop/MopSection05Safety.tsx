"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_05_HEADING } from "@/constants/mop-section05-safety";

import type { MOPSafety } from "@/types/mop";

import { MopSection05EmergencyBlock } from "./MopSection05EmergencyBlock";
import { MopSection05PpeBlock } from "./MopSection05PpeBlock";
import { MopSection05ProceduresBlock } from "./MopSection05ProceduresBlock";
import { MopSection05ToolsBlock } from "./MopSection05ToolsBlock";

type MopSection05SafetyProps = {
  safety: MOPSafety;
  patchSafety: (p: Partial<MOPSafety>) => void;
};

export const MopSection05Safety = ({ safety, patchSafety }: MopSection05SafetyProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-6 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_05_HEADING}
      </Typography>
      <MopSection05PpeBlock rows={safety.ppeRequirementRows} patchSafety={patchSafety} />
      <MopSection05ToolsBlock rows={safety.toolRequirementRows} patchSafety={patchSafety} />
      <MopSection05ProceduresBlock rows={safety.safetyProcedureRows} patchSafety={patchSafety} />
      <MopSection05EmergencyBlock rows={safety.emergencyContactRows} patchSafety={patchSafety} />
    </div>
  );
};

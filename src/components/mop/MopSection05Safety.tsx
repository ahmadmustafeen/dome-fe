"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_05_HEADING } from "@/constants/mop-section05-safety";

import type { MOPSafety } from "@/types/mop";

import { MopSection05EmergencyBlock } from "./MopSection05EmergencyBlock";
import { MopSection05HazardsBlock } from "./MopSection05HazardsBlock";
import { MopSection05LocalServicesBlock } from "./MopSection05LocalServicesBlock";
import { MopSection05PpeBlock } from "./MopSection05PpeBlock";
import { MopSection05ProceduresBlock } from "./MopSection05ProceduresBlock";
import { MopSection05ToolsBlock } from "./MopSection05ToolsBlock";

type MopSection05SafetyProps = {
  safety: MOPSafety;
  patchSafety: (p: Partial<MOPSafety>) => void;
  assetName: string;
  mopTitle: string;
};

export const MopSection05Safety = ({ safety, patchSafety, assetName, mopTitle }: MopSection05SafetyProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-6 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_05_HEADING}
      </Typography>
      <MopSection05PpeBlock rows={safety?.ppeRequirementRows} patchSafety={patchSafety}
        assetName={assetName}
      />
      <MopSection05ToolsBlock rows={safety?.toolRequirementRows} patchSafety={patchSafety}
        assetName={assetName}
        mopTitle={mopTitle}
      />
      <MopSection05HazardsBlock rows={safety?.siteHazardRows ?? []} patchSafety={patchSafety} />
      <MopSection05ProceduresBlock rows={safety?.safetyProcedureRows} patchSafety={patchSafety} />
      <MopSection05EmergencyBlock rows={safety?.emergencyContactRows} patchSafety={patchSafety} />
      <MopSection05LocalServicesBlock
        address={safety?.localEmergencyServicesAddress}
        rows={safety?.localEmergencyServiceRows}
        patchSafety={patchSafety}
      />
    </div>
  );
};

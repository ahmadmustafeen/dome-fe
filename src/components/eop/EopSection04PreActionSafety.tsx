"use client";

import { Typography } from "@/components/common";
import {
  EOP_SECTION_04_DO_NOT_PROCEED_BANNER,
  EOP_SECTION_04_SUBHEADING_PRE_ACTION,
} from "@/constants/eop-section04-immediate-actions";
import type { EOPSection04PreActionSafety } from "@/types/eop";

import { EopSection04PpeTable } from "./EopSection04PpeTable";
import { EopSection04SafetyChecklist } from "./EopSection04SafetyChecklist";
import { EopSection04ToolsTable } from "./EopSection04ToolsTable";

type EopSection04PreActionSafetyProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
  assetName?: string
};

export const EopSection04PreActionSafetyBlock = ({
  preActionSafety,
  patchPreActionSafety,
  assetName,
}: EopSection04PreActionSafetyProps) => {
  return (
    <div className="mb-2">
      <Typography
        variant="h6"
        className="mb-3 text-base font-semibold text-gray-900"
      >
        {EOP_SECTION_04_SUBHEADING_PRE_ACTION}
      </Typography>


      <EopSection04PpeTable
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
        assetName={assetName}
      />
      <EopSection04ToolsTable
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
        assetName={assetName}
      />
      <EopSection04SafetyChecklist
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
        assetName={assetName}
      />

      <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-3 text-sm font-semibold text-red-800">
        ⛔ {EOP_SECTION_04_DO_NOT_PROCEED_BANNER}
      </div>
    </div>
  );
};

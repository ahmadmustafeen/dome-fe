"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_04_HEADING } from "@/constants/eop-section04-immediate-actions";
import type {
  EOPSection04ImmediateActions,
  EOPSection04InternalDiagnostics,
  EOPSection04PreActionSafety,
} from "@/types/eop";

import { EopSection04InternalDiagnostics } from "./EopSection04InternalDiagnostics";
import { EopSection04PreActionSafetyBlock } from "./EopSection04PreActionSafety";

type EopSection04ImmediateActionsProps = {
  immediateActions: EOPSection04ImmediateActions;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
  assetName?: string;
  patchInternalDiagnostics: (
    p: Partial<EOPSection04InternalDiagnostics>,
  ) => void;
};

export const EopSection04ImmediateActionsSection = ({
  immediateActions,
  patchPreActionSafety,
  patchInternalDiagnostics,
  assetName
}: EopSection04ImmediateActionsProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_04_HEADING}
      </Typography>

      <EopSection04PreActionSafetyBlock
        preActionSafety={immediateActions?.preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
        assetName={assetName}
      />
      <EopSection04InternalDiagnostics
        internalDiagnostics={immediateActions?.internalDiagnostics}
        patchInternalDiagnostics={patchInternalDiagnostics}
        assetName={assetName}
      />
    </div>
  );
};

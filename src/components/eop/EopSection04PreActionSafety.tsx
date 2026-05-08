"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_04_CRITICAL_CHECKPOINT_TITLE,
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
};

export const EopSection04PreActionSafetyBlock = ({
  preActionSafety,
  patchPreActionSafety,
}: EopSection04PreActionSafetyProps) => {
  return (
    <div className="mb-2">
      <Typography
        variant="h6"
        className="mb-3 text-base font-semibold text-gray-900"
      >
        {EOP_SECTION_04_SUBHEADING_PRE_ACTION}
      </Typography>

      <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-3 text-sm text-amber-950">
        <Typography variant="span" className="font-bold">
          ⚠️ {EOP_SECTION_04_CRITICAL_CHECKPOINT_TITLE}
        </Typography>
        <Textarea
          value={preActionSafety.ppeIntroText}
          onChange={(e) => patchPreActionSafety({ ppeIntroText: e.target.value })}
          className="mt-2 min-h-20"
          placeholder="Describe the emergency context and PPE requirements"
        />
      </div>

      <EopSection04PpeTable
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
      />
      <EopSection04ToolsTable
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
      />
      <EopSection04SafetyChecklist
        preActionSafety={preActionSafety}
        patchPreActionSafety={patchPreActionSafety}
      />

      <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-3 text-sm font-semibold text-red-800">
        ⛔ {EOP_SECTION_04_DO_NOT_PROCEED_BANNER}
      </div>
    </div>
  );
};

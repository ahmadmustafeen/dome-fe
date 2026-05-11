"use client";

import { Typography } from "@/components/common";
import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
import {
  EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING,
  newEopSection04SafetyChecklistItem,
} from "@/constants/eop-section04-immediate-actions";
import type { EOPSection04PreActionSafety } from "@/types/eop";

type EopSection04SafetyChecklistProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
};

export const EopSection04SafetyChecklist = ({
  preActionSafety,
  patchPreActionSafety,
}: EopSection04SafetyChecklistProps) => {
  const items = preActionSafety?.safetyChecklistItems;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING}
      </Typography>

      <ProcedureEditableList
        items={items}
        ariaLabelPrefix="EOP safety requirement"
        newItem={newEopSection04SafetyChecklistItem}
        onItemsChange={(safetyChecklistItems) =>
          patchPreActionSafety({ safetyChecklistItems })}
      />
    </div>
  );
};

"use client";

import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
import { newSopCriticalDecisionItem } from "@/constants/sop-section06-risks";
import type {
  SOPCriticalDecisionPointItem,
  SOPRisksAssumptions,
} from "@/types/sop";

type SopSection06CriticalDecisionsListProps = {
  items: SOPCriticalDecisionPointItem[];
  patchRisksAssumptions: (partial: Partial<SOPRisksAssumptions>) => void;
};

export const SopSection06CriticalDecisionsList = ({
  items,
  patchRisksAssumptions,
}: SopSection06CriticalDecisionsListProps) => {
  return (
    <ProcedureEditableList
      items={items}
      ariaLabelPrefix="SOP critical decision point"
      newItem={newSopCriticalDecisionItem}
      onItemsChange={(criticalDecisionPointItems) =>
        patchRisksAssumptions({ criticalDecisionPointItems })}
    />
  );
};

"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING } from "@/constants/eop-section04-immediate-actions";
import type {
  EOPSection04PreActionSafety,
  EopSection04SafetyChecklistItem,
} from "@/types/eop";

type EopSection04SafetyChecklistProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
};

const updateItem = (
  items: EopSection04SafetyChecklistItem[],
  itemId: string,
  partial: Partial<Pick<EopSection04SafetyChecklistItem, "checked">>,
): EopSection04SafetyChecklistItem[] =>
  items.map((it) => (it.id === itemId ? { ...it, ...partial } : it));

export const EopSection04SafetyChecklist = ({
  preActionSafety,
  patchPreActionSafety,
}: EopSection04SafetyChecklistProps) => {
  const items = preActionSafety.safetyChecklistItems;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING}
      </Typography>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-md border border-gray-200 bg-white px-3 py-2"
          >
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-primary"
              checked={item.checked}
              onChange={(e) =>
                patchPreActionSafety({
                  safetyChecklistItems: updateItem(items, item.id, {
                    checked: e.target.checked,
                  }),
                })
              }
              aria-label="Safety requirement"
            />
            <Typography variant="span" className="text-sm text-gray-800">
              {item.text}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

'use client';

import type { MOPAssumptions, MopCriticalDecisionPointItem } from '@/types/mop';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_06_CRITICAL_PREFIX,
  MOP_SECTION_06_CRITICAL_SUFFIX,
  newCriticalDecisionItem,
} from '@/constants/mop-section06-assumptions';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection06CriticalDecisionsListProps = {
  unitLabel: string;
  items: MopCriticalDecisionPointItem[];
  patchAssumptions: (p: Partial<MOPAssumptions>) => void;
};

const patchItemText = (
  list: MopCriticalDecisionPointItem[],
  id: string,
  text: string,
  patchAssumptions: MopSection06CriticalDecisionsListProps['patchAssumptions'],
) => {
  patchAssumptions({
    criticalDecisionPointItems: list.map(item => (item.id === id ? { ...item, text } : item)),
  });
};

export const MopSection06CriticalDecisionsList = ({
  unitLabel,
  items,
  patchAssumptions,
}: MopSection06CriticalDecisionsListProps) => {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-1 gap-y-2 text-base font-semibold text-gray-900">
        <span className="shrink-0">{MOP_SECTION_06_CRITICAL_PREFIX}</span>
        <Input
          value={unitLabel}
          onChange={e =>
            patchAssumptions({ criticalDecisionUnitLabel: e.target.value })}
          placeholder="Unit label"
          className="h-8 max-w-xs min-w-40"
          aria-label="Generator unit label for critical decision points"
        />
        <span className="shrink-0">{MOP_SECTION_06_CRITICAL_SUFFIX}</span>
      </div>
      <ul className="list-none space-y-3 pl-0">
        {items.map((item, index) => (
          <li key={item.id} className="flex gap-2">
            <span
              className="mt-2 w-6 shrink-0 text-right text-sm text-gray-600"
              aria-hidden
            >
              {index + 1}
              .
            </span>
            <Textarea
              value={item.text}
              onChange={e => patchItemText(items, item.id, e.target.value, patchAssumptions)}
              placeholder="Decision point or verification step"
              className="min-h-20 w-full flex-1"
            />
            <div className="mt-2 shrink-0">
              <MopDynamicTableRowControls
                ariaLabelGroup={`Critical decision point ${String(index + 1)}`}
                rowCount={items.length}
                onAddBelow={() =>
                  patchAssumptions({
                    criticalDecisionPointItems: insertRowAfterId(
                      items,
                      item.id,
                      newCriticalDecisionItem(),
                    ),
                  })}
                onRemove={() => {
                  const next = removeRowById(items, item.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                  if (next) {
                    patchAssumptions({ criticalDecisionPointItems: next });
                  }
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

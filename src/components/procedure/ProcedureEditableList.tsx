"use client";

import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { Textarea } from "@/components/ui/Textarea";
import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";
import {
  insertProcedureRowAfterId,
  removeProcedureRowById,
} from "@/utils/procedure-dynamic-table-mutations";

export type ProcedureEditableListItem = {
  id: string;
  text: string;
};

type ProcedureEditableListProps<TItem extends ProcedureEditableListItem> = {
  items: TItem[];
  ariaLabelPrefix: string;
  newItem: () => TItem;
  onItemsChange: (items: TItem[]) => void;
};

export const ProcedureEditableList = <TItem extends ProcedureEditableListItem>({
  items,
  ariaLabelPrefix,
  newItem,
  onItemsChange,
}: ProcedureEditableListProps<TItem>) => {
  return (
    <ul className="list-none space-y-3 pl-0">
      {items.map((item, index) => (
        <li key={item.id} className="flex gap-2">
          <span
            className="mt-2 w-6 shrink-0 text-right text-sm text-gray-600"
            aria-hidden
          >
            {index + 1}.
          </span>
          <Textarea
            value={item.text}
            onChange={(event) =>
              onItemsChange(
                items.map((row) =>
                  row.id === item.id ? { ...row, text: event.target.value } : row,
                ),
              )}
            placeholder="Decision point or verification step"
            className="min-h-20 w-full flex-1"
          />
          <div className="mt-2 shrink-0">
            <ProcedureDynamicTableRowControls
              ariaLabelGroup={`${ariaLabelPrefix} ${String(index + 1)}`}
              rowCount={items.length}
              onAddBelow={() =>
                onItemsChange(insertProcedureRowAfterId(items, item.id, newItem()))}
              onRemove={() => {
                const next = removeProcedureRowById(
                  items,
                  item.id,
                  PROCEDURE_DYNAMIC_TABLE_MIN_ROWS,
                );
                if (next !== undefined) {
                  onItemsChange(next);
                }
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

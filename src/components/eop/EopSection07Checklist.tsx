"use client";

import { Typography } from "@/components/common";
import type { EopSection07ChecklistItem } from "@/types/eop";

type EopSection07ChecklistProps = {
  title: string;
  description: string;
  items: EopSection07ChecklistItem[];
  onItemsChange: (items: EopSection07ChecklistItem[]) => void;
};

export const updateSection07ChecklistItem = (
  items: EopSection07ChecklistItem[],
  itemId: string,
  checked: boolean,
): EopSection07ChecklistItem[] =>
  items.map((item) => (item.id === itemId ? { ...item, checked } : item));

export const EopSection07Checklist = ({
  title,
  description,
  items,
  onItemsChange,
}: EopSection07ChecklistProps) => (
  <div className="mt-5 rounded-md border border-gray-200 bg-gray-50 p-3">
    <Typography variant="h6" className="mb-1 text-sm font-semibold text-gray-900">
      {title}
    </Typography>
    <Typography variant="p" className="mb-3 text-sm text-gray-600">
      {description}
    </Typography>
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.id}
          className="flex items-start gap-2 text-sm leading-6 text-gray-800"
        >
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
            checked={item.checked}
            onChange={(event) =>
              onItemsChange(
                updateSection07ChecklistItem(
                  items,
                  item.id,
                  event.target.checked,
                ),
              )
            }
          />
          <span>{item.text}</span>
        </label>
      ))}
    </div>
  </div>
);

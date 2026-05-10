"use client";

import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";

type ProcedureDynamicTableRowControlsProps = {
  rowCount: number;
  ariaLabelGroup: string;
  onAddBelow: () => void;
  onRemove: () => void;
};

export const ProcedureDynamicTableRowControls = ({
  rowCount,
  ariaLabelGroup,
  onAddBelow,
  onRemove,
}: ProcedureDynamicTableRowControlsProps) => {
  const canRemove = rowCount > PROCEDURE_DYNAMIC_TABLE_MIN_ROWS;

  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 px-1 py-1"
      role="group"
      aria-label={ariaLabelGroup}
    >
      <button
        type="button"
        className="inline-flex h-7 min-w-7 items-center justify-center rounded border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100"
        aria-label="Add row below"
        onClick={onAddBelow}
      >
        +
      </button>
      <button
        type="button"
        className="inline-flex h-7 min-w-7 items-center justify-center rounded border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Remove this row"
        disabled={!canRemove}
        onClick={onRemove}
      >
        -
      </button>
    </div>
  );
};

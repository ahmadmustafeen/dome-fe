"use client";

import type { LucideIcon } from "lucide-react";
import { CircleOff, HelpCircle } from "lucide-react";

import type { MopImportantIndicatorId } from "@/constants/mop-section07-important-indicators";
import {
  getMopSection07IndicatorMeaning,
  MOP_IMPORTANT_INDICATOR_SELECT_EMPTY,
  MOP_SECTION_07_IMPORTANT_INDICATORS,
} from "@/constants/mop-section07-important-indicators";
import type { MopDetailProcedureStepIndicator } from "@/types/mop";
import { cn } from "@/utils/Helpers";
import { MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID } from "@/utils/mop-section07-indicator-lucide";

const validIds = new Set(
  MOP_SECTION_07_IMPORTANT_INDICATORS.map((i) => i.id),
);

type MopSection07IndicatorSelectProps = {
  "value": MopDetailProcedureStepIndicator;
  "onChange": (value: MopDetailProcedureStepIndicator) => void;
  "className"?: string;
  "aria-label"?: string;
  "id"?: string;
};

const normalize = (v: string): MopDetailProcedureStepIndicator => {
  if (v === MOP_IMPORTANT_INDICATOR_SELECT_EMPTY) {
    return MOP_IMPORTANT_INDICATOR_SELECT_EMPTY;
  }
  return validIds.has(v) ? (v as MopDetailProcedureStepIndicator) : MOP_IMPORTANT_INDICATOR_SELECT_EMPTY;
};

/**
 * Picks a Section 7 legend indicator by icon. Stored value is the indicator id (or empty);
 * meaning is resolved from `MOP_SECTION_07_IMPORTANT_INDICATORS` (align API JSON to the same ids).
 */
export const MopSection07IndicatorSelect = ({
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
  id,
}: MopSection07IndicatorSelectProps) => {
  const current = normalize(value);
  return (
    <div
      id={id}
      role="group"
      aria-label={ariaLabel}
      className={cn("grid max-w-xs grid-cols-3 justify-items-stretch gap-1.5 sm:max-w-sm sm:grid-cols-3", className)}
    >
      <button
        type="button"
        title="No indicator"
        className={cn(
          "flex h-9 w-full min-w-0 items-center justify-center rounded border border-gray-200 bg-white text-gray-500",
          "hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0f3456]",
          current === MOP_IMPORTANT_INDICATOR_SELECT_EMPTY
            ? "ring-2 ring-[#0f3456] ring-offset-0"
            : "ring-0",
        )}
        aria-pressed={current === MOP_IMPORTANT_INDICATOR_SELECT_EMPTY}
        onClick={() => onChange(MOP_IMPORTANT_INDICATOR_SELECT_EMPTY)}
      >
        <span className="sr-only">No indicator</span>
        <CircleOff className="h-5 w-5" aria-hidden />
      </button>
      {MOP_SECTION_07_IMPORTANT_INDICATORS.map((row) => {
        const isSelected = current === row.id;
        const indicatorKey = row.id as MopImportantIndicatorId;
        const Icon: LucideIcon =
          MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID[indicatorKey] ?? HelpCircle;
        const title = getMopSection07IndicatorMeaning(row.id);
        return (
          <button
            key={row.id}
            type="button"
            title={title}
            className={cn(
              "flex h-9 w-full min-w-0 items-center justify-center rounded border border-gray-200 text-[#0f3456]",
              "hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0f3456]",
              isSelected ? "ring-2 ring-[#0f3456] ring-offset-0" : "bg-white",
            )}
            aria-pressed={isSelected}
            aria-label={title}
            onClick={() => onChange(row.id)}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
};

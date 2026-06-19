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

const validIds = new Set(MOP_SECTION_07_IMPORTANT_INDICATORS.map((i) => i.id));

type MopSection07IndicatorSelectProps = {
  value: MopDetailProcedureStepIndicator;
  onChange: (value: MopDetailProcedureStepIndicator) => void;
  className?: string;
  "aria-label"?: string;
  id?: string;
};

const normalize = (v: string): MopDetailProcedureStepIndicator => {
  if (v === MOP_IMPORTANT_INDICATOR_SELECT_EMPTY) {
    return MOP_IMPORTANT_INDICATOR_SELECT_EMPTY;
  }
  return validIds.has(v)
    ? (v as MopDetailProcedureStepIndicator)
    : MOP_IMPORTANT_INDICATOR_SELECT_EMPTY;
};

const baseButtonClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded border border-gray-200 text-[#0f3456] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0f3456]";

const noneButtonClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0f3456]";

export const MopSection07IndicatorSelect = ({
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
  id,
}: MopSection07IndicatorSelectProps) => {
  const current = normalize(value);
  const rootClassName = cn("flex flex-wrap gap-1", className);

  return (
    <div id={id} className={rootClassName} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        title="No indicator"
        className={cn(
          noneButtonClass,
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
        const indicatorRowId = row.id as MopImportantIndicatorId;
        const Icon: LucideIcon =
          MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID[indicatorRowId] ??
          HelpCircle;
        const title = getMopSection07IndicatorMeaning(row.id);

        return (
          <button
            key={row.id}
            type="button"
            title={title}
            className={cn(
              baseButtonClass,
              isSelected ? "ring-2 ring-[#0f3456] ring-offset-0" : "bg-white",
            )}
            aria-pressed={isSelected}
            aria-label={title}
            onClick={() => onChange(indicatorRowId)}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
};

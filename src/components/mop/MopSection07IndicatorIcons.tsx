"use client";

import type { LucideIcon } from "lucide-react";
import { HelpCircle } from "lucide-react";

import type { MopImportantIndicatorId } from "@/constants/mop-section07-important-indicators";
import { MOP_IMPORTANT_INDICATOR_SELECT_EMPTY } from "@/constants/mop-section07-important-indicators";
import { cn } from "@/utils/Helpers";
import { MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID } from "@/utils/mop-section07-indicator-lucide";

type MopSection07IndicatorIconProps = {
  "aria-hidden"?: boolean;
  "className"?: string;
  "indicatorId": string;
};

export const MopSection07IndicatorIcon = ({
  className,
  "aria-hidden": ariaHidden = true,
  indicatorId,
}: MopSection07IndicatorIconProps) => {
  if (indicatorId === MOP_IMPORTANT_INDICATOR_SELECT_EMPTY) {
    return null;
  }
  const resolved: LucideIcon | undefined =
    MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID[indicatorId as MopImportantIndicatorId];
  const IconComponent: LucideIcon = resolved !== undefined ? resolved : HelpCircle;
  return <IconComponent aria-hidden={ariaHidden} className={cn("shrink-0", className)} />;
};

import type { JSX } from "react";
import * as React from "react";

import { cn } from "@/utils/Helpers";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "caption";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  variant?: TypographyVariant;
}

const variantTagMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  label: "label",
  caption: "p",
};

/** Styles are aligned with the app's current design system (standard Tailwind sizes). */
const variantStyles: Record<TypographyVariant, string> = {
  /** Page titles — used in dashboard headers */
  h1: "text-2xl md:text-3xl font-bold tracking-tight",
  /** Section titles */
  h2: "text-xl md:text-2xl font-semibold tracking-tight",
  /** Card / modal titles */
  h3: "text-lg md:text-xl font-semibold",
  /** Sub-section titles */
  h4: "text-base md:text-lg font-semibold",
  /** Labelled headings */
  h5: "text-sm md:text-base font-semibold",
  /** Small labelled headings */
  h6: "text-xs md:text-sm font-semibold uppercase tracking-wide",
  /** Body text */
  p: "text-sm md:text-base font-normal leading-relaxed",
  /** Inline text */
  span: "text-sm md:text-base font-normal",
  /** Form labels */
  label: "text-sm md:text-base font-medium",
  /** Helper / metadata text */
  caption: "text-xs font-normal text-gray-500",
};

export const Typography = ({
  variant = "p",
  className,
  children,
}: TypographyProps) => {
  const Tag = variantTagMap[variant] as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn("text-gray-900", variantStyles[variant], className)}>
      {children}
    </Tag>
  );
};

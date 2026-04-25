import type { ReactNode } from "react";

import { cn } from "@/utils/Helpers";

export type InfoBannerVariant = "success" | "critical";

type InfoBannerProps = {
  variant: InfoBannerVariant;
  children: ReactNode;
  className?: string;
};

const variantClass: Record<InfoBannerVariant, string> = {
  success:
    "border border-emerald-200 bg-emerald-50 text-emerald-900 [&_a]:text-emerald-800",
  critical: "border border-red-200 bg-red-50 text-red-900 [&_a]:text-red-800",
};

export const InfoBanner = ({ variant, children, className }: InfoBannerProps) => {
  return (
    <div
      role={variant === "critical" ? "alert" : "status"}
      className={cn(
        "rounded-lg px-3 py-2.5 text-sm leading-relaxed",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};

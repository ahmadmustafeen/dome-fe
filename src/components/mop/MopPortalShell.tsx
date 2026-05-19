"use client";

import type { ReactNode } from "react";

import { Typography } from "@/components/common";

type MopPortalShellProps = {
  /** Navy banner title (e.g. Generator Annual Preventative Maintenance). */
  bannerSubtitle: string;
  children: ReactNode;
  type?: string
};

export const MopPortalShell = ({
  bannerSubtitle,
  children,
  type,
}: MopPortalShellProps) => {
  let color = type === 'eop' ? "linear-gradient(to bottom, rgba(74, 20, 20, 0.92) 0%, rgba(107, 31, 31, 0.92) 100%)" : "linear-gradient(to bottom, rgba(10, 40, 22, 0.92) 0%, rgba(16, 64, 35, 0.92) 100%)";
  if (type === 'mop') {
    color = "linear-gradient(to bottom, rgba(10, 22, 40, 0.92) 0%, rgba(16, 35, 64, 0.92) 100%)"
  }
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div
        className="bg-cover bg-center bg-no-repeat px-5 py-7 text-center sm:px-8 sm:py-9"
        style={{
          backgroundImage:
            color,
        }}
      >
        <Typography
          variant="h3"
          className="font-bold tracking-wide text-balance text-white drop-shadow-sm"
        >
          {bannerSubtitle}
        </Typography>
      </div>

      <div className="bg-[#fafafa] px-4 py-5 sm:px-6 sm:py-6">{children}</div>
    </div>
  );
};

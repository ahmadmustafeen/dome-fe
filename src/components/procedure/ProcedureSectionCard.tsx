"use client";

import type { ReactNode } from "react";

import { Typography } from "@/components/common";

type ProcedureSectionCardProps = {
  heading: string;
  children: ReactNode;
};

export const ProcedureSectionCard = ({
  heading,
  children,
}: ProcedureSectionCardProps) => {
  return (
    <div className="rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {heading}
      </Typography>

      {children}
    </div>
  );
};

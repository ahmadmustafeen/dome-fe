"use client";

import type { ReactNode } from "react";

import { Typography } from "@/components/common";

type MopFormTableRowProps = {
  label: string;
  children: ReactNode;
};

/**
 * Label | control: two columns on `md+`, stacked on small screens (portal table layout).
 */
export const MopFormTableRow = ({ label, children }: MopFormTableRowProps) => {
  return (
    <div className="grid grid-cols-1 gap-1.5 border-b border-gray-100 py-2.5 md:grid-cols-[minmax(0,14rem)_1fr] md:items-center md:gap-6">
      <Typography variant="span" className="text-sm text-gray-700">
        {label}
      </Typography>
      <div className="min-w-0">{children}</div>
    </div>
  );
};

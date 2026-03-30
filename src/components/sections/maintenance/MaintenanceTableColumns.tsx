"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronRight } from "lucide-react";

import { CountBadge } from "@/components/common";
import type { MaintenanceRow } from "@/types/maintenance-schedule";

const FrequencyCell = ({ active }: { active: boolean }) =>
  active ? (
    <Check className="mx-auto h-4 w-4 text-teal-500" strokeWidth={3} />
  ) : null;

type Labels = {
  colCategory: string;
  colAssets: string;
  colMonthly: string;
  colQuarterly: string;
  colSemiAnnual: string;
  colAnnual: string;
  colTwoYear: string;
  colThreeYear: string;
  colFiveYear: string;
  colTotalMops: string;
  colTotalEops: string;
  colTotalSops: string;
  colOpenCategory: string;
};

export const getMaintenanceColumns = (
  labels: Labels,
): ColumnDef<MaintenanceRow>[] => [
  {
    id: "category",
    accessorKey: "category",
    header: labels.colCategory,
    cell: ({ row }) => (
      <span className="min-w-[160px] font-medium whitespace-nowrap text-gray-900">
        {row.original.category}
      </span>
    ),
  },
  {
    id: "assetCount",
    accessorKey: "assetCount",
    header: labels.colAssets,
    cell: ({ row }) => (
      <span className="block text-center font-semibold text-gray-700">
        {row.original.assetCount}
      </span>
    ),
  },
  {
    id: "monthly",
    header: labels.colMonthly,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.monthly} />
    ),
  },
  {
    id: "quarterly",
    header: labels.colQuarterly,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.quarterly} />
    ),
  },
  {
    id: "semiAnnual",
    header: labels.colSemiAnnual,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.semiAnnual} />
    ),
  },
  {
    id: "annual",
    header: labels.colAnnual,
    cell: ({ row }) => <FrequencyCell active={row.original.frequency.annual} />,
  },
  {
    id: "twoYear",
    header: labels.colTwoYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.twoYear} />
    ),
  },
  {
    id: "threeYear",
    header: labels.colThreeYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.threeYear} />
    ),
  },
  {
    id: "fiveYear",
    header: labels.colFiveYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.frequency.fiveYear} />
    ),
  },
  {
    id: "totalMOPs",
    accessorKey: "totalMOPs",
    header: labels.colTotalMops,
    cell: ({ row }) => <CountBadge count={row.original.totalMOPs} />,
  },
  {
    id: "totalEOPs",
    accessorKey: "totalEOPs",
    header: labels.colTotalEops,
    cell: ({ row }) => <CountBadge count={row.original.totalEOPs} />,
  },
  {
    id: "totalSOPs",
    accessorKey: "totalSOPs",
    header: labels.colTotalSops,
    cell: ({ row }) => <CountBadge count={row.original.totalSOPs} />,
  },
  {
    id: "openHint",
    header: "",
    cell: () => (
      <span
        className="flex justify-end text-gray-400"
        title={labels.colOpenCategory}
        aria-hidden
      >
        <ChevronRight className="h-5 w-5 shrink-0" />
      </span>
    ),
  },
];

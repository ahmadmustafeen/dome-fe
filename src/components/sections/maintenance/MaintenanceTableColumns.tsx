"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import type { MaintenanceRow } from "@/types/maintenance-schedule";

// ── Small cell helpers ────────────────────────────────────────────────────────

const FrequencyCell = ({ active }: { active: boolean }) =>
  active ? (
    <Check className="mx-auto h-4 w-4 text-teal-500" strokeWidth={3} />
  ) : null;

const CountBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
      {count}
    </span>
  ) : (
    <span className="text-xs text-gray-400">—</span>
  );

// ── Column factory ────────────────────────────────────────────────────────────

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
  colDetails: string;
  btnShowDetails: string;
  btnHideDetails: string;
};

export const getMaintenanceColumns = (
  labels: Labels,
): ColumnDef<MaintenanceRow>[] => [
  {
    id: "category",
    accessorKey: "category",
    header: labels.colCategory,
    cell: ({ row }) => (
      <span className="min-w-[160px] font-medium text-gray-900 whitespace-nowrap">
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
  // ── Frequency columns ───────────────────────────────────────────────────────
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
  // ── Total counts ────────────────────────────────────────────────────────────
  {
    id: "totalMOPs",
    accessorKey: "totalMOPs",
    header: labels.colTotalMops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.totalMOPs} />
      </div>
    ),
  },
  {
    id: "totalEOPs",
    accessorKey: "totalEOPs",
    header: labels.colTotalEops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.totalEOPs} />
      </div>
    ),
  },
  {
    id: "totalSOPs",
    accessorKey: "totalSOPs",
    header: labels.colTotalSops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.totalSOPs} />
      </div>
    ),
  },
  // ── Expand toggle ────────────────────────────────────────────────────────────
  {
    id: "details",
    header: labels.colDetails,
    cell: ({ row }) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          row.toggleExpanded();
        }}
        className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-primary hover:bg-primary hover:text-white"
      >
        {row.getIsExpanded() ? (
          <>
            <ChevronUp className="h-3 w-3" />
            {labels.btnHideDetails}
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3" />
            {labels.btnShowDetails}
          </>
        )}
      </button>
    ),
  },
];

"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

import { AppButton } from "@/components/common";
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
  colSubCategory: string;
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
  colViewDetails: string;
  btnShowDetails: string;
  btnHideDetails: string;
  btnViewDetails: string;
};

type MaintenanceColumnsConfig = {
  labels: Labels;
  onViewDetails: (id: string) => void;
};

export const getMaintenanceColumns = ({
  labels,
  onViewDetails,
}: MaintenanceColumnsConfig): ColumnDef<MaintenanceRow>[] => [
  {
    id: "category",
    accessorKey: "category",
    header: labels.colCategory,
    cell: ({ row }) => (
      <div className="max-w-60 text-ellipsis overflow-clip font-medium text-left whitespace-nowrap text-gray-900">
        {row.original.category}
      </div>
    ),
  },
  {
    id: "subCategory",
    accessorKey: "subCategory",
    header: labels.colSubCategory,
    cell: ({ row }) => (
      <div className="max-w-60 text-ellipsis overflow-clip font-medium text-left whitespace-nowrap text-gray-900">
        {row.original.subCategory}
      </div>
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
      <FrequencyCell active={row.original.monthly} />
    ),
  },
  {
    id: "quarterly",
    header: labels.colQuarterly,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.quarterly} />
    ),
  },
  {
    id: "semiAnnual",
    header: labels.colSemiAnnual,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.semiAnnual} />
    ),
  },
  {
    id: "annual",
    header: labels.colAnnual,
    cell: ({ row }) => <FrequencyCell active={row.original.annual} />,
  },
  {
    id: "twoYear",
    header: labels.colTwoYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.twoYear} />
    ),
  },
  {
    id: "threeYear",
    header: labels.colThreeYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.threeYear} />
    ),
  },
  {
    id: "fiveYear",
    header: labels.colFiveYear,
    cell: ({ row }) => (
      <FrequencyCell active={row.original.fiveYear} />
    ),
  },
  // ── Total counts ────────────────────────────────────────────────────────────
  {
    id: "totalMOPs",
    accessorKey: "totalMOPs",
    header: labels.colTotalMops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.MOPs.length} />
      </div>
    ),
  },
  {
    id: "totalEOPs",
    accessorKey: "totalEOPs",
    header: labels.colTotalEops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.EOPs.length} />
      </div>
    ),
  },
  {
    id: "totalSOPs",
    accessorKey: "totalSOPs",
    header: labels.colTotalSops,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CountBadge count={row.original.SOPs.length} />
      </div>
    ),
  },
  // ── Expand toggle ─────────────────────────────────────────────────────────
  {
    id: "details",
    header: labels.colDetails,
    cell: ({ row }) => (
      <AppButton
        variant="default"
        icon={
          row.getIsExpanded() ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )
        }
        title={
          row.getIsExpanded() ? labels.btnHideDetails : labels.btnShowDetails
        }
        onClick={() => row.toggleExpanded()}
      />
    ),
  },
  // ── View Details navigation ──────────────────────────────────────────────
  {
    id: "viewDetails",
    header: labels.colViewDetails,
    cell: ({ row }) => (
      <AppButton
        variant="secondary"
        icon={<ExternalLink className="size-5" />}
        title={'view'}
        onClick={() => onViewDetails(row.original._id)}
      />
    ),
  },
];
"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

import { AppButton } from "@/components/common";
import type { ProcedureEstimationRow } from "@/types/procedure-estimation";

// ── Small cell helpers ────────────────────────────────────────────────────────

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
  colCount: string;
  colMake: string;
  colTotalMops: string;
  colDescription: string
  colTotalEops: string;
  colTotalSops: string;
  colDetails: string;
  colViewDetails: string;
  btnShowDetails: string;
  btnHideDetails: string;
  btnViewDetails: string;
};

type ProcedureEstimationColumnsConfig = {
  labels: Labels;
  onViewDetails: (id: string) => void;
};

export const getProcedureEstimationColumns = ({
  labels,
  onViewDetails,
}: ProcedureEstimationColumnsConfig): ColumnDef<ProcedureEstimationRow>[] => [
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
      id: "make",
      accessorKey: "make",
      header: labels.colMake,
      cell: ({ row }) => (
        <div className="max-w-60 overflow-clip font-medium whitespace-nowrap text-gray-900">
          {row.original.make}
        </div>
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      header: labels.colDescription,
      cell: ({ row }) => (
        <div className="max-w-60 overflow-clip font-medium whitespace-nowrap text-gray-900">
          {row.original.description}
        </div>
      ),
    },
    {
      id: "assetCount",
      accessorKey: "count",
      header: labels.colCount,
      cell: ({ row }) => (
        <span className="block text-center font-semibold text-gray-700">
          {row.original.count}
        </span>
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
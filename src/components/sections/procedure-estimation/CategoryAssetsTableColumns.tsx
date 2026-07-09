"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { CountBadge } from "@/components/common";
import type { CategoryAsset } from "@/types/procedure-estimation";

type CategoryAssetColumnLabels = {
  colAssetId: string;
  colAssetName: string;
  colLocation: string;
  colSerial: string;
  colMops: string;
  colEops: string;
  colSops: string;
  colExpandHint: string;
};

export const getCategoryAssetColumns = (
  labels: CategoryAssetColumnLabels,
): ColumnDef<CategoryAsset>[] => [
  {
    id: "assetId",
    accessorKey: "assetId",
    header: labels.colAssetId,
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-700">
        {row.original.assetId}
      </span>
    ),
  },
  {
    id: "assetName",
    accessorKey: "assetName",
    header: labels.colAssetName,
    cell: ({ row }) => (
      <span
        className="block max-w-[200px] truncate text-sm font-semibold text-gray-900"
        title={row.original.assetName}
      >
        {row.original.assetName}
      </span>
    ),
  },
  {
    id: "location",
    accessorKey: "location",
    header: labels.colLocation,
    cell: ({ row }) => (
      <span
        className="block max-w-[180px] truncate text-sm text-gray-600"
        title={row.original.location}
      >
        {row.original.location}
      </span>
    ),
  },
  {
    id: "serialNumber",
    accessorKey: "serialNumber",
    header: labels.colSerial,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.serialNumber}</span>
    ),
  },
  {
    id: "mops",
    header: labels.colMops,
    cell: ({ row }) => <CountBadge count={row.original.mops.length} />,
  },
  {
    id: "eops",
    header: labels.colEops,
    cell: ({ row }) => <CountBadge count={row.original.eops.length} />,
  },
  {
    id: "sops",
    header: labels.colSops,
    cell: ({ row }) => <CountBadge count={row.original.sops.length} />,
  },
  {
    id: "expandHint",
    header: "",
    cell: ({ row }) => (
      <span
        className="flex justify-end text-gray-400"
        title={labels.colExpandHint}
        aria-hidden
      >
        {row.getIsExpanded() ? (
          <ChevronUp className="h-5 w-5 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0" />
        )}
      </span>
    ),
  },
];

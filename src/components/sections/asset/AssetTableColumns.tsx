"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import type { Asset } from "@/components/asset/CreateAssetModal";

type AssetColumnHandlers = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  labels: {
    colAssetId: string;
    colAssetName: string;
    colCategory: string;
    colSubCategory: string;
    colEquipmentName: string;
    colMake: string;
    colModel: string;
    colLocation: string;
    colSerial: string;
    colActions: string;
    actionEdit: string;
    actionDelete: string;
  };
};

export const getAssetColumns = ({
  onEdit,
  onDelete,
  labels,
}: AssetColumnHandlers): ColumnDef<Asset>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        ref={(el) => {
          if (el) {
            el.indeterminate =
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected();
          }
        }}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 cursor-pointer rounded border-gray-500 accent-primary"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
        className="h-4 w-4 cursor-pointer rounded border-gray-500 accent-primary"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "assetId",
    accessorKey: "assetId",
    header: labels.colAssetId,
    cell: ({ row }) => (
      <span
        className="block max-w-30 truncate text-sm text-gray-700"
        title={row.original.assetId}
      >
        {row.original.assetId || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "assetName",
    accessorKey: "assetName",
    header: labels.colAssetName,
    cell: ({ row }) => (
      <span
        className="block max-w-[160px] truncate text-sm font-medium text-gray-900"
        title={row.original.assetName}
      >
        {row.original.assetName || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: labels.colCategory,
    cell: ({ row }) => (
      <span
        className="block max-w-[140px] truncate text-sm text-gray-700"
        title={row.original.category}
      >
        {row.original.category || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "subCategory",
    accessorKey: "subCategory",
    header: labels.colSubCategory,
    cell: ({ row }) => (
      <span
        className="block max-w-[140px] truncate text-sm text-gray-700"
        title={row.original.subCategory}
      >
        {row.original.subCategory || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "equipmentName",
    accessorKey: "equipmentName",
    header: labels.colEquipmentName,
    cell: ({ row }) => (
      <span
        className="block max-w-[160px] truncate text-sm text-gray-700"
        title={row.original.equipmentName}
      >
        {row.original.equipmentName || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "make",
    accessorKey: "make",
    header: labels.colMake,
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.make || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "modelName",
    accessorKey: "modelName",
    header: labels.colModel,
    cell: ({ row }) => (
      <span
        className="block max-w-[120px] truncate text-sm text-gray-700"
        title={row.original.modelName}
      >
        {row.original.modelName || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "location",
    accessorKey: "location",
    header: labels.colLocation,
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.location || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "serialNumber",
    accessorKey: "serialNumber",
    header: labels.colSerial,
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.serialNumber || (
          <span className="text-red-400 italic">Missing</span>
        )}
      </span>
    ),
  },
  {
    id: "actions",
    header: labels.colActions,
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            title={labels.actionEdit}
            className="flex cursor-pointer items-center gap-1 rounded bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
          >
            <Pencil className="h-3.5 w-3.5" />
            {labels.actionEdit}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title={labels.actionDelete}
            className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {labels.actionDelete}
          </button>
        </div>
      );
    },
  },
];

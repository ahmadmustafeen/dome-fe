"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, FilePlus } from "lucide-react";

import type {
  CategoryAsset,
  ProcedureItem,
  ProcedureKind,
} from "@/types/maintenance-schedule";

// ── Helpers ──────────────────────────────────────────────────────────────────

const getGeneratedCount = (items: ProcedureItem[]) =>
  items.filter((i) => i.generated).length;

const getFirstDocUrl = (items: ProcedureItem[]) =>
  items.find((i) => i.generated && i.documentUrl)?.documentUrl;

// ── Procedure progress cell ───────────────────────────────────────────────────

type ProcedureCellProps = {
  items: ProcedureItem[];
  label: string;
  onGenerate: () => void;
};

const ProcedureCell = ({ items, label, onGenerate }: ProcedureCellProps) => {
  if (items.length === 0) {
    return <span className="text-xs text-gray-400">—</span>;
  }

  const generatedCount = getGeneratedCount(items);
  const docUrl = getFirstDocUrl(items);
  const hasGenerated = generatedCount > 0;

  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className={`text-xs font-semibold ${
          generatedCount === items.length
            ? "text-teal-600"
            : generatedCount > 0
              ? "text-amber-600"
              : "text-gray-500"
        }`}
        title={`${generatedCount} of ${items.length} ${label} generated`}
      >
        {generatedCount}/{items.length}
      </span>
      {hasGenerated ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(docUrl ?? "#", "_blank", "noopener,noreferrer");
          }}
          title={`View ${label} document`}
          className="rounded p-0.5 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerate();
          }}
          title={`Generate ${label}`}
          className="rounded p-0.5 text-primary transition-colors hover:bg-primary/10"
        >
          <FilePlus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

// ── Column factory ────────────────────────────────────────────────────────────

type CategoryAssetColumnHandlers = {
  onGenerate: (assetId: string, type: ProcedureKind) => void;
  labels: {
    colAssetId: string;
    colAssetName: string;
    colLocation: string;
    colSerial: string;
    colMops: string;
    colEops: string;
    colSops: string;
  };
};

export const getCategoryAssetColumns = ({
  onGenerate,
  labels,
}: CategoryAssetColumnHandlers): ColumnDef<CategoryAsset>[] => [
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
    cell: ({ row }) => (
      <ProcedureCell
        items={row.original.mops}
        label="MOP"
        onGenerate={() => onGenerate(row.original.id, "mop")}
      />
    ),
  },
  {
    id: "eops",
    header: labels.colEops,
    cell: ({ row }) => (
      <ProcedureCell
        items={row.original.eops}
        label="EOP"
        onGenerate={() => onGenerate(row.original.id, "eop")}
      />
    ),
  },
  {
    id: "sops",
    header: labels.colSops,
    cell: ({ row }) => (
      <ProcedureCell
        items={row.original.sops}
        label="SOP"
        onGenerate={() => onGenerate(row.original.id, "sop")}
      />
    ),
  },
];

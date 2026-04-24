"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Trash2 } from "lucide-react";

import { FileTypeIcon } from "@/components/document";
import { DOCUMENT_TYPE_BADGE } from "@/constants/document-management";
import type { DocumentApiRecord, DocumentType } from "@/types/document";
import {
  extractDocumentName,
  extractFileExtension,
  formatDate,
} from "@/utils/formatters";

type ActionHandlers = {
  onView: (doc: DocumentApiRecord) => void;
  onDownload: (doc: DocumentApiRecord) => void;
  onDelete: (doc: DocumentApiRecord) => void;
  isDeleting: boolean;
  labels: {
    colName: string;
    colType: string;
    colDate: string;
    ingested: string;
    colActions: string;
    actionView: string;
    actionDownload: string;
    actionDelete: string;
  };
};

export const getDocumentColumns = ({
  onView,
  onDownload,
  onDelete,
  isDeleting,
  labels,
}: ActionHandlers): ColumnDef<DocumentApiRecord>[] => [
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
      id: "name",
      header: labels.colName,
      cell: ({ row }) => {
        const name = extractDocumentName(row.original.documentUrl);
        const ext = extractFileExtension(row.original.documentUrl);
        return (
          <div className="flex items-center gap-2">
            <FileTypeIcon ext={ext} />
            <span
              className="max-w-[220px] truncate text-sm font-medium text-gray-900"
              title={name}
            >
              {name}
            </span>
          </div>
        );
      },
    },
    {
      id: "type",
      header: labels.colType,
      cell: ({ row }) => {
        const { type } = row.original;
        return (
          <span
            className={`inline-block max-w-[200px] truncate rounded-full px-2.5 py-1 text-xs font-medium ${DOCUMENT_TYPE_BADGE[type as DocumentType] ??
              "bg-gray-100 text-gray-700"
              }`}
            title={type}
          >
            {type}
          </span>
        );
      },
    },
    {
      id: "date",
      accessorKey: "createdAt",
      header: labels.colDate,
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "ingested",
      accessorKey: "ingested",
      header: labels.ingested,
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {!!row.original.ingested ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      header: labels.colActions,
      cell: ({ row }) => {
        const doc = row.original;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(doc);
              }}
              title={labels.actionView}
              className="flex cursor-pointer items-center gap-1 rounded bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
            >
              <Eye className="h-3.5 w-3.5" />
              {labels.actionView}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(doc);
              }}
              title={labels.actionDownload}
              className="flex cursor-pointer items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              {labels.actionDownload}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(doc);
              }}
              disabled={isDeleting}
              title={labels.actionDelete}
              className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {labels.actionDelete}
            </button>
          </div>
        );
      },
    },
  ];

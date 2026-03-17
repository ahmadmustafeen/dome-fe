import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/Helpers";

import { BodyContent } from "./BodyContent";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Optional: provide a stable row ID from the data (e.g. (row) => row._id) */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  setTablesState?: React.Dispatch<
    React.SetStateAction<TanStackTable<TData> | null>
  >;
  handleRowClick?: (data: TData) => void;
  cellClassName?: string;
  loading?: boolean;
  noDataMessage?: string;
  /** Outer scrollable container */
  className?: string;
  /** <table> element */
  tableClassName?: string;
  /** Header <tr> */
  headerRowClassName?: string;
  /** Header <th> */
  headerCellClassName?: string;
  /** Body <tr> */
  bodyRowClassName?: string;
  /** Body <td> */
  bodyCellClassName?: string;
  /** Controlled row selection state (optional – use for external checkbox management) */
  rowSelection?: RowSelectionState;
  onRowSelectionStateChange?: React.Dispatch<
    React.SetStateAction<RowSelectionState>
  >;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  getRowId,
  loading,
  cellClassName,
  handleRowClick,
  setTablesState,
  onRowSelectionChange,
  noDataMessage,
  className,
  tableClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
  rowSelection: externalRowSelection,
  onRowSelectionStateChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});

  const rowSelection = externalRowSelection ?? internalRowSelection;
  const setRowSelection = onRowSelectionStateChange ?? setInternalRowSelection;

  const table = useReactTable({
    data,
    columns,
    getRowId,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    onRowSelectionChange?.(selectedRows);
  }, [rowSelection, onRowSelectionChange, table]);

  useEffect(() => {
    if (setTablesState) {
      const timer = setTimeout(() => setTablesState(table), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [table, setTablesState]);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <Table className={cn("w-full border-collapse", tableClassName)}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn(
                "border-b border-slate-800 bg-slate-900",
                headerRowClassName,
              )}
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-semibold tracking-wider text-white whitespace-nowrap",
                    header.id === "select" && "w-10",
                    headerCellClassName,
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <BodyContent
            table={table}
            cellClassName={cellClassName}
            columnsLength={columns.length}
            handleTableRowClick={handleRowClick}
            loading={loading}
            noDataMessage={noDataMessage}
            bodyRowClassName={bodyRowClassName}
            bodyCellClassName={bodyCellClassName}
          />
        </TableBody>
      </Table>
    </div>
  );
}

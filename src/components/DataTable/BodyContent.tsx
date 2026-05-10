import type { Row, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { Fragment } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { LOADING_STATE } from "@/constants/common";
import { cn } from "@/utils/Helpers";

import StateIndicator from "../common/StateIndicator";

interface BodyContentProps<TData> {
  table: Table<TData>;
  handleTableRowClick?: (data: TData) => void;
  onRowActivate?: (row: Row<TData>) => void;
  columnsLength: number;
  cellClassName?: string;
  loading?: boolean;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
  noDataMessage?: string;
  /** Optional: render expanded detail content below a row when it is expanded */
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

export function BodyContent<TData>({
  table,
  handleTableRowClick,
  onRowActivate,
  columnsLength,
  cellClassName,
  loading,
  bodyRowClassName = "",
  bodyCellClassName = "",
  noDataMessage,
  renderSubRow,
}: BodyContentProps<TData>) {
  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={columnsLength} className="h-24">
          <StateIndicator state={LOADING_STATE.LOADING} />
        </TableCell>
      </TableRow>
    );
  }



  if (!table.getRowModel().rows?.length) {

    return (
      <TableRow>
        <TableCell colSpan={columnsLength} className="h-24 text-center">
          <StateIndicator
            state={LOADING_STATE.EMPTY}
            noDataMessage={noDataMessage}
          />
        </TableCell>
      </TableRow>
    );
  }

  const rows = table.getRowModel().rows


  return rows?.map((row) => (

    <Fragment key={row.id}>
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() ? "selected" : undefined}
        onClick={() => {
          if (onRowActivate) {
            onRowActivate(row);
            return;
          }
          handleTableRowClick?.(row.original);
        }}
        className={cn(
          "transition-colors",
          (onRowActivate || handleTableRowClick) && "cursor-pointer",
          row.getIsSelected() && "bg-primary/10",
          bodyRowClassName,
        )}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={cn(
              "px-4 py-3 text-sm",
              cellClassName,
              bodyCellClassName,
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {/* Expanded sub-row */}
      {renderSubRow && row.getIsExpanded() && (
        <TableRow className="bg-slate-50 hover:bg-slate-50">
          <TableCell colSpan={columnsLength} className="px-6 py-5">
            {renderSubRow(row)}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  ))


}




import { flexRender, type Table } from '@tanstack/react-table';

import { TableCell, TableRow } from '@/components/ui/table';
import { LOADING_STATE } from '@/constants/common';
import { cn } from '@/utils/Helpers';

import StateIndicator from '../common/StateIndicator';

interface BodyContentProps<TData> {
  table: Table<TData>;
  handleTableRowClick?: (data: TData) => void;
  columnsLength: number;
  cellClassName?: string;
  loading?: boolean;
  bodyRowClassName?: string;
  bodyCellClassName?: string;
  noDataMessage?: string;
}

export function BodyContent<TData>({
  table,
  handleTableRowClick,
  columnsLength,
  cellClassName,
  loading,
  bodyRowClassName = '',
  bodyCellClassName = '',
  noDataMessage,
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
          <StateIndicator state={LOADING_STATE.EMPTY} noDataMessage={noDataMessage} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? 'selected' : undefined}
          onClick={() => handleTableRowClick?.(row.original)}
          className={cn(
            'transition-colors',
            handleTableRowClick && 'cursor-pointer',
            row.getIsSelected() && 'bg-primary/10',
            bodyRowClassName,
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                'px-4 py-3 text-sm',
                cellClassName,
                bodyCellClassName,
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

"use client";

import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { Textarea } from "@/components/ui/Textarea";
import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";
import {
  insertProcedureRowAfterId,
  removeProcedureRowById,
} from "@/utils/procedure-dynamic-table-mutations";

export type ProcedureFixedStepEditableColumn<
  TRow extends { id: string; step: number },
  TField extends keyof Omit<TRow, "id" | "step"> & string,
> = {
  header: string;
  field: TField;
};

type ProcedureFixedStepEditableRowsTableProps<
  TRow extends { id: string; step: number },
  TField extends keyof Omit<TRow, "id" | "step"> & string,
> = {
  rows: TRow[];
  columns: readonly ProcedureFixedStepEditableColumn<TRow, TField>[];
  ariaLabelGroup: string;
  newRow: () => TRow;
  onRowsChange: (rows: TRow[]) => void;
  className?: string;
};

const renumberRows = <TRow extends { step: number }>(rows: TRow[]): TRow[] =>
  rows?.map((row, index) => ({ ...row, step: index + 1 }));

const patchCell = <
  TRow extends { id: string; step: number },
  TField extends keyof Omit<TRow, "id" | "step"> & string,
>(
  rows: TRow[],
  rowId: string,
  field: TField,
  value: string,
): TRow[] =>
  rows?.map((row) =>
    row.id === rowId ? ({ ...row, [field]: value } as TRow) : row,
  );

export const ProcedureFixedStepEditableRowsTable = <
  TRow extends { id: string; step: number },
  TField extends keyof Omit<TRow, "id" | "step"> & string,
>({
  rows,
  columns,
  ariaLabelGroup,
  newRow,
  onRowsChange,
  className
}: ProcedureFixedStepEditableRowsTableProps<TRow, TField>) => {
  const normalizedRows = renumberRows(rows);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className={`bg-[#0f3456] text-white ${className}`}>
            <th className="w-16 px-3 py-2 text-center font-semibold">Step</th>
            {columns.map((column) => (
              <th key={column.field} className="px-3 py-2 text-left font-semibold">
                {column.header}
              </th>
            ))}
            <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
              +-
            </th>
          </tr>
        </thead>
        <tbody>
          {normalizedRows?.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 text-center align-top text-gray-900">
                {row.step}
              </td>
              {columns.map((column) => (
                <td
                  key={column.field}
                  className="border border-gray-200 px-2 py-1 align-top"
                >
                  <Textarea
                    value={String(row[column.field])}
                    onChange={(event) =>
                      onRowsChange(
                        renumberRows(
                          patchCell(
                            normalizedRows,
                            row.id,
                            column.field,
                            event.target.value,
                          ),
                        ),
                      )}
                    className="min-h-24 w-full"
                  />
                </td>
              ))}
              <td className="border border-gray-200 px-1 align-middle">
                <ProcedureDynamicTableRowControls
                  ariaLabelGroup={ariaLabelGroup}
                  rowCount={normalizedRows.length}
                  onAddBelow={() =>
                    onRowsChange(
                      renumberRows(
                        insertProcedureRowAfterId(normalizedRows, row.id, newRow()),
                      ),
                    )}
                  onRemove={() => {
                    const next = removeProcedureRowById(
                      normalizedRows,
                      row.id,
                      PROCEDURE_DYNAMIC_TABLE_MIN_ROWS,
                    );
                    if (next !== undefined) {
                      onRowsChange(renumberRows(next));
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

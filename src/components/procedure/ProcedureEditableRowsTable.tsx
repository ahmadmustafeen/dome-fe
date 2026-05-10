"use client";

import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { Textarea } from "@/components/ui/Textarea";
import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";
import {
  insertProcedureRowAfterId,
  removeProcedureRowById,
} from "@/utils/procedure-dynamic-table-mutations";

export type ProcedureEditableColumn<
  TRow extends { id: string },
  TField extends keyof TRow & string,
> = {
  header: string;
  field: TField;
};

type ProcedureEditableRowsTableProps<
  TRow extends { id: string },
  TField extends keyof TRow & string,
> = {
  rows: TRow[];
  columns: readonly ProcedureEditableColumn<TRow, TField>[];
  ariaLabelGroup: string;
  newRow: () => TRow;
  onRowsChange: (rows: TRow[]) => void;
};

const patchCell = <
  TRow extends { id: string },
  TField extends keyof TRow & string,
>(
  rows: TRow[],
  rowId: string,
  field: TField,
  value: string,
): TRow[] => {
  return rows.map((row) =>
    row.id === rowId ? ({ ...row, [field]: value } as TRow) : row,
  );
};

export const ProcedureEditableRowsTable = <
  TRow extends { id: string },
  TField extends keyof TRow & string,
>({
  rows,
  columns,
  ariaLabelGroup,
  newRow,
  onRowsChange,
}: ProcedureEditableRowsTableProps<TRow, TField>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
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
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              {columns.map((column) => (
                <td
                  key={column.field}
                  className="border border-gray-200 px-2 py-1 align-top"
                >
                  <Textarea
                    value={String(row[column.field])}
                    onChange={(event) =>
                      onRowsChange(
                        patchCell(
                          rows,
                          row.id,
                          column.field,
                          event.target.value,
                        ),
                      )}
                    className="min-h-24 w-full"
                  />
                </td>
              ))}
              <td className="border border-gray-200 px-1 align-middle">
                <ProcedureDynamicTableRowControls
                  ariaLabelGroup={ariaLabelGroup}
                  rowCount={rows.length}
                  onAddBelow={() =>
                    onRowsChange(insertProcedureRowAfterId(rows, row.id, newRow()))}
                  onRemove={() => {
                    const next = removeProcedureRowById(
                      rows,
                      row.id,
                      PROCEDURE_DYNAMIC_TABLE_MIN_ROWS,
                    );
                    if (next !== undefined) {
                      onRowsChange(next);
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

"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { newEopSection07FunctionalityRow } from "@/constants/eop-section07-recovery";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type {
  EopDiagnosticPassFail,
  EopSection07FunctionalityRow,
} from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";
import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection07FunctionalityTableProps = {
  rows: EopSection07FunctionalityRow[];
  onRowsChange: (rows: EopSection07FunctionalityRow[]) => void;
};

const updateRow = (
  rows: EopSection07FunctionalityRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection07FunctionalityRow,
      | "parameter"
      | "expectedRange"
      | "actualReading"
      | "actualReadingPlaceholder"
      | "passFail"
    >
  >,
): EopSection07FunctionalityRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection07FunctionalityTable = ({
  rows,
  onRowsChange,
}: EopSection07FunctionalityTableProps) => (
  <div className="mt-4 overflow-x-auto">
    <table className="w-full min-w-[820px] border-collapse text-sm">
      <thead>
        <tr className="bg-[#0f3456] text-white">
          <th className="px-3 py-2 text-left font-semibold">Parameter</th>
          <th className="px-3 py-2 text-left font-semibold">Expected Range</th>
          <th className="px-3 py-2 text-left font-semibold">Actual Reading</th>
          <th className="w-28 px-3 py-2 text-left font-semibold">Pass/Fail</th>
          <th
            scope="col"
            className="w-17 px-1 py-2 text-center text-xs font-semibold"
          >
            +-
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="bg-white">
            <td className="border border-gray-200 px-2 py-1 align-top">
              <Textarea
                value={row.parameter}
                onChange={(event) =>
                  onRowsChange(
                    updateRow(rows, row.id, {
                      parameter: event.target.value,
                    }),
                  )
                }
                placeholder="Critical parameter name"
                className="min-h-16 w-full"
              />
            </td>
            <td className="border border-gray-200 px-2 py-1 align-top">
              <Textarea
                value={row.expectedRange}
                onChange={(event) =>
                  onRowsChange(
                    updateRow(rows, row.id, {
                      expectedRange: event.target.value,
                    }),
                  )
                }
                placeholder="Nominal limits"
                className="min-h-16 w-full"
              />
            </td>
            <td className="border border-gray-200 px-2 py-1 align-top">
              <Input
                value={row.actualReading}
                onChange={(event) =>
                  onRowsChange(
                    updateRow(rows, row.id, {
                      actualReading: event.target.value,
                    }),
                  )
                }
                placeholder={row.actualReadingPlaceholder}
                className="w-full"
              />
            </td>
            <td className="border border-gray-200 px-2 py-2 align-top">
              <EopPassFailCheckboxes
                value={row.passFail}
                onChange={(value: EopDiagnosticPassFail) =>
                  onRowsChange(updateRow(rows, row.id, { passFail: value }))
                }
              />
            </td>
            <td className="border border-gray-200 px-1 align-middle">
              <MopDynamicTableRowControls
                ariaLabelGroup="EOP system functionality row controls"
                rowCount={rows.length}
                onAddBelow={() =>
                  onRowsChange(
                    insertRowAfterId(
                      rows,
                      row.id,
                      newEopSection07FunctionalityRow(),
                    ),
                  )
                }
                onRemove={() => {
                  const next = removeRowById(
                    rows,
                    row.id,
                    MOP_DYNAMIC_TABLE_MIN_ROWS,
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

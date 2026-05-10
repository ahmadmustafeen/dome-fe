"use client";

import { Input } from "@/components/ui/Input";
import type {
  EopDiagnosticPassFail,
  EopSection07FunctionalityRow,
} from "@/types/eop";

import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection07FunctionalityTableProps = {
  rows: EopSection07FunctionalityRow[];
  onRowsChange: (rows: EopSection07FunctionalityRow[]) => void;
};

const updateRow = (
  rows: EopSection07FunctionalityRow[],
  rowId: string,
  partial: Partial<
    Pick<EopSection07FunctionalityRow, "actualReading" | "passFail">
  >,
): EopSection07FunctionalityRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection07FunctionalityTable = ({
  rows,
  onRowsChange,
}: EopSection07FunctionalityTableProps) => (
  <div className="mt-4 overflow-x-auto">
    <table className="w-full min-w-[760px] border-collapse text-sm">
      <thead>
        <tr className="bg-[#0f3456] text-white">
          <th className="px-3 py-2 text-left font-semibold">Parameter</th>
          <th className="px-3 py-2 text-left font-semibold">Expected Range</th>
          <th className="px-3 py-2 text-left font-semibold">Actual Reading</th>
          <th className="w-28 px-3 py-2 text-left font-semibold">Pass/Fail</th>
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr key={row.id} className="bg-white">
            <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
              {row.parameter}
            </td>
            <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
              {row.expectedRange}
            </td>
            <td className="border border-gray-200 px-2 py-1 align-top">
              <Input
                value={row.actualReading}
                onChange={(event) => (
                  onRowsChange(
                    updateRow(rows, row.id, {
                      actualReading: event.target.value,
                    }),
                  )
                )}
                placeholder={row.actualReadingPlaceholder}
                className="w-full"
              />
            </td>
            <td className="border border-gray-200 px-2 py-2 align-top">
              <EopPassFailCheckboxes
                value={row.passFail}
                onChange={(value: EopDiagnosticPassFail) => (
                  onRowsChange(updateRow(rows, row.id, { passFail: value }))
                )}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

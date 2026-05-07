"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_04_TOOLS_HEADING } from "@/constants/eop-section04-immediate-actions";
import type { EOPSection04PreActionSafety, EopSection04ToolRow } from "@/types/eop";

type EopSection04ToolsTableProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
};

const updateRow = (
  rows: EopSection04ToolRow[],
  rowId: string,
  partial: Partial<Pick<EopSection04ToolRow, "available">>,
): EopSection04ToolRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection04ToolsTable = ({
  preActionSafety,
  patchPreActionSafety,
}: EopSection04ToolsTableProps) => {
  const rows = preActionSafety.toolRows;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {EOP_SECTION_04_TOOLS_HEADING}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Tool/Equipment</th>
              <th className="px-3 py-2 text-left font-semibold">
                Specific Model/Type for HS29-060-13G
              </th>
              <th className="w-28 px-3 py-2 text-center font-semibold">Available</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  {row.tool}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.modelType}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center align-middle">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={row.available}
                    onChange={(e) =>
                      patchPreActionSafety({
                        toolRows: updateRow(rows, row.id, { available: e.target.checked }),
                      })
                    }
                    aria-label={`${row.tool} available`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

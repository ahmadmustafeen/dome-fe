"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_04_TOOLS_HEADING,
  newEopSection04ToolRow,
} from "@/constants/eop-section04-immediate-actions";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { EOPSection04PreActionSafety, EopSection04ToolRow } from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";

type EopSection04ToolsTableProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
  assetName?: string;
};

const updateRow = (
  rows: EopSection04ToolRow[],
  rowId: string,
  partial: Partial<Pick<EopSection04ToolRow, "available" | "modelType" | "tool">>,
): EopSection04ToolRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection04ToolsTable = ({
  preActionSafety,
  patchPreActionSafety,
  assetName
}: EopSection04ToolsTableProps) => {
  const rows = preActionSafety?.toolRows;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {`Required Tools & Test Equipment for ${assetName}`}
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
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                +-
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  <Textarea
                    value={row.tool}
                    onChange={(e) =>
                      patchPreActionSafety({
                        toolRows: updateRow(rows, row.id, {
                          tool: e.target.value,
                        }),
                      })}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.modelType}
                    onChange={(e) =>
                      patchPreActionSafety({
                        toolRows: updateRow(rows, row.id, {
                          modelType: e.target.value,
                        }),
                      })}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center align-middle">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={row.available}
                    onChange={(e) =>
                      patchPreActionSafety({
                        toolRows: updateRow(rows, row.id, { available: e.target.checked }),
                      })}
                    aria-label={`${row.tool} available`}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="EOP tools table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchPreActionSafety({
                        toolRows: insertRowAfterId(
                          rows,
                          row.id,
                          newEopSection04ToolRow(),
                        ),
                      })}
                    onRemove={() => {
                      const next = removeRowById(
                        rows,
                        row.id,
                        MOP_DYNAMIC_TABLE_MIN_ROWS,
                      );
                      if (next !== undefined) {
                        patchPreActionSafety({ toolRows: next });
                      }
                    }}
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

"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  newEopSection04PpeRow,
} from "@/constants/eop-section04-immediate-actions";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { EopSection04PpeRow, EOPSection04PreActionSafety } from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";

type EopSection04PpeTableProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
  assetName?: string
};

const updateRow = (
  rows: EopSection04PpeRow[],
  rowId: string,
  partial: Partial<Pick<EopSection04PpeRow, "ppeItem" | "specification" | "verified">>,
): EopSection04PpeRow[] => rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection04PpeTable = ({
  preActionSafety,
  patchPreActionSafety,
  assetName,
}: EopSection04PpeTableProps) => {
  const rows = preActionSafety?.ppeRows;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {`Equipment-Specific PPE Requirements for ${assetName}`}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-170 border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">PPE Item</th>
              <th className="px-3 py-2 text-left font-semibold">
                Specification for HS29-060-13G
              </th>
              <th className="w-28 px-3 py-2 text-center font-semibold">Verified</th>
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
                    value={row.ppeItem}
                    onChange={(e) =>
                      patchPreActionSafety({
                        ppeRows: updateRow(rows, row.id, {
                          ppeItem: e.target.value,
                        }),
                      })}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.specification}
                    onChange={(e) =>
                      patchPreActionSafety({
                        ppeRows: updateRow(rows, row.id, {
                          specification: e.target.value,
                        }),
                      })}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center align-middle">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={row.verified}
                    onChange={(e) =>
                      patchPreActionSafety({
                        ppeRows: updateRow(rows, row.id, { verified: e.target.checked }),
                      })}
                    aria-label={`${row.ppeItem} verified`}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="EOP PPE table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchPreActionSafety({
                        ppeRows: insertRowAfterId(
                          rows,
                          row.id,
                          newEopSection04PpeRow(),
                        ),
                      })}
                    onRemove={() => {
                      const next = removeRowById(
                        rows,
                        row.id,
                        MOP_DYNAMIC_TABLE_MIN_ROWS,
                      );
                      if (next !== undefined) {
                        patchPreActionSafety({ ppeRows: next });
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

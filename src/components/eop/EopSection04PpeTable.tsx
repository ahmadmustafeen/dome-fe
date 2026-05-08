"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_04_PPE_HEADING } from "@/constants/eop-section04-immediate-actions";
import type { EOPSection04PreActionSafety, EopSection04PpeRow } from "@/types/eop";

type EopSection04PpeTableProps = {
  preActionSafety: EOPSection04PreActionSafety;
  patchPreActionSafety: (p: Partial<EOPSection04PreActionSafety>) => void;
};

const updateRow = (
  rows: EopSection04PpeRow[],
  rowId: string,
  partial: Partial<Pick<EopSection04PpeRow, "verified">>,
): EopSection04PpeRow[] => rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection04PpeTable = ({
  preActionSafety,
  patchPreActionSafety,
}: EopSection04PpeTableProps) => {
  const rows = preActionSafety.ppeRows;

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {EOP_SECTION_04_PPE_HEADING}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">PPE Item</th>
              <th className="px-3 py-2 text-left font-semibold">
                Specification for HS29-060-13G
              </th>
              <th className="w-28 px-3 py-2 text-center font-semibold">Verified</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  {row.ppeItem}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.specification}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-center align-middle">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={row.verified}
                    onChange={(e) =>
                      patchPreActionSafety({
                        ppeRows: updateRow(rows, row.id, { verified: e.target.checked }),
                      })
                    }
                    aria-label={`${row.ppeItem} verified`}
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

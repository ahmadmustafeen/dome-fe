"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_08_SPARE_PARTS_HEADING,
  newEopSection08SparePartRow,
} from "@/constants/eop-section08-supporting-information";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { EopSection08SparePartRow } from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";

type EopSection08SparePartsTableProps = {
  rows: EopSection08SparePartRow[];
  intro: string;
  onRowsChange: (rows: EopSection08SparePartRow[]) => void;
};

const updateRow = (
  rows: EopSection08SparePartRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection08SparePartRow,
      "partDescription" | "partNumber" | "quantity" | "storageLocation"
    >
  >,
): EopSection08SparePartRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection08SparePartsTable = ({
  rows,
  intro,
  onRowsChange,
}: EopSection08SparePartsTableProps) => (
  <div className="mt-6">
    <Typography variant="h6" className="mb-1 text-base font-semibold text-gray-900">
      {EOP_SECTION_08_SPARE_PARTS_HEADING}
    </Typography>
    <Typography variant="p" className="mb-3 text-sm text-gray-600">
      {intro}
    </Typography>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="w-56 px-3 py-2 text-left font-semibold">
              Part Description
            </th>
            <th className="px-3 py-2 text-left font-semibold">Part Number</th>
            <th className="w-32 px-3 py-2 text-left font-semibold">Quantity</th>
            <th className="px-3 py-2 text-left font-semibold">Storage Location</th>
            <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
              +-
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                <Textarea
                  value={row.partDescription}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        partDescription: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.partNumber}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        partNumber: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.quantity}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        quantity: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.storageLocation}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        storageLocation: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-1 align-middle">
                <MopDynamicTableRowControls
                  ariaLabelGroup="EOP spare parts row controls"
                  rowCount={rows.length}
                  onAddBelow={() =>
                    onRowsChange(
                      insertRowAfterId(rows, row.id, newEopSection08SparePartRow()),
                    )}
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
  </div>
);

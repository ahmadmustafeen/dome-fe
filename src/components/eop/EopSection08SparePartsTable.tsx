"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_08_SPARE_PARTS_HEADING } from "@/constants/eop-section08-supporting-information";
import type { EopSection08SparePartRow } from "@/types/eop";

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
      "partNumber" | "quantity" | "storageLocation"
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
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                {row.partDescription}
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Input
                  value={row.partNumber}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        partNumber: event.target.value,
                      }),
                    )
                  }
                  className="w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Input
                  value={row.quantity}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        quantity: event.target.value,
                      }),
                    )
                  }
                  className="w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Input
                  value={row.storageLocation}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        storageLocation: event.target.value,
                      }),
                    )
                  }
                  className="w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

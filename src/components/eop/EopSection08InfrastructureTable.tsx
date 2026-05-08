"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_08_INFRASTRUCTURE_HEADING } from "@/constants/eop-section08-supporting-information";
import type { EopSection08InfrastructureRow } from "@/types/eop";

type EopSection08InfrastructureTableProps = {
  rows: EopSection08InfrastructureRow[];
  onRowsChange: (rows: EopSection08InfrastructureRow[]) => void;
};

const updateRow = (
  rows: EopSection08InfrastructureRow[],
  rowId: string,
  partial: Partial<
    Pick<EopSection08InfrastructureRow, "locationDetails" | "accessRequirements">
  >,
): EopSection08InfrastructureRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection08InfrastructureTable = ({
  rows,
  onRowsChange,
}: EopSection08InfrastructureTableProps) => (
  <div className="mt-6">
    <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
      {EOP_SECTION_08_INFRASTRUCTURE_HEADING}
    </Typography>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="w-64 px-3 py-2 text-left font-semibold">
              Infrastructure Element
            </th>
            <th className="px-3 py-2 text-left font-semibold">Location Details</th>
            <th className="px-3 py-2 text-left font-semibold">
              Access Requirements
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                {row.infrastructureElement}
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Input
                  value={row.locationDetails}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        locationDetails: event.target.value,
                      }),
                    )
                  }
                  className="w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Input
                  value={row.accessRequirements}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        accessRequirements: event.target.value,
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

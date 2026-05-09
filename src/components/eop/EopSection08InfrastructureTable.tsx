"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_08_INFRASTRUCTURE_HEADING,
  newEopSection08InfrastructureRow,
} from "@/constants/eop-section08-supporting-information";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { EopSection08InfrastructureRow } from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";

type EopSection08InfrastructureTableProps = {
  rows: EopSection08InfrastructureRow[];
  onRowsChange: (rows: EopSection08InfrastructureRow[]) => void;
};

const updateRow = (
  rows: EopSection08InfrastructureRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection08InfrastructureRow,
      "accessRequirements" | "infrastructureElement" | "locationDetails"
    >
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
                  value={row.infrastructureElement}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        infrastructureElement: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.locationDetails}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        locationDetails: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.accessRequirements}
                  onChange={(event) =>
                    onRowsChange(
                      updateRow(rows, row.id, {
                        accessRequirements: event.target.value,
                      }),
                    )}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-1 align-middle">
                <MopDynamicTableRowControls
                  ariaLabelGroup="EOP infrastructure row controls"
                  rowCount={rows.length}
                  onAddBelow={() =>
                    onRowsChange(
                      insertRowAfterId(
                        rows,
                        row.id,
                        newEopSection08InfrastructureRow(),
                      ),
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

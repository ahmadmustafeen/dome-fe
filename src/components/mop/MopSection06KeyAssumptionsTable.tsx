'use client';

import type { MopAssumptionRow, MOPAssumptions } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING,
  newAssumptionRow,
} from '@/constants/mop-section06-assumptions';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection06KeyAssumptionsTableProps = {
  rows: MopAssumptionRow[];
  patchAssumptions: (p: Partial<MOPAssumptions>) => void;
};

const patchAssumptionCell = (
  rows: MopAssumptionRow[],
  rowId: string,
  partial: Partial<Pick<MopAssumptionRow, 'category' | 'assumption'>>,
  patchAssumptions: MopSection06KeyAssumptionsTableProps['patchAssumptions'],
) => {
  patchAssumptions({
    assumptionRows: rows?.map(r => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection06KeyAssumptionsTable = ({
  rows,
  patchAssumptions,
}: MopSection06KeyAssumptionsTableProps) => {
  return (
    <div className="mb-8">
      <Typography variant="h6" className="mb-4 text-base font-semibold text-gray-900">
        {MOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-140 border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-40 px-3 py-2 text-left font-semibold">Category</th>
              <th className="px-3 py-2 text-left font-semibold">Assumption</th>
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row,index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.category || ""}
                    onChange={e =>
                      patchAssumptionCell(rows, row.id, { category: e.target.value }, patchAssumptions)}
                    placeholder="Category"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.assumption || ""}
                    onChange={e =>
                      patchAssumptionCell(rows, row.id, { assumption: e.target.value }, patchAssumptions)}
                    placeholder="Assumption"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Assumptions table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchAssumptions({
                        assumptionRows: insertRowAfterId(rows, row.id, newAssumptionRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchAssumptions({ assumptionRows: next });
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

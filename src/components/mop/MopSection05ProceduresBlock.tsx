'use client';

import type { MOPSafety, MopSafetyProcedureRow } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import { MOP_SECTION_05_PROCEDURES_SUBHEADING, newSafetyProcedureRow } from '@/constants/mop-section05-safety';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection05ProceduresBlockProps = {
  rows: MopSafetyProcedureRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
};

const patchProcedureCell = (
  rows: MopSafetyProcedureRow[],
  rowId: string,
  partial: Partial<
    Pick<MopSafetyProcedureRow, 'procedure' | 'requirements' | 'initials' | 'time'>
  >,
  patchSafety: MopSection05ProceduresBlockProps['patchSafety'],
) => {
  patchSafety({
    safetyProcedureRows: rows?.map(r => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection05ProceduresBlock = ({
  rows,
  patchSafety,
}: MopSection05ProceduresBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-4 text-base font-semibold text-gray-900">
        {MOP_SECTION_05_PROCEDURES_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Procedure</th>
              <th className="px-3 py-2 text-left font-semibold">Requirements</th>
              <th className="w-28 px-3 py-2 text-left font-semibold">Initials</th>
              <th className="w-32 px-3 py-2 text-left font-semibold">Time</th>
              <th scope="col" className="w-[4.25rem] px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.procedure}
                    onChange={e =>
                      patchProcedureCell(rows, row.id, { procedure: e.target.value }, patchSafety)}
                    placeholder="Procedure"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.requirements}
                    onChange={e =>
                      patchProcedureCell(
                        rows,
                        row.id,
                        { requirements: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Requirements"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.initials}
                    onChange={e =>
                      patchProcedureCell(rows, row.id, { initials: e.target.value }, patchSafety)}
                    placeholder="Initials"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.time}
                    onChange={e =>
                      patchProcedureCell(rows, row.id, { time: e.target.value }, patchSafety)}
                    placeholder="Time"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Safety procedures table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchSafety({
                        safetyProcedureRows: insertRowAfterId(rows, row.id, newSafetyProcedureRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchSafety({ safetyProcedureRows: next });
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

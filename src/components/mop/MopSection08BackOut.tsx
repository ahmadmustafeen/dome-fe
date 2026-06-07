'use client';

import type { MopBackOutProcedureRow, MOPSection08BackOut } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_08_CRITICAL_LABEL,
  MOP_SECTION_08_INTRO,
  MOP_SECTION_08_SUBHEADING,
  newBackOutProcedureRow,
} from '@/constants/mop-section08-backout';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection08BackOutProps = {
  backOut: MOPSection08BackOut;
  patchBackOut: (p: Partial<MOPSection08BackOut>) => void;
};

const patchRow = (
  s: MOPSection08BackOut,
  id: string,
  partial: Partial<Pick<MopBackOutProcedureRow, 'backOutProcedure' | 'initials' | 'time'>>,
  patch: MopSection08BackOutProps['patchBackOut'],
) => {
  patch({
    stepRows: s.stepRows?.map(r => (r.id === id ? { ...r, ...partial } : r)),
  });
};

const renumberBackOutSteps = (
  rows: MopBackOutProcedureRow[],
): MopBackOutProcedureRow[] => rows?.map((r, i) => ({ ...r, stepNumber: i + 1 }));

export const MopSection08BackOut = ({ backOut, patchBackOut }: MopSection08BackOutProps) => {
  const { stepRows } = backOut;

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography variant="h5" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_08_SUBHEADING}
      </Typography>
      <p className="mb-1 text-sm font-semibold capitalize tracking-wide text-[#0f3456]">
        {MOP_SECTION_08_CRITICAL_LABEL}
      </p>
      <p className="mb-4 text-sm text-gray-700">{MOP_SECTION_08_INTRO}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-12 px-2 py-2 text-center font-semibold">Step</th>
              <th className="min-w-56 px-3 py-2 text-left font-semibold">Back-out Procedures</th>
              <th className="w-24 px-3 py-2 text-left font-semibold">Initials</th>
              <th className="w-24 px-3 py-2 text-left font-semibold">Time</th>
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {stepRows?.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-2 text-center text-gray-800">
                  {row.stepNumber}
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.backOutProcedure}
                    onChange={e => patchRow(backOut, row.id, { backOutProcedure: e.target.value }, patchBackOut)}
                    className="min-h-16 w-full"
                    placeholder="Back-out step"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.initials}
                    onChange={e => patchRow(backOut, row.id, { initials: e.target.value }, patchBackOut)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.time}
                    onChange={e => patchRow(backOut, row.id, { time: e.target.value }, patchBackOut)}
                    className="w-full"
                    placeholder="Time"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Back-out procedure row controls"
                    rowCount={stepRows.length}
                    onAddBelow={() => {
                      const merged = insertRowAfterId(
                        stepRows,
                        row.id,
                        newBackOutProcedureRow(1, ''),
                      );
                      patchBackOut({ stepRows: renumberBackOutSteps(merged) });
                    }}
                    onRemove={() => {
                      const next = removeRowById(stepRows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (!next) {
                        return;
                      }
                      patchBackOut({ stepRows: renumberBackOutSteps(next) });
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

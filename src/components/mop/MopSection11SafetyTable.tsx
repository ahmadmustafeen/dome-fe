'use client';

import type { MopReferenceSafetyRow, MOPSection11References } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_11_SAFETY_STANDARDS_HEADING,
  MOP_SECTION_11_SAFETY_TABLE_HEADERS,
  newMopReferenceSafetyRow,
} from '@/constants/mop-section11-references';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';
import { MopSection11AccessColumn } from './MopSection11AccessColumn';

type MopSection11SafetyTableProps = {
  rows: MopReferenceSafetyRow[];
  references: MOPSection11References;
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
};

const patchRow = (
  current: MOPSection11References,
  id: string,
  partial: Partial<Pick<MopReferenceSafetyRow, 'safetyStandard' | 'authority' | 'linkUrl' | 'internalAccess'>>,
  patch: MopSection11SafetyTableProps['patchMopReferences'],
) => {
  patch({
    safetyStandardRows: current.safetyStandardRows.map(r => (r.id === id ? { ...r, ...partial } : r)),
  });
};

export const MopSection11SafetyTable = ({ rows, references, patchMopReferences }: MopSection11SafetyTableProps) => {
  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-2 text-sm font-semibold text-gray-900">
        {MOP_SECTION_11_SAFETY_STANDARDS_HEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-40 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_SAFETY_TABLE_HEADERS.safetyStandard}
              </th>
              <th className="w-28 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_SAFETY_TABLE_HEADERS.authority}
              </th>
              <th className="min-w-48 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_SAFETY_TABLE_HEADERS.access}
              </th>
              <th scope="col" className="w-[4.25rem] px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.safetyStandard}
                    onChange={e =>
                      patchRow(references, row.id, { safetyStandard: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label="Safety standard"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.authority}
                    onChange={e => patchRow(references, row.id, { authority: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label="Authority"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <MopSection11AccessColumn
                    rowId={row.id}
                    groupLabel={MOP_SECTION_11_SAFETY_TABLE_HEADERS.safetyStandard}
                    linkUrl={row.linkUrl}
                    internalAccess={row.internalAccess}
                    onLinkUrlChange={v => patchRow(references, row.id, { linkUrl: v }, patchMopReferences)}
                    onInternalAccessChange={v => patchRow(references, row.id, { internalAccess: v }, patchMopReferences)}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Safety standards row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchMopReferences({
                        safetyStandardRows: insertRowAfterId(rows, row.id, newMopReferenceSafetyRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (!next) {
                        return;
                      }
                      patchMopReferences({ safetyStandardRows: next });
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

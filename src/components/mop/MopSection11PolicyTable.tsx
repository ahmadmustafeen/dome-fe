'use client';

import type { MopReferencePolicyRow, MOPSection11References } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_11_COMPANY_POLICY_INTRO,
  MOP_SECTION_11_POLICY_BANNER_TEXT,
  MOP_SECTION_11_POLICY_NOTE_LABEL,
  MOP_SECTION_11_POLICY_TABLE_HEADERS,
  newMopReferencePolicyRow,
} from '@/constants/mop-section11-references';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection11PolicyTableProps = {
  rows: MopReferencePolicyRow[];
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
  references: MOPSection11References;
};

const patchRow = (
  current: MOPSection11References,
  id: string,
  partial: Partial<Pick<MopReferencePolicyRow, 'policyDocument' | 'uploadDate' | 'type'>>,
  patch: MopSection11PolicyTableProps['patchMopReferences'],
) => {
  patch({
    policyDocumentRows: current.policyDocumentrows?.map(r => (r.id === id ? { ...r, ...partial } : r)),
  });
};

export const MopSection11PolicyTable = ({
  rows,
  patchMopReferences,
  references,
}: MopSection11PolicyTableProps) => {
  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-2 text-sm font-semibold text-gray-900">
        Company Policy Documents Consulted
      </Typography>
      <Typography variant="p" className="mb-3 text-sm text-gray-800">
        {MOP_SECTION_11_COMPANY_POLICY_INTRO}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-40 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_POLICY_TABLE_HEADERS.policyDocument}
              </th>
              <th className="w-36 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_POLICY_TABLE_HEADERS.uploadDate}
              </th>
              <th className="w-32 px-2 py-2 text-left font-semibold">
                {MOP_SECTION_11_POLICY_TABLE_HEADERS.type}
              </th>
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
                    value={row.policyDocument}
                    onChange={e =>
                      patchRow(references, row.id, { policyDocument: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label="Policy document name"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    type="date"
                    value={row.uploadDate}
                    onChange={e => patchRow(references, row.id, { uploadDate: e.target.value }, patchMopReferences)}
                    className="w-full min-w-0 text-sm"
                    aria-label="Policy upload date"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.type}
                    onChange={e => patchRow(references, row.id, { type: e.target.value }, patchMopReferences)}
                    className="w-full text-sm"
                    aria-label="Policy type"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Company policy documents row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchMopReferences({
                        policyDocumentRows: insertRowAfterId(rows, row.id, newMopReferencePolicyRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (!next) {
                        return;
                      }
                      patchMopReferences({ policyDocumentRows: next });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 rounded-r-md border-l-4 border-blue-600 bg-sky-100 p-3">
        <p className="m-0 text-sm text-sky-950">
          <strong>{MOP_SECTION_11_POLICY_NOTE_LABEL}</strong>
          {' '}
          {MOP_SECTION_11_POLICY_BANNER_TEXT}
        </p>
      </div>
    </div>
  );
};

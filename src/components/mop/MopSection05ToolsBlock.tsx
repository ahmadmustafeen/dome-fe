'use client';

import type { MOPSafety, MopToolRequirementRow } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_05_TOOLS_SUBHEADING,
  newToolRequirementRow,
} from '@/constants/mop-section05-safety';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection05ToolsBlockProps = {
  rows: MopToolRequirementRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
  assetName: string
  mopTitle: string
};

const patchToolCell = (
  rows: MopToolRequirementRow[],
  rowId: string,
  partial: Partial<Pick<MopToolRequirementRow, 'toolCategory' | 'specificToolsList' | 'purpose'>>,
  patchSafety: MopSection05ToolsBlockProps['patchSafety'],
) => {
  patchSafety({
    toolRequirementRows: rows?.map(r => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection05ToolsBlock = ({ rows, patchSafety, assetName, mopTitle }: MopSection05ToolsBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_05_TOOLS_SUBHEADING}
      </Typography>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        Specific tools required for {assetName} {mopTitle} based on equipment type and task:
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="min-w-32 px-3 py-2 text-left font-semibold">Tool Category</th>
              <th className="min-w-56 px-3 py-2 text-left font-semibold">
                Specific Tools (in the form of list)
              </th>
              <th className="min-w-40 px-3 py-2 text-left font-semibold">Purpose</th>
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.toolCategory}
                    onChange={e =>
                      patchToolCell(rows, row.id, { toolCategory: e.target.value }, patchSafety)}
                    placeholder="Category"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.specificToolsList}
                    onChange={e =>
                      patchToolCell(
                        rows,
                        row.id,
                        { specificToolsList: e.target.value },
                        patchSafety,
                      )}
                    placeholder="One tool per line (list)"
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.purpose}
                    onChange={e =>
                      patchToolCell(rows, row.id, { purpose: e.target.value }, patchSafety)}
                    placeholder="Purpose"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Tools table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchSafety({
                        toolRequirementRows: insertRowAfterId(rows, row.id, newToolRequirementRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchSafety({ toolRequirementRows: next });
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

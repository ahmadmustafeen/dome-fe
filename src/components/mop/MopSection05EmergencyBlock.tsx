'use client';

import type { MopEmergencyContactRow, MOPSafety } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import { MOP_SECTION_05_EMERGENCY_SUBHEADING, newEmergencyContactRow } from '@/constants/mop-section05-safety';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection05EmergencyBlockProps = {
  rows: MopEmergencyContactRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
};

const patchEmergencyCell = (
  rows: MopEmergencyContactRow[],
  rowId: string,
  partial: Partial<Pick<MopEmergencyContactRow, 'emergencyType' | 'contact' | 'phoneNumber'>>,
  patchSafety: MopSection05EmergencyBlockProps['patchSafety'],
) => {
  patchSafety({
    emergencyContactRows: rows.map(r => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection05EmergencyBlock = ({
  rows,
  patchSafety,
}: MopSection05EmergencyBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-4 text-base font-semibold text-gray-900">
        {MOP_SECTION_05_EMERGENCY_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Emergency Type</th>
              <th className="px-3 py-2 text-left font-semibold">Contact</th>
              <th className="px-3 py-2 text-left font-semibold">Phone Number</th>
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
                    value={row.emergencyType}
                    onChange={e =>
                      patchEmergencyCell(
                        rows,
                        row.id,
                        { emergencyType: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Emergency type"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.contact}
                    onChange={e =>
                      patchEmergencyCell(rows, row.id, { contact: e.target.value }, patchSafety)}
                    placeholder="Contact"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.phoneNumber}
                    onChange={e =>
                      patchEmergencyCell(
                        rows,
                        row.id,
                        { phoneNumber: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Phone number"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Emergency contacts table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchSafety({
                        emergencyContactRows: insertRowAfterId(
                          rows,
                          row.id,
                          newEmergencyContactRow(),
                        ),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchSafety({ emergencyContactRows: next });
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

'use client';

import type { MopLocalEmergencyServiceRow, MOPSafety } from '@/types/mop';
import { InfoBanner, Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_LOCAL_EMERGENCY_SAMPLE_ADDRESS,
  MOP_SECTION_05_BANNER_CRITICAL_SAFETY,
  MOP_SECTION_05_BANNER_RESEARCHED,
  MOP_SECTION_05_LOCAL_EMERGENCY_SUBHEADING,
  newLocalEmergencyServiceRow,
} from '@/constants/mop-section05-safety';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection05LocalServicesBlockProps = {
  address: string;
  rows: MopLocalEmergencyServiceRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
};

const patchLocalServiceCell = (
  rowList: MopLocalEmergencyServiceRow[],
  rowId: string,
  partial: Partial<
    Pick<MopLocalEmergencyServiceRow, 'service' | 'contactName' | 'phoneNumber' | 'address'>
  >,
  patchSafety: MopSection05LocalServicesBlockProps['patchSafety'],
) => {
  patchSafety({
    localEmergencyServiceRows: rowList.map(r => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection05LocalServicesBlock = ({
  address,
  rows,
  patchSafety,
}: MopSection05LocalServicesBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {MOP_SECTION_05_LOCAL_EMERGENCY_SUBHEADING}
      </Typography>
      <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-2">
        <span className="shrink-0 text-sm font-medium text-gray-800">Location:</span>
        <Input
          value={address}
          onChange={e => patchSafety({ localEmergencyServicesAddress: e.target.value })}
          placeholder={MOP_LOCAL_EMERGENCY_SAMPLE_ADDRESS}
          className="w-full max-w-3xl"
        />
      </div>
      <InfoBanner variant="success" className="mb-4">
        {MOP_SECTION_05_BANNER_RESEARCHED}
      </InfoBanner>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Service</th>
              <th className="px-3 py-2 text-left font-semibold">Contact Name</th>
              <th className="w-40 px-3 py-2 text-left font-semibold">Phone Number</th>
              <th className="px-3 py-2 text-left font-semibold">Address</th>
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
                    value={row.service}
                    onChange={e =>
                      patchLocalServiceCell(rows, row.id, { service: e.target.value }, patchSafety)}
                    placeholder="Service"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.contactName}
                    onChange={e =>
                      patchLocalServiceCell(
                        rows,
                        row.id,
                        { contactName: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Contact name"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.phoneNumber}
                    onChange={e =>
                      patchLocalServiceCell(
                        rows,
                        row.id,
                        { phoneNumber: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Phone"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.address}
                    onChange={e =>
                      patchLocalServiceCell(
                        rows,
                        row.id,
                        { address: e.target.value },
                        patchSafety,
                      )}
                    placeholder="Address"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Local emergency services table row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchSafety({
                        localEmergencyServiceRows: insertRowAfterId(
                          rows,
                          row.id,
                          newLocalEmergencyServiceRow(),
                        ),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchSafety({ localEmergencyServiceRows: next });
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InfoBanner variant="critical" className="mt-4">
        {MOP_SECTION_05_BANNER_CRITICAL_SAFETY}
      </InfoBanner>
    </div>
  );
};

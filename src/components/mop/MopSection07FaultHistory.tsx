'use client';

import type { MopFaultAlarmHistoryRow, MOPSection07Details } from '@/types/mop';
import { Typography } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from '@/constants/mop-dynamic-table';
import {
  MOP_SECTION_07_FAULT_HISTORY_SUBHEADING,
  newFaultAlarmRow,
} from '@/constants/mop-section07-details';

import { insertRowAfterId, removeRowById } from '@/utils/mop-dynamic-table-mutations';

import { MopDynamicTableRowControls } from './MopDynamicTableRowControls';

type MopSection07FaultHistoryProps = {
  rows: MopFaultAlarmHistoryRow[];
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

const patchFault = (
  list: MopFaultAlarmHistoryRow[],
  id: string,
  partial: Partial<
    Pick<MopFaultAlarmHistoryRow, 'dateTime' | 'faultCode' | 'description' | 'actionTaken' | 'initials'>
  >,
  patch: MopSection07FaultHistoryProps['patchMopDetails'],
) => {
  patch({
    faultAlarmHistoryRows: list.map(r => (r.id === id ? { ...r, ...partial } : r)),
  });
};

export const MopSection07FaultHistory = ({ rows, patchMopDetails }: MopSection07FaultHistoryProps) => {
  return (
    <div className="mb-8">
      <Typography variant="h6" className="mb-3 text-base capitalize font-semibold text-gray-900">
        {MOP_SECTION_07_FAULT_HISTORY_SUBHEADING}
      </Typography>
      <p className="mb-2 text-sm text-gray-600">
        Record active or cleared faults/alarms observed during this event (rows expand with API
        or manual entry; default blank rows for site use).
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-40 px-3 py-2 text-left font-semibold">Date/Time</th>
              <th className="w-36 px-3 py-2 text-left font-semibold">Fault/Alarm Code</th>
              <th className="px-3 py-2 text-left font-semibold">Description</th>
              <th className="px-3 py-2 text-left font-semibold">Action Taken</th>
              <th className="w-24 px-3 py-2 text-left font-semibold">Initials</th>
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
                    value={row.dateTime}
                    onChange={e =>
                      patchFault(rows, row.id, { dateTime: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.faultCode}
                    onChange={e =>
                      patchFault(rows, row.id, { faultCode: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.description}
                    onChange={e =>
                      patchFault(rows, row.id, { description: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.actionTaken}
                    onChange={e =>
                      patchFault(rows, row.id, { actionTaken: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.initials}
                    onChange={e =>
                      patchFault(rows, row.id, { initials: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Fault and alarm history row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchMopDetails({
                        faultAlarmHistoryRows: insertRowAfterId(rows, row.id, newFaultAlarmRow()),
                      })}
                    onRemove={() => {
                      const next = removeRowById(rows, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next) {
                        patchMopDetails({ faultAlarmHistoryRows: next });
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

"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import {
  EOP_SECTION_06_EMERGENCY_SUBHEADING,
  EOP_SECTION_06_RESEARCHED_NOTE,
} from "@/constants/eop-section06-communication";
import type { EOPSection06Communication } from "@/types/eop";

type EopSection06EmergencyContactsTableProps = {
  communication: EOPSection06Communication;
  address: string,
  patchCommunication: (p: Partial<EOPSection06Communication>) => void;
};

const patchEmergencyCell = (
  rows: EOPSection06Communication["emergencyContactRows"],
  rowId: string,
  partial: Partial<
    Pick<
      EOPSection06Communication["emergencyContactRows"][number],
      "contactNameOrganization" | "phoneNumber" | "notesAddress"
    >
  >,
  patchCommunication: EopSection06EmergencyContactsTableProps["patchCommunication"],
) => {
  patchCommunication({
    emergencyContactRows: rows?.map((row) =>
      row.id === rowId ? { ...row, ...partial } : row,
    ),
  });
};

export const EopSection06EmergencyContactsTable = ({
  address,
  communication,
  patchCommunication,
}: EopSection06EmergencyContactsTableProps) => {
  const rows = communication?.emergencyContactRows;
  return (
    <div>
      <Typography variant="h6" className="mb-4 text-base font-semibold text-gray-900">
        {EOP_SECTION_06_EMERGENCY_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 border-collapse text-sm">
          <thead>
            <tr className="bg-[#5A1A1A] text-white">
              <th className="px-3 py-2 text-left font-semibold">Service Type</th>
              <th className="px-3 py-2 text-left font-semibold">Contact Name/Organization</th>
              <th className="px-3 py-2 text-left font-semibold">Phone Number</th>
              <th className="px-3 py-2 text-left font-semibold">Notes/Address</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">{row.serviceType}</td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.contactNameOrganization}
                    onChange={(e) =>
                      patchEmergencyCell(
                        rows,
                        row.id,
                        { contactNameOrganization: e.target.value },
                        patchCommunication,
                      )
                    }
                    placeholder="Enter contact name"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.phoneNumber}
                    onChange={(e) =>
                      patchEmergencyCell(
                        rows,
                        row.id,
                        { phoneNumber: e.target.value },
                        patchCommunication,
                      )
                    }
                    placeholder="Enter phone"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.notesAddress}
                    onChange={(e) =>
                      patchEmergencyCell(
                        rows,
                        row.id,
                        { notesAddress: e.target.value },
                        patchCommunication,
                      )
                    }
                    placeholder="Notes/Address"
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
        <span className="mr-1 font-semibold">✓</span>
        {EOP_SECTION_06_RESEARCHED_NOTE(address)}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
        <Input
          value={communication?.verificationContactName}
          onChange={(e) =>
            patchCommunication({ verificationContactName: e.target.value })
          }
          placeholder="Enter contact name"
        />
        <Input
          value={communication?.verificationPhoneNumber}
          onChange={(e) =>
            patchCommunication({ verificationPhoneNumber: e.target.value })
          }
          placeholder="Enter phone"
        />
      </div>
    </div>
  );
};

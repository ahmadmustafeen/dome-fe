"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_06_ESCALATION_SUBHEADING } from "@/constants/eop-section06-communication";
import type { EOPSection06Communication } from "@/types/eop";

type EopSection06EscalationTableProps = {
  communication: EOPSection06Communication;
  patchCommunication: (p: Partial<EOPSection06Communication>) => void;
};

const patchEscalationCell = (
  rows: EOPSection06Communication["escalationMatrixRows"],
  rowId: string,
  partial: Partial<
    Pick<
      EOPSection06Communication["escalationMatrixRows"][number],
      "contactName" | "phoneNumber"
    >
  >,
  patchCommunication: EopSection06EscalationTableProps["patchCommunication"],
) => {
  patchCommunication({
    escalationMatrixRows: rows?.map((row) =>
      row.id === rowId ? { ...row, ...partial } : row,
    ),
  });
};

export const EopSection06EscalationTable = ({
  communication,
  patchCommunication,
}: EopSection06EscalationTableProps) => {
  const rows = communication.escalationMatrixRows;
  return (
    <div className="mb-7">
      <Typography variant="h6" className="mb-4 text-base font-semibold text-gray-900">
        {EOP_SECTION_06_ESCALATION_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Level</th>
              <th className="px-3 py-2 text-left font-semibold">Title</th>
              <th className="px-3 py-2 text-left font-semibold">Contact Name</th>
              <th className="px-3 py-2 text-left font-semibold">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">{row.level}</td>
                <td className="border border-gray-200 px-3 py-2 align-top">{row.title}</td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.contactName}
                    onChange={(e) =>
                      patchEscalationCell(
                        rows,
                        row.id,
                        { contactName: e.target.value },
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
                      patchEscalationCell(
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

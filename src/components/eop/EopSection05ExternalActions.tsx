"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_05_HEADING } from "@/constants/eop-section05-external-actions";
import type {
  EopSection05ExternalActionRow,
  EOPSection05ExternalActions,
} from "@/types/eop";

import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection05ExternalActionsProps = {
  externalActions: EOPSection05ExternalActions;
  patchExternalActions: (p: Partial<EOPSection05ExternalActions>) => void;
};

const updateRow = (
  rows: EopSection05ExternalActionRow[],
  rowId: string,
  partial: Partial<
    Pick<EopSection05ExternalActionRow, "actualStatus" | "passFail">
  >,
): EopSection05ExternalActionRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection05ExternalActions = ({
  externalActions,
  patchExternalActions,
}: EopSection05ExternalActionsProps) => {
  const rows = externalActions.actionRows;

  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_05_HEADING}
      </Typography>

      <Typography variant="p" className="mb-4 text-sm text-gray-600">
        {externalActions.introText}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-24 px-3 py-2 text-left font-semibold">Step Number</th>
              <th className="px-3 py-2 text-left font-semibold">
                External Equipment/System to Check
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Connection to LENNOX HS29-060-13G
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Potential Failure Mode Causing Power Failure
              </th>
              <th className="px-3 py-2 text-left font-semibold">Verification Method</th>
              <th className="px-3 py-2 text-left font-semibold">Actual Status</th>
              <th className="w-28 px-3 py-2 text-left font-semibold">Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">
                  {row.stepNumber}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  {row.externalEquipment}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.connectionToUnit}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.potentialFailureMode}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.verificationMethod}
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.actualStatus}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          actualStatus: e.target.value,
                        }),
                      })
                    }
                    placeholder={row.actualStatusPlaceholder}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-2 align-top">
                  <EopPassFailCheckboxes
                    value={row.passFail}
                    onChange={(value) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, { passFail: value }),
                      })
                    }
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

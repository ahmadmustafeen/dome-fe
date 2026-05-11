"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_05_HEADING,
  newEopSection05ExternalActionRow,
} from "@/constants/eop-section05-external-actions";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type {
  EopSection05ExternalActionRow,
  EOPSection05ExternalActions,
} from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";
import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection05ExternalActionsProps = {
  externalActions: EOPSection05ExternalActions;
  patchExternalActions: (p: Partial<EOPSection05ExternalActions>) => void;
  assetName?: string
};

const updateRow = (
  rows: EopSection05ExternalActionRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection05ExternalActionRow,
      | "actualStatus"
      | "connectionToUnit"
      | "externalEquipment"
      | "passFail"
      | "potentialFailureMode"
      | "verificationMethod"
    >
  >,
): EopSection05ExternalActionRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

const renumberRows = (
  rows: EopSection05ExternalActionRow[],
): EopSection05ExternalActionRow[] =>
  rows?.map((row, index) => ({ ...row, stepNumber: index + 1 }));

export const EopSection05ExternalActions = ({
  externalActions,
  patchExternalActions,
  assetName,
}: EopSection05ExternalActionsProps) => {
  const rows = externalActions?.actionRows;

  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_05_HEADING}
      </Typography>

      <Typography variant="p" className="mb-4 text-sm text-gray-600">
        {`Verify all external equipment and systems that connect to or support the ${assetName}`}
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
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                +-
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">
                  {row.stepNumber}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  <Textarea
                    value={row.externalEquipment}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          externalEquipment: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.connectionToUnit}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          connectionToUnit: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.potentialFailureMode}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          potentialFailureMode: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.verificationMethod}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          verificationMethod: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.actualStatus}
                    onChange={(e) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, {
                          actualStatus: e.target.value,
                        }),
                      })}
                    placeholder={row.actualStatusPlaceholder}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-2 align-top">
                  <EopPassFailCheckboxes
                    value={row.passFail}
                    onChange={(value) =>
                      patchExternalActions({
                        actionRows: updateRow(rows, row.id, { passFail: value }),
                      })}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="EOP external actions row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchExternalActions({
                        actionRows: renumberRows(
                          insertRowAfterId(
                            rows,
                            row.id,
                            newEopSection05ExternalActionRow(),
                          ),
                        ),
                      })}
                    onRemove={() => {
                      const next = removeRowById(
                        rows,
                        row.id,
                        MOP_DYNAMIC_TABLE_MIN_ROWS,
                      );
                      if (next !== undefined) {
                        patchExternalActions({ actionRows: renumberRows(next) });
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

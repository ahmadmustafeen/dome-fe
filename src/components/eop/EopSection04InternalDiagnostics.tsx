"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING,
  newEopSection04InternalDiagnosticRow,
} from "@/constants/eop-section04-internal-diagnostics";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type {
  EopSection04InternalDiagnosticRow,
  EOPSection04InternalDiagnostics,
} from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";
import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection04InternalDiagnosticsProps = {
  internalDiagnostics: EOPSection04InternalDiagnostics;
  assetName?: string
  patchInternalDiagnostics: (
    p: Partial<EOPSection04InternalDiagnostics>,
  ) => void;
};

const updateRow = (
  rows: EopSection04InternalDiagnosticRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection04InternalDiagnosticRow,
      "actualReading" | "componentToCheck" | "expectedCondition" | "passFail"
    >
  >,
): EopSection04InternalDiagnosticRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

const renumberRows = (
  rows: EopSection04InternalDiagnosticRow[],
): EopSection04InternalDiagnosticRow[] =>
  rows?.map((row, index) => ({ ...row, stepNumber: index + 1 }));

export const EopSection04InternalDiagnostics = ({
  internalDiagnostics,
  patchInternalDiagnostics,
  assetName
}: EopSection04InternalDiagnosticsProps) => {
  const rows = internalDiagnostics?.diagnosticRows || [];

  return (
    <div className="mt-7">
      <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
        {
          `Internal Equipment Diagnostics for ${assetName}`
        }
        {/* {EOP_SECTION_04_INTERNAL_DIAGNOSTICS_HEADING} */}
      </Typography>
      <Typography variant="p" className="mb-4 text-sm text-gray-600">
        {internalDiagnostics?.introText}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-245 border-collapse text-sm">
          <thead>
            <tr className="bg-[#5A1A1A] text-white">
              <th className="w-24 px-3 py-2 text-left font-semibold">Step Number</th>
              <th className="px-3 py-2 text-left font-semibold">
                Internal Component to Check
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Expected Reading/Condition
              </th>
              <th className="px-3 py-2 text-left font-semibold">Actual Reading</th>
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
                <td className="border border-gray-200 px-3 py-2 align-top whitespace-pre-line text-gray-900">
                  <Textarea
                    value={row.componentToCheck}
                    onChange={(e) =>
                      patchInternalDiagnostics({
                        diagnosticRows: updateRow(rows, row.id, {
                          componentToCheck: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.expectedCondition}
                    onChange={(e) =>
                      patchInternalDiagnostics({
                        diagnosticRows: updateRow(rows, row.id, {
                          expectedCondition: e.target.value,
                        }),
                      })}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.actualReading}
                    onChange={(e) =>
                      patchInternalDiagnostics({
                        diagnosticRows: updateRow(rows, row.id, {
                          actualReading: e.target.value,
                        }),
                      })}
                    placeholder={row.actualReadingPlaceholder}
                    className="min-h-24 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-2 align-top">
                  <EopPassFailCheckboxes
                    value={row.passFail}
                    onChange={(value) =>
                      patchInternalDiagnostics({
                        diagnosticRows: updateRow(rows, row.id, {
                          passFail: value,
                        }),
                      })}
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="EOP internal diagnostics row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      patchInternalDiagnostics({
                        diagnosticRows: renumberRows(
                          insertRowAfterId(
                            rows,
                            row.id,
                            newEopSection04InternalDiagnosticRow(),
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
                        patchInternalDiagnostics({
                          diagnosticRows: renumberRows(next),
                        });
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-950">
        ⚠️ {EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING}
      </div>
    </div>
  );
};

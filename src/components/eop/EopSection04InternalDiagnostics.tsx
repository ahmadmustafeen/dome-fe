"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import {
  EOP_SECTION_04_INTERNAL_DIAGNOSTICS_HEADING,
  EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING,
} from "@/constants/eop-section04-internal-diagnostics";
import type {
  EopSection04InternalDiagnosticRow,
  EOPSection04InternalDiagnostics,
} from "@/types/eop";

import { EopPassFailCheckboxes } from "./EopPassFailCheckboxes";

type EopSection04InternalDiagnosticsProps = {
  internalDiagnostics: EOPSection04InternalDiagnostics;
  patchInternalDiagnostics: (
    p: Partial<EOPSection04InternalDiagnostics>,
  ) => void;
};

const updateRow = (
  rows: EopSection04InternalDiagnosticRow[],
  rowId: string,
  partial: Partial<
    Pick<EopSection04InternalDiagnosticRow, "actualReading" | "passFail">
  >,
): EopSection04InternalDiagnosticRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection04InternalDiagnostics = ({
  internalDiagnostics,
  patchInternalDiagnostics,
}: EopSection04InternalDiagnosticsProps) => {
  const rows = internalDiagnostics.diagnosticRows;

  return (
    <div className="mt-7">
      <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
        {EOP_SECTION_04_INTERNAL_DIAGNOSTICS_HEADING}
      </Typography>
      <Typography variant="p" className="mb-4 text-sm text-gray-600">
        {internalDiagnostics.introText}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-24 px-3 py-2 text-left font-semibold">Step Number</th>
              <th className="px-3 py-2 text-left font-semibold">
                Internal Component to Check
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                Expected Reading/Condition
              </th>
              <th className="px-3 py-2 text-left font-semibold">Actual Reading</th>
              <th className="w-28 px-3 py-2 text-left font-semibold">Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">
                  {row.stepNumber}
                </td>
                <td className="whitespace-pre-line border border-gray-200 px-3 py-2 align-top text-gray-900">
                  {row.componentToCheck}
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  {row.expectedCondition}
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.actualReading}
                    onChange={(e) =>
                      patchInternalDiagnostics({
                        diagnosticRows: updateRow(rows, row.id, {
                          actualReading: e.target.value,
                        }),
                      })
                    }
                    placeholder={row.actualReadingPlaceholder}
                    className="w-full"
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
                      })
                    }
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

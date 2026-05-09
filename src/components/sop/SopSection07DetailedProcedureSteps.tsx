"use client";

import { Textarea } from "@/components/ui/Textarea";
import type { SOPDetailedProcedureStepRow, SOPDetails } from "@/types/sop";

type SopSection07DetailedProcedureStepsProps = {
  rows: SOPDetailedProcedureStepRow[];
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

const updateRecordedValue = (
  rows: SOPDetailedProcedureStepRow[],
  rowId: string,
  recordedValue: string,
): SOPDetailedProcedureStepRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, recordedValue } : row));

export const SopSection07DetailedProcedureSteps = ({
  rows,
  patchDetails,
}: SopSection07DetailedProcedureStepsProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="w-16 px-3 py-2 text-center font-semibold">Step</th>
            <th className="px-3 py-2 text-left font-semibold">Description</th>
            <th className="px-3 py-2 text-left font-semibold">Expected Range</th>
            <th className="px-3 py-2 text-left font-semibold">Source</th>
            <th className="px-3 py-2 text-left font-semibold">
              Recorded Value
            </th>
            <th className="px-3 py-2 text-left font-semibold">
              Action if Out of Range
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 text-center align-top text-gray-900">
                {row.step}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top whitespace-pre-line text-gray-900">
                {row.description}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top whitespace-pre-line text-gray-700">
                {row.expectedRange}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.source}
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.recordedValue}
                  onChange={(event) =>
                    patchDetails({
                      detailedProcedureStepRows: updateRecordedValue(
                        rows,
                        row.id,
                        event.target.value,
                      ),
                    })}
                  className="min-h-24 w-full"
                />
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.actionIfOutOfRange}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

"use client";

import { Textarea } from "@/components/ui/Textarea";
import type { SOPDetails, SOPPreProcedureCheckRow } from "@/types/sop";

type SopSection07PreProcedureChecksProps = {
  rows: SOPPreProcedureCheckRow[];
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

const updateActualResult = (
  rows: SOPPreProcedureCheckRow[],
  rowId: string,
  actualResult: string,
): SOPPreProcedureCheckRow[] =>
  rows.map((row) => (row.id === rowId ? { ...row, actualResult } : row));

export const SopSection07PreProcedureChecks = ({
  rows,
  patchDetails,
}: SopSection07PreProcedureChecksProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="w-16 px-3 py-2 text-center font-semibold">Step</th>
            <th className="px-3 py-2 text-left font-semibold">Description</th>
            <th className="px-3 py-2 text-left font-semibold">Expected Result</th>
            <th className="px-3 py-2 text-left font-semibold">
              Actual Result
            </th>
            <th className="px-3 py-2 text-left font-semibold">
              Action if Not Met
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 text-center align-top text-gray-900">
                {row.step}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                {row.description}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.expectedResult}
              </td>
              <td className="border border-gray-200 px-2 py-1 align-top">
                <Textarea
                  value={row.actualResult}
                  onChange={(event) =>
                    patchDetails({
                      preProcedureCheckRows: updateActualResult(
                        rows,
                        row.id,
                        event.target.value,
                      ),
                    })}
                  className="min-h-20 w-full"
                />
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.actionIfNotMet}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { MOP_SECTION_07_ENGINE_PERFORMANCE_SUBHEADING } from "@/constants/mop-section07-details";

import type { MopEnginePerformanceDataRow, MOPSection07Details } from "@/types/mop";

type MopSection07EnginePerformanceProps = {
  rows: MopEnginePerformanceDataRow[];
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

const patchEng = (
  list: MopEnginePerformanceDataRow[],
  rowId: string,
  partial: Partial<Pick<MopEnginePerformanceDataRow, "reading" | "status">>,
  patch: MopSection07EnginePerformanceProps["patchMopDetails"],
) => {
  patch({
    enginePerformanceRows: list.map((r) => (r.rowId === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection07EnginePerformance = ({
  rows,
  patchMopDetails,
}: MopSection07EnginePerformanceProps) => {
  return (
    <div className="mb-8">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {MOP_SECTION_07_ENGINE_PERFORMANCE_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Parameter</th>
              <th className="w-40 px-3 py-2 text-left font-semibold">Reading</th>
              <th className="w-28 px-3 py-2 text-left font-semibold">Units</th>
              <th className="w-40 px-3 py-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rowId} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 text-gray-900">{row.parameter}</td>
                <td className="border border-gray-200 px-2 py-1">
                  <Input
                    value={row.reading}
                    onChange={(e) => patchEng(rows, row.rowId, { reading: e.target.value }, patchMopDetails)}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 text-gray-700">{row.units}</td>
                <td className="border border-gray-200 px-2 py-1">
                  <Input
                    value={row.status}
                    onChange={(e) => patchEng(rows, row.rowId, { status: e.target.value }, patchMopDetails)}
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

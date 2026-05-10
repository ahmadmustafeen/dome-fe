"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { MOP_SECTION_07_GENERATOR_LOG_SUBHEADING } from "@/constants/mop-section07-details";

import type { MopGeneratorOperationalDataRow, MOPSection07Details } from "@/types/mop";

type MopSection07GeneratorLogProps = {
  rows: MopGeneratorOperationalDataRow[];
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

const patchGenRow = (
  list: MopGeneratorOperationalDataRow[],
  rowId: string,
  partial: Partial<Pick<MopGeneratorOperationalDataRow, "asFound" | "asLeft">>,
  patch: MopSection07GeneratorLogProps["patchMopDetails"],
) => {
  patch({
    generatorOperationalRows: list.map((r) => (r.rowId === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection07GeneratorLog = ({ rows, patchMopDetails }: MopSection07GeneratorLogProps) => {
  return (
    <div className="mb-8">
      <Typography variant="h6" className="mb-3 text-base font-semibold text-gray-900">
        {MOP_SECTION_07_GENERATOR_LOG_SUBHEADING}
      </Typography>
      <p className="mb-2 text-xs text-gray-500">
        Parameters and acceptance bands are defined for this unit template; record As Found / As
        Left for each.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Parameter</th>
              <th className="w-32 px-3 py-2 text-left font-semibold">As Found</th>
              <th className="w-32 px-3 py-2 text-left font-semibold">As Left</th>
              <th className="w-20 px-3 py-2 text-left font-semibold">Units</th>
              <th className="px-3 py-2 text-left font-semibold">Acceptable Range</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.rowId} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 text-gray-900">{row.parameter}</td>
                <td className="border border-gray-200 px-2 py-1">
                  <Input
                    value={row.asFound}
                    onChange={(e) =>
                      patchGenRow(rows, row.rowId, { asFound: e.target.value }, patchMopDetails)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1">
                  <Input
                    value={row.asLeft}
                    onChange={(e) =>
                      patchGenRow(rows, row.rowId, { asLeft: e.target.value }, patchMopDetails)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 text-gray-700">{row.units}</td>
                <td className="border border-gray-200 px-3 py-2 text-gray-700">
                  {row.acceptableRange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

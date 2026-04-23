"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import {
  MOP_SECTION_05_PPE_INTRO,
  MOP_SECTION_05_PPE_SUBHEADING,
} from "@/constants/mop-section05-safety";

import type { MopPpeRequirementRow, MOPSafety } from "@/types/mop";

type MopSection05PpeBlockProps = {
  rows: MopPpeRequirementRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
};

const patchPpeCell = (
  rows: MopPpeRequirementRow[],
  rowId: string,
  partial: Partial<Pick<MopPpeRequirementRow, "category" | "specification" | "whenRequired">>,
  patchSafety: MopSection05PpeBlockProps["patchSafety"],
) => {
  patchSafety({
    ppeRequirementRows: rows.map((r) => (r.id === rowId ? { ...r, ...partial } : r)),
  });
};

export const MopSection05PpeBlock = ({ rows, patchSafety }: MopSection05PpeBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_05_PPE_SUBHEADING}
      </Typography>
      <Typography variant="p" className="mb-4 text-sm text-gray-700">
        {MOP_SECTION_05_PPE_INTRO}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">PPE Category</th>
              <th className="px-3 py-2 text-left font-semibold">Specification</th>
              <th className="px-3 py-2 text-left font-semibold">When Required</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.category}
                    onChange={(e) =>
                      patchPpeCell(rows, row.id, { category: e.target.value }, patchSafety)
                    }
                    placeholder="Category"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.specification}
                    onChange={(e) =>
                      patchPpeCell(rows, row.id, { specification: e.target.value }, patchSafety)
                    }
                    placeholder="Specification"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.whenRequired}
                    onChange={(e) =>
                      patchPpeCell(rows, row.id, { whenRequired: e.target.value }, patchSafety)
                    }
                    placeholder="When required"
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

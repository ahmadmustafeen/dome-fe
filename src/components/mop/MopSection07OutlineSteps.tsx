"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { MOPStep } from "@/types/mop";

import { insertRowAfterId, removeRowById } from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "./MopDynamicTableRowControls";

type MopSection07OutlineStepsProps = {
  steps: MOPStep[];
  patchSteps: (rows: MOPStep[]) => void;
};

const renumber = (rows: MOPStep[]): MOPStep[] =>
  rows.map((r, i) => ({ ...r, stepNumber: i + 1 }));

const newStep = (stepNumber: number): MOPStep => ({
  id: crypto.randomUUID(),
  stepNumber,
  description: "",
});

export const MopSection07OutlineSteps = ({ steps, patchSteps }: MopSection07OutlineStepsProps) => {
  const updateRow = (id: string, partial: Partial<Pick<MOPStep, "description">>) => {
    patchSteps(
      renumber(steps.map((r) => (r.id === id ? { ...r, ...partial } : r))),
    );
  };

  return (
    <div className="mb-6 border-b border-gray-100 pb-6">
      <Typography variant="h6" className="mb-3 text-sm font-semibold text-[#0f3456]">
        Procedure steps (outline)
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-14 px-2 py-2 text-center font-semibold">#</th>
              <th className="px-3 py-2 text-left font-semibold">Description</th>
              <th scope="col" className="w-[4.25rem] px-1 py-2 text-center text-xs font-semibold">
                ±
              </th>
            </tr>
          </thead>
          <tbody>
            {steps.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-2 text-center text-gray-800">
                  {row.stepNumber}
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.description}
                    onChange={(e) => updateRow(row.id, { description: e.target.value })}
                    className="min-h-14 w-full"
                    placeholder=""
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="Outline procedure steps row controls"
                    rowCount={steps.length}
                    onAddBelow={() => {
                      const merged = insertRowAfterId(steps, row.id, newStep(row.stepNumber + 1));
                      patchSteps(renumber(merged));
                    }}
                    onRemove={() => {
                      const next = removeRowById(steps, row.id, MOP_DYNAMIC_TABLE_MIN_ROWS);
                      if (next !== undefined) {
                        patchSteps(renumber(next));
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {steps.length === 0 ? (
        <button
          type="button"
          className="mt-2 text-sm font-medium text-primary underline"
          onClick={() => patchSteps([newStep(1)])}
        >
          Add step
        </button>
      ) : null}
    </div>
  );
};

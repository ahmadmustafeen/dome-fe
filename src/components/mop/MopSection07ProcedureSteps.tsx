"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  MOP_SECTION_07_CRITICAL_STEP_NOTES_HEADING,
  MOP_SECTION_07_DETAILED_PROCEDURES_SUBHEADING,
} from "@/constants/mop-section07-procedure-steps";
import type { MopDetailedProcedureStepRow, MOPSection07Details } from "@/types/mop";

import { MopSection07IndicatorSelect } from "./MopSection07IndicatorSelect";

type MopSection07ProcedureStepsProps = {
  details: MOPSection07Details;
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

const patchStep = (
  d: MOPSection07Details,
  id: string,
  partial: Partial<Pick<MopDetailedProcedureStepRow, "detailedProcedure" | "indicator" | "initials" | "time">>,
  patch: MopSection07ProcedureStepsProps["patchMopDetails"],
) => {
  const { stepRows } = d.detailedProcedures;
  patch({
    detailedProcedures: {
      ...d.detailedProcedures,
      stepRows: stepRows.map((r) => (r.id === id ? { ...r, ...partial } : r)),
    },
  });
};

export const MopSection07ProcedureSteps = ({
  details,
  patchMopDetails,
}: MopSection07ProcedureStepsProps) => {
  const { stepRows, criticalStepNotes } = details.detailedProcedures;

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography
        variant="h6"
        className="mb-2 text-base font-semibold text-gray-900"
      >
        {MOP_SECTION_07_DETAILED_PROCEDURES_SUBHEADING}
      </Typography>
      <p className="mb-3 text-sm text-gray-600">
        Pick the icon that matches Important Indicators above; use “no indicator” when not applicable.
        The stored value is the indicator key (id); the meaning comes from the legend and tooltips.
      </p>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-12 px-2 py-2 text-center font-semibold">Step</th>
              <th className="min-w-56 px-3 py-2 text-left font-semibold">Detailed Procedure</th>
              <th className="min-w-[13rem] px-2 py-2 text-left font-semibold">Indicator</th>
              <th className="w-24 px-3 py-2 text-left font-semibold">Initials</th>
              <th className="w-24 px-3 py-2 text-left font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {stepRows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-2 text-center text-gray-800">
                  {row.stepNumber}
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Textarea
                    value={row.detailedProcedure}
                    onChange={(e) =>
                      patchStep(
                        details,
                        row.id,
                        { detailedProcedure: e.target.value },
                        patchMopDetails,
                      )}
                    className="min-h-20 w-full"
                    placeholder="Step instructions"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <MopSection07IndicatorSelect
                    id={`mop-dps-ind-${row.id}`}
                    value={row.indicator}
                    onChange={(val) => patchStep(details, row.id, { indicator: val }, patchMopDetails)}
                    aria-label={`Step ${row.stepNumber} procedure indicator`}
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.initials}
                    onChange={(e) =>
                      patchStep(
                        details,
                        row.id,
                        { initials: e.target.value },
                        patchMopDetails,
                      )}
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.time}
                    onChange={(e) =>
                      patchStep(
                        details,
                        row.id,
                        { time: e.target.value },
                        patchMopDetails,
                      )}
                    placeholder="Time"
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Typography variant="h6" className="mb-2 text-sm font-semibold text-gray-900">
          {MOP_SECTION_07_CRITICAL_STEP_NOTES_HEADING}
        </Typography>
        <Textarea
          value={criticalStepNotes}
          onChange={(e) =>
            patchMopDetails({
              detailedProcedures: {
                ...details.detailedProcedures,
                criticalStepNotes: e.target.value,
              },
            })}
          className="min-h-24 w-full"
          placeholder="Document deviations, torque or electrical test notes, and issues for critical steps"
        />
      </div>
    </div>
  );
};

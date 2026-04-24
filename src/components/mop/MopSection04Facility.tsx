"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import {
  MOP_SECTION_04_HEADING,
  MOP_SECTION_04_SYSTEM_ROWS,
} from "@/constants/mop-section04-facility";
import type {
  MopFacilityEffectChoice,
  MopFacilityEffectRow,
  MopFacilitySystemKey,
} from "@/types/mop";

type MopSection04FacilityProps = {
  facilityEffects: MopFacilityEffectRow[];
  patchFacilityRow: (
    systemKey: MopFacilitySystemKey,
    partial: Partial<Pick<MopFacilityEffectRow, "choice" | "details">>,
  ) => void;
};

const choiceForRow = (
  rows: MopFacilityEffectRow[],
  key: MopFacilitySystemKey,
): MopFacilityEffectChoice => {
  const found = rows.find((r) => r.systemKey === key);
  return found ? found.choice : "no";
};

const detailsForRow = (
  rows: MopFacilityEffectRow[],
  key: MopFacilitySystemKey,
): string => {
  const found = rows.find((r) => r.systemKey === key);
  return found ? found.details : "";
};

const setFacilityChoice = (
  key: MopFacilitySystemKey,
  choice: MopFacilityEffectChoice,
  patchFacilityRow: MopSection04FacilityProps["patchFacilityRow"],
  priorDetails: string,
) => {
  patchFacilityRow(key, {
    choice,
    details: choice === "yes" ? priorDetails : "",
  });
};

export const MopSection04Facility = ({
  facilityEffects,
  patchFacilityRow,
}: MopSection04FacilityProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_04_HEADING}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">
                Facility Equipment or System
              </th>
              <th className="w-14 px-2 py-2 text-center font-semibold">Yes</th>
              <th className="w-14 px-2 py-2 text-center font-semibold">No</th>
              <th className="w-14 px-2 py-2 text-center font-semibold">N/A</th>
              <th className="px-3 py-2 text-left font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {MOP_SECTION_04_SYSTEM_ROWS.map((sys) => {
              const choice = choiceForRow(facilityEffects, sys.key);
              const details = detailsForRow(facilityEffects, sys.key);
              const groupName = `mop-facility-${sys.key}`;
              const pickYes = () =>
                setFacilityChoice(sys.key, "yes", patchFacilityRow, details);
              const pickNo = () =>
                setFacilityChoice(sys.key, "no", patchFacilityRow, details);
              const pickNa = () =>
                setFacilityChoice(sys.key, "na", patchFacilityRow, details);
              const onDetailsChange = (value: string) => {
                patchFacilityRow(sys.key, { details: value });
              };
              return (
                <tr key={sys.key} className="bg-white">
                  <td className="border border-gray-200 px-3 py-2 text-gray-900">
                    {sys.label}
                  </td>
                  <td className="border border-gray-200 px-2 py-2 text-center">
                    <input
                      type="radio"
                      name={groupName}
                      className="h-4 w-4 accent-primary"
                      checked={choice === "yes"}
                      onChange={pickYes}
                      aria-label={`${sys.label} Yes`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-2 text-center">
                    <input
                      type="radio"
                      name={groupName}
                      className="h-4 w-4 accent-primary"
                      checked={choice === "no"}
                      onChange={pickNo}
                      aria-label={`${sys.label} No`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-2 text-center">
                    <input
                      type="radio"
                      name={groupName}
                      className="h-4 w-4 accent-primary"
                      checked={choice === "na"}
                      onChange={pickNa}
                      aria-label={`${sys.label} N/A`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1">
                    <Input
                      value={details}
                      disabled={choice !== "yes"}
                      onChange={(e) => onDetailsChange(e.target.value)}
                      placeholder={
                        choice === "yes"
                          ? "Describe impact when Yes is selected"
                          : ""
                      }
                      className="w-full"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

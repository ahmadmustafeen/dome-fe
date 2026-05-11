"use client";

import { Input } from "@/components/ui/Input";
import type {
  ProcedureFacilityEffectChoice,
  ProcedureFacilityEffectRow,
  ProcedureFacilityEffectTableProps,
} from "@/types/procedure-facility";

const choiceForRow = <TKey extends string>(
  rows: ProcedureFacilityEffectRow<TKey>[],
  key: TKey,
): ProcedureFacilityEffectChoice => {
  const found = rows?.find((row) => row.systemKey === key);
  return found ? found.choice : "no";
};

const detailsForRow = <TKey extends string>(
  rows: ProcedureFacilityEffectRow<TKey>[],
  key: TKey,
): string => {
  const found = rows?.find((row) => row.systemKey === key);
  return found ? found.details : "";
};

const patchRow = <TKey extends string>(
  rows: ProcedureFacilityEffectRow<TKey>[],
  key: TKey,
  partial: Partial<Pick<ProcedureFacilityEffectRow<TKey>, "choice" | "details">>,
): ProcedureFacilityEffectRow<TKey>[] => {
  let touched = false;
  const mapped = rows?.map((row) => {
    if (row.systemKey !== key) {
      return row;
    }
    touched = true;
    return { ...row, ...partial };
  });
  if (touched === true) {
    return mapped;
  }
  return [
    ...rows,
    {
      systemKey: key,
      choice: partial.choice ?? "no",
      details: partial.details ?? "",
    },
  ];
};

const radioOptions: readonly {
  value: ProcedureFacilityEffectChoice;
  label: string;
}[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "na", label: "N/A" },
];

export const ProcedureFacilityEffectTable = <TKey extends string>({
  systemRows,
  effects,
  namePrefix,
  clearDetailsWhenNotYes = true,
  onChange,
}: ProcedureFacilityEffectTableProps<TKey>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-160 border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="px-3 py-2 text-left font-semibold">
              Facility Equipment or System
            </th>
            {radioOptions.map((option) => (
              <th
                key={option.value}
                className="w-14 px-2 py-2 text-center font-semibold"
              >
                {option.label}
              </th>
            ))}
            <th className="px-3 py-2 text-left font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          {systemRows?.map((system) => {
            const choice = choiceForRow(effects, system.key);
            const details = detailsForRow(effects, system.key);
            const groupName = `${namePrefix}-${system.key}`;
            const setChoice = (value: ProcedureFacilityEffectChoice) => {
              onChange(
                patchRow(effects, system.key, {
                  choice: value,
                  details:
                    value === "yes" || clearDetailsWhenNotYes === false
                      ? details
                      : "",
                }),
              );
            };
            const setDetails = (value: string) => {
              onChange(patchRow(effects, system.key, { details: value }));
            };

            return (
              <tr key={system.key} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 text-gray-900">
                  {system.label}
                </td>
                {radioOptions.map((option) => (
                  <td
                    key={option.value}
                    className="border border-gray-200 px-2 py-2 text-center"
                  >
                    <input
                      type="radio"
                      name={groupName}
                      className="h-4 w-4 accent-primary"
                      checked={choice === option.value}
                      onChange={() => setChoice(option.value)}
                      aria-label={`${system.label} ${option.label}`}
                    />
                  </td>
                ))}
                <td className="border border-gray-200 px-2 py-1">
                  <Input
                    value={details}
                    disabled={clearDetailsWhenNotYes === true && choice !== "yes"}
                    onChange={(event) => setDetails(event.target.value)}
                    placeholder={
                      choice === "yes" || clearDetailsWhenNotYes === false
                        ? "Describe impact details"
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
  );
};

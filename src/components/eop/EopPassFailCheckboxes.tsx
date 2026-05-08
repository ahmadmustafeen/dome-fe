"use client";

import type { EopDiagnosticPassFail } from "@/types/eop";

type EopPassFailCheckboxesProps = {
  value: EopDiagnosticPassFail;
  onChange: (value: EopDiagnosticPassFail) => void;
};

export const EopPassFailCheckboxes = ({
  value,
  onChange,
}: EopPassFailCheckboxesProps) => {
  const setValue = (nextValue: Exclude<EopDiagnosticPassFail, "">): void => {
    onChange(value === nextValue ? "" : nextValue);
  };

  return (
    <div className="flex flex-col gap-1 text-xs text-gray-700">
      <label className="inline-flex items-center gap-1">
        <input
          type="checkbox"
          className="h-4 w-4 accent-primary"
          checked={value === "pass"}
          onChange={() => setValue("pass")}
        />
        Pass
      </label>
      <label className="inline-flex items-center gap-1">
        <input
          type="checkbox"
          className="h-4 w-4 accent-primary"
          checked={value === "fail"}
          onChange={() => setValue("fail")}
        />
        Fail
      </label>
    </div>
  );
};

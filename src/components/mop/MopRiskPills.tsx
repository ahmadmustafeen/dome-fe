"use client";

import {
  MOP_RISK_LEVELS,
  MOP_RISK_STYLES,
} from "@/constants/mop-form";
import type { MopRiskLevel } from "@/types/mop-form";

type MopRiskPillsProps = {
  value: MopRiskLevel | "";
  onChange: (level: MopRiskLevel | "") => void;
};

export const MopRiskPills = ({ value, onChange }: MopRiskPillsProps) => {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Level of risk">
      {MOP_RISK_LEVELS.map((level) => {
        const st = MOP_RISK_STYLES[level];
        const selected = value === level;
        return (
          <button
            key={level}
            type="button"
            data-selected={selected ? "true" : "false"}
            onClick={() => onChange(selected ? "" : level)}
            className={st.buttonClass}
          >
            {st.label}
          </button>
        );
      })}
    </div>
  );
};

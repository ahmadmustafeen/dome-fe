import type { RiskLevelOrEmpty } from "@/types/mop";

export const SOP_SECTION_01_HEADING = "Section 01: SOP Schedule Information";

export type SopSection01LorOption = {
  value: RiskLevelOrEmpty;
  label: string;
  helper: string;
};

export const SOP_SECTION_01_LOR_OPTIONS: readonly SopSection01LorOption[] = [
  { value: "", label: "Select level", helper: "" },
  {
    value: "low",
    label: "Level 1 (Low)",
    helper: "Routine operational procedure with minimal impact.",
  },
  {
    value: "medium",
    label: "Level 2 (Medium)",
    helper: "Standard procedure with moderate operational coordination.",
  },
  {
    value: "high",
    label: "Level 3 (High)",
    helper: "Procedure requires elevated controls or coordination.",
  },
  {
    value: "critical",
    label: "Level 4 (Critical)",
    helper: "Critical procedure with significant operational risk.",
  },
] as const;

export const getSopLorHelper = (value: RiskLevelOrEmpty): string => {
  const found = SOP_SECTION_01_LOR_OPTIONS.find((option) => option.value === value);
  return found ? found.helper : "";
};

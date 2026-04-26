export type MopImportantIndicatorCopy = {
  id: string;
  title: string;
  body: string;
};

export const MOP_SECTION_07_IMPORTANT_INDICATORS: readonly MopImportantIndicatorCopy[] = [
  {
    id: "changeOfState",
    title: "Change of State",
    body: "Equipment state transition (energize, de-energize, transfer, switch).",
  },
  {
    id: "safetyAlert",
    title: "Safety Alert",
    body: "Safety-critical step requiring heightened awareness and PPE.",
  },
  {
    id: "stopValidate",
    title: "Stop and Validate",
    body: "Verification or validation checkpoint — do not proceed until confirmed.",
  },
  {
    id: "importantNote",
    title: "Important Note",
    body: "Critical information or special consideration for this step.",
  },
  {
    id: "rollback",
    title: "Rollback",
    body: "Procedure to revert to previous state if issues occur.",
  },
  {
    id: "twoPerson",
    title: "Two Person Verification",
    body: "Requires dual verification or witness for accuracy.",
  },
  {
    id: "expectedResult",
    title: "Expected Result",
    body: "Expected outcome or normal reading for this step.",
  },
  {
    id: "loto",
    title: "Lock Out Tag Out",
    body: "LOTO procedure required for electrical safety.",
  },
];

/** Value for the detailed-procedure "Indicator" column when no legend icon applies. */
export const MOP_IMPORTANT_INDICATOR_SELECT_EMPTY = "";

export type MopImportantIndicatorId = (typeof MOP_SECTION_07_IMPORTANT_INDICATORS)[number]["id"];

/** Tooltip / `title` text for an indicator id (legend copy). */
export const getMopSection07IndicatorMeaning = (id: string): string => {
  const row = MOP_SECTION_07_IMPORTANT_INDICATORS.find((i) => i.id === id);
  return row ? `${row.title}: ${row.body}` : "";
};

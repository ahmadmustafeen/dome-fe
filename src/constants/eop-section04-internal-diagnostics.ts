export const EOP_SECTION_04_INTERNAL_DIAGNOSTICS_HEADING =
  "Internal Equipment Diagnostics for LENNOX HS29-060-13G";

export const EOP_SECTION_04_INTERNAL_DIAGNOSTICS_WARNING =
  "WARNING: If internal diagnostics do not identify the cause of the issue, proceed to Section 05 for external equipment diagnostics. The fault may be upstream from the unit.";

export const newEopSection04InternalDiagnosticRow = () => ({
  id: crypto.randomUUID(),
  stepNumber: 0,
  componentToCheck: "",
  expectedCondition: "",
  actualReading: "",
  actualReadingPlaceholder: "",
  passFail: "" as const,
});

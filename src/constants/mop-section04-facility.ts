import type {
  MopFacilityEffectChoice,
  MopFacilityEffectRow,
  MopFacilitySystemKey,
} from "@/types/mop";

/** Section heading (portal `MOPTemplateModal` + AI Section 04). */
export const MOP_SECTION_04_HEADING =
  "Section 04: Effect of MOP on Critical Facility";

/** Hard-coded facility rows (keys + labels). Order is fixed. */
export const MOP_SECTION_04_SYSTEM_ROWS: readonly {
  key: MopFacilitySystemKey;
  label: string;
}[] = [
  { key: "electricalUtility", label: "Electrical Utility Equipment" },
  { key: "emergencyGenerator", label: "Emergency Generator System" },
  { key: "criticalCooling", label: "Critical Cooling System" },
  { key: "ventilationSystem", label: "Ventilation System" },
  { key: "mechanicalSystem", label: "Mechanical System" },
  { key: "ups", label: "Uninterruptible Power Supply (UPS)" },
  { key: "criticalPowerDist", label: "Critical Power Distribution System" },
  { key: "epo", label: "Emergency Power Off (EPO)" },
  { key: "fireDetection", label: "Fire Detection Systems" },
  { key: "fireSuppression", label: "Fire Suppression System" },
  { key: "disableFireSystem", label: "Disable Fire System" },
  { key: "monitoringSystem", label: "Monitoring System" },
  { key: "controlSystem", label: "Control System" },
  { key: "securitySystem", label: "Security System" },
  { key: "generalPower", label: "General Power and Lighting System" },
  { key: "lockoutTagout", label: "Lockout/Tagout Required?" },
  {
    key: "workHot",
    label: 'Work to be performed "hot" (live electrical equipment)?',
  },
  { key: "radioInterference", label: "Radio interference potential?" },
  { key: "waterLeakDetection", label: "Water/Leak Detection System" },
];

/**
 * Editable defaults (mock / seed JSON). Replace or load from API later.
 * Portal rule: Details empty when choice is not Yes.
 */
export const MOP_SECTION_04_DUMMY_EFFECTS: Record<
  MopFacilitySystemKey,
  { choice: MopFacilityEffectChoice; details: string }
> = {
  electricalUtility: {
    choice: "yes",
    details: "If paralleling with utility, this is affected.",
  },
  emergencyGenerator: {
    choice: "yes",
    details: "The generator itself is being maintained.",
  },
  criticalCooling: { choice: "no", details: "" },
  ventilationSystem: { choice: "no", details: "" },
  mechanicalSystem: { choice: "no", details: "" },
  ups: { choice: "no", details: "" },
  criticalPowerDist: { choice: "no", details: "" },
  epo: { choice: "no", details: "" },
  fireDetection: { choice: "no", details: "" },
  fireSuppression: { choice: "no", details: "" },
  disableFireSystem: { choice: "no", details: "" },
  monitoringSystem: {
    choice: "yes",
    details:
      "Monitoring System is ALWAYS affected for data center equipment maintenance.",
  },
  controlSystem: { choice: "no", details: "" },
  securitySystem: { choice: "no", details: "" },
  generalPower: { choice: "no", details: "" },
  lockoutTagout: {
    choice: "yes",
    details:
      "Required for annual/semi-annual work per site lockout/tagout program.",
  },
  workHot: { choice: "no", details: "" },
  radioInterference: { choice: "na", details: "" },
  waterLeakDetection: { choice: "no", details: "" },
};

export const buildDefaultMopSection04Rows = (): MopFacilityEffectRow[] =>
  MOP_SECTION_04_SYSTEM_ROWS?.map((row) => {
    const cell = MOP_SECTION_04_DUMMY_EFFECTS[row.key];
    return {
      systemKey: row.key,
      choice: cell.choice,
      details: cell.details,
    };
  });

import type { ProcedureFacilityEffectChoice } from "@/types/procedure-facility";
import type { SOPFacilityEffectRow, SOPFacilitySystemKey } from "@/types/sop";

export const SOP_SECTION_04_HEADING =
  "Section 04: Effect of SOP on Critical Facility";

export const SOP_SECTION_04_SYSTEM_ROWS: readonly {
  key: SOPFacilitySystemKey;
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
  { key: "lockoutTagout", label: "Lockout/Tagout Required? (YES for Annual/Semi-Annual)" },
  { key: "workHot", label: 'Work to be performed "hot"?' },
  { key: "radioInterference", label: "Radio interference potential?" },
  { key: "transferSwitch", label: "Transfer Switch System" },
  { key: "buildingAutomation", label: "Building Automation System (BAS)" },
  { key: "waterLeakDetection", label: "Water/Leak Detection System" },
] as const;

export const SOP_SECTION_04_DUMMY_EFFECTS: Record<
  SOPFacilitySystemKey,
  { choice: ProcedureFacilityEffectChoice; details: string }
> = {
  electricalUtility: { choice: "no", details: "" },
  emergencyGenerator: { choice: "no", details: "" },
  criticalCooling: {
    choice: "yes",
    details:
      "This SOP directly involves the operational check of a critical cooling component (AHU).",
  },
  ventilationSystem: {
    choice: "yes",
    details: "The AHU is a primary component of the data center's ventilation system.",
  },
  mechanicalSystem: {
    choice: "yes",
    details: "The AHU is a key mechanical system within the facility.",
  },
  ups: { choice: "no", details: "" },
  criticalPowerDist: { choice: "no", details: "" },
  epo: { choice: "no", details: "" },
  fireDetection: { choice: "no", details: "" },
  fireSuppression: { choice: "no", details: "" },
  disableFireSystem: { choice: "no", details: "" },
  monitoringSystem: {
    choice: "yes",
    details: "Monitoring System is ALWAYS affected for data center equipment maintenance",
  },
  controlSystem: {
    choice: "yes",
    details:
      "Verification of AHU control parameters and setpoints is part of this procedure.",
  },
  securitySystem: { choice: "no", details: "" },
  generalPower: { choice: "no", details: "" },
  lockoutTagout: {
    choice: "no",
    details:
      "Not required for a routine visual and operational check. Only if issues are found requiring intervention.",
  },
  workHot: {
    choice: "yes",
    details:
      "The AHU will remain operational during the check; no power interruption is planned.",
  },
  radioInterference: { choice: "no", details: "" },
  transferSwitch: { choice: "no", details: "" },
  buildingAutomation: {
    choice: "yes",
    details: "Readings and status verification will be performed via the BAS/BMS.",
  },
  waterLeakDetection: {
    choice: "yes",
    details:
      "Visual inspection of condensate drain pan and lines, and verification of leak detection sensors in the AHU area.",
  },
};

export const buildDefaultSopSection04Rows = (): SOPFacilityEffectRow[] =>
  SOP_SECTION_04_SYSTEM_ROWS.map((row) => ({
    systemKey: row.key,
    choice: SOP_SECTION_04_DUMMY_EFFECTS[row.key].choice,
    details: SOP_SECTION_04_DUMMY_EFFECTS[row.key].details,
  }));

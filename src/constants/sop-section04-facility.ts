import type { SOPFacilitySystemKey } from "@/types/sop";

export const SOP_SECTION_04_HEADING =
  "Section 04: Effect of SOP on Critical Facility";

/** Facility systems shown in Section 04 (values supplied by API / persisted SOP). */
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
  {
    key: "lockoutTagout",
    label: "Lockout/Tagout Required? (YES for Annual/Semi-Annual)",
  },
  { key: "workHot", label: 'Work to be performed "hot"?' },
  { key: "radioInterference", label: "Radio interference potential?" },
  { key: "transferSwitch", label: "Transfer Switch System" },
  { key: "buildingAutomation", label: "Building Automation System (BAS)" },
  { key: "waterLeakDetection", label: "Water/Leak Detection System" },
] as const;

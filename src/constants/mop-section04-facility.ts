import type {
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
    {
      key: "lockoutTagout",
      label: "Lockout/Tagout Required? (YES for Annual/Semi-Annual)",
    },
    { key: "workHot", label: 'Work to be performed "hot"?' },
    { key: "radioInterference", label: "Radio interference potential?" },
    { key: "transferSwitch", label: "Transfer Switch System" },
    { key: "buildingAutomation", label: "Building Automation System (BAS)" },
    { key: "waterLeakDetection", label: "Water/Leak Detection System" },
  ];

/**
 * Editable defaults (mock / seed JSON). Replace or load from API later.
 * Portal rule: Details empty when choice is not Yes.
 */

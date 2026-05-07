import type {
  EopSection07ChecklistItem,
  EopSection07FunctionalityRow,
} from "@/types/eop";

export const EOP_SECTION_07_HEADING =
  "Section 07: Recovery & Return to Service";

export const EOP_SECTION_07_INTRO =
  "Follow these steps in sequence to safely restore the LENNOX HS29-060-13G to normal operation after Power Failure has been resolved:";

export const EOP_SECTION_07_RESOLUTION_ITEMS: EopSection07ChecklistItem[] = [
  {
    id: "resolution-root-cause",
    text: "Verify the root cause of the Power Failure has been corrected (e.g., upstream breaker reset, utility power restored).",
    checked: false,
  },
  {
    id: "resolution-ats-position",
    text: "Check automatic transfer switch position (should be on \"Normal\" source).",
    checked: false,
  },
  {
    id: "resolution-phase-rotation",
    text: "Verify phase rotation is correct if work was performed on 3-phase circuits.",
    checked: false,
  },
];

export const EOP_SECTION_07_PRE_START_ITEMS: EopSection07ChecklistItem[] = [
  {
    id: "pre-start-loto-removed",
    text: "Verify all LOTO devices have been removed by the authorized employees who applied them, per Element Critical LOTO Policy.",
    checked: false,
  },
  {
    id: "pre-start-personnel-clear",
    text: "Confirm no personnel are working on or inside the LENNOX HS29-060-13G.",
    checked: false,
  },
  {
    id: "pre-start-emergency-reset",
    text: "Reset all local and remote Emergency Stop buttons and any tripped safety interlocks.",
    checked: false,
  },
  {
    id: "pre-start-bms-available",
    text: "Check control system availability and ensure no inhibiting alarms are present in the BMS.",
    checked: false,
  },
];

export const EOP_SECTION_07_RESTART_ITEMS: EopSection07ChecklistItem[] = [
  {
    id: "restart-main-disconnect",
    text: "Turn main disconnect to \"ON\" position.",
    checked: false,
  },
  {
    id: "restart-control-panel",
    text: "Verify control panel initializes and indicators show a normal standby status.",
    checked: false,
  },
  {
    id: "restart-clear-alarms",
    text: "Clear any residual alarms present on the local control panel from the power loss.",
    checked: false,
  },
  {
    id: "restart-enable-unit",
    text: "Enable the unit via the Building Management System or local controller.",
    checked: false,
  },
];

export const EOP_SECTION_07_FUNCTIONALITY_ROWS: EopSection07FunctionalityRow[] = [
  {
    id: "functionality-operating-voltage",
    parameter: "Operating Voltage",
    expectedRange: "480VAC +/-10%",
    actualReading: "",
    actualReadingPlaceholder: "Reading",
    passFail: "",
  },
  {
    id: "functionality-operating-current",
    parameter: "Operating Current",
    expectedRange: "Below nameplate FLA",
    actualReading: "",
    actualReadingPlaceholder: "Reading",
    passFail: "",
  },
  {
    id: "functionality-control-status",
    parameter: "Control System Status",
    expectedRange: "Normal / No Alarms",
    actualReading: "",
    actualReadingPlaceholder: "Status",
    passFail: "",
  },
];

export const EOP_SECTION_07_LOAD_TRANSFER_NOTE =
  "This section is not typically applicable to a single Air Handling Unit.";

export const EOP_SECTION_07_PERFORMANCE_ITEMS: EopSection07ChecklistItem[] = [
  {
    id: "performance-run-15-minutes",
    text: "Run equipment for a minimum of 15 minutes under normal load.",
    checked: false,
  },
  {
    id: "performance-supply-air",
    text: "Verify supply air temperature is trending towards its setpoint.",
    checked: false,
  },
  {
    id: "performance-no-unusual-signs",
    text: "Check for unusual noises, vibrations, or odors.",
    checked: false,
  },
  {
    id: "performance-bms-stable",
    text: "Confirm communication with the BMS is stable and readings are accurate.",
    checked: false,
  },
];

export const EOP_SECTION_07_RETURN_ITEMS: EopSection07ChecklistItem[] = [
  {
    id: "return-document-readings",
    text: "Document all readings and observations in the Limble Work Order.",
    checked: false,
  },
  {
    id: "return-attach-documents",
    text: "Attach completed MOP/EOP and any vendor reports to the Work Order.",
    checked: false,
  },
  {
    id: "return-complete-work-order",
    text: "Update the Work Order status to \"Completed\".",
    checked: false,
  },
  {
    id: "return-notify-restoration",
    text: "Notify operations team and customer of successful restoration.",
    checked: false,
  },
];

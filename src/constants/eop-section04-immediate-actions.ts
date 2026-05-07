import type {
  EopSection04PpeRow,
  EopSection04SafetyChecklistItem,
  EopSection04ToolRow,
} from "@/types/eop";

export const EOP_SECTION_04_HEADING =
  "Section 04: Immediate Emergency Actions - Power Failure Diagnostics";

export const EOP_SECTION_04_SUBHEADING_PRE_ACTION =
  "Pre-Action Safety & Equipment Requirements";

export const EOP_SECTION_04_CRITICAL_CHECKPOINT_TITLE =
  "CRITICAL SAFETY CHECKPOINT - STOP Before Proceeding:";

export const EOP_SECTION_04_PPE_HEADING =
  "Equipment-Specific PPE Requirements for LENNOX HS29-060-13G:";

export const EOP_SECTION_04_TOOLS_HEADING =
  "Required Tools & Test Equipment for LENNOX HS29-060-13G:";

export const EOP_SECTION_04_SAFETY_REQUIREMENTS_HEADING =
  "LENNOX HS29-060-13G Specific Safety Requirements:";

export const EOP_SECTION_04_DO_NOT_PROCEED_BANNER =
  "DO NOT PROCEED until all safety requirements are verified for LENNOX HS29-060-13G";

export const EOP_SECTION_04_DEFAULT_PPE_INTRO =
  "This is a Power Failure emergency involving potential exposure to energized electrical components. Full electrical PPE is mandatory for all diagnostic steps involving panel access.";

export const EOP_SECTION_04_DEFAULT_PPE_ROWS: EopSection04PpeRow[] = [
  {
    id: "ppe-arc-flash",
    ppeItem: "Arc Flash PPE",
    specification:
      "Category 2 Arc Flash suit, hood/sock, and face shield (min. 8 cal/cm²) or as required by site-specific Arc Flash Study",
    verified: false,
  },
  {
    id: "ppe-insulated-gloves",
    ppeItem: "Insulated Gloves",
    specification:
      "Class 0 rubber gloves with leather protectors, rated for up to 1000V AC",
    verified: false,
  },
];

export const EOP_SECTION_04_DEFAULT_TOOL_ROWS: EopSection04ToolRow[] = [
  {
    id: "tool-multimeter",
    tool: "Multimeter",
    modelType: "True RMS, CAT III (or higher) rated for 600V",
    available: false,
  },
  {
    id: "tool-clamp-meter",
    tool: "Clamp Meter",
    modelType:
      "AC capable, with range covering equipment Full Load Amps (FLA)",
    available: false,
  },
  {
    id: "tool-non-contact-detector",
    tool: "Non-Contact Voltage Detector",
    modelType: "Rated for 90-1000V AC",
    available: false,
  },
];

export const EOP_SECTION_04_DEFAULT_SAFETY_CHECKLIST: EopSection04SafetyChecklistItem[] =
  [
    {
      id: "safety-active-alarms",
      text: "CRITICAL: Before any work, verify the unit's control panel for any active alarms or fault codes that may indicate the cause of the power failure.",
      checked: false,
    },
    {
      id: "safety-assume-live",
      text: "For electrical emergencies, assume all circuits are live until verified otherwise with a calibrated meter.",
      checked: false,
    },
    {
      id: "safety-loto",
      text: "Implement Element Critical LOTO procedure before accessing any internal components. This includes isolating the main disconnect and any control power circuits.",
      checked: false,
    },
    {
      id: "safety-coast-down",
      text: "Be aware that fan motors may coast down for several minutes after power is removed. Do not access fan compartments until all rotation has stopped.",
      checked: false,
    },
    {
      id: "safety-emergency-contact",
      text: "Emergency contact: LENNOX Commercial Support 1-800-453-6669 with equipment serial: 5807C49911.",
      checked: false,
    },
  ];

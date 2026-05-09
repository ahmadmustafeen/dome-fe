import type { SOPDetailedProcedureStepRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_07_DETAILED_STEP_ROWS: readonly SOPDetailedProcedureStepRow[] =
  [
    {
      id: "visual-inspection-indoor-air-handler",
      step: 1,
      description:
        "Visual Inspection (Indoor Air Handler)\na. Check air filters for cleanliness and proper seating.\nb. Inspect evaporator coil for cleanliness and frost buildup.\nc. Verify condensate drain pan is clean and drain line is clear, no standing water.\nd. Check fan section for unusual debris, fan belt condition (if applicable), and motor cleanliness.\ne. Inspect electrical connections in control panel for signs of overheating or loose wiring (visual only, do not open live panels).",
      expectedRange:
        "a. Filters clean, no excessive dust/debris, seated correctly.\nb. Coil clean, no frost.\nc. Pan clean, drain clear, no standing water.\nd. No debris, belt tension good (if applicable), motor clean.\ne. No signs of arcing, discoloration, or loose wires.",
      source: "Physical Inspection",
      recordedValue: "",
      actionIfOutOfRange:
        "If filters are dirty, note for replacement. If coil is dirty/frosted, escalate. If drain is blocked, attempt to clear or escalate. If fan/motor issues, escalate. If electrical issues, immediately escalate to qualified electrician.",
    },
    {
      id: "record-operational-parameters",
      step: 2,
      description:
        "Record Operational Parameters (Indoor Air Handler)\na. Supply Air Temperature (SAT)\nb. Return Air Temperature (RAT)\nc. Space Temperature (if applicable)\nd. Fan Status (On/Off, Speed)\ne. Filter Pressure Drop (if sensor installed)",
      expectedRange:
        "a. SAT: 12-15°C (54-59°F)\nb. RAT: 22-24°C (72-75°F)\nc. Space Temp: 22-24°C (72-75°F)\nd. Fan: ON, Normal Speed\ne. Filter DP: < 0.5 inH2O (or manufacturer spec)",
      source: "BMS/Local Display/IR Thermometer/Digital Manometer",
      recordedValue: "",
      actionIfOutOfRange:
        "If temperatures are outside range, verify setpoints. If fan status is abnormal, escalate. If filter DP is high, note for filter replacement.",
    },
    {
      id: "visual-inspection-outdoor-condensing-unit",
      step: 3,
      description:
        "Visual Inspection (Outdoor Condensing Unit - LENNOX HS29-060-13G)",
      expectedRange: "",
      source: "",
      recordedValue: "",
      actionIfOutOfRange: "",
    },
    {
      id: "verify-control-system-setpoints",
      step: 4,
      description: "Verify Control System Setpoints",
      expectedRange: "",
      source: "",
      recordedValue: "",
      actionIfOutOfRange: "",
    },
    {
      id: "check-abnormal-conditions",
      step: 5,
      description: "Check for Abnormal Conditions",
      expectedRange: "",
      source: "",
      recordedValue: "",
      actionIfOutOfRange: "",
    },
    {
      id: "record-findings-documentation",
      step: 6,
      description: "Record All Findings and Complete Documentation",
      expectedRange: "",
      source: "",
      recordedValue: "",
      actionIfOutOfRange: "",
    },
  ] as const;

export const buildDefaultSopDetailedProcedureStepRows =
  (): SOPDetailedProcedureStepRow[] =>
    SOP_SECTION_07_DETAILED_STEP_ROWS.map((row) => ({ ...row }));

export const newSopDetailedProcedureStepRow =
  (): SOPDetailedProcedureStepRow => ({
    id: newProcedureRowId("sop-detail-step"),
    step: 0,
    description: "",
    expectedRange: "",
    source: "",
    recordedValue: "",
    actionIfOutOfRange: "",
  });

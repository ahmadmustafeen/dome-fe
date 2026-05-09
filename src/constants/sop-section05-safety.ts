import type {
  SOPEmergencyContactRow,
  SOPPpeRequirementRow,
  SOPToolRequirementRow,
} from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_05_HEADING = "Section 05: Safety Requirements";

export const SOP_SECTION_05_PPE_SUBHEADING =
  "REQUIRED PERSONAL PROTECTIVE EQUIPMENT (PPE)";

export const SOP_SECTION_05_TOOLS_SUBHEADING =
  "Required Tools & Test Equipment for LENNOX HS29-060-13G:";

export const SOP_SECTION_05_EMERGENCY_SUBHEADING = "EMERGENCY CONTACTS";

export const SOP_SECTION_05_PPE_COLUMNS = [
  { header: "REQUIRED PPE Item", field: "item" },
  { header: "Specification/Standard", field: "specification" },
  { header: "Regulatory/Safety Requirement", field: "requirement" },
  { header: "Specific Task Requiring This PPE", field: "task" },
] as const;

export const SOP_SECTION_05_TOOL_COLUMNS = [
  { header: "Tool/Equipment", field: "tool" },
  { header: "Specification/Range", field: "specification" },
  { header: "Specific Use in This Task", field: "use" },
  { header: "Procedure Step Requiring This Tool", field: "procedureStep" },
] as const;

export const SOP_SECTION_05_EMERGENCY_COLUMNS = [
  { header: "Emergency Type", field: "emergencyType" },
  { header: "Contact", field: "contact" },
  { header: "Phone Number", field: "phoneNumber" },
] as const;

export const SOP_SECTION_05_PPE_ROWS: readonly SOPPpeRequirementRow[] = [
  {
    id: "safety-glasses",
    item: "Safety Glasses",
    specification: "ANSI Z87.1+",
    requirement:
      "OSHA 29 CFR 1910.133 (Eye and Face Protection) / Site Safety Policy",
    task:
      "All visual inspections, especially when opening access panels or working near moving parts (fans) or electrical components.",
  },
  {
    id: "work-gloves",
    item: "Work Gloves",
    specification: "ANSI/ISEA 105 (Cut Resistance Level A1-A3)",
    requirement:
      "OSHA 29 CFR 1910.138 (Hand Protection) / Site Safety Policy",
    task:
      "Handling access panels, inspecting coils, checking fan belts, and general interaction with equipment surfaces to prevent cuts, abrasions, or contact with minor contaminants.",
  },
] as const;

export const SOP_SECTION_05_TOOL_ROWS: readonly SOPToolRequirementRow[] = [
  {
    id: "digital-infrared-thermometer",
    tool: "Digital Infrared Thermometer",
    specification: "-50°C to 500°C (-58°F to 932°F), +/- 2°C accuracy",
    use:
      "Non-contact measurement of supply/return air temperatures, coil surface temperatures, and motor casing temperatures for quick assessment of operational health.",
    procedureStep:
      "7.2, Step 2 (Temperature Readings), Step 3 (Motor Inspection)",
  },
  {
    id: "flashlight-headlamp",
    tool: "Flashlight/Headlamp",
    specification: "LED, minimum 200 lumens",
    use:
      "Illuminating dark areas within the AHU cabinet, fan sections, and coil areas for detailed visual inspection.",
    procedureStep: "7.2, Step 1 (Visual Inspection)",
  },
  {
    id: "basic-hand-tool-kit",
    tool: "Basic Hand Tool Kit",
    specification:
      "Assorted screwdrivers (Phillips, flathead), nut drivers, adjustable wrench",
    use:
      "Opening and securing access panels, tightening loose fasteners (non-critical), minor adjustments.",
    procedureStep: "7.2, Step 1 (Access Panel Removal/Replacement)",
  },
] as const;

export const SOP_SECTION_05_EMERGENCY_ROWS: readonly SOPEmergencyContactRow[] = [
  {
    id: "fire-medical-police",
    emergencyType: "Fire/Medical/Police",
    contact: "Emergency Services",
    phoneNumber: "911",
  },
  {
    id: "site-operations-manager",
    emergencyType: "Site Operations Manager",
    contact: "Name",
    phoneNumber: "Phone",
  },
] as const;

export const buildDefaultSopPpeRows = (): SOPPpeRequirementRow[] =>
  SOP_SECTION_05_PPE_ROWS.map((row) => ({ ...row }));

export const buildDefaultSopToolRows = (): SOPToolRequirementRow[] =>
  SOP_SECTION_05_TOOL_ROWS.map((row) => ({ ...row }));

export const buildDefaultSopEmergencyContactRows = (): SOPEmergencyContactRow[] =>
  SOP_SECTION_05_EMERGENCY_ROWS.map((row) => ({ ...row }));

export const newSopPpeRequirementRow = (): SOPPpeRequirementRow => ({
  id: newProcedureRowId("sop-ppe"),
  item: "",
  specification: "",
  requirement: "",
  task: "",
});

export const newSopToolRequirementRow = (): SOPToolRequirementRow => ({
  id: newProcedureRowId("sop-tool"),
  tool: "",
  specification: "",
  use: "",
  procedureStep: "",
});

export const newSopEmergencyContactRow = (): SOPEmergencyContactRow => ({
  id: newProcedureRowId("sop-emergency"),
  emergencyType: "",
  contact: "",
  phoneNumber: "",
});

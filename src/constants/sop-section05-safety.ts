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
  "Required Tools & Test Equipment";

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

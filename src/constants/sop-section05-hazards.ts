import type { SOPSiteHazardRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_05_HAZARDS_SUBHEADING = "Site-Specific Hazards";

export const SOP_SECTION_05_HAZARD_COLUMNS = [
  { header: "Hazard Type", field: "hazardType" },
  { header: "Description", field: "description" },
  { header: "Control Measures", field: "controlMeasures" },
] as const;

export const newSopSiteHazardRow = (): SOPSiteHazardRow => ({
  id: newProcedureRowId("sop-hazard"),
  hazardType: "",
  description: "",
  controlMeasures: "",
});

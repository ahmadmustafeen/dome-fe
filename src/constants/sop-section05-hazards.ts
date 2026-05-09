import type { SOPSiteHazardRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_05_HAZARDS_SUBHEADING = "Site-Specific Hazards";

export const SOP_SECTION_05_HAZARD_COLUMNS = [
  { header: "Hazard Type", field: "hazardType" },
  { header: "Description", field: "description" },
  { header: "Control Measures", field: "controlMeasures" },
] as const;

export const SOP_SECTION_05_HAZARD_ROWS: readonly SOPSiteHazardRow[] = [
  {
    id: "moving-parts-fans",
    hazardType: "Moving Parts (Fans)",
    description:
      "Risk of entanglement or injury from rotating fan blades within the AHU.",
    controlMeasures:
      "Ensure AHU is in a safe mode (e.g., fan off, if required for close inspection) or maintain safe distance. Do not bypass safety interlocks. Use caution when opening panels near operational fans.",
  },
  {
    id: "electrical-shock",
    hazardType: "Electrical Shock",
    description:
      "Exposure to live electrical components within control panels or motor connections.",
    controlMeasures:
      "Do not open electrical panels unless qualified and authorized. Maintain safe distances. Verify power is off (if required for specific inspection) using LOTO.",
  },
  {
    id: "hot-cold-surfaces",
    hazardType: "Hot/Cold Surfaces",
    description:
      "Contact with hot compressor lines (outdoor unit), hot motor casings, or cold refrigerant lines/coils.",
    controlMeasures:
      "Use caution and appropriate PPE (gloves). Avoid direct contact with surfaces that may be extremely hot or cold.",
  },
  {
    id: "confined-space-potential",
    hazardType: "Confined Space (Potential)",
    description:
      "Some AHU sections (e.g., plenum) may be considered confined spaces if entry is required (unlikely for weekly check).",
    controlMeasures:
      "Do not enter any AHU section without proper confined space training, permit, and attendant. For weekly checks, visual inspection from outside is sufficient.",
  },
  {
    id: "refrigerant-exposure",
    hazardType: "Refrigerant Exposure",
    description:
      "Potential for exposure to refrigerant (R-410A) if lines are damaged or leaks occur (primarily outdoor unit).",
    controlMeasures:
      "Do not attempt to repair refrigerant leaks. If a leak is suspected (hissing, oil residue, unusual odors), evacuate the area and notify qualified HVAC technician immediately.",
  },
] as const;

export const buildDefaultSopSiteHazardRows = (): SOPSiteHazardRow[] =>
  SOP_SECTION_05_HAZARD_ROWS.map((row) => ({ ...row }));

export const newSopSiteHazardRow = (): SOPSiteHazardRow => ({
  id: newProcedureRowId("sop-hazard"),
  hazardType: "",
  description: "",
  controlMeasures: "",
});

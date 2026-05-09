import type {
  SOPCriticalDecisionPointItem,
  SOPKeyAssumptionRow,
  SOPRiskAnalysisRow,
} from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_06_HEADING = "Section 06: SOP Risks & Assumptions";

export const SOP_SECTION_06_RISK_MATRIX_SUBHEADING = "Risk Analysis Matrix";

export const SOP_SECTION_06_KEY_ASSUMPTIONS_SUBHEADING =
  "Key Project Assumptions";

export const SOP_SECTION_06_CRITICAL_DECISIONS_SUBHEADING =
  "Critical Decision Points";

export const SOP_SECTION_06_RISK_COLUMNS = [
  { header: "Risk Category", field: "category" },
  { header: "Description", field: "description" },
  { header: "Likelihood", field: "likelihood" },
  { header: "Impact", field: "impact" },
  { header: "Mitigation Strategy", field: "mitigationStrategy" },
] as const;

export const SOP_SECTION_06_KEY_ASSUMPTION_COLUMNS = [
  { header: "Category", field: "category" },
  { header: "Assumption", field: "assumption" },
] as const;

export const SOP_SECTION_06_RISK_ROWS: readonly SOPRiskAnalysisRow[] = [
  {
    id: "personnel-injury",
    category: "Personnel Injury",
    description:
      "Minor cuts/abrasions from sharp edges, slips/trips, or contact with moving parts.",
    likelihood: "Low",
    impact: "Low",
    mitigationStrategy:
      "Adhere to PPE requirements (safety glasses, gloves). Maintain clear work area. Follow safe work practices.",
  },
  {
    id: "equipment-damage",
    category: "Equipment Damage",
    description:
      "Accidental damage to AHU components during inspection (e.g., dislodging sensors, damaging coils).",
    likelihood: "Very Low",
    impact: "Low",
    mitigationStrategy:
      "Exercise caution during visual inspections. Do not force components. Follow manufacturer guidelines.",
  },
  {
    id: "service-interruption",
    category: "Service Interruption",
    description:
      "Accidental shutdown or malfunction of the AHU due to improper interaction during the check.",
    likelihood: "Very Low",
    impact: "Medium",
    mitigationStrategy:
      "Follow SOP steps precisely. Do not tamper with controls or power unless instructed. Verify system status before and after the check.",
  },
  {
    id: "data-center-environment-impact",
    category: "Data Center Environment Impact",
    description:
      "Fluctuations in temperature/humidity if AHU operation is inadvertently affected.",
    likelihood: "Very Low",
    impact: "Medium",
    mitigationStrategy:
      "Ensure AHU remains in normal operating mode. Monitor BMS/DCIM for environmental stability during and after the check.",
  },
  {
    id: "inaccurate-readings-observations",
    category: "Inaccurate Readings/Observations",
    description:
      "Failure to correctly identify an issue or misinterpretation of operational data.",
    likelihood: "Low",
    impact: "Low",
    mitigationStrategy:
      "Ensure personnel are adequately trained. Use calibrated tools. Cross-reference readings with historical data and expected ranges.",
  },
] as const;

export const SOP_SECTION_06_KEY_ASSUMPTION_ROWS: readonly SOPKeyAssumptionRow[] = [
  {
    id: "equipment-status",
    category: "Equipment Status",
    assumption:
      "LENNOX HS29-060-13G is operational and running in its normal mode prior to the weekly check.",
  },
  {
    id: "personnel-competency",
    category: "Personnel Competency",
    assumption:
      "Personnel performing this SOP are trained, qualified (CET-1 minimum), and familiar with the LENNOX HS29-060-13G unit and site safety procedures.",
  },
  {
    id: "tool-availability",
    category: "Tool Availability",
    assumption:
      "All required tools and test equipment listed in Section 05 are available, in good working order, and calibrated (where applicable).",
  },
  {
    id: "documentation-access",
    category: "Documentation Access",
    assumption:
      "Relevant manufacturer documentation (manuals) and site-specific drawings are accessible if needed for reference.",
  },
  {
    id: "bms-dcim-functionality",
    category: "BMS/DCIM Functionality",
    assumption:
      "The Building Management System (BMS) or Data Center Infrastructure Management (DCIM) system is fully functional and provides accurate real-time data for the AHU.",
  },
] as const;

export const SOP_SECTION_06_CRITICAL_DECISION_ITEMS: readonly SOPCriticalDecisionPointItem[] =
  [
    {
      id: "abnormal-conditions",
      text:
        "If any abnormal conditions (e.g., unusual noises, vibrations, significant leaks, critical alarms) are observed during the pre-check or detailed procedure, immediately stop the procedure and escalate to the Site Operations Manager.",
    },
    {
      id: "unmitigated-safety-hazard",
      text:
        "If any safety hazard is identified that cannot be immediately mitigated, stop work and secure the area.",
    },
    {
      id: "parameter-deviation",
      text:
        "If the AHU's operational parameters deviate significantly from expected ranges and cannot be resolved by minor adjustments (e.g., filter replacement), do not proceed with further checks that might exacerbate the issue; escalate.",
    },
    {
      id: "unsafe-access",
      text:
        "If access to the AHU is obstructed or unsafe, do not proceed; report the issue.",
    },
  ] as const;

export const buildDefaultSopRiskAnalysisRows = (): SOPRiskAnalysisRow[] =>
  SOP_SECTION_06_RISK_ROWS.map((row) => ({ ...row }));

export const buildDefaultSopKeyAssumptionRows = (): SOPKeyAssumptionRow[] =>
  SOP_SECTION_06_KEY_ASSUMPTION_ROWS.map((row) => ({ ...row }));

export const buildDefaultSopCriticalDecisionItems =
  (): SOPCriticalDecisionPointItem[] =>
    SOP_SECTION_06_CRITICAL_DECISION_ITEMS.map((row) => ({ ...row }));

export const newSopRiskAnalysisRow = (): SOPRiskAnalysisRow => ({
  id: newProcedureRowId("sop-risk"),
  category: "",
  description: "",
  likelihood: "",
  impact: "",
  mitigationStrategy: "",
});

export const newSopKeyAssumptionRow = (): SOPKeyAssumptionRow => ({
  id: newProcedureRowId("sop-assumption"),
  category: "",
  assumption: "",
});

export const newSopCriticalDecisionItem = (): SOPCriticalDecisionPointItem => ({
  id: newProcedureRowId("sop-decision"),
  text: "",
});

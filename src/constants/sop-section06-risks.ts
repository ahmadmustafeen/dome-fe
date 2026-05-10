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

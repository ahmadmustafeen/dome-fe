import type { MopFormValues, MopRiskLevel, MopStatus, MopStep } from "@/types/mop-form";

export const MOP_EMPTY_EDITOR_HTML = "<p></p>";

export const MOP_STATUS_OPTIONS: MopStatus[] = [
  "Draft",
  "Ready to Deliver",
  "Delivered to Client",
  "Revision Needed",
];

export const MOP_RISK_LEVELS: MopRiskLevel[] = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

export type MopRiskStyle = {
  label: MopRiskLevel;
  /** Read-only pill in preview / PDF (hex-only CSS) */
  previewClass: string;
  /** Interactive pill in editor (hex-only CSS — html2canvas-safe) */
  buttonClass: string;
};

export const MOP_RISK_STYLES: Record<MopRiskLevel, MopRiskStyle> = {
  Low: {
    label: "Low",
    previewClass: "mop-doc-risk-pill mop-doc-risk-pill--low",
    buttonClass: "mop-doc-risk-pill-btn mop-doc-risk-pill-btn--low",
  },
  Medium: {
    label: "Medium",
    previewClass: "mop-doc-risk-pill mop-doc-risk-pill--medium",
    buttonClass: "mop-doc-risk-pill-btn mop-doc-risk-pill-btn--medium",
  },
  High: {
    label: "High",
    previewClass: "mop-doc-risk-pill mop-doc-risk-pill--high",
    buttonClass: "mop-doc-risk-pill-btn mop-doc-risk-pill-btn--high",
  },
  Critical: {
    label: "Critical",
    previewClass: "mop-doc-risk-pill mop-doc-risk-pill--critical",
    buttonClass: "mop-doc-risk-pill-btn mop-doc-risk-pill-btn--critical",
  },
};

export const createNewMopStep = (): MopStep => ({
  id: crypto.randomUUID(),
  html: MOP_EMPTY_EDITOR_HTML,
});

export const createInitialMopFormValues = (): MopFormValues => ({
  mopTitle: "",
  mopIdentifier: "",
  versionNumber: "1.0",
  status: "Draft",
  equipmentAssetName: "",
  equipmentType: "",
  manufacturer: "",
  modelNumber: "",
  serialNumber: "",
  equipmentNumber: "",
  locationSite: "",
  workDescriptionHtml: MOP_EMPTY_EDITOR_HTML,
  duration: "",
  levelOfRisk: "",
  cetLevelRequired: "",
  specialPermitsRequired: "",
  specialPermitsNotes: "",
  steps: [createNewMopStep(), createNewMopStep(), createNewMopStep()],
  safetyPrecautions: "",
  requiredPpe: "",
  toolsAndMaterials: "",
  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",
});

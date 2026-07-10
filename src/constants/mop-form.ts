import type { MopRiskLevel, MopStatus, MopStep } from "@/types/mop-form";

export const MOP_EMPTY_EDITOR_HTML = "<p></p>";

/** Plain heading above the form card (portal-style schedule title). */
export const MOP_PAGE_SUBTITLE = "Annual Preventative Maintenance";

/** Section heading above fields (data centre portal wording). */
export const MOP_SECTION_01_HEADING = "Section 01 - MOP Schedule Information";

export const MOP_STATUS_OPTIONS: MopStatus[] = [
  "Draft",
  "Verified",
  "Ready to Deliver",
  "Delivered to Client",
  "Revision Needed",
];

export type MopStatusStyle = {
  label: MopStatus;
  badgeClass: string;
};

export const MOP_STATUS_STYLES: Record<MopStatus, MopStatusStyle> = {
  Draft: { label: "Draft", badgeClass: "bg-gray-100 text-gray-700" },
  Verified: { label: "Verified", badgeClass: "bg-emerald-100 text-emerald-700" },
  "Ready to Deliver": {
    label: "Ready to Deliver",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  "Delivered to Client": {
    label: "Delivered to Client",
    badgeClass: "bg-green-100 text-green-700",
  },
  "Revision Needed": {
    label: "Revision Needed",
    badgeClass: "bg-orange-100 text-orange-700",
  },
};

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

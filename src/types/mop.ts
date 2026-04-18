/**
 * Canonical MOP document shape (frontend ↔ future API contract).
 * Aligns with `prompt.md` plus data-centre portal Section 01–02 extras.
 */

export type MOPStatus =
  | "draft"
  | "ready_to_deliver"
  | "delivered"
  | "revision_needed";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskLevelOrEmpty = RiskLevel | "";

export type MOPMbm = "" | "Yes" | "No" | "N/A";

export type MOPStep = {
  id: string;
  stepNumber: number;
  description: string;
};

/** Section 01 schedule / document header (portal + prompt `document`). */
export type MOPDocument = {
  title: string;
  identifier: string;
  version: number;
  status: MOPStatus;
  createdDate: string;
  lastModified: string;
  /** Portal Section 01 — preparer / author display name. */
  author: string;
  /** Portal Section 01 — free text (e.g. CET-2). */
  authorCetLevel: string;
};

/** Prompt `equipment` (+ portal “component” row). */
export type MOPEquipment = {
  assetName: string;
  equipmentType: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  equipmentNumber: string;
  location: string;
};

/** Prompt `procedure`. */
export type MOPProcedure = {
  workDescription: string;
  duration: string;
  levelOfRisk: RiskLevelOrEmpty;
  cetLevelRequired: string;
  specialPermitsRequired: boolean;
  specialPermitsNotes: string;
};

export type MOPSafety = {
  precautions: string;
  requiredPPE: string;
  toolsAndMaterials: string;
};

export type MOPSignOff = {
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
};

export type MOPContext = {
  clientName: string;
  siteName: string;
  siteId: string;
  assetId: string;
};

/** Data-centre portal Section 02 — Site Information. */
export type MOPSiteSection = {
  customer: string;
  siteName: string;
  contact: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  serviceTicket: string;
  levelOfRiskNumeric: string;
  mbm: MOPMbm;
};

export type MOP = {
  document: MOPDocument;
  equipment: MOPEquipment;
  procedure: MOPProcedure;
  steps: MOPStep[];
  safety: MOPSafety;
  signOff: MOPSignOff;
  context: MOPContext;
  site: MOPSiteSection;
};

export type MOPGenerateContext = Partial<
  Pick<MOPContext, "clientName" | "siteName" | "siteId">
>;

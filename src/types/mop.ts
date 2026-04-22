/**
 * Canonical MOP document shape (frontend ↔ future API contract).
 * Aligns with `prompt.md` plus data-centre portal Section 01–04 extras.
 */

export type MOPStatus =
  | "draft"
  | "ready_to_deliver"
  | "delivered"
  | "revision_needed";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskLevelOrEmpty = RiskLevel | "";

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

/**
 * Data-centre portal Section 02 — Site Information
 * (`generateSection02` in `section-generators.js`).
 */
export type MOPSiteSection = {
  customer: string;
  siteName: string;
  dataCenterLocation: string;
  siteAddress: string;
  siteContact: string;
};

/** Portal `workType` → `Self Delivered / Vendor` row (`generateSection03`). */
export type MOPWorkDeliveryType = "self_delivered" | "subcontractor";

/**
 * Data-centre portal Section 03 — MOP Overview
 * (`generateSection03` in `section-generators.js`).
 */
export type MOPSection03Overview = {
  mopTitle: string;
  workArea: string;
  buildingFloorRoom: string;
  accessRequirements: string;
  workDeliveryType: MOPWorkDeliveryType;
  contractors1Count: string;
  subcontractorCompany1: string;
  subcontractorPersonnel1: string;
  subcontractorContact1: string;
  contractors2Count: string;
  subcontractorCompany2: string;
  subcontractorPersonnel2: string;
  subcontractorContact2: string;
  qualificationsRequired: string;
  advanceNotifications: string;
  postNotifications: string;
};

/** Stable keys for Section 04 rows (`MOPTemplateModal` facility table). */
export type MopFacilitySystemKey =
  | "electricalUtility"
  | "emergencyGenerator"
  | "criticalCooling"
  | "ventilationSystem"
  | "mechanicalSystem"
  | "ups"
  | "criticalPowerDist"
  | "epo"
  | "fireDetection"
  | "fireSuppression"
  | "disableFireSystem"
  | "monitoringSystem"
  | "controlSystem"
  | "securitySystem"
  | "generalPower"
  | "lockoutTagout"
  | "workHot"
  | "radioInterference"
  | "waterLeakDetection";

export type MopFacilityEffectChoice = "yes" | "no" | "na";

export type MopFacilityEffectRow = {
  systemKey: MopFacilitySystemKey;
  choice: MopFacilityEffectChoice;
  details: string;
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
  overview: MOPSection03Overview;
  facilityEffects: MopFacilityEffectRow[];
};

export type MOPGenerateContext = Partial<
  Pick<MOPContext, "clientName" | "siteName" | "siteId">
>;

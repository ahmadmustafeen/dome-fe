/**
 * Canonical MOP document shape (frontend ↔ future API contract).
 * Aligns with `prompt.md` plus data-centre portal Section 01–04 extras.
 */

import type { MopImportantIndicatorId } from "@/constants/mop-section07-important-indicators";

/** Stored on each detailed procedure row — `MopImportantIndicatorId` or none. */
export type MopDetailProcedureStepIndicator = MopImportantIndicatorId | "";

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

/** Section 07 subsection — one row in Detailed Procedure Steps. */
export type MopDetailedProcedureStepRow = {
  id: string;
  stepNumber: number;
  detailedProcedure: string;
  /** Important Indicators id from Section 7 legend (e.g. `loto`, `safetyAlert`), or empty. */
  indicator: MopDetailProcedureStepIndicator;
  initials: string;
  time: string;
};

export type MOPSection07DetailedProcedures = {
  stepRows: MopDetailedProcedureStepRow[];
  criticalStepNotes: string;
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

/** Section 05 — PPE table row (JSON/API supplies one object per row). */
export type MopPpeRequirementRow = {
  id: string;
  category: string;
  specification: string;
  whenRequired: string;
};

/** Section 05 — tools table; `specificToolsList` is newline-separated bullet list text. */
export type MopToolRequirementRow = {
  id: string;
  toolCategory: string;
  specificToolsList: string;
  purpose: string;
};

/** Section 05 — safety procedures checklist row. */
export type MopSafetyProcedureRow = {
  id: string;
  procedure: string;
  requirements: string;
  initials: string;
  time: string;
};

/** Section 05 — emergency contacts row. */
export type MopEmergencyContactRow = {
  id: string;
  emergencyType: string;
  contact: string;
  phoneNumber: string;
};

/** Section 05 — local emergency services (researched site-specific directory). */
export type MopLocalEmergencyServiceRow = {
  id: string;
  service: string;
  contactName: string;
  phoneNumber: string;
  address: string;
};

/** Section 06 — Key project assumptions (Category / Assumption). */
export type MopAssumptionRow = {
  id: string;
  category: string;
  assumption: string;
};

/** Section 06 — bullet under Critical Decision Points. */
export type MopCriticalDecisionPointItem = {
  id: string;
  text: string;
};

export type MOPAssumptions = {
  assumptionRows: MopAssumptionRow[];
  /** Shown in the critical-decision heading, e.g. "GENERATOR 1". */
  criticalDecisionUnitLabel: string;
  criticalDecisionPointItems: MopCriticalDecisionPointItem[];
};

/** Section 07 — one row in the generator operational data log (labels/units per template). */
export type MopGeneratorOperationalDataRow = {
  rowId: string;
  parameter: string;
  asFound: string;
  asLeft: string;
  units: string;
  acceptableRange: string;
};

/** Section 07 — engine performance (Hours of Operation, last/next service). */
export type MopEnginePerformanceDataRow = {
  rowId: string;
  parameter: string;
  reading: string;
  units: string;
  status: string;
};

/** Section 07 — system fault / alarm (fully user/API populated). */
export type MopFaultAlarmHistoryRow = {
  id: string;
  dateTime: string;
  faultCode: string;
  description: string;
  actionTaken: string;
  initials: string;
};

export type MOPSection07Details = {
  datePerformed: string;
  timeBegun: string;
  timeCompleted: string;
  facilitiesPersonnel: string;
  contractorPersonnel: string;
  generatorOperationalRows: MopGeneratorOperationalDataRow[];
  enginePerformanceRows: MopEnginePerformanceDataRow[];
  faultAlarmHistoryRows: MopFaultAlarmHistoryRow[];
  detailedProcedures: MOPSection07DetailedProcedures;
};

export type MOPSafety = {
  precautions: string;
  requiredPPE: string;
  toolsAndMaterials: string;
  /** Research location line for the local services table (API/autofill or manual). */
  localEmergencyServicesAddress: string;
  /** Dynamic-length tables: default empty rows, or one row per API/autofill item. */
  ppeRequirementRows: MopPpeRequirementRow[];
  toolRequirementRows: MopToolRequirementRow[];
  safetyProcedureRows: MopSafetyProcedureRow[];
  emergencyContactRows: MopEmergencyContactRow[];
  localEmergencyServiceRows: MopLocalEmergencyServiceRow[];
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
  assumptions: MOPAssumptions;
  mopDetails: MOPSection07Details;
  signOff: MOPSignOff;
  context: MOPContext;
  site: MOPSiteSection;
  overview: MOPSection03Overview;
  facilityEffects: MopFacilityEffectRow[];
};

export type MOPGenerateContext = Partial<
  Pick<MOPContext, "clientName" | "siteName" | "siteId">
>;

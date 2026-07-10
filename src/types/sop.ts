import { Asset } from "@/components";
import type { MOPStatus, RiskLevelOrEmpty } from "@/types/mop";
import type { ProcedureFacilityEffectRow } from "@/types/procedure-facility";
import type { SOPApproval } from "@/types/sop-approval";
import type { SOPBackOutProcedures } from "@/types/sop-back-out";
import type { SOPComments } from "@/types/sop-comments";
import type { SOPDetails } from "@/types/sop-details";
import type { SOPReferences } from "@/types/sop-references";

export type {
  SOPBackOutProcedureRow,
  SOPBackOutProcedures,
} from "@/types/sop-back-out";
export type { SOPCommentItem, SOPComments } from "@/types/sop-comments";
export type {
  SOPDetailedProcedureStepRow,
  SOPDetails,
  SOPPreProcedureCheckRow,
} from "@/types/sop-details";
export type {
  SOPReferenceAdditionalResourceRow,
  SOPReferenceDocumentRow,
  SOPReferenceGuidelineItem,
  SOPReferences,
  SOPReferenceSafetyStandardRow,
} from "@/types/sop-references";

export type SOPDocument = {
  title: string;
  identifier: string;
  version: number;
  createdDate: string;
  author: string;
  authorCetLevel: string;
  status: MOPStatus;
  lastModified: string;
};

export type SOPEquipment = {
  componentType: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  equipmentNumber: string;
  location: string;
};

export type SOPProcedure = {
  workDescription: string;
  duration: string;
  levelOfRisk: RiskLevelOrEmpty;
  cetLevelRequired: string;
};

export type SOPSignOff = {
  approvedBy: string;
};

export type SOPSiteSection = {
  customer: string;
  siteName: string;
  dataCenterLocation: string;
  siteAddress: string;
  siteContact: string;
};

export type SOPWorkDeliveryType = "self_delivered" | "vendor";

export type SOPSection03Overview = {
  sopTitle: string;
  workArea: string;
  buildingFloorRoom: string;
  accessRequirements: string;
  workDeliveryType: SOPWorkDeliveryType;
  qualificationsRequired: string;
  advanceNotifications: string;
  postNotifications: string;
};

export type SOPFacilitySystemKey =
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
  | "transferSwitch"
  | "buildingAutomation"
  | "waterLeakDetection";

export type SOPFacilityEffectRow =
  ProcedureFacilityEffectRow<SOPFacilitySystemKey>;

export type SOPPpeRequirementRow = {
  id: string;
  item: string;
  specification: string;
  requirement: string;
  task: string;
};

export type SOPToolRequirementRow = {
  id: string;
  tool: string;
  specification: string;
  use: string;
  procedureStep: string;
};

export type SOPEmergencyContactRow = {
  id: string;
  emergencyType: string;
  contact: string;
  phoneNumber: string;
};

export type SOPSiteHazardRow = {
  id: string;
  hazardType: string;
  description: string;
  controlMeasures: string;
};

export type SOPSafetyRequirements = {
  ppeRequirementRows: SOPPpeRequirementRow[];
  toolRequirementRows: SOPToolRequirementRow[];
  emergencyContactRows: SOPEmergencyContactRow[];
  siteHazardRows: SOPSiteHazardRow[];
};

export type SOPRiskAnalysisRow = {
  id: string;
  category: string;
  description: string;
  likelihood: string;
  impact: string;
  mitigationStrategy: string;
};

export type SOPKeyAssumptionRow = {
  id: string;
  category: string;
  assumption: string;
};

export type SOPCriticalDecisionPointItem = {
  id: string;
  text: string;
};

export type SOPRisksAssumptions = {
  riskAnalysisRows: SOPRiskAnalysisRow[];
  keyAssumptionRows: SOPKeyAssumptionRow[];
  criticalDecisionPointItems: SOPCriticalDecisionPointItem[];
};

export type SOP = {
  id: string;
  document: SOPDocument;
  equipment: SOPEquipment;
  procedure: SOPProcedure;
  signOff: SOPSignOff;
  site: SOPSiteSection;
  overview: SOPSection03Overview;
  facilityEffects: SOPFacilityEffectRow[];
  documentVerified: boolean;
  safety: SOPSafetyRequirements;
  risksAssumptions: SOPRisksAssumptions;
  details: SOPDetails;
  backOutProcedures: SOPBackOutProcedures;
  approval: SOPApproval;
  comments: SOPComments;
  references: SOPReferences;
  asset: Asset;
  generatedDocumentId: string;
};

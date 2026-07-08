import { Asset } from "@/components";
import type { MOPStatus, RiskLevelOrEmpty } from "@/types/mop";

export type EOPDocument = {
  title: string;
  identifier: string;
  version: number;
  createdDate: string;
  author: string;
  authorCetLevel: string;
  status: MOPStatus;
  lastModified: string;
};

export type EOPEquipment = {
  componentType: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  equipmentNumber: string;
  location: string;
};

export type EOPProcedure = {
  workDescription: string;
  duration: string;
  levelOfRisk: RiskLevelOrEmpty;
  cetLevelRequired: string;
};

export type EOPSignOff = {
  approvedBy: string;
};

export type EOPSiteSection = {
  customer: string;
  siteName: string;
  dataCenterLocation: string;
  siteAddress: string;
  siteContact: string;
};

export type EOPWorkDeliveryType = "self_delivered" | "vendor";

export type EOPSection03Overview = {
  eopTitle: string;
  workArea: string;
  buildingFloorRoom: string;
  accessRequirements: string;
  workDeliveryType: EOPWorkDeliveryType;
  qualificationsRequired: string;
  immediateNotifications: string;
  postNotifications: string;
};

export type EopEscalationMatrixRow = {
  id: string;
  level: string;
  title: string;
  contactName: string;
  phoneNumber: string;
};

export type EopEmergencyContactRow = {
  id: string;
  serviceType: string;
  contactNameOrganization: string;
  phoneNumber: string;
  notesAddress: string;
};

export type EOPSection06Communication = {
  escalationMatrixRows: EopEscalationMatrixRow[];
  emergencyContactRows: EopEmergencyContactRow[];
  verificationContactName: string;
  verificationPhoneNumber: string;
};

export type EopSection04PpeRow = {
  id: string;
  ppeItem: string;
  specification: string;
  verified: boolean;
};

export type EopSection04ToolRow = {
  id: string;
  tool: string;
  modelType: string;
  available: boolean;
};

export type EopSection04SafetyChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type EOPSection04PreActionSafety = {
  ppeIntroText: string;
  ppeRows: EopSection04PpeRow[];
  toolRows: EopSection04ToolRow[];
  safetyChecklistItems: EopSection04SafetyChecklistItem[];
};

export type EopDiagnosticPassFail = "pass" | "fail" | "";

export type EopSection04InternalDiagnosticRow = {
  id: string;
  stepNumber: number;
  componentToCheck: string;
  expectedCondition: string;
  actualReading: string;
  actualReadingPlaceholder: string;
  passFail: EopDiagnosticPassFail;
};

export type EOPSection04InternalDiagnostics = {
  introText: string;
  diagnosticRows: EopSection04InternalDiagnosticRow[];
};

export type EOPSection04ImmediateActions = {
  preActionSafety: EOPSection04PreActionSafety;
  internalDiagnostics: EOPSection04InternalDiagnostics;
};

export type EopSection05ExternalActionRow = {
  id: string;
  stepNumber: number;
  externalEquipment: string;
  connectionToUnit: string;
  potentialFailureMode: string;
  verificationMethod: string;
  actualStatus: string;
  actualStatusPlaceholder: string;
  passFail: EopDiagnosticPassFail;
};

export type EOPSection05ExternalActions = {
  introText: string;
  actionRows: EopSection05ExternalActionRow[];
};

export type EopSection07ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type EopSection07FunctionalityRow = {
  id: string;
  parameter: string;
  expectedRange: string;
  actualReading: string;
  actualReadingPlaceholder: string;
  passFail: EopDiagnosticPassFail;
};

export type EOPSection07Recovery = {
  introText: string;
  resolutionVerificationItems: EopSection07ChecklistItem[];
  disconnectVoltage: string;
  preStartSafetyItems: EopSection07ChecklistItem[];
  restartSequenceItems: EopSection07ChecklistItem[];
  startupTime: string;
  functionalityRows: EopSection07FunctionalityRow[];
  loadTransferNote: string;
  performanceValidationItems: EopSection07ChecklistItem[];
  returnToNormalItems: EopSection07ChecklistItem[];
  restorationCompletedBy: string;
  restorationCompletedAt: string;
};

export type EopSection08PolicyDocumentRow = {
  id: string;
  documentName: string;
  uploadDate: string;
  documentType: string;
};

export type EopSection08InfrastructureRow = {
  id: string;
  infrastructureElement: string;
  locationDetails: string;
  accessRequirements: string;
};

export type EopSection08SparePartRow = {
  id: string;
  partDescription: string;
  partNumber: string;
  quantity: string;
  storageLocation: string;
};

export type EopSection08RelatedDocument = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export type EOPReferenceDocumentRow = {
  id: string;
  documentType: string;
  description: string;
  accessLocation: string;
};
export type EOPReferenceSafetyStandardRow = {
  id: string;
  standard: string;
  description: string;
  accessLocation: string;
};

export type EOPReferenceAdditionalResourceRow = {
  id: string;
  resourceType: string;
  description: string;
  accessLocation: string;
};

// export type EOPSection08SupportingInformation = {
//   policyDocuments: EopSection08PolicyDocumentRow[];
//   policyNote: string;
//   infrastructureLocations: EopSection08InfrastructureRow[];
//   sparePartsIntro: string;
//   spareParts: EopSection08SparePartRow[];
//   relatedDocuments: EopSection08RelatedDocument[];
// };
export type EOPSection08SupportingInformation = {
    equipmentDocumentRows: EOPReferenceDocumentRow[];
    safetyStandardRows: EOPReferenceSafetyStandardRow[];
    additionalResourceRows: EOPReferenceAdditionalResourceRow[];
}

export type EopApprovalReviewRow = {
  id: string;
  role: string;
  name: string;
  signature: string;
  date: string;
};

export type EOPSection09ApprovalReview = {
  reviewRows: EopApprovalReviewRow[];
};

export type EOP = {
  id: string;
  document: EOPDocument;
  equipment: EOPEquipment;
  procedure: EOPProcedure;
  signOff: EOPSignOff;
  site: EOPSiteSection;
  overview: EOPSection03Overview;
  immediateActions: EOPSection04ImmediateActions;
  externalActions: EOPSection05ExternalActions;
  communication: EOPSection06Communication;
  recovery: EOPSection07Recovery;
  supportingInformation: EOPSection08SupportingInformation;
  approvalReview: EOPSection09ApprovalReview;
  asset: Asset;
  generatedDocumentId: string
};

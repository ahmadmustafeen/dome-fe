import type { MOPStatus, RiskLevelOrEmpty } from "@/types/mop";
import type { ProcedureFacilityEffectRow } from "@/types/procedure-facility";

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

export type SOP = {
  id: string;
  document: SOPDocument;
  equipment: SOPEquipment;
  procedure: SOPProcedure;
  signOff: SOPSignOff;
  site: SOPSiteSection;
  overview: SOPSection03Overview;
  facilityEffects: SOPFacilityEffectRow[];
};

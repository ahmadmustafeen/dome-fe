import type { RiskLevelOrEmpty } from "@/types/mop";

export type EOPDocument = {
  title: string;
  identifier: string;
  version: number;
  createdDate: string;
  author: string;
  authorCetLevel: string;
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

export type EOP = {
  id: string;
  document: EOPDocument;
  equipment: EOPEquipment;
  procedure: EOPProcedure;
  signOff: EOPSignOff;
  site: EOPSiteSection;
  overview: EOPSection03Overview;
};

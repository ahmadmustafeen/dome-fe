import type { MOPStatus, RiskLevelOrEmpty } from "@/types/mop";

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

export type SOP = {
  id: string;
  document: SOPDocument;
  equipment: SOPEquipment;
  procedure: SOPProcedure;
  signOff: SOPSignOff;
};

export type MopStatus =
  | "Draft"
  | "Ready to Deliver"
  | "Delivered to Client"
  | "Revision Needed";

export type MopRiskLevel = "Low" | "Medium" | "High" | "Critical";

export type MopPermitAnswer = "yes" | "no" | "";

export type MopStep = {
  id: string;
  html: string;
};

export type MopFormValues = {
  mopTitle: string;
  mopIdentifier: string;
  versionNumber: string;
  status: MopStatus;
  equipmentAssetName: string;
  equipmentType: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  equipmentNumber: string;
  locationSite: string;
  workDescriptionHtml: string;
  duration: string;
  levelOfRisk: MopRiskLevel | "";
  cetLevelRequired: string;
  specialPermitsRequired: MopPermitAnswer;
  specialPermitsNotes: string;
  steps: MopStep[];
  safetyPrecautions: string;
  requiredPpe: string;
  toolsAndMaterials: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
};

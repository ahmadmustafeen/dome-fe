export type MopStatus =
  | "Draft"
  | "Ready to Deliver"
  | "Delivered to Client"
  | "Revision Needed";

export type MopRiskLevel = "Low" | "Medium" | "High" | "Critical";

export type MopPermitAnswer = "yes" | "no" | "";

export type MopMbmRequired = "" | "Yes" | "No" | "N/A";

export type MopStep = {
  id: string;
  html: string;
};

export type MopFormValues = {
  mopTitle: string;
  mopIdentifier: string;
  versionNumber: string;
  status: MopStatus;
  /** Section 01 — portal “MOP Information” (plain text). */
  mopInformation: string;
  /** Section 01 — portal author CET level (1–4). */
  authorCetLevel: string;
  /** Section 01 — portal “MOP Creation Date” (`YYYY-MM-DD`). */
  mopCreationDate: string;
  /** Section 01 — portal “MOP Revision Date” (`YYYY-MM-DD`). */
  mopRevisionDate: string;
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
  /** Section 02 — customer (generator). */
  siteCustomer: string;
  /** Section 02 — site / facility name. */
  siteFacilityName: string;
  /** Section 02 — site contact line. */
  siteContact: string;
  siteAddressStreet: string;
  siteAddressCity: string;
  siteAddressState: string;
  siteAddressZip: string;
  serviceTicketNumber: string;
  /** Section 02 — portal numeric level of risk (1–4). */
  siteLevelOfRiskNumeric: string;
  mbmRequired: MopMbmRequired;
};

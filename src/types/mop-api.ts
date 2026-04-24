import type {
  MopMbmRequired,
  MopPermitAnswer,
  MopRiskLevel,
  MopStatus,
  MopStep,
} from "./mop-form";

export interface MopApiRecord {
  _id: string;
  siteId: string;
  clientId?: string;
  mopTitle: string;
  mopIdentifier: string;
  versionNumber: string;
  status: MopStatus;
  mopInformation: string;
  authorCetLevel: string;
  mopCreationDate: string;
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
  siteCustomer: string;
  siteFacilityName: string;
  siteContact: string;
  siteAddressStreet: string;
  siteAddressCity: string;
  siteAddressState: string;
  siteAddressZip: string;
  serviceTicketNumber: string;
  siteLevelOfRiskNumeric: string;
  mbmRequired: MopMbmRequired;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MopArchiveApiRecord extends Omit<MopApiRecord, "_id" | "isDeleted"> {
  _id: string;
  mopId: string;
  archivedAt: string;
}

export interface MopCreateInput
  extends Omit<MopApiRecord, "_id" | "isDeleted" | "createdAt" | "updatedAt"> {
  siteId: string;
  clientId?: string;
}

export interface MopUpdateInput
  extends Omit<MopApiRecord, "_id" | "isDeleted" | "createdAt" | "updatedAt" | "siteId" | "clientId"> {}

export interface MopSingleApiResponse {
  success: boolean;
  message?: string;
  data: MopApiRecord;
}

export interface MopListApiResponse {
  success: boolean;
  data: {
    mops: MopApiRecord[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MopHistoryApiResponse {
  success: boolean;
  data: MopArchiveApiRecord[];
}

export interface MopDeleteApiResponse {
  success: boolean;
  message: string;
}

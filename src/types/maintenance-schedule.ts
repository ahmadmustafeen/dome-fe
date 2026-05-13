/** Maintenance frequency flags for a single asset category row. */
export type MaintenanceFrequency = {
  monthly: boolean;
  quarterly: boolean;
  semiAnnual: boolean;
  annual: boolean;
  twoYear: boolean;
  threeYear: boolean;
  fiveYear: boolean;
};

/** Procedure family used for generation flows (MOP / EOP / SOP). */
export type ProcedureKind = "mop" | "eop" | "sop";

export const PROCEDURE_KINDS: readonly ProcedureKind[] = ["mop", "eop", "sop"];

export const isProcedureKind = (value: string): value is ProcedureKind =>
  (PROCEDURE_KINDS as readonly string[]).includes(value);

/** A single MOP / EOP / SOP procedure with its generation status. */
// export type ProcedureItem = {
//   id: string;
//   description: string;
//   generated: boolean;
//   documentUrl?: string;
// };

export type ProcedureItem = {
  _id: string;
  title: string
}

/** A single asset inside a category, with per-asset procedure items. */
export type CategoryAsset = {
  _id: string;
  id: string;
  assetId: string;
  assetName: string;
  location: string;
  serialNumber: string;
  eop: string[];
  mop: string[];
  sop: string[];
  mops: ProcedureItem[];
  eops: ProcedureItem[];
  sops: ProcedureItem[];
};

/** One row in the maintenance schedule table. */
export type MaintenanceRow = {
  _id: string;
  id: string;
  category: string;
  subCategory: string;
  description: string;
  count: number;
  make: string;
  totalMOPs: number;
  totalEOPs: number;
  totalSOPs: number;
  MOPs: ProcedureItem[];
  EOPs: ProcedureItem[];
  SOPs: ProcedureItem[];
};



/** The full generated schedule for a site. */
export type MaintenanceScheduleData = {
  generatedAt: string;
  rows: MaintenanceRow[];
};


export interface MaintenanceScheduleApiResponse {
  success: boolean;
  data: MaintenanceRow[];
}
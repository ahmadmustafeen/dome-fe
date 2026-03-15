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

/** One row in the maintenance schedule table. */
export type MaintenanceRow = {
  id: string;
  category: string;
  assetCount: number;
  frequency: MaintenanceFrequency;
  totalMOPs: number;
  totalEOPs: number;
  totalSOPs: number;
  /** Up to 10 MOP requirement descriptions. */
  mopRequirements: string[];
  /** Up to 10 EOP requirement descriptions. */
  eopRequirements: string[];
  /** Up to 10 SOP requirement descriptions. */
  sopRequirements: string[];
};

/** The full generated schedule for a site. */
export type MaintenanceScheduleData = {
  generatedAt: string;
  rows: MaintenanceRow[];
};

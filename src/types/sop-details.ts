export type SOPPreProcedureCheckRow = {
  id: string;
  step: number;
  description: string;
  expectedResult: string;
  actualResult: string;
  actionIfNotMet: string;
};

export type SOPDetailedProcedureStepRow = {
  id: string;
  step: number;
  description: string;
  indicator: string;
  expectedRange: string;
  source: string;
  recordedValue: string;
  initials: string;
  time: string;
  actionIfOutOfRange: string;
};

export type SOPDetails = {
  preProcedureCheckRows: SOPPreProcedureCheckRow[];
  detailedProcedureStepRows: SOPDetailedProcedureStepRow[];
};

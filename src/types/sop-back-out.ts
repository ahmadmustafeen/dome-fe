export type SOPBackOutProcedureRow = {
  id: string;
  step: number;
  description: string;
  verification: string;
  actionRequired: string;
};

export type SOPBackOutProcedures = {
  rows: SOPBackOutProcedureRow[];
};

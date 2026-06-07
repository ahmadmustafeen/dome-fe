export type SOPBackOutProcedureRow = {
  id: string;
  step: number;
  description: string;
  verification: string;
  actionRequired: string;
  initials: string;
  time: string;
};

export type SOPBackOutProcedures = {
  rows: SOPBackOutProcedureRow[];
};

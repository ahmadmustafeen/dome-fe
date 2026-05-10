export const insertProcedureRowAfterId = <T extends { id: string }>(
  rows: T[],
  afterRowId: string,
  newRow: T,
): T[] => {
  const index = rows.findIndex((row) => row.id === afterRowId);
  if (index < 0) {
    return [...rows, newRow];
  }
  return [...rows.slice(0, index + 1), newRow, ...rows.slice(index + 1)];
};

export const removeProcedureRowById = <T extends { id: string }>(
  rows: T[],
  rowId: string,
  minRows: number,
): T[] | undefined => {
  if (rows.length <= minRows) {
    return undefined;
  }
  return rows.filter((row) => row.id !== rowId);
};

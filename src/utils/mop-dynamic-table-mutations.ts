export const insertRowAfterId = <T extends { id: string }>(
  rows: T[],
  afterRowId: string,
  newRow: T,
): T[] => {
  const index = rows.findIndex(r => r.id === afterRowId);
  if (index < 0) {
    return [...rows, newRow];
  }
  return [...rows.slice(0, index + 1), newRow, ...rows.slice(index + 1)];
};

export const removeRowById = <T extends { id: string }>(
  rows: T[],
  rowId: string,
  minRows: number,
): T[] | undefined => {
  if (rows.length <= minRows) {
    return undefined;
  }
  return rows.filter(r => r.id !== rowId);
};

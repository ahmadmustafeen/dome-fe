"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_08_POLICY_HEADING,
  EOP_SECTION_08_POLICY_INTRO,
  newEopSection08PolicyDocumentRow,
} from "@/constants/eop-section08-supporting-information";
import { MOP_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/mop-dynamic-table";
import type { EopSection08PolicyDocumentRow } from "@/types/eop";
import {
  insertRowAfterId,
  removeRowById,
} from "@/utils/mop-dynamic-table-mutations";

import { MopDynamicTableRowControls } from "../mop/MopDynamicTableRowControls";

type EopSection08PolicyDocumentsTableProps = {
  rows: EopSection08PolicyDocumentRow[];
  note: string;
  onRowsChange: (rows: EopSection08PolicyDocumentRow[]) => void;
};

const updateRow = (
  rows: EopSection08PolicyDocumentRow[],
  rowId: string,
  partial: Partial<
    Pick<
      EopSection08PolicyDocumentRow,
      "documentName" | "documentType" | "uploadDate"
    >
  >,
): EopSection08PolicyDocumentRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection08PolicyDocumentsTable = ({
  rows,
  note,
  onRowsChange,
}: EopSection08PolicyDocumentsTableProps) => {

  return (
    <div className="mt-3">
      <Typography variant="h6" className="mb-1 text-base font-semibold text-gray-900">
        {EOP_SECTION_08_POLICY_HEADING}
      </Typography>
      <Typography variant="p" className="mb-3 text-sm text-gray-600">
        {EOP_SECTION_08_POLICY_INTRO}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-sm">
          <thead>
            <tr className="bg-[#5A1A1A] text-white">
              <th className="px-3 py-2 text-left font-semibold">Policy Document</th>
              <th className="w-40 px-3 py-2 text-left font-semibold">Upload Date</th>
              <th className="w-44 px-3 py-2 text-left font-semibold">Type</th>
              <th scope="col" className="w-17 px-1 py-2 text-center text-xs font-semibold">
                +-
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                  <Textarea
                    value={row.documentName}
                    onChange={(event) =>
                      onRowsChange(
                        updateRow(rows, row.id, {
                          documentName: event.target.value,
                        }),
                      )}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.uploadDate}
                    onChange={(event) =>
                      onRowsChange(
                        updateRow(rows, row.id, {
                          uploadDate: event.target.value,
                        }),
                      )}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                  <Textarea
                    value={row.documentType}
                    onChange={(event) =>
                      onRowsChange(
                        updateRow(rows, row.id, {
                          documentType: event.target.value,
                        }),
                      )}
                    className="min-h-20 w-full"
                  />
                </td>
                <td className="border border-gray-200 px-1 align-middle">
                  <MopDynamicTableRowControls
                    ariaLabelGroup="EOP policy documents row controls"
                    rowCount={rows.length}
                    onAddBelow={() =>
                      onRowsChange(
                        insertRowAfterId(
                          rows,
                          row.id,
                          newEopSection08PolicyDocumentRow(),
                        ),
                      )}
                    onRemove={() => {
                      const next = removeRowById(
                        rows,
                        row.id,
                        MOP_DYNAMIC_TABLE_MIN_ROWS,
                      );
                      if (next !== undefined) {
                        onRowsChange(next);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md border border-blue-300 bg-blue-50 px-3 py-3 text-sm text-blue-900">
        {note}
      </div>
    </div>
  )
};

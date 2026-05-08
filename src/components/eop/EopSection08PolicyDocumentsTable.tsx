"use client";

import { Typography } from "@/components/common";
import {
  EOP_SECTION_08_POLICY_HEADING,
  EOP_SECTION_08_POLICY_INTRO,
} from "@/constants/eop-section08-supporting-information";
import type { EopSection08PolicyDocumentRow } from "@/types/eop";

type EopSection08PolicyDocumentsTableProps = {
  rows: EopSection08PolicyDocumentRow[];
  note: string;
};

export const EopSection08PolicyDocumentsTable = ({
  rows,
  note,
}: EopSection08PolicyDocumentsTableProps) => (
  <div className="mt-3">
    <Typography variant="h6" className="mb-1 text-base font-semibold text-gray-900">
      {EOP_SECTION_08_POLICY_HEADING}
    </Typography>
    <Typography variant="p" className="mb-3 text-sm text-gray-600">
      {EOP_SECTION_08_POLICY_INTRO}
    </Typography>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f3456] text-white">
            <th className="px-3 py-2 text-left font-semibold">Policy Document</th>
            <th className="w-40 px-3 py-2 text-left font-semibold">Upload Date</th>
            <th className="w-44 px-3 py-2 text-left font-semibold">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-900">
                {row.documentName}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.uploadDate}
              </td>
              <td className="border border-gray-200 px-3 py-2 align-top text-gray-700">
                {row.documentType}
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
);

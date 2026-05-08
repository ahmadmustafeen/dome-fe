"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { EOP_SECTION_09_HEADING } from "@/constants/eop-section09-approval-review";
import type { EOPSection09ApprovalReview } from "@/types/eop";

type EopSection09ApprovalReviewProps = {
  approvalReview: EOPSection09ApprovalReview;
  patchApprovalReview: (p: Partial<EOPSection09ApprovalReview>) => void;
};

const patchReviewCell = (
  rows: EOPSection09ApprovalReview["reviewRows"],
  rowId: string,
  partial: Partial<
    Pick<EOPSection09ApprovalReview["reviewRows"][number], "name" | "signature" | "date">
  >,
  patchApprovalReview: EopSection09ApprovalReviewProps["patchApprovalReview"],
) => {
  patchApprovalReview({
    reviewRows: rows.map((row) => (row.id === rowId ? { ...row, ...partial } : row)),
  });
};

export const EopSection09ApprovalReview = ({
  approvalReview,
  patchApprovalReview,
}: EopSection09ApprovalReviewProps) => {
  const rows = approvalReview.reviewRows;
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_09_HEADING}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="px-3 py-2 text-left font-semibold">Role</th>
              <th className="px-3 py-2 text-left font-semibold">Name</th>
              <th className="px-3 py-2 text-left font-semibold">Signature</th>
              <th className="px-3 py-2 text-left font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-3 py-2 align-top">{row.role}</td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.name}
                    onChange={(e) =>
                      patchReviewCell(rows, row.id, { name: e.target.value }, patchApprovalReview)
                    }
                    placeholder="Enter name"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    value={row.signature}
                    onChange={(e) =>
                      patchReviewCell(rows, row.id, { signature: e.target.value }, patchApprovalReview)
                    }
                    placeholder="Signature"
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-200 px-2 py-1 align-top">
                  <Input
                    type="date"
                    value={row.date}
                    onChange={(e) =>
                      patchReviewCell(rows, row.id, { date: e.target.value }, patchApprovalReview)
                    }
                    placeholder="MM/DD/YYYY"
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

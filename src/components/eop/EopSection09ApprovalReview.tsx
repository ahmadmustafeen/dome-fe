"use client";

import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";
import {
  EOP_EFFECTIVE_DATE_LABEL,
  EOP_EXPIRATION_DATE_LABEL,
  EOP_SECTION_09_HEADING,
  EOP_SECTION_09_PLACEHOLDERS,
  EOP_SECTION_09_TABLE_HEADERS,
  newEopApprovalReviewRow,
  resolveEopApprovalReview,
} from "@/constants/eop-section09-approval-review";
import type { EOPSection09ApprovalReview, EopApprovalReviewRow } from "@/types/eop";
import {
  insertProcedureRowAfterId,
  removeProcedureRowById,
} from "@/utils/procedure-dynamic-table-mutations";

type EopSection09ApprovalReviewProps = {
  approvalReview?: EOPSection09ApprovalReview;
  patchApprovalReview: (p: Partial<EOPSection09ApprovalReview>) => void;
};

const patchReviewCell = (
  rows: EopApprovalReviewRow[],
  rowId: string,
  partial: Partial<Omit<EopApprovalReviewRow, "id">>,
): EopApprovalReviewRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const EopSection09ApprovalReview = ({
  approvalReview,
  patchApprovalReview,
}: EopSection09ApprovalReviewProps) => {
  const resolvedApprovalReview = resolveEopApprovalReview(approvalReview);
  const reviewRows = resolvedApprovalReview.reviewRows;

  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={EOP_SECTION_09_HEADING}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse text-sm">
            <thead>
              <tr className="bg-[#5A1A1A] text-white">
                <th className="px-3 py-2 text-left font-semibold">
                  {EOP_SECTION_09_TABLE_HEADERS.reviewStage}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {EOP_SECTION_09_TABLE_HEADERS.reviewersName}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {EOP_SECTION_09_TABLE_HEADERS.reviewersTitle}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {EOP_SECTION_09_TABLE_HEADERS.date}
                </th>
                <th
                  scope="col"
                  className="w-17 px-1 py-2 text-center text-xs font-semibold"
                >
                  +-
                </th>
              </tr>
            </thead>
            <tbody>
              {reviewRows.map((row) => (
                <tr key={row.id} className="bg-white">
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewStage}
                      onChange={(event) =>
                        patchApprovalReview({
                          reviewRows: patchReviewCell(reviewRows, row.id, {
                            reviewStage: event.target.value,
                          }),
                        })}
                      className="w-full font-semibold text-gray-900"
                      placeholder="Review stage"
                      aria-label={`${EOP_SECTION_09_TABLE_HEADERS.reviewStage} for row`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewersName}
                      onChange={(event) =>
                        patchApprovalReview({
                          reviewRows: patchReviewCell(reviewRows, row.id, {
                            reviewersName: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={EOP_SECTION_09_PLACEHOLDERS.name}
                      aria-label={`${row.reviewStage} ${EOP_SECTION_09_PLACEHOLDERS.name}`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewersTitle}
                      onChange={(event) =>
                        patchApprovalReview({
                          reviewRows: patchReviewCell(reviewRows, row.id, {
                            reviewersTitle: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={EOP_SECTION_09_PLACEHOLDERS.title}
                      aria-label={`${row.reviewStage} ${EOP_SECTION_09_PLACEHOLDERS.title}`}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.date}
                      onChange={(event) =>
                        patchApprovalReview({
                          reviewRows: patchReviewCell(reviewRows, row.id, {
                            date: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={EOP_SECTION_09_PLACEHOLDERS.date}
                      aria-label={`${row.reviewStage.length > 0 ? row.reviewStage : 'Review stage'} ${EOP_SECTION_09_TABLE_HEADERS.date}`}
                    />
                  </td>
                  <td className="border border-gray-200 px-1 align-middle">
                    <ProcedureDynamicTableRowControls
                      ariaLabelGroup="EOP approval review row controls"
                      rowCount={reviewRows.length}
                      onAddBelow={() =>
                        patchApprovalReview({
                          reviewRows: insertProcedureRowAfterId(
                            reviewRows,
                            row.id,
                            newEopApprovalReviewRow(),
                          ),
                        })}
                      onRemove={() => {
                        const next = removeProcedureRowById(
                          reviewRows,
                          row.id,
                          PROCEDURE_DYNAMIC_TABLE_MIN_ROWS,
                        );
                        if (next !== undefined) {
                          patchApprovalReview({ reviewRows: next });
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-gray-800">
            {EOP_EFFECTIVE_DATE_LABEL}
            <Input
              value={resolvedApprovalReview.effectiveDate}
              onChange={(event) =>
                patchApprovalReview({ effectiveDate: event.target.value })}
              className="mt-1 w-full max-w-xs"
              placeholder={EOP_SECTION_09_PLACEHOLDERS.date}
            />
          </label>
          <label className="block text-sm font-semibold text-gray-800">
            {EOP_EXPIRATION_DATE_LABEL}
            <Input
              value={resolvedApprovalReview.expirationDate}
              onChange={(event) =>
                patchApprovalReview({ expirationDate: event.target.value })}
              className="mt-1 w-full max-w-xs"
              placeholder={EOP_SECTION_09_PLACEHOLDERS.date}
            />
          </label>
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

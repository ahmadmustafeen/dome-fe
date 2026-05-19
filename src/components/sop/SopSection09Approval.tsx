"use client";

import { ProcedureDynamicTableRowControls } from "@/components/procedure/ProcedureDynamicTableRowControls";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import { PROCEDURE_DYNAMIC_TABLE_MIN_ROWS } from "@/constants/procedure-dynamic-table";
import {
  newSopApprovalReviewRow,
  SOP_EFFECTIVE_DATE_LABEL,
  SOP_EXPIRATION_DATE_LABEL,
  SOP_SECTION_09_HEADING,
  SOP_SECTION_09_PLACEHOLDERS,
  SOP_SECTION_09_TABLE_HEADERS,
} from "@/constants/sop-section09-approval";
import type { SOPApproval, SOPApprovalReviewRow } from "@/types/sop-approval";
import {
  insertProcedureRowAfterId,
  removeProcedureRowById,
} from "@/utils/procedure-dynamic-table-mutations";

type SopSection09ApprovalProps = {
  approval: SOPApproval;
  patchApproval: (partial: Partial<SOPApproval>) => void;
};

const patchReviewRow = (
  rows: SOPApprovalReviewRow[],
  rowId: string,
  partial: Partial<Omit<SOPApprovalReviewRow, "id">>,
): SOPApprovalReviewRow[] =>
  rows?.map((row) => (row.id === rowId ? { ...row, ...partial } : row));

export const SopSection09Approval = ({
  approval,
  patchApproval,
}: SopSection09ApprovalProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_09_HEADING}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse text-sm">
            <thead>
              <tr className="bg-[#0F4D2E] text-white">
                <th className="px-3 py-2 text-left font-semibold">
                  {SOP_SECTION_09_TABLE_HEADERS.reviewStage}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {SOP_SECTION_09_TABLE_HEADERS.reviewersName}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {SOP_SECTION_09_TABLE_HEADERS.reviewersTitle}
                </th>
                <th className="px-3 py-2 text-left font-semibold">
                  {SOP_SECTION_09_TABLE_HEADERS.date}
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
              {approval?.reviewRows?.map((row) => (
                <tr key={row.id} className="bg-white">
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewStage}
                      onChange={(event) =>
                        patchApproval({
                          reviewRows: patchReviewRow(approval?.reviewRows, row.id, {
                            reviewStage: event.target.value,
                          }),
                        })}
                      className="w-full font-semibold text-gray-900"
                      placeholder="Review stage"
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewersName}
                      onChange={(event) =>
                        patchApproval({
                          reviewRows: patchReviewRow(approval?.reviewRows, row.id, {
                            reviewersName: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={SOP_SECTION_09_PLACEHOLDERS.name}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.reviewersTitle}
                      onChange={(event) =>
                        patchApproval({
                          reviewRows: patchReviewRow(approval?.reviewRows, row.id, {
                            reviewersTitle: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={SOP_SECTION_09_PLACEHOLDERS.title}
                    />
                  </td>
                  <td className="border border-gray-200 px-2 py-1 align-top">
                    <Input
                      value={row.date}
                      onChange={(event) =>
                        patchApproval({
                          reviewRows: patchReviewRow(approval?.reviewRows, row.id, {
                            date: event.target.value,
                          }),
                        })}
                      className="w-full"
                      placeholder={SOP_SECTION_09_PLACEHOLDERS.date}
                    />
                  </td>
                  <td className="border border-gray-200 px-1 align-middle">
                    <ProcedureDynamicTableRowControls
                      ariaLabelGroup="SOP approval review row controls"
                      rowCount={approval?.reviewRows.length}
                      onAddBelow={() =>
                        patchApproval({
                          reviewRows: insertProcedureRowAfterId(
                            approval?.reviewRows,
                            row.id,
                            newSopApprovalReviewRow(),
                          ),
                        })}
                      onRemove={() => {
                        const next = removeProcedureRowById(
                          approval?.reviewRows,
                          row.id,
                          PROCEDURE_DYNAMIC_TABLE_MIN_ROWS,
                        );
                        if (next !== undefined) {
                          patchApproval({ reviewRows: next });
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
            {SOP_EFFECTIVE_DATE_LABEL}
            <Input
              value={approval?.effectiveDate}
              onChange={(event) =>
                patchApproval({ effectiveDate: event.target.value })}
              className="mt-1 w-full max-w-xs"
              placeholder={SOP_SECTION_09_PLACEHOLDERS.date}
            />
          </label>
          <label className="block text-sm font-semibold text-gray-800">
            {SOP_EXPIRATION_DATE_LABEL}
            <Input
              value={approval?.expirationDate}
              onChange={(event) =>
                patchApproval({ expirationDate: event.target.value })}
              className="mt-1 w-full max-w-xs"
              placeholder={SOP_SECTION_09_PLACEHOLDERS.date}
            />
          </label>
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

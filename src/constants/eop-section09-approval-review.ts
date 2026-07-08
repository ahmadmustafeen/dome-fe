import type {
  EOPSection09ApprovalReview,
  EopApprovalReviewRow,
} from "@/types/eop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const EOP_SECTION_09_HEADING = "Section 09: EOP Approval";

export const EOP_SECTION_09_TABLE_HEADERS = {
  date: "Date",
  reviewStage: "Review Stage",
  reviewersName: "Reviewer's Name",
  reviewersTitle: "Reviewer's Title",
} as const;

export const EOP_SECTION_09_PLACEHOLDERS = {
  date: "MM/DD/YYYY",
  name: "Print Name",
  title: "Title",
} as const;

export const EOP_EFFECTIVE_DATE_LABEL = "EOP Effective Date:";

export const EOP_EXPIRATION_DATE_LABEL = "EOP Expiration Date:";

export const newEopApprovalReviewRow = (): EopApprovalReviewRow => ({
  id: newProcedureRowId("eop-approval"),
  reviewStage: "",
  reviewersName: "",
  reviewersTitle: "",
  date: "",
});

const ensureReviewRow = (
  row: EopApprovalReviewRow,
  index: number,
): EopApprovalReviewRow => {
  const reviewStage = row.reviewStage?.trim().length
    ? row.reviewStage
    : (row.role?.trim().length ? row.role : `Review ${index + 1}`);

  return {
    ...row,
    id: row.id?.trim().length ? row.id : newProcedureRowId("eop-approval"),
    reviewStage,
    reviewersName: row.reviewersName ?? row.name ?? "",
    reviewersTitle: row.reviewersTitle ?? row.signature ?? "",
    date: row.date ?? "",
  };
};

export const resolveEopApprovalReview = (
  approvalReview?: EOPSection09ApprovalReview,
): EOPSection09ApprovalReview => ({
  ...approvalReview,
  effectiveDate: approvalReview?.effectiveDate ?? "",
  expirationDate: approvalReview?.expirationDate ?? "",
  reviewRows:
    approvalReview?.reviewRows?.map((row, index) => ensureReviewRow(row, index)) ?? [],
});

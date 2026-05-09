import type { SOPApproval, SOPApprovalReviewRow } from "@/types/sop-approval";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_09_HEADING = "Section 09: SOP Approval";

export const SOP_SECTION_09_TABLE_HEADERS = {
  date: "Date",
  reviewStage: "Review Stage",
  reviewersName: "Reviewer's Name",
  reviewersTitle: "Reviewer's Title",
} as const;

export const SOP_SECTION_09_REVIEW_STAGES: readonly string[] = [
  "Tested for clarity:",
  "Technical review:",
  "Chief Engineer approval:",
  "Customer approval:",
];

export const SOP_SECTION_09_PLACEHOLDERS = {
  date: "MM/DD/YYYY",
  name: "Print Name",
  title: "Title",
} as const;

export const SOP_EFFECTIVE_DATE_LABEL = "SOP Effective Date:";

export const SOP_EXPIRATION_DATE_LABEL = "SOP Expiration Date:";

export const newSopApprovalReviewRow = (): SOPApprovalReviewRow => ({
  id: newProcedureRowId("sop-approval"),
  reviewStage: "",
  reviewersName: "",
  reviewersTitle: "",
  date: "",
});

export const buildDefaultSopApproval = (): SOPApproval => ({
  reviewRows: SOP_SECTION_09_REVIEW_STAGES.map((reviewStage) => ({
    id: newProcedureRowId("sop-approval"),
    reviewStage,
    reviewersName: "",
    reviewersTitle: "",
    date: "",
  })),
  effectiveDate: "",
  expirationDate: "",
});

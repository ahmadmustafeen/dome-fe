import type { EopApprovalReviewRow } from "@/types/eop";

export const EOP_SECTION_09_HEADING = "Section 09: EOP Approval & Review";

export const EOP_SECTION_09_DEFAULT_REVIEW_ROWS: EopApprovalReviewRow[] = [
  {
    id: "author",
    role: "Author",
    name: "",
    signature: "",
    date: "",
  },
  {
    id: "approver",
    role: "Approver",
    name: "",
    signature: "",
    date: "",
  },
  {
    id: "annual-review",
    role: "Annual Review",
    name: "",
    signature: "",
    date: "",
  },
];

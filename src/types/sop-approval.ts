export type SOPApprovalReviewRow = {
  id: string;
  reviewStage: string;
  reviewersName: string;
  reviewersTitle: string;
  date: string;
};

export type SOPApproval = {
  reviewRows: SOPApprovalReviewRow[];
  effectiveDate: string;
  expirationDate: string;
};

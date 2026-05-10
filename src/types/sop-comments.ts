export type SOPCommentItem = {
  id: string;
  text: string;
};

export type SOPComments = {
  relevantCommentItems: SOPCommentItem[];
  postOperationRequirementItems: SOPCommentItem[];
  additionalNoteItems: SOPCommentItem[];
};

import type { SOPCommentItem } from "@/types/sop-comments";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_10_HEADING = "Section 10: SOP Comments";

export const SOP_SECTION_10_RELEVANT_COMMENTS_SUBHEADING = "Relevant comments";

export const SOP_SECTION_10_POST_OPERATION_SUBHEADING =
  "Post-operation requirements";

export const SOP_SECTION_10_ADDITIONAL_NOTES_SUBHEADING = "Additional notes";

export const newSopCommentItem = (): SOPCommentItem => ({
  id: newProcedureRowId("sop-comment"),
  text: "",
});

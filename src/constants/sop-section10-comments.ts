import type { SOPCommentItem, SOPComments } from "@/types/sop-comments";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_10_HEADING = "Section 10: SOP Comments";

export const SOP_SECTION_10_RELEVANT_COMMENTS_SUBHEADING =
  "Relevant Comments for LENNOX HS29-060-13G Weekly System Check:";

export const SOP_SECTION_10_POST_OPERATION_SUBHEADING =
  "Post-Operation Requirements:";

export const SOP_SECTION_10_ADDITIONAL_NOTES_SUBHEADING = "Additional Notes:";

const SOP_SECTION_10_RELEVANT_COMMENTS: readonly SOPCommentItem[] = [
  {
    id: "visual-data-verification",
    text:
      "This weekly check is primarily a visual and data verification procedure. Any findings requiring hands-on intervention (e.g., filter replacement, coil cleaning, belt adjustment, refrigerant leak repair) must be escalated to a qualified technician and performed under a separate, appropriate SOP or work order, potentially requiring LOTO.",
  },
  {
    id: "outdoor-condensing-unit-leaks",
    text:
      "Pay close attention to the outdoor condensing unit (LENNOX HS29-060-13G) for signs of refrigerant leaks (oil stains, unusual odors) as this unit contains the primary refrigerant charge.",
  },
  {
    id: "condensate-drain-clear",
    text:
      "Ensure the condensate drain line is completely clear to prevent water overflow, which can lead to significant damage in a data center environment.",
  },
  {
    id: "compare-historical-data",
    text:
      "Regularly compare current readings with historical data to identify trends or gradual degradation that might not trigger immediate alarms but indicate impending issues.",
  },
] as const;

const SOP_SECTION_10_POST_OPERATION_REQUIREMENTS: readonly SOPCommentItem[] = [
  {
    id: "log-cmms-observations",
    text:
      "Ensure all collected data and observations are accurately logged in the Computerized Maintenance Management System (CMMS) or site logbook.",
  },
  {
    id: "communicate-deficiencies",
    text:
      "Any identified deficiencies or recommendations for further action must be documented and communicated to the Site Operations Manager for scheduling.",
  },
  {
    id: "confirm-ahu-stability",
    text:
      "Confirm that the AHU 15 CDR is operating as expected and the data center environment remains stable.",
  },
  {
    id: "secure-tools-ppe",
    text:
      "Secure all tools and PPE, and ensure the work area is clean and tidy.",
  },
] as const;

const SOP_SECTION_10_ADDITIONAL_NOTES: readonly SOPCommentItem[] = [
  {
    id: "additional-observations",
    text: "Enter any additional observations, anomalies, or recommendations here.",
  },
] as const;

export const buildDefaultSopComments = (): SOPComments => ({
  relevantCommentItems: SOP_SECTION_10_RELEVANT_COMMENTS.map((row) => ({
    ...row,
  })),
  postOperationRequirementItems:
    SOP_SECTION_10_POST_OPERATION_REQUIREMENTS.map((row) => ({ ...row })),
  additionalNoteItems: SOP_SECTION_10_ADDITIONAL_NOTES.map((row) => ({
    ...row,
  })),
});

export const newSopCommentItem = (): SOPCommentItem => ({
  id: newProcedureRowId("sop-comment"),
  text: "",
});

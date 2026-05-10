"use client";

import { Typography } from "@/components/common";
import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  newSopCommentItem,
  SOP_SECTION_10_ADDITIONAL_NOTES_SUBHEADING,
  SOP_SECTION_10_HEADING,
  SOP_SECTION_10_POST_OPERATION_SUBHEADING,
  SOP_SECTION_10_RELEVANT_COMMENTS_SUBHEADING,
} from "@/constants/sop-section10-comments";
import type { SOPCommentItem, SOPComments } from "@/types/sop-comments";

type SopSection10CommentsProps = {
  comments: SOPComments;
  patchComments: (partial: Partial<SOPComments>) => void;
};

type SopCommentsListBlockProps = {
  title: string;
  items: SOPCommentItem[];
  ariaLabelPrefix: string;
  onItemsChange: (items: SOPCommentItem[]) => void;
};

const SopCommentsListBlock = ({
  title,
  items,
  ariaLabelPrefix,
  onItemsChange,
}: SopCommentsListBlockProps) => (
  <div className="mb-8 last:mb-0">
    <Typography
      variant="h6"
      className="mb-2 text-base font-semibold text-gray-900"
    >
      {title}
    </Typography>
    <ProcedureEditableList
      items={items}
      ariaLabelPrefix={ariaLabelPrefix}
      newItem={newSopCommentItem}
      onItemsChange={onItemsChange}
    />
  </div>
);

export const SopSection10Comments = ({
  comments,
  patchComments,
}: SopSection10CommentsProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_10_HEADING}>
        <SopCommentsListBlock
          title={SOP_SECTION_10_RELEVANT_COMMENTS_SUBHEADING}
          items={comments?.relevantCommentItems}
          ariaLabelPrefix="SOP relevant comment"
          onItemsChange={(relevantCommentItems) =>
            patchComments({ relevantCommentItems })}
        />
        <SopCommentsListBlock
          title={SOP_SECTION_10_POST_OPERATION_SUBHEADING}
          items={comments?.postOperationRequirementItems}
          ariaLabelPrefix="SOP post-operation requirement"
          onItemsChange={(postOperationRequirementItems) =>
            patchComments({ postOperationRequirementItems })}
        />
        <SopCommentsListBlock
          title={SOP_SECTION_10_ADDITIONAL_NOTES_SUBHEADING}
          items={comments?.additionalNoteItems}
          ariaLabelPrefix="SOP additional note"
          onItemsChange={(additionalNoteItems) =>
            patchComments({ additionalNoteItems })}
        />
      </ProcedureSectionCard>
    </div>
  );
};

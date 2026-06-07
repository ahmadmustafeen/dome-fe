"use client";

import { Typography } from "@/components/common";
import type { ProcedureEditableListItem } from "@/components/procedure/ProcedureEditableList";
import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
import { Textarea } from "@/components/ui/Textarea";
import {
  MOP_SECTION_10_ADDITIONAL_NOTES_LABEL,
  MOP_SECTION_10_MOP_COMMENTS_LABEL,
  MOP_SECTION_10_POST_MAINTENANCE_HEADING,
  MOP_SECTION_10_SUBHEADING,
} from "@/constants/mop-section10-comments";
import type { MOPSection10MopComments } from "@/types/mop";

type MopSection10MopCommentsProps = {
  mopComments: MOPSection10MopComments;
  patchMopComments: (p: Partial<MOPSection10MopComments>) => void;
};

const postMaintenanceToListItems = (
  bullets: MOPSection10MopComments["postMaintenanceBullets"],
): ProcedureEditableListItem[] =>
  bullets?.map((b) => ({ id: b.id, text: b.title }));

const listItemsToPostMaintenance = (
  items: ProcedureEditableListItem[],
): MOPSection10MopComments["postMaintenanceBullets"] =>
  items.map((row) => ({ id: row.id, title: row.text }));

const newPostMaintenanceListItem = (): ProcedureEditableListItem => ({
  id: crypto.randomUUID(),
  text: "",
});

export const MopSection10MopComments = ({
  mopComments,
  patchMopComments,
}: MopSection10MopCommentsProps) => {
  const { mopCommentsText, additionalNotes, postMaintenanceBullets } =
    mopComments;

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography
        variant="h5"
        className="mb-2 text-base font-semibold text-gray-900"
      >
        {MOP_SECTION_10_SUBHEADING}
      </Typography>
      <Typography
        variant="h6"
        className="mb-2 text-sm font-semibold text-gray-900 capitalize"
      >
        {MOP_SECTION_10_MOP_COMMENTS_LABEL}
      </Typography>
      <Textarea
        id="mop-section10-comments-block"
        value={mopCommentsText}
        onChange={(e) => patchMopComments({ mopCommentsText: e.target.value })}
        rows={12}
        className="min-h-50 w-full"
        aria-label={MOP_SECTION_10_MOP_COMMENTS_LABEL}
      />

      <div className="mt-6 border border-gray-300 bg-gray-100 p-4">
        <Typography
          variant="h6"
          className="mt-0 mb-3 text-sm font-semibold text-gray-900 capitalize"
        >
          {MOP_SECTION_10_POST_MAINTENANCE_HEADING}
        </Typography>
        <ProcedureEditableList
          items={postMaintenanceToListItems(postMaintenanceBullets)}
          ariaLabelPrefix="Post-maintenance requirement"
          newItem={newPostMaintenanceListItem}
          onItemsChange={(items) =>
            patchMopComments({
              postMaintenanceBullets: listItemsToPostMaintenance(items),
            })
          }
        />
      </div>

      <div className="mt-5">
        <label
          className="mb-1 block text-sm font-semibold text-gray-800"
          htmlFor="mop-section10-additional-notes"
        >
          {MOP_SECTION_10_ADDITIONAL_NOTES_LABEL}
        </label>
        <Textarea
          id="mop-section10-additional-notes"
          value={additionalNotes}
          onChange={(e) =>
            patchMopComments({ additionalNotes: e.target.value })
          }
          rows={5}
          className="min-h-25 w-full"
          placeholder="Space for technician notes, observations, or recommendations for future maintenance..."
          aria-label={MOP_SECTION_10_ADDITIONAL_NOTES_LABEL}
        />
      </div>
    </div>
  );
};

"use client";

import { Typography } from "@/components/common";
import type { ProcedureEditableListItem } from "@/components/procedure/ProcedureEditableList";
import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
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

const section10BulletsToListItems = (
  bullets: unknown,
): ProcedureEditableListItem[] => {
  if (typeof bullets === "string") {
    return bullets
      .split(/\n+/u)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ id: crypto.randomUUID(), text }));
  }

  if (!Array.isArray(bullets)) {
    return [];
  }

  return bullets.map((b) => {
    if (typeof b === "string") {
      return { id: crypto.randomUUID(), text: b };
    }

    if (b !== null && typeof b === "object") {
      const bullet = b as { id?: unknown; title?: unknown; text?: unknown };
      return {
        id: typeof bullet.id === "string" ? bullet.id : crypto.randomUUID(),
        text:
          typeof bullet.title === "string"
            ? bullet.title
            : typeof bullet.text === "string"
              ? bullet.text
              : "",
      };
    }

    return { id: crypto.randomUUID(), text: "" };
  });
};

const listItemsToSection10Bullets = (
  items: ProcedureEditableListItem[],
): MOPSection10MopComments["postMaintenanceBullets"] =>
  items.map((row) => ({ id: row.id, title: row.text }));

const newSection10ListItem = (): ProcedureEditableListItem => ({
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
      <div className="mt-6 border border-gray-300 bg-gray-100 p-4">

        <Typography
          variant="h6"
          className="mb-2 text-sm font-semibold text-gray-900 capitalize"
        >
          {MOP_SECTION_10_MOP_COMMENTS_LABEL}
        </Typography>
        <ProcedureEditableList
          items={section10BulletsToListItems(mopCommentsText)}
          ariaLabelPrefix="MOP comment"
          newItem={newSection10ListItem}
          onItemsChange={(items) =>
            patchMopComments({
              mopCommentsText: listItemsToSection10Bullets(items),
            })
          }
        />
      </div>


      <div className="mt-6 border border-gray-300 bg-gray-100 p-4">
        <Typography
          variant="h6"
          className="mt-0 mb-3 text-sm font-semibold text-gray-900 capitalize"
        >
          {MOP_SECTION_10_POST_MAINTENANCE_HEADING}
        </Typography>
        <ProcedureEditableList
          items={section10BulletsToListItems(postMaintenanceBullets)}
          ariaLabelPrefix="Post-maintenance requirement"
          newItem={newSection10ListItem}
          onItemsChange={(items) =>
            patchMopComments({
              postMaintenanceBullets: listItemsToSection10Bullets(items),
            })
          }
        />
      </div>

      <div className="mt-6 border border-gray-300 bg-gray-100 p-4">

        <Typography
          variant="h6"
          className="mb-1 block text-sm font-semibold text-gray-800"
        >
          {MOP_SECTION_10_ADDITIONAL_NOTES_LABEL}
        </Typography>
        <ProcedureEditableList
          items={section10BulletsToListItems(additionalNotes)}
          ariaLabelPrefix="Additional note"
          newItem={newSection10ListItem}
          onItemsChange={(items) =>
            patchMopComments({
              additionalNotes: listItemsToSection10Bullets(items),
            })
          }
        />
      </div>
    </div>
  );
};

"use client";

import { Typography } from "@/components/common";
import { Textarea } from "@/components/ui/Textarea";
import { X } from 'lucide-react'
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

export const MopSection10MopComments = ({
  mopComments,
  patchMopComments,
}: MopSection10MopCommentsProps) => {
  const { mopCommentsText, additionalNotes, postMaintenanceBullets } = mopComments;

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography variant="h5" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_10_SUBHEADING}
      </Typography>
      <Typography variant="h6" className="mb-2 text-sm font-semibold text-gray-900">
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
        <Typography variant="h6" className="mt-0 mb-2 text-sm font-semibold text-gray-900">
          {MOP_SECTION_10_POST_MAINTENANCE_HEADING}
        </Typography>
        <ul className="mb-0 list-inside list-disc space-y-1 pl-0 text-sm text-gray-800">
          {postMaintenanceBullets?.map((line: { index: string, title: string }) => (
            <li key={line.index} className="pl-0">
              {line.title}
            </li>
          ))}
        </ul>
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
          onChange={(e) => patchMopComments({ additionalNotes: e.target.value })}
          rows={5}
          className="min-h-25 w-full"
          placeholder="Space for technician notes, observations, or recommendations for future maintenance..."
          aria-label={MOP_SECTION_10_ADDITIONAL_NOTES_LABEL}
        />
      </div>
    </div>
  );
};

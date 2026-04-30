"use client";

import { Typography } from "@/components/common";
import {
  MOP_SECTION_11_GUIDELINE_BULLETS,
  MOP_SECTION_11_GUIDELINES_TITLE,
  MOP_SECTION_11_IMPORTANT_NOTICE,
  MOP_SECTION_11_IMPORTANT_NOTICE_TITLE,
  MOP_SECTION_11_LINK_VERIFICATION,
  MOP_SECTION_11_LINK_VERIFICATION_TITLE,
} from "@/constants/mop-section11-references";

export const MopSection11Notices = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-5">
        <Typography variant="h6" className="mt-0 mb-2 text-sm font-semibold text-blue-800">
          {MOP_SECTION_11_GUIDELINES_TITLE}
        </Typography>
        <ul className="mb-0 list-inside list-disc space-y-1 pl-0 text-sm text-sky-950">
          {MOP_SECTION_11_GUIDELINE_BULLETS.map((line) => (
            <li key={line} className="pl-0">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-r-md border-l-4 border-amber-400 bg-amber-50 p-4">
        <p className="m-0 text-sm text-amber-950">
          <strong>{MOP_SECTION_11_IMPORTANT_NOTICE_TITLE}</strong> {MOP_SECTION_11_IMPORTANT_NOTICE}
        </p>
      </div>

      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-4">
        <p className="m-0 text-sm text-sky-950">
          <strong>{MOP_SECTION_11_LINK_VERIFICATION_TITLE}</strong> {MOP_SECTION_11_LINK_VERIFICATION}
        </p>
      </div>
    </div>
  );
};

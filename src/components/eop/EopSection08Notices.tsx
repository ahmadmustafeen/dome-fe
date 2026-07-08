"use client";

import { Typography } from "@/components/common";

export const EopSection08Notices = () => {
  const EOP_SECTION_08_GUIDELINES_TITLE = "📚 Emergency Reference Usage Guidelines";
  const EOP_SECTION_08_IMPORTANT_NOTICE_TITLE = "⚠️ Important Notice:";
  const EOP_SECTION_08_LINK_VERIFICATION_TITLE = "📋 Link Verification:";

  const EOP_SECTION_08_GUIDELINE_BULLETS: readonly string[] = [
    "Emergency Applicability: Verify that referenced documents apply to the current emergency or abnormal operating condition.",
    "Latest Revisions: Use the latest approved revision of each document unless site emergency procedures specify otherwise.",
    "Accessibility: Ensure emergency references and site-specific documentation are readily available to personnel responding to the incident.",
    "Offline Availability: Maintain local or printed copies of critical emergency documentation in case network or system access is unavailable during an incident.",
  ] as const;

  const EOP_SECTION_08_IMPORTANT_NOTICE =
    `All external links were verified at the time this EOP was generated. URLs may change over time. If a link is unavailable during an emergency, locate the document by title on the organization's official website or use the site's controlled document repository. Internal documents marked "Request from Site Manager" must be obtained through site document control and are not publicly accessible.`;

  const EOP_SECTION_08_LINK_VERIFICATION =
    "References in this EOP point to official sources whenever possible. Validate links during document reviews and ensure emergency personnel have access to current approved documentation before an emergency occurs.";

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-5">
        <Typography variant="h6" className="mt-0 mb-2 text-sm font-semibold text-blue-800">
          {EOP_SECTION_08_GUIDELINES_TITLE}
        </Typography>
        <ul className="mb-0 list-inside list-disc space-y-1 pl-0 text-sm text-sky-950">
          {EOP_SECTION_08_GUIDELINE_BULLETS.map((line) => (
            <li key={line} className="pl-0">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-r-md border-l-4 border-amber-400 bg-amber-50 p-4">
        <p className="m-0 text-sm text-amber-950">
          <strong>{EOP_SECTION_08_IMPORTANT_NOTICE_TITLE}</strong> {EOP_SECTION_08_IMPORTANT_NOTICE}
        </p>
      </div>

      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-4">
        <p className="m-0 text-sm text-sky-950">
          <strong>{EOP_SECTION_08_LINK_VERIFICATION_TITLE}</strong> {EOP_SECTION_08_LINK_VERIFICATION}
        </p>
      </div>
    </div>
  );
};

export default EopSection08Notices;
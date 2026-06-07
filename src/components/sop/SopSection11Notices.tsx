"use client";

import { Typography } from "@/components/common";

export const SopSection11Notices = () => {
  const SOP_SECTION_11_GUIDELINES_TITLE = "📚 Reference Usage Guidelines";
  const SOP_SECTION_11_IMPORTANT_NOTICE_TITLE = "⚠️ Important Notice:";
  const SOP_SECTION_11_LINK_VERIFICATION_TITLE = "📋 Link Verification:";

  const SOP_SECTION_11_GUIDELINE_BULLETS: readonly string[] = [
    "Review References: Confirm referenced documents are applicable to this SOP before starting.",
    "Revision Control: Use the most recent revision of each document when performing the procedure.",
    "Access: Ensure required site-specific documents are available to the executing team.",
    "Local Copies: Keep printed or local copies of critical references when network access is unavailable.",
  ] as const;

  const SOP_SECTION_11_IMPORTANT_NOTICE =
    `All external links have been verified as working at the time of SOP creation. However, URLs may change over time. If a link is broken, search for the document by title on the organization's website. Internal documents marked "Request from Site Manager" must be obtained locally and are not available through external links.`;

  const SOP_SECTION_11_LINK_VERIFICATION =
    "Links in this SOP point to official sources where possible. Verify URLs prior to procedure execution and report any broken links to the document owner.";

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-5">
        <Typography variant="h6" className="mt-0 mb-2 text-sm font-semibold text-blue-800">
          {SOP_SECTION_11_GUIDELINES_TITLE}
        </Typography>
        <ul className="mb-0 list-inside list-disc space-y-1 pl-0 text-sm text-sky-950">
          {SOP_SECTION_11_GUIDELINE_BULLETS.map((line) => (
            <li key={line} className="pl-0">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-r-md border-l-4 border-amber-400 bg-amber-50 p-4">
        <p className="m-0 text-sm text-amber-950">
          <strong>{SOP_SECTION_11_IMPORTANT_NOTICE_TITLE}</strong> {SOP_SECTION_11_IMPORTANT_NOTICE}
        </p>
      </div>

      <div className="rounded-r-md border-l-4 border-blue-600 bg-sky-50 p-4">
        <p className="m-0 text-sm text-sky-950">
          <strong>{SOP_SECTION_11_LINK_VERIFICATION_TITLE}</strong> {SOP_SECTION_11_LINK_VERIFICATION}
        </p>
      </div>
    </div>
  );
};

export default SopSection11Notices;

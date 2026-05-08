"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_08_RELATED_DOCUMENTS_HEADING } from "@/constants/eop-section08-supporting-information";
import type { EopSection08RelatedDocument } from "@/types/eop";

type EopSection08RelatedDocumentsProps = {
  documents: EopSection08RelatedDocument[];
};

export const EopSection08RelatedDocuments = ({
  documents,
}: EopSection08RelatedDocumentsProps) => (
  <div className="mt-6">
    <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-900">
      {EOP_SECTION_08_RELATED_DOCUMENTS_HEADING}
    </Typography>

    <ul className="list-disc space-y-1 pl-5 text-sm">
      {documents.map((doc) => (
        <li key={doc.id} className="text-gray-700">
          <a
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline"
          >
            {doc.label}
          </a>
          <span className="text-gray-500"> ({doc.description})</span>
        </li>
      ))}
    </ul>
  </div>
);

"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_08_HEADING } from "@/constants/eop-section08-supporting-information";
import type { EOPSection08SupportingInformation } from "@/types/eop";

import { EopSection08InfrastructureTable } from "./EopSection08InfrastructureTable";
import { EopSection08PolicyDocumentsTable } from "./EopSection08PolicyDocumentsTable";
import { EopSection08RelatedDocuments } from "./EopSection08RelatedDocuments";
import { EopSection08SparePartsTable } from "./EopSection08SparePartsTable";

type EopSection08SupportingInformationProps = {
  supportingInformation: EOPSection08SupportingInformation;
  patchSupportingInformation: (
    p: Partial<EOPSection08SupportingInformation>,
  ) => void;
};

export const EopSection08SupportingInformationSection = ({
  supportingInformation,
  patchSupportingInformation,
}: EopSection08SupportingInformationProps) => (
  <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
    <Typography
      variant="h6"
      className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
    >
      {EOP_SECTION_08_HEADING}
    </Typography>

    <EopSection08PolicyDocumentsTable
      rows={supportingInformation.policyDocuments}
      note={supportingInformation.policyNote}
    />

    <EopSection08InfrastructureTable
      rows={supportingInformation.infrastructureLocations}
      onRowsChange={(rows) =>
        patchSupportingInformation({ infrastructureLocations: rows })
      }
    />

    <EopSection08SparePartsTable
      rows={supportingInformation.spareParts}
      intro={supportingInformation.sparePartsIntro}
      onRowsChange={(rows) => patchSupportingInformation({ spareParts: rows })}
    />

    <EopSection08RelatedDocuments documents={supportingInformation.relatedDocuments} />
  </div>
);

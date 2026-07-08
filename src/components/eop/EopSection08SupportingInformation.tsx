"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_08_HEADING } from "@/constants/eop-section08-supporting-information";
import type { EOPSection08SupportingInformation } from "@/types/eop";

import { EopSection08InfrastructureTable } from "./EopSection08InfrastructureTable";
import { EopSection08PolicyDocumentsTable } from "./EopSection08PolicyDocumentsTable";
import { EopSection08RelatedDocuments } from "./EopSection08RelatedDocuments";
import { EopSection08SparePartsTable } from "./EopSection08SparePartsTable";
import { ProcedureEditableColumn, ProcedureEditableRowsTable } from "../procedure/ProcedureEditableRowsTable";
import { SOP_SECTION_11_ADDITIONAL_RESOURCE_COLUMNS, SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING, SOP_SECTION_11_EQUIPMENT_DOC_COLUMNS, SOP_SECTION_11_EQUIPMENT_DOCS_HEADING, SOP_SECTION_11_SAFETY_STANDARD_COLUMNS, SOP_SECTION_11_SAFETY_STANDARDS_HEADING } from "@/constants/sop-section11-references";
import { SOPReferenceAdditionalResourceRow, SOPReferenceDocumentRow, SOPReferenceSafetyStandardRow } from "@/types/sop-references";
import { newProcedureRowId } from "@/utils/procedure-row-id";
import SopSection11Notices from "../sop/SopSection11Notices";
import EopSection08Notices from "./EopSection08Notices";

type EopSection08SupportingInformationProps = {
  supportingInformation: EOPSection08SupportingInformation;
  assetName?: string,
  patchSupportingInformation: (
    p: Partial<EOPSection08SupportingInformation>,
  ) => void;
};

const EQUIPMENT_DOCUMENT_COLUMNS =
  SOP_SECTION_11_EQUIPMENT_DOC_COLUMNS satisfies readonly ProcedureEditableColumn<
    SOPReferenceDocumentRow,
    keyof Omit<SOPReferenceDocumentRow, "id">
  >[];

const SAFETY_STANDARD_COLUMNS =
  SOP_SECTION_11_SAFETY_STANDARD_COLUMNS satisfies readonly ProcedureEditableColumn<
    SOPReferenceSafetyStandardRow,
    keyof Omit<SOPReferenceSafetyStandardRow, "id">
  >[];

const ADDITIONAL_RESOURCE_COLUMNS =
  SOP_SECTION_11_ADDITIONAL_RESOURCE_COLUMNS satisfies readonly ProcedureEditableColumn<
    SOPReferenceAdditionalResourceRow,
    keyof Omit<SOPReferenceAdditionalResourceRow, "id">
  >[];

export const newSopReferenceDocumentRow = (): SOPReferenceDocumentRow => ({
  id: newProcedureRowId("sop-reference"),
  documentType: "",
  description: "",
  accessLocation: "",
});

export const newSopSafetyStandardRow = (): SOPReferenceSafetyStandardRow => ({
  id: newProcedureRowId("sop-safety-standard"),
  standard: "",
  description: "",
  accessLocation: "",
});

export const newSopAdditionalResourceRow =
  (): SOPReferenceAdditionalResourceRow => ({
    id: newProcedureRowId("sop-additional-resource"),
    resourceType: "",
    description: "",
    accessLocation: "",
  });



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

    <Typography
      variant="h6"
      className="mb-2 text-base font-semibold text-gray-900"
    >
      {SOP_SECTION_11_EQUIPMENT_DOCS_HEADING}
    </Typography>
    <ProcedureEditableRowsTable
      rows={supportingInformation.equipmentDocumentRows}
      columns={EQUIPMENT_DOCUMENT_COLUMNS}
      className="bg-[#5A1A1A]!"
      ariaLabelGroup="SOP equipment documentation row controls"
      newRow={newSopReferenceDocumentRow}
      onRowsChange={(equipmentDocumentRows) =>
        patchSupportingInformation({ equipmentDocumentRows })}
    />
    <Typography
      variant="h6"
      className="mt-6 mb-2 text-base font-semibold text-gray-900"
    >
      {SOP_SECTION_11_SAFETY_STANDARDS_HEADING}
    </Typography>
    <ProcedureEditableRowsTable
      rows={supportingInformation.safetyStandardRows}
      columns={SAFETY_STANDARD_COLUMNS}
      className="bg-[#5A1A1A]!"
      ariaLabelGroup="SOP safety standards row controls"
      newRow={newSopSafetyStandardRow}
      onRowsChange={(safetyStandardRows) =>
        patchSupportingInformation({ safetyStandardRows })}
    />
    <Typography
      variant="h6"
      className="mt-6 mb-2 text-base font-semibold text-gray-900"
    >
      {SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING}
    </Typography>
    <ProcedureEditableRowsTable
      rows={supportingInformation.additionalResourceRows}
      columns={ADDITIONAL_RESOURCE_COLUMNS}
      className="bg-[#5A1A1A]!"
      ariaLabelGroup="SOP additional resources row controls"
      newRow={newSopAdditionalResourceRow}
      onRowsChange={(additionalResourceRows) =>
        patchSupportingInformation({ additionalResourceRows })}
    />
    <EopSection08Notices />
    {/* <EopSection08RelatedDocuments documents={supportingInformation?.equipmentDocumentRows} /> */}
  </div>
);

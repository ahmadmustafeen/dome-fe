"use client";

import { Typography } from "@/components/common";
import { ProcedureEditableList } from "@/components/procedure/ProcedureEditableList";
import type { ProcedureEditableColumn } from "@/components/procedure/ProcedureEditableRowsTable";
import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Textarea } from "@/components/ui/Textarea";
import {
  newSopAdditionalResourceRow,
  newSopReferenceDocumentRow,
  newSopReferenceGuidelineItem,
  newSopSafetyStandardRow,
  SOP_SECTION_11_ADDITIONAL_RESOURCE_COLUMNS,
  SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING,
  SOP_SECTION_11_DESCRIPTION,
  SOP_SECTION_11_EQUIPMENT_DOC_COLUMNS,
  SOP_SECTION_11_EQUIPMENT_DOCS_HEADING,
  SOP_SECTION_11_HEADING,
  SOP_SECTION_11_SAFETY_STANDARD_COLUMNS,
  SOP_SECTION_11_SAFETY_STANDARDS_HEADING,
  SOP_SECTION_11_USAGE_GUIDELINES_HEADING,
  SOP_SECTION_11_VERIFICATION_NOTICE_HEADING,
} from "@/constants/sop-section11-references";
import type {
  SOPReferenceAdditionalResourceRow,
  SOPReferenceDocumentRow,
  SOPReferences,
  SOPReferenceSafetyStandardRow,
} from "@/types/sop-references";

type SopSection11ReferencesProps = {
  references: SOPReferences;
  patchReferences: (partial: Partial<SOPReferences>) => void;
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

export const SopSection11References = ({
  references,
  patchReferences,
}: SopSection11ReferencesProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_11_HEADING}>
        <Typography variant="p" className="mb-4 text-sm text-gray-700">
          {SOP_SECTION_11_DESCRIPTION}
        </Typography>
        <Typography
          variant="h6"
          className="mb-2 text-base font-semibold text-gray-900"
        >
          {SOP_SECTION_11_EQUIPMENT_DOCS_HEADING}
        </Typography>
        <ProcedureEditableRowsTable
          rows={references.equipmentDocumentRows}
          columns={EQUIPMENT_DOCUMENT_COLUMNS}
          className="bg-[#0F4D2E]!"
          ariaLabelGroup="SOP equipment documentation row controls"
          newRow={newSopReferenceDocumentRow}
          onRowsChange={(equipmentDocumentRows) =>
            patchReferences({ equipmentDocumentRows })}
        />
        <Typography
          variant="h6"
          className="mt-6 mb-2 text-base font-semibold text-gray-900"
        >
          {SOP_SECTION_11_SAFETY_STANDARDS_HEADING}
        </Typography>
        <ProcedureEditableRowsTable
          rows={references.safetyStandardRows}
          columns={SAFETY_STANDARD_COLUMNS}
          className="bg-[#0F4D2E]!"
          ariaLabelGroup="SOP safety standards row controls"
          newRow={newSopSafetyStandardRow}
          onRowsChange={(safetyStandardRows) =>
            patchReferences({ safetyStandardRows })}
        />
        <Typography
          variant="h6"
          className="mt-6 mb-2 text-base font-semibold text-gray-900"
        >
          {SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING}
        </Typography>
        <ProcedureEditableRowsTable
          rows={references.additionalResourceRows}
          columns={ADDITIONAL_RESOURCE_COLUMNS}
          className="bg-[#0F4D2E]!"
          ariaLabelGroup="SOP additional resources row controls"
          newRow={newSopAdditionalResourceRow}
          onRowsChange={(additionalResourceRows) =>
            patchReferences({ additionalResourceRows })}
        />
        <Typography
          variant="h6"
          className="mt-6 mb-2 text-base font-semibold text-gray-900"
        >
          {SOP_SECTION_11_USAGE_GUIDELINES_HEADING}
        </Typography>
        <ProcedureEditableList
          items={references.usageGuidelineItems}
          ariaLabelPrefix="SOP reference usage guideline"
          newItem={newSopReferenceGuidelineItem}
          onItemsChange={(usageGuidelineItems) =>
            patchReferences({ usageGuidelineItems })}
        />
        <Typography
          variant="h6"
          className="mt-6 mb-2 text-base font-semibold text-gray-900"
        >
          {SOP_SECTION_11_VERIFICATION_NOTICE_HEADING}
        </Typography>
        <Textarea
          value={references.verificationNotice}
          onChange={(event) =>
            patchReferences({ verificationNotice: event.target.value })}
          className="min-h-24 w-full"
        />
      </ProcedureSectionCard>
    </div>
  );
};

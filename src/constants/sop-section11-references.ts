import type {
  SOPReferenceAdditionalResourceRow,
  SOPReferenceDocumentRow,
  SOPReferenceGuidelineItem,
  SOPReferenceSafetyStandardRow,
} from "@/types/sop-references";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_11_HEADING = "Section 11: References and Documentation";

export const SOP_SECTION_11_DESCRIPTION =
  "List documentation and resources relevant to performing this procedure safely and consistently.";

export const SOP_SECTION_11_EQUIPMENT_DOCS_HEADING =
  "Equipment-Specific Documentation";

export const SOP_SECTION_11_SAFETY_STANDARDS_HEADING =
  "Safety Standards and Guidelines";

export const SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING =
  "Additional Resources";

export const SOP_SECTION_11_USAGE_GUIDELINES_HEADING =
  "Reference Usage Guidelines";

export const SOP_SECTION_11_VERIFICATION_NOTICE_HEADING = "Verification Notice";

export const SOP_SECTION_11_EQUIPMENT_DOC_COLUMNS = [
  { header: "Document Type", field: "documentType" },
  { header: "Description", field: "description" },
  { header: "Access/Location", field: "accessLocation" },
] as const;

export const SOP_SECTION_11_SAFETY_STANDARD_COLUMNS = [
  { header: "Standard", field: "standard" },
  { header: "Description", field: "description" },
  { header: "Access/Location", field: "accessLocation" },
] as const;

export const SOP_SECTION_11_ADDITIONAL_RESOURCE_COLUMNS = [
  { header: "Resource Type", field: "resourceType" },
  { header: "Description", field: "description" },
  { header: "Access/Location", field: "accessLocation" },
] as const;

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

export const newSopReferenceGuidelineItem =
  (): SOPReferenceGuidelineItem => ({
    id: newProcedureRowId("sop-reference-guideline"),
    text: "",
  });

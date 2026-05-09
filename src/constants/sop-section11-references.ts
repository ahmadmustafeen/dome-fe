import type {
  SOPReferenceAdditionalResourceRow,
  SOPReferenceDocumentRow,
  SOPReferenceGuidelineItem,
  SOPReferences,
  SOPReferenceSafetyStandardRow,
} from "@/types/sop-references";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_11_HEADING = "Section 11: References and Documentation";

export const SOP_SECTION_11_DESCRIPTION =
  "This section provides a comprehensive list of documentation and resources relevant to the operation and safety of the LENNOX HS29-060-13G Air Handling Unit.";

export const SOP_SECTION_11_EQUIPMENT_DOCS_HEADING =
  "Equipment-Specific Documentation";

export const SOP_SECTION_11_SAFETY_STANDARDS_HEADING =
  "Safety Standards and Guidelines";

export const SOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING =
  "Additional Resources";

export const SOP_SECTION_11_USAGE_GUIDELINES_HEADING =
  "Reference Usage Guidelines:";

export const SOP_SECTION_11_VERIFICATION_NOTICE_HEADING = "Verification Notice:";

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

const SOP_SECTION_11_EQUIPMENT_DOC_ROWS: readonly SOPReferenceDocumentRow[] = [
  {
    id: "operation-manual",
    documentType: "Operation Manual",
    description: "LENNOX HS29-060-13G Operations Guide",
    accessLocation: "View",
  },
  {
    id: "service-manual",
    documentType: "Service Manual",
    description: "LENNOX HS29-060-13G Service Documentation",
    accessLocation: "View",
  },
  {
    id: "parts-catalog",
    documentType: "Parts Catalog",
    description: "LENNOX HS29-060-13G Parts List",
    accessLocation: "View",
  },
  {
    id: "installation-guide",
    documentType: "Installation Guide",
    description: "LENNOX HS29-060-13G Installation Manual",
    accessLocation: "Internal Document - Request from Site Manager",
  },
] as const;

const SOP_SECTION_11_SAFETY_STANDARD_ROWS: readonly SOPReferenceSafetyStandardRow[] =
  [
    {
      id: "osha-1910-147",
      standard: "OSHA 1910.147",
      description: "Lockout/Tagout Requirements",
      accessLocation: "View",
    },
    {
      id: "epa-40-cfr-part-82-subpart-f",
      standard: "EPA 40 CFR Part 82, Subpart F",
      description: "Refrigerant Management Requirements (Section 608)",
      accessLocation: "View",
    },
    {
      id: "ashrae-standard-15",
      standard: "ASHRAE Standard 15",
      description: "Safety Standard for Refrigeration Systems",
      accessLocation: "View",
    },
    {
      id: "nfpa-70-nec",
      standard: "NFPA 70 (NEC)",
      description: "National Electrical Code (for electrical safety practices)",
      accessLocation: "View",
    },
  ] as const;

const SOP_SECTION_11_ADDITIONAL_RESOURCE_ROWS: readonly SOPReferenceAdditionalResourceRow[] =
  [
    {
      id: "refrigerant-safety-data",
      resourceType: "Refrigerant Safety Data",
      description: "SDS for R-410A refrigerant used in LENNOX HS29-060-13G",
      accessLocation: "View",
    },
    {
      id: "lennox-equipment-history",
      resourceType: "LENNOX Equipment History",
      description: "Maintenance records for HS29-060-13G Serial: 5807C3674",
      accessLocation: "Internal Document - Request from Site Manager",
    },
    {
      id: "site-emergency-procedures",
      resourceType: "Site Emergency Procedures",
      description: "Facility-specific emergency response for MISSING",
      accessLocation: "Internal Document - Request from Site Manager",
    },
    {
      id: "system-diagrams",
      resourceType: "System Diagrams",
      description: "1659 P&ID and electrical schematics",
      accessLocation: "Internal Document - Request from Site Manager",
    },
  ] as const;

const SOP_SECTION_11_USAGE_GUIDELINES: readonly SOPReferenceGuidelineItem[] = [
  {
    id: "latest-version",
    text: "Always consult the latest version of all referenced documents.",
  },
  {
    id: "external-link-verification",
    text:
      "External links are provided for convenience; verify content directly from the source if there are discrepancies.",
  },
  {
    id: "internal-document-access",
    text:
      "Internal documents must be requested from the Site Manager or accessed via the designated document control system.",
  },
] as const;

export const SOP_SECTION_11_VERIFICATION_NOTICE =
  "All personnel are responsible for verifying the accuracy and applicability of information contained within these references prior to commencing work.";

export const buildDefaultSopReferences = (): SOPReferences => ({
  equipmentDocumentRows: SOP_SECTION_11_EQUIPMENT_DOC_ROWS.map((row) => ({
    ...row,
  })),
  safetyStandardRows: SOP_SECTION_11_SAFETY_STANDARD_ROWS.map((row) => ({
    ...row,
  })),
  additionalResourceRows: SOP_SECTION_11_ADDITIONAL_RESOURCE_ROWS.map((row) => ({
    ...row,
  })),
  usageGuidelineItems: SOP_SECTION_11_USAGE_GUIDELINES.map((row) => ({
    ...row,
  })),
  verificationNotice: SOP_SECTION_11_VERIFICATION_NOTICE,
});

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

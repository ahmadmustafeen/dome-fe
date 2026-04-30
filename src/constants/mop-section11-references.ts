import type {
  MopReferenceLinkRow,
  MopReferencePolicyRow,
  MopReferenceSafetyRow,
  MOPSection11References,
} from "@/types/mop";
import { newMopRowId } from "@/utils/mopRowId";

export const MOP_SECTION_11_HEADING = "Section 11: References and Documentation";

export const MOP_SECTION_11_COMPREHENSIVE_LIB_LABEL = "Comprehensive Reference Library";

export const MOP_SECTION_11_COMPANY_POLICY_INTRO =
  "The following company policy documents were referenced during the creation of this MOP to ensure alignment with company-specific procedures and requirements:";

export const MOP_SECTION_11_POLICY_BANNER_TEXT =
  "The procedures in this MOP have been informed by the company policies listed above. Ensure all personnel are familiar with these policies before performing work.";

export const MOP_SECTION_11_POLICY_NOTE_LABEL = "Note:";

export const MOP_SECTION_11_EQUIPMENT_DOCS_HEADING = "Equipment-Specific Documentation";

export const MOP_SECTION_11_SAFETY_STANDARDS_HEADING = "Safety Standards and Guidelines";

export const MOP_SECTION_11_ADDITIONAL_RESOURCES_HEADING = "Additional Resources";

export const MOP_SECTION_11_DEFAULT_POLICY_COUNT = 3;
export const MOP_SECTION_11_DEFAULT_EQUIPMENT_COUNT = 2;
export const MOP_SECTION_11_DEFAULT_SAFETY_COUNT = 3;
export const MOP_SECTION_11_DEFAULT_ADDITIONAL_COUNT = 3;

export const MOP_SECTION_11_POLICY_TABLE_HEADERS = {
  policyDocument: "Policy Document",
  uploadDate: "Upload Date",
  type: "Type",
} as const;

export const MOP_SECTION_11_LINK_TABLE_HEADERS = {
  documentTitle: "Document Title",
  type: "Type",
  access: "Access",
} as const;

export const MOP_SECTION_11_SAFETY_TABLE_HEADERS = {
  safetyStandard: "Safety Standard",
  authority: "Authority",
  access: "Access",
} as const;

export const MOP_SECTION_11_ADDITIONAL_TABLE_HEADERS = {
  resource: "Resource",
  type: "Type",
  access: "Access",
} as const;

export const MOP_SECTION_11_GUIDELINES_TITLE = "📚 Reference Usage Guidelines";

export const MOP_SECTION_11_IMPORTANT_NOTICE_TITLE = "⚠️ Important Notice:";

export const MOP_SECTION_11_LINK_VERIFICATION_TITLE = "📋 Link Verification:";

export const MOP_SECTION_11_GUIDELINE_BULLETS: readonly string[] = [
  "Pre-Work Review: All applicable documentation must be reviewed before beginning maintenance work",
  "Current Revisions: Verify all documents are current revision levels and are not superseded",
  "Access Requirements: Ensure access to online resources and account credentials are available",
  "Local Copies: Maintain current copies of critical documents for offline reference",
  "Update Tracking: Monitor manufacturer bulletins and regulatory updates that may affect procedures",
] as const;

export const MOP_SECTION_11_IMPORTANT_NOTICE = `All external links have been verified as working at the time of MOP creation. However, URLs may change over time. If a link is broken, search for the document by title on the organization's website. Internal documents marked "Request from Site Manager" must be obtained locally and are not available through external links.`;

export const MOP_SECTION_11_LINK_VERIFICATION =
  "All links in this document point to official sources only: \u2022 Manufacturer support websites \u2022 OSHA.gov regulations \u2022 EPA.gov standards \u2022 NFPA.org codes \u2022 Industry organization websites";

const newPolicyRow = (): MopReferencePolicyRow => ({
  id: newMopRowId("pol"),
  policyDocument: "",
  uploadDate: "",
  type: "Company Policy",
});

const newLinkRow = (): MopReferenceLinkRow => ({
  id: newMopRowId("ref"),
  title: "",
  type: "",
  linkUrl: "",
  internalAccess: "",
});

const newSafetyRow = (): MopReferenceSafetyRow => ({
  id: newMopRowId("sft"),
  safetyStandard: "",
  authority: "",
  linkUrl: "",
  internalAccess: "",
});

const fillPolicyRows = (count: number): MopReferencePolicyRow[] =>
  Array.from({ length: count }, () => newPolicyRow());

const fillLinkRows = (count: number): MopReferenceLinkRow[] =>
  Array.from({ length: count }, () => newLinkRow());

const fillSafetyRows = (count: number): MopReferenceSafetyRow[] =>
  Array.from({ length: count }, () => newSafetyRow());

const ensureRowIds = <T extends { id: string }>(rows: T[], prefix: string): T[] =>
  rows.map((r) => (r.id && r.id.length > 0 ? r : { ...r, id: newMopRowId(prefix) }));

export const buildDefaultMopReferences = (): MOPSection11References => ({
  policyDocumentRows: fillPolicyRows(MOP_SECTION_11_DEFAULT_POLICY_COUNT),
  equipmentDocumentRows: fillLinkRows(MOP_SECTION_11_DEFAULT_EQUIPMENT_COUNT),
  safetyStandardRows: fillSafetyRows(MOP_SECTION_11_DEFAULT_SAFETY_COUNT),
  additionalResourceRows: fillLinkRows(MOP_SECTION_11_DEFAULT_ADDITIONAL_COUNT),
});

const resolvePolicyRows = (rows: MopReferencePolicyRow[] | undefined): MopReferencePolicyRow[] => {
  if (!rows || rows.length === 0) {
    return fillPolicyRows(MOP_SECTION_11_DEFAULT_POLICY_COUNT);
  }
  return ensureRowIds(rows, "pol");
};

const resolveLinkRows = (
  rows: MopReferenceLinkRow[] | undefined,
  defaultCount: number,
): MopReferenceLinkRow[] => {
  if (!rows || rows.length === 0) {
    return fillLinkRows(defaultCount);
  }
  return ensureRowIds(rows, "ref");
};

const resolveSafetyRows = (rows: MopReferenceSafetyRow[] | undefined): MopReferenceSafetyRow[] => {
  if (!rows || rows.length === 0) {
    return fillSafetyRows(MOP_SECTION_11_DEFAULT_SAFETY_COUNT);
  }
  return ensureRowIds(rows, "sft");
};

export const resolveMopReferences = (r: MOPSection11References | undefined): MOPSection11References => {
  if (!r) {
    return buildDefaultMopReferences();
  }
  return {
    policyDocumentRows: resolvePolicyRows(r.policyDocumentRows),
    equipmentDocumentRows: resolveLinkRows(
      r.equipmentDocumentRows,
      MOP_SECTION_11_DEFAULT_EQUIPMENT_COUNT,
    ),
    safetyStandardRows: resolveSafetyRows(r.safetyStandardRows),
    additionalResourceRows: resolveLinkRows(
      r.additionalResourceRows,
      MOP_SECTION_11_DEFAULT_ADDITIONAL_COUNT,
    ),
  };
};

export const isHttpUrl = (value: string): boolean => {
  const t = value.trim();
  return t.startsWith("https://") || t.startsWith("http://");
};

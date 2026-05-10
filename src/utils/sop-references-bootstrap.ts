import {
  newSopAdditionalResourceRow,
  newSopReferenceDocumentRow,
  newSopReferenceGuidelineItem,
  newSopSafetyStandardRow,
} from "@/constants/sop-section11-references";
import type { SOPReferences } from "@/types/sop-references";

/** Ensures Section 11 lists always have at least one editable row/document. */
export const bootstrapEmptySopReferenceTables = (
  references: SOPReferences,
): SOPReferences => ({
  ...references,
  equipmentDocumentRows:
    references.equipmentDocumentRows.length > 0
      ? references.equipmentDocumentRows
      : [newSopReferenceDocumentRow()],
  safetyStandardRows:
    references.safetyStandardRows.length > 0
      ? references.safetyStandardRows
      : [newSopSafetyStandardRow()],
  additionalResourceRows:
    references.additionalResourceRows.length > 0
      ? references.additionalResourceRows
      : [newSopAdditionalResourceRow()],
  usageGuidelineItems:
    references.usageGuidelineItems.length > 0
      ? references.usageGuidelineItems
      : [newSopReferenceGuidelineItem()],
});

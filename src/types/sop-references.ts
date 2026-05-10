export type SOPReferenceDocumentRow = {
  id: string;
  documentType: string;
  description: string;
  accessLocation: string;
};

export type SOPReferenceSafetyStandardRow = {
  id: string;
  standard: string;
  description: string;
  accessLocation: string;
};

export type SOPReferenceAdditionalResourceRow = {
  id: string;
  resourceType: string;
  description: string;
  accessLocation: string;
};

export type SOPReferenceGuidelineItem = {
  id: string;
  text: string;
};

export type SOPReferences = {
  equipmentDocumentRows: SOPReferenceDocumentRow[];
  safetyStandardRows: SOPReferenceSafetyStandardRow[];
  additionalResourceRows: SOPReferenceAdditionalResourceRow[];
  usageGuidelineItems: SOPReferenceGuidelineItem[];
  verificationNotice: string;
};

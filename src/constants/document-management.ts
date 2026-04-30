import type { DocumentType } from '@/types/document';

export const DOCUMENT_TYPES: DocumentType[] = [
  'Asset Maintenance and Service Documents',
  'Asset Manuals and Diagrams',
  'Site Diagrams and Documents',
  // 'Outdated MOPs, SOPs and EOPs',
  'Company Policies and Documents',
  'Basis of Design',
  'Electrical One-Line Diagram',
  'Mechanical One-Line Diagram'
  // 'Asset List',
];

export const DOCUMENT_TYPE_BADGE: Record<DocumentType, string> = {
  'Asset Maintenance and Service Documents': 'bg-blue-100 text-blue-700',
  'Asset Manuals and Diagrams': 'bg-purple-100 text-purple-700',
  'Site Diagrams and Documents': 'bg-green-100 text-green-700',
  'Outdated MOPs, SOPs and EOPs': 'bg-orange-100 text-orange-700',
  'Company Policies and Documents': 'bg-red-100 text-red-700',
  'Basis of Design': 'bg-red-100 text-red-700',
  'Electrical One-Line Diagram': 'bg-red-100 text-red-700',
  'Mechanical One-Line Diagram': 'bg-red-100 text-red-700',
  'Asset List': 'bg-yellow-100 text-yellow-700',
};

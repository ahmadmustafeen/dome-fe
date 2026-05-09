import type { DocumentType } from '@/types/document';

export const DOCUMENT_TYPES: DocumentType[] = [
  'Asset Maintenance and Service Documents',
  // 'Asset Manuals',
  'Company Policies and Documents',
  'Site Policies',
  'Site Documents',
  'Basis of design',
  'Approved submittal',
  'Site Diagrams and Documents',
  'Electrical One-Line Diagram',
  'Mechanical One-Line Diagram'
];

export const DOCUMENT_TYPE_BADGE: Record<DocumentType, string> = {
  'Asset Maintenance and Service Documents': 'bg-blue-100 text-blue-700',
  // 'Asset Manuals': 'bg-purple-100 text-purple-700',
  'Site Diagrams and Documents': 'bg-green-100 text-green-700',
  'Company Policies and Documents': 'bg-red-100 text-red-700',
  'Site Policies': 'bg-red-100 text-red-700',
  'Basis of design': 'bg-red-100 text-red-700',
  'Approved submittal': 'bg-red-100 text-red-700',
  'Site Documents': 'bg-red-100 text-red-700',
  'Electrical One-Line Diagram': 'bg-red-100 text-red-700',
  'Mechanical One-Line Diagram': 'bg-red-100 text-red-700',
};

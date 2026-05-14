import type { DocumentType } from '@/types/document';

export const DOCUMENT_TYPES: DocumentType[] = [
  'Company Policies and Documents',
  'Site Policies',
  'Site Documents',
  'Basis of design',
  'Approved submittal',
  'Site Diagrams and Documents',
  'Electrical One-Line Diagram',
  'Mechanical One-Line Diagram'
];
export const RAG_DOCUMENT_TYPES: DocumentType[] = [
  'Asset Manuals',
  // 'Government Policies',
]

export const DOCUMENT_TYPE_BADGE: Record<DocumentType, string> = {
  'Asset Manuals': 'bg-blue-100 text-blue-700',
  'Government Policies': 'bg-violet-100 text-blue-700',
  'Site Diagrams and Documents': 'bg-green-100 text-green-700',
  'Company Policies and Documents': 'bg-purple-100 text-purple-700',
  'Site Policies': 'bg-yellow-100 text-yellow-700',
  'Basis of design': 'bg-pink-100 text-pink-700',
  'Approved submittal': 'bg-indigo-100 text-indigo-700',
  'Site Documents': 'bg-orange-100 text-orange-700',
  'Electrical One-Line Diagram': 'bg-cyan-100 text-cyan-700',
  'Mechanical One-Line Diagram': 'bg-emerald-100 text-emerald-700',
};
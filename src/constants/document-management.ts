import type { DocumentRecord, DocumentType } from '@/types/document';

export const DOCUMENT_TYPES: DocumentType[] = [
  'Asset Maintenance and Service Documents',
  'Asset Manuals and Diagrams',
  'Site Diagrams and Documents',
  'Outdated MOPs, SOPs and EOPs',
  'Company Policies and Documents',
  'Asset List',
];

export const DOCUMENT_TYPE_BADGE: Record<DocumentType, string> = {
  'Asset Maintenance and Service Documents': 'bg-blue-100 text-blue-700',
  'Asset Manuals and Diagrams': 'bg-purple-100 text-purple-700',
  'Site Diagrams and Documents': 'bg-green-100 text-green-700',
  'Outdated MOPs, SOPs and EOPs': 'bg-orange-100 text-orange-700',
  'Company Policies and Documents': 'bg-red-100 text-red-700',
  'Asset List': 'bg-yellow-100 text-yellow-700',
};

/** Replace with API call once the backend endpoint is ready. */
export const MOCK_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc_1',
    name: 'Generator_Maintenance_Q4_2025.pdf',
    documentType: 'Asset Maintenance and Service Documents',
    fileSize: 2457600,
    uploadDate: '2025-11-11T03:17:00Z',
    fileUrl: '#',
    fileExtension: 'pdf',
  },
  {
    id: 'doc_2',
    name: 'Transformer_Manual_Model_TX500.pdf',
    documentType: 'Asset Manuals and Diagrams',
    fileSize: 5120000,
    uploadDate: '2025-10-22T09:45:00Z',
    fileUrl: '#',
    fileExtension: 'pdf',
  },
  {
    id: 'doc_3',
    name: 'Site_B_Floor_Plan_v3.png',
    documentType: 'Site Diagrams and Documents',
    fileSize: 1048576,
    uploadDate: '2025-09-05T14:30:00Z',
    fileUrl: '#',
    fileExtension: 'png',
  },
  {
    id: 'doc_4',
    name: 'Emergency_Shutdown_Procedure_SOP_2024.docx',
    documentType: 'Outdated MOPs, SOPs and EOPs',
    fileSize: 307200,
    uploadDate: '2025-08-18T07:00:00Z',
    fileUrl: '#',
    fileExtension: 'docx',
  },
  {
    id: 'doc_5',
    name: 'Health_Safety_Policy_2025.pdf',
    documentType: 'Company Policies and Documents',
    fileSize: 819200,
    uploadDate: '2025-07-01T11:20:00Z',
    fileUrl: '#',
    fileExtension: 'pdf',
  },
  {
    id: 'doc_6',
    name: 'Site_A_Full_Asset_Register.xlsx',
    documentType: 'Asset List',
    fileSize: 153600,
    uploadDate: '2025-06-15T16:05:00Z',
    fileUrl: '#',
    fileExtension: 'docx',
  },
];

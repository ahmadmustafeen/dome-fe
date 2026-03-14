'use client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import { Download, Eye, FolderOpen, Search, Trash2, X } from 'lucide-react';

import { AppButton, DeleteConfirmationScreen, EmptyState } from '@/components/common';
import { FileTypeIcon, UploadDocumentModal } from '@/components/document';
import { DOCUMENT_TYPE_BADGE, DOCUMENT_TYPES, MOCK_DOCUMENTS } from '@/constants/document-management';
import type { DocumentRecord, DocumentType } from '@/types/document';
import { formatDate, formatFileSize } from '@/utils/formatters';

export default function DocumentManagementPage() {
  const t = useTranslations('DocumentManagement');

  const [documents, setDocuments] = useState<DocumentRecord[]>(MOCK_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch
        = searchQuery.trim() === '' || doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || doc.documentType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, typeFilter]);

  const handleUploadSuccess = (newDoc: DocumentRecord) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) {
      return;
    }
    // API INTEGRATION POINT: call documentService.deleteDocument(deleteTargetId)
    setDocuments(prev => prev.filter(d => d.id !== deleteTargetId));
    setDeleteTargetId(null);
    toast.success(t('toast_delete_success'));
  };

  const handleView = (doc: DocumentRecord) => {
    window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (doc: DocumentRecord) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name;
    link.click();
  };

  const isFiltered = Boolean(searchQuery || typeFilter !== 'all');

  return (
    <div className="h-full">
      {showUpload && (
        <UploadDocumentModal onClose={() => setShowUpload(false)} onSuccess={handleUploadSuccess} />
      )}
      {deleteTargetId && (
        <DeleteConfirmationScreen
          heading={t('delete_heading')}
          description={t('delete_description')}
          handleCancel={() => setDeleteTargetId(null)}
          handleContinue={handleDeleteConfirm}
        />
      )}

      <div className="p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">{t('title')}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredDocuments.length}
              {' '}
              {filteredDocuments.length !== 1 ? 'documents' : 'document'}
              {' '}
              found
            </p>
          </div>
          <AppButton title={t('btn_upload')} onClick={() => setShowUpload(true)} variant="secondary" />
        </div>

        {/* Controls: Search + Type Filter */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm min-w-50 flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as DocumentType | 'all')}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="all">{t('filter_all_types')}</option>
              {DOCUMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-xl shadow-black/20">
          <div className="h-[calc(100vh-260px)] overflow-y-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">{t('col_name')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">{t('col_type')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">{t('col_size')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">{t('col_date')}</th>
                  <th className="w-44 px-4 py-3 text-right text-sm font-semibold tracking-wider text-white">{t('col_actions')}</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.length === 0
                  ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-2">
                          <EmptyState
                            icon={<FolderOpen className="h-9 w-9" />}
                            heading={isFiltered ? t('empty_filtered_heading') : t('empty_heading')}
                            description={isFiltered ? t('empty_filtered_description') : t('empty_description')}
                            action={
                              !isFiltered
                                ? <AppButton title={t('btn_upload')} onClick={() => setShowUpload(true)} variant="secondary" />
                                : undefined
                            }
                          />
                        </td>
                      </tr>
                    )
                  : filteredDocuments.map((doc, idx) => (
                      <tr
                        key={doc.id}
                        className={`border-b border-slate-800/60 transition-colors hover:bg-slate-800/50 ${
                          idx % 2 === 0 ? 'bg-secondary/20' : 'bg-transparent'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileTypeIcon ext={doc.fileExtension} />
                            <span className="max-w-55 truncate text-sm font-medium text-black" title={doc.name}>
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block max-w-50 truncate rounded-full px-2.5 py-1 text-xs font-medium ${DOCUMENT_TYPE_BADGE[doc.documentType]}`}
                            title={doc.documentType}
                          >
                            {doc.documentType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatFileSize(doc.fileSize)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(doc.uploadDate)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleView(doc)}
                              title={t('action_view')}
                              className="flex cursor-pointer items-center gap-1 rounded bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {t('action_view')}
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              title={t('action_download')}
                              className="flex cursor-pointer items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                            >
                              <Download className="h-3.5 w-3.5" />
                              {t('action_download')}
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(doc.id)}
                              title={t('action_delete')}
                              className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {t('action_delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

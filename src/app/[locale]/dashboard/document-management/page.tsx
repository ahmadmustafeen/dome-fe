"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FolderOpen,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  AppButton,
  DeleteConfirmationScreen,
  EmptyState,
  ScreenLoader,
} from "@/components/common";
import { FileTypeIcon, UploadDocumentModal } from "@/components/document";
import {
  DOCUMENT_TYPE_BADGE,
  DOCUMENT_TYPES,
} from "@/constants/document-management";
import { useAppContext } from "@/context/AppContext";
import { documentService } from "@/services/document-service";
import type { DocumentApiRecord, DocumentType } from "@/types/document";
import {
  extractDocumentName,
  extractFileExtension,
  formatDate,
} from "@/utils/formatters";

const PAGE_LIMIT = 10;

export default function DocumentManagementPage() {
  const t = useTranslations("DocumentManagement");
  const { site } = useAppContext();

  const [documents, setDocuments] = useState<DocumentApiRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<DocumentType | "all">("all");
  const [showUpload, setShowUpload] = useState(false);

  // single delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // bulk delete
  const [selectedIds, setSelectedIds] = useState(() => new Set<string>());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // ── Fetch documents (server-side pagination) ────────────────────────────────
  const fetchDocuments = useCallback(async (siteId: string, page: number) => {
    setIsLoading(true);
    try {
      const response = await documentService.getDocumentsBySiteId(siteId, {
        page,
        limit: PAGE_LIMIT,
      });
      setDocuments(response.data.documents);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.total);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to load documents.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (site?._id) {
      fetchDocuments(site._id, currentPage);
    }
  }, [site, currentPage, fetchDocuments]);

  // ── Client-side filtering on current page data ─────────────────────────────
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const q = searchQuery.trim().toLowerCase();
      const name = extractDocumentName(doc.documentUrl).toLowerCase();
      const matchesSearch =
        q === "" || name.includes(q) || doc.type.toLowerCase().includes(q);
      const matchesType = typeFilter === "all" || doc.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, typeFilter]);

  // ── Selection helpers ───────────────────────────────────────────────────────
  const allPageSelected =
    filteredDocuments.length > 0 &&
    filteredDocuments.every((doc) => selectedIds.has(doc._id));

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDocuments.map((d) => d._id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleUploadSuccess = (newDoc: DocumentApiRecord) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setTotalCount((prev) => prev + 1);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) {
      return;
    }
    setIsDeleting(true);
    try {
      await documentService.deleteDocument(deleteTargetId);
      setDocuments((prev) => prev.filter((d) => d._id !== deleteTargetId));
      setTotalCount((prev) => Math.max(0, prev - 1));
      setSelectedIds((prev) => {
        const n = new Set(prev);
        n.delete(deleteTargetId);
        return n;
      });
      setDeleteTargetId(null);
      toast.success(t("toast_delete_success"));
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to delete document.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    const ids = Array.from(selectedIds);
    setIsBulkDeleting(true);
    try {
      await documentService.deleteBulkDocuments(ids);
      setDocuments((prev) => prev.filter((d) => !selectedIds.has(d._id)));
      setTotalCount((prev) => Math.max(0, prev - ids.length));
      setSelectedIds(new Set());
      setShowBulkDeleteConfirm(false);
      toast.success(t("toast_bulk_delete_success"));
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to delete documents.";
      toast.error(msg);
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleView = (doc: DocumentApiRecord) => {
    window.open(doc.documentUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = (doc: DocumentApiRecord) => {
    const link = document.createElement("a");
    link.href = doc.documentUrl;
    link.download = extractDocumentName(doc.documentUrl);
    link.click();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchQuery("");
    setTypeFilter("all");
    setSelectedIds(new Set());
  };

  const isFiltered = Boolean(searchQuery || typeFilter !== "all");

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-sm text-gray-400">
          Select a site to view documents.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      {showUpload && (
        <UploadDocumentModal
          siteId={site._id}
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
      {deleteTargetId && (
        <DeleteConfirmationScreen
          heading={t("delete_heading")}
          description={t("delete_description")}
          handleCancel={() => setDeleteTargetId(null)}
          handleContinue={handleDeleteConfirm}
        />
      )}
      {showBulkDeleteConfirm && (
        <DeleteConfirmationScreen
          heading={t("delete_bulk_heading")}
          description={t("delete_bulk_description", {
            count: selectedIds.size,
          })}
          handleCancel={() => setShowBulkDeleteConfirm(false)}
          handleContinue={handleBulkDeleteConfirm}
        />
      )}
      {isLoading && (
        <ScreenLoader
          heading="Loading"
          description="Documents are loading, please wait"
        />
      )}

      <div className="p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalCount} {totalCount !== 1 ? "documents" : "document"} total
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <AppButton
                title={t("btn_delete_selected", { count: selectedIds.size })}
                onClick={() => setShowBulkDeleteConfirm(true)}
                variant="danger"
                disabled={isBulkDeleting}
              />
            )}
            <AppButton
              title={t("btn_upload")}
              onClick={() => setShowUpload(true)}
              variant="secondary"
            />
          </div>
        </div>

        {/* Controls: Search + Type Filter */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm min-w-50 flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as DocumentType | "all")
              }
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="all">{t("filter_all_types")}</option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-xl shadow-black/20">
          <div className="h-[calc(100vh-310px)] overflow-y-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allPageSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 cursor-pointer rounded border-gray-500 accent-primary"
                      aria-label="Select all documents"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">
                    {t("col_name")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">
                    {t("col_type")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold tracking-wider text-white">
                    {t("col_date")}
                  </th>
                  <th className="w-44 px-4 py-3 text-right text-sm font-semibold tracking-wider text-white">
                    {t("col_actions")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-2">
                      <EmptyState
                        icon={<FolderOpen className="h-9 w-9" />}
                        heading={
                          isFiltered
                            ? t("empty_filtered_heading")
                            : t("empty_heading")
                        }
                        description={
                          isFiltered
                            ? t("empty_filtered_description")
                            : t("empty_description")
                        }
                        action={
                          !isFiltered ? (
                            <AppButton
                              title={t("btn_upload")}
                              onClick={() => setShowUpload(true)}
                              variant="secondary"
                            />
                          ) : undefined
                        }
                      />
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((doc, idx) => {
                    const name = extractDocumentName(doc.documentUrl);
                    const ext = extractFileExtension(doc.documentUrl);
                    const isSelected = selectedIds.has(doc._id);
                    return (
                      <tr
                        key={doc._id}
                        className={`border-b border-slate-800/60 transition-colors hover:bg-slate-800/50 ${
                          isSelected
                            ? "bg-primary/10"
                            : idx % 2 === 0
                              ? "bg-secondary/20"
                              : "bg-transparent"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(doc._id)}
                            className="h-4 w-4 cursor-pointer rounded border-gray-500 accent-primary"
                            aria-label={`Select ${name}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileTypeIcon ext={ext} />
                            <span
                              className="max-w-[220px] truncate text-sm font-medium text-black"
                              title={name}
                            >
                              {name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block max-w-[200px] truncate rounded-full px-2.5 py-1 text-xs font-medium ${DOCUMENT_TYPE_BADGE[doc.type as DocumentType] ?? "bg-gray-100 text-gray-700"}`}
                            title={doc.type}
                          >
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(doc.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleView(doc)}
                              title={t("action_view")}
                              className="flex cursor-pointer items-center gap-1 rounded bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {t("action_view")}
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              title={t("action_download")}
                              className="flex cursor-pointer items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                            >
                              <Download className="h-3.5 w-3.5" />
                              {t("action_download")}
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(doc._id)}
                              disabled={isDeleting}
                              title={t("action_delete")}
                              className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {t("action_delete")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages} &mdash; {totalCount}{" "}
              {totalCount !== 1 ? "documents" : "document"}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded border text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import type { RowSelectionState } from "@tanstack/react-table";
import { FolderOpen, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  AppButton,
  DeleteConfirmationScreen,
  EmptyState,
  Pagination,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { UploadDocumentModal } from "@/components/document";
import { getDocumentColumns } from "@/components/sections/document/DocumentTableColumns";
import { DOCUMENT_TYPES } from "@/constants/document-management";
import { useAppContext } from "@/context/AppContext";
import { documentService } from "@/services/document-service";
import type { DocumentApiRecord, DocumentType } from "@/types/document";
import { extractDocumentName } from "@/utils/formatters";

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

  // bulk delete — TanStack row selection (key = doc._id)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectedIds = Object.keys(rowSelection).filter((k) => rowSelection[k]);

  // ── Fetch ───────────────────────────────────────────────────────────────────
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
      toast.error(
        err instanceof Error ? err.message : "Failed to load documents.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (site?._id) {
      fetchDocuments(site._id, currentPage);
    }
  }, [site, currentPage, fetchDocuments]);

  // ── Client-side filter on current page ────────────────────────────────────
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
      setDeleteTargetId(null);
      toast.success(t("toast_delete_success"));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete document.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDeleteConfirm = async () => {
    setIsBulkDeleting(true);
    try {
      await documentService.deleteBulkDocuments(selectedIds);
      setDocuments((prev) => prev.filter((d) => !selectedIds.includes(d._id)));
      setTotalCount((prev) => Math.max(0, prev - selectedIds.length));
      setRowSelection({});
      setShowBulkDeleteConfirm(false);
      toast.success(t("toast_bulk_delete_success"));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete documents.",
      );
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchQuery("");
    setTypeFilter("all");
    setRowSelection({});
  };

  const isFiltered = Boolean(searchQuery || typeFilter !== "all");

  // ── Column definitions ─────────────────────────────────────────────────────
  const columns = useMemo(
    () =>
      getDocumentColumns({
        onView: (doc) =>
          window.open(doc.documentUrl, "_blank", "noopener,noreferrer"),
        onDownload: (doc) => {
          const link = window.document.createElement("a");
          link.href = doc.documentUrl;
          link.download = extractDocumentName(doc.documentUrl);
          link.click();
        },
        onDelete: (doc) => setDeleteTargetId(doc._id),
        isDeleting,
        labels: {
          colName: t("col_name"),
          colType: t("col_type"),
          colDate: t("col_date"),
          colActions: t("col_actions"),
          actionView: t("action_view"),
          actionDownload: t("action_download"),
          actionDelete: t("action_delete"),
        },
      }),
    [isDeleting, t],
  );

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <Typography variant="caption" className="text-gray-400">
          Select a site to view documents.
        </Typography>
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
            count: selectedIds.length,
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

      <SectionWrapper>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">{t("title")}</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {totalCount} {totalCount !== 1 ? "documents" : "document"} total
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <AppButton
                title={t("btn_delete_selected", { count: selectedIds.length })}
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
          <div className="relative max-w-sm min-w-[200px] flex-1">
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
              onChange={(e) => setTypeFilter(e.target.value as DocumentType | "all")}
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

        {/* DataTable */}
        {filteredDocuments.length === 0 && !isLoading ? (
          <EmptyState
            icon={<FolderOpen className="h-9 w-9" />}
            heading={
              isFiltered ? t("empty_filtered_heading") : t("empty_heading")
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
        ) : (
          <div className="rounded-lg border border-slate-800 shadow-xl shadow-black/20">
            <DataTable
              columns={columns}
              data={filteredDocuments}
              loading={isLoading}
              getRowId={(row) => row._id}
              rowSelection={rowSelection}
              onRowSelectionStateChange={setRowSelection}
              noDataMessage="No documents found"
              className="h-[calc(100vh-310px)]"
              bodyRowClassName="border-b border-slate-800/60 odd:bg-slate-50/30 even:bg-white hover:bg-slate-800/10"
              bodyCellClassName="text-gray-600"
              headerCellClassName="first:w-10"
            />
          </div>
        )}

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalCount={totalCount}
          pageSize={PAGE_LIMIT}
        />
      </SectionWrapper>
    </div>
  );
}

"use client";

import { FileText, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, DeleteConfirmationScreen, EmptyState, SectionWrapper, Typography } from "@/components/common";
import { MopStatusBadge } from "@/components/mop/MopStatusBadge";
import { DASHBOARD_ROUTES, mopEditRoute } from "@/constants/routes";
import { useAppContext } from "@/context/AppContext";
import { mopService } from "@/services/mop-service";
import type { MopApiRecord } from "@/types/mop-api";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

interface MopRowProps {
  mop: MopApiRecord;
  isDeleting: boolean;
  onOpen: (id: string) => void;
  onRequestDelete: (id: string) => void;
}

const MopTableRow = ({ mop, isDeleting, onOpen, onRequestDelete }: MopRowProps) => {
  const handleDeleteClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onRequestDelete(mop._id);
  }, [mop._id, onRequestDelete]);

  return (
    <tr
      onClick={() => onOpen(mop._id)}
      className="cursor-pointer bg-white transition-colors hover:bg-slate-50"
    >
      <td className="px-4 py-3">
        <Typography variant="span" className="font-medium text-gray-900">
          {mop.mopTitle || "—"}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {mop.mopIdentifier || "—"}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <MopStatusBadge status={mop.status} />
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          v{mop.versionNumber}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="caption">{formatDate(mop.updatedAt)}</Typography>
      </td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          aria-label={`Delete MOP ${mop.mopTitle}`}
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
};

export const MopListClient = () => {
  const router = useRouter();
  const { site } = useAppContext();
  const [mops, setMops] = useState<MopApiRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMops = useCallback(async (siteId: string) => {
    setIsLoading(true);
    try {
      const res = await mopService.getAll(siteId, { limit: 50 });
      setMops(res.data.mops);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load MOPs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (site?._id) {
      fetchMops(site._id);
    }
  }, [site, fetchMops]);

  const handleOpen = useCallback((id: string) => {
    router.push(mopEditRoute(id));
  }, [router]);

  const handleDeleteConfirmed = useCallback(async () => {
    if (!deleteTargetId) {
      return;
    }
    setIsDeleting(true);
    try {
      await mopService.remove(deleteTargetId);
      setMops((prev) => prev.filter((m) => m._id !== deleteTargetId));
      setDeleteTargetId(null);
      toast.success("MOP deleted.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTargetId]);

  const filtered = mops.filter((m) => {
    const q = search.toLowerCase();
    return q === "" || m.mopTitle.toLowerCase().includes(q) || m.mopIdentifier.toLowerCase().includes(q);
  });

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Typography variant="caption" className="text-gray-400">
          Select a site to view MOP documents.
        </Typography>
      </div>
    );
  }

  return (
    <>
      {deleteTargetId && (
        <DeleteConfirmationScreen
          heading="Delete MOP"
          description="This MOP and all its version history will be permanently deleted. This cannot be undone."
          confirmLabel="Delete"
          confirmVariant="danger"
          isConfirming={isDeleting}
          handleCancel={() => setDeleteTargetId(null)}
          handleContinue={handleDeleteConfirmed}
        />
      )}

      <SectionWrapper>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">MOP Management</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {mops.length} {mops.length !== 1 ? "documents" : "document"} total
            </Typography>
          </div>
          <AppButton
            variant="secondary"
            title="Create new MOP"
            onClick={() => router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT_CREATE)}
          />
        </div>

        <div className="relative mb-4 max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or identifier…"
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
          />
        </div>

        {isLoading ? (
          <Typography variant="p" className="py-12 text-center text-gray-400">
            Loading…
          </Typography>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-9 w-9" />}
            heading="No MOPs found"
            description="Create your first Method of Procedure document."
            action={
              <AppButton
                variant="secondary"
                title="Create new MOP"
                onClick={() => router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT_CREATE)}
              />
            }
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left uppercase">
                <tr>
                  {["Title", "Identifier", "Status", "Version", "Last Modified", "Actions"].map((col) => (
                    <th key={col} className={`px-4 py-3 ${col === "Actions" ? "text-right" : ""}`}>
                      <Typography variant="h6" className="text-gray-500">{col}</Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((mop) => (
                  <MopTableRow
                    key={mop._id}
                    mop={mop}
                    isDeleting={isDeleting && deleteTargetId === mop._id}
                    onOpen={handleOpen}
                    onRequestDelete={setDeleteTargetId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

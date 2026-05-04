"use client";

import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, EmptyState, SectionWrapper, Typography } from "@/components/common";
import { mopDocumentStatusToFormLabel } from "@/components/mop/mop-document-status";
import { MopStatusBadge } from "@/components/mop/MopStatusBadge";
import { DASHBOARD_ROUTES, mopEditRoute } from "@/constants/routes";
import { getMOPList } from "@/services/mop-service";
import type { MopListSummaryRow } from "@/types/mop-api";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

type MopTableRowProps = {
  row: MopListSummaryRow;
  onView: (mopId: string) => void;
};

const MopTableRow = ({ row, onView }: MopTableRowProps) => {
  return (
    <tr className="cursor-pointer bg-white transition-colors hover:bg-slate-50">
      <td className="px-4 py-3">
        <Typography variant="span" className="font-medium text-gray-900">
          {row.title !== "" ? row.title : "—"}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {row.assetName !== "" ? row.assetName : "—"}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {`v${row.versionNumber}`}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <MopStatusBadge status={mopDocumentStatusToFormLabel(row.status)} />
      </td>
      <td className="px-4 py-3">
        <Typography variant="caption" className="text-gray-600">
          {row.lastModified !== "" ? formatDate(row.lastModified) : "—"}
        </Typography>
      </td>
      <td className="px-4 py-3 text-right">
        <AppButton
          variant="ghost"
          icon={<Eye className="h-4 w-4" />}
          title="View"
          onClick={() => onView(row.mopId)}
          className="inline-flex"
        />
      </td>
    </tr>
  );
};

export const MopListClient = () => {
  const router = useRouter();
  const [mops, setMops] = useState<MopListSummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMops = useCallback(async () => {
    setIsLoading(true);
    try {
      const rows = await getMOPList();
      setMops(rows);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load MOPs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMops();
  }, [fetchMops]);

  const handleView = useCallback(
    (mopId: string) => {
      router.push(mopEditRoute(mopId));
    },
    [router],
  );

  return (
    <SectionWrapper>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Typography variant="h1">MOP Management</Typography>
          <Typography variant="p" className="mt-1 text-gray-500">
            {mops.length} {mops.length !== 1 ? "MOPs" : "MOP"} total
          </Typography>
        </div>
        <AppButton
          variant="secondary"
          title="Create MOP"
          onClick={() => router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT_CREATE)}
        />
      </div>

      {isLoading ? (
        <Typography variant="p" className="py-12 text-center text-gray-400">
          Loading…
        </Typography>
      ) : mops.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-9 w-9" />}
          heading="No MOPs yet"
          description="Create a Method of Procedure to see it listed here."
          action={
            <AppButton
              variant="secondary"
              title="Create MOP"
              onClick={() => router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT_CREATE)}
            />
          }
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left uppercase">
              <tr>
                {["MOP Title", "Asset", "Version", "Status", "Last Modified", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`px-4 py-3 ${col === "Actions" ? "text-right" : ""}`}
                    >
                      <Typography variant="h6" className="text-gray-500">
                        {col}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mops.map((row) => (
                <MopTableRow key={row.mopId} row={row} onView={handleView} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionWrapper>
  );
};

"use client";

import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, Typography } from "@/components/common";
import { ProcedureDocumentsListLayout } from "@/components/dashboard-procedure/ProcedureDocumentsListLayout";
import { mopDocumentStatusToFormLabel } from "@/components/mop/mop-document-status";
import { MopStatusBadge } from "@/components/mop/MopStatusBadge";
import { DASHBOARD_ROUTES, sopEditRoute } from "@/constants/routes";
import { useAppContext } from "@/context/AppContext";
import { getSOPList } from "@/services/sop-service";
import type { SopListSummaryRow } from "@/types/sop-api";

const SOP_TABLE_COLUMNS = [
  "SOP Title",
  "Asset",
  "Version",
  "Status",
  "Last Modified",
  "Actions",
] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

type SopTableRowProps = {
  row: SopListSummaryRow;
  onView: (sopId: string) => void;
};

const SopTableRow = ({ row, onView }: SopTableRowProps) => {
  const handleView = useCallback(() => {
    onView(row.sopId);
  }, [onView, row.sopId]);

  return (
    <tr className="cursor-pointer bg-white transition-colors hover:bg-slate-50">
      <td className="px-4 py-3">
        <Typography variant="span" className="font-medium text-gray-900">
          {row.title !== "" ? row.title : "-"}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {row.assetName !== "" ? row.assetName : "-"}
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
          {row.lastModified !== "" ? formatDate(row.lastModified) : "-"}
        </Typography>
      </td>
      <td className="px-4 py-3 text-right">
        <AppButton
          variant="ghost"
          icon={<Eye className="h-4 w-4" />}
          title="View"
          onClick={handleView}
          className="inline-flex"
        />
      </td>
    </tr>
  );
};

export const SopListClient = () => {
  const router = useRouter();
  const { site } = useAppContext();
  const [sops, setSops] = useState<SopListSummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const siteId = site?._id;

  const fetchSops = useCallback(async () => {
    setIsLoading(true);
    try {
      const rows = await getSOPList(siteId);
      setSops(rows);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load SOPs.");
    } finally {
      setIsLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    void fetchSops();
  }, [fetchSops]);

  const goCreate = useCallback(() => {
    router.push(DASHBOARD_ROUTES.SOP_MANAGEMENT_CREATE);
  }, [router]);

  const handleView = useCallback(
    (sopId: string) => {
      router.push(sopEditRoute(sopId));
    },
    [router],
  );

  const table = (
    <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left uppercase">
          <tr>
            {SOP_TABLE_COLUMNS.map((col) => (
              <th
                key={col}
                className={`px-4 py-3 ${col === "Actions" ? "text-right" : ""}`}
              >
                <Typography variant="h6" className="text-gray-500">
                  {col}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sops.map((row) => (
            <SopTableRow key={row.sopId} row={row} onView={handleView} />
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <ProcedureDocumentsListLayout
      title="SOP Management"
      entitySingular="SOP"
      entityPlural="SOPs"
      totalCount={sops.length}
      isLoading={isLoading}
      createButtonTitle="Create SOP"
      onCreate={goCreate}
      emptyHeading="No SOPs yet"
      emptyDescription="Create a Standard Operating Procedure to see it listed here."
      emptyIcon={<FileText className="h-9 w-9" />}
      table={table}
    />
  );
};

"use client";

import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, Typography } from "@/components/common";
import { ProcedureDocumentsListLayout } from "@/components/dashboard-procedure/ProcedureDocumentsListLayout";
import { mopDocumentStatusToFormLabel } from "@/components/mop/mop-document-status";
import { MopStatusBadge } from "@/components/mop/MopStatusBadge";
import { DASHBOARD_ROUTES, eopEditRoute } from "@/constants/routes";
import { getEOPList } from "@/services/eop-service";
import type { EopListSummaryRow } from "@/types/eop-api";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

type EopTableRowProps = {
  row: EopListSummaryRow;
  onView: (eopId: string) => void;
};

const EopTableRow = ({ row, onView }: EopTableRowProps) => {
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
          onClick={() => onView(row.eopId)}
          className="inline-flex"
        />
      </td>
    </tr>
  );
};

export const EopListClient = () => {
  const router = useRouter();
  const [eops, setEops] = useState<EopListSummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEops = useCallback(async () => {
    setIsLoading(true);
    try {
      const rows = await getEOPList();
      setEops(rows);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to load EOPs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEops();
  }, [fetchEops]);

  const goCreate = useCallback(() => {
    router.push(DASHBOARD_ROUTES.EOP_MANAGEMENT_CREATE);
  }, [router]);

  const handleView = useCallback(
    (eopId: string) => {
      router.push(eopEditRoute(eopId));
    },
    [router],
  );

  const table = (
    <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left uppercase">
          <tr>
            {["EOP Title", "Asset", "Version", "Status", "Last Modified", "Actions"].map(
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
          {eops.map((row) => (
            <EopTableRow key={row.eopId} row={row} onView={handleView} />
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <ProcedureDocumentsListLayout
      title="EOP Management"
      entitySingular="EOP"
      entityPlural="EOPs"
      totalCount={eops.length}
      isLoading={isLoading}
      createButtonTitle="Create EOP"
      onCreate={goCreate}
      emptyHeading="No EOPs yet"
      emptyDescription="Create an Emergency Operating Procedure to see it listed here."
      emptyIcon={<FileText className="h-9 w-9" />}
      table={table}
    />
  );
};

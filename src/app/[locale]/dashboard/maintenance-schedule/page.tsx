"use client";
import type { Row } from "@tanstack/react-table";
import { CalendarDays, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AppButton,
  EmptyState,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { getMaintenanceColumns } from "@/components/sections/maintenance/MaintenanceTableColumns";
import { RequirementSection } from "@/components/sections/maintenance/RequirementSection";
import {
  maintenanceCategoryRoute,
  maintenanceGenerateProcedureRoute,
} from "@/constants/routes";
import { useAppContext } from "@/context/AppContext";
import type {
  MaintenanceRow,
  MaintenanceScheduleData,
  ProcedureItem,
  ProcedureKind,
} from "@/types/maintenance-schedule";
import { toast } from "react-toastify";
import { maintenanceScheduleService } from "@/services/maintenance-schedule-service";

export default function MaintenanceSchedulePage() {
  const { site, client } = useAppContext();
  const router = useRouter();

  const [isGenerator, setIsGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<MaintenanceScheduleData | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const t = useTranslations("MaintenanceSchedule");

  const fetchMaintenanceSchedule = useCallback(async (siteId: string) => {
    setIsLoading(true);
    try {
      const response =
        await maintenanceScheduleService.getMaintenanceScheduleBySiteId(siteId);

      setMaintenanceData(response.data);
      setSchedule({
        generatedAt: new Date().toDateString(),
        rows: response.data,
      });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to load maintenance schedule.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (client?._id && site?._id) {
      fetchMaintenanceSchedule(site._id);
    }
  }, [client, site]);

  const handleViewDetails = useCallback(
    (categoryId: string) => {
      router.push(maintenanceCategoryRoute(categoryId));
    },
    [router],
  );

  const handleProcedureGenerate = useCallback(
    (item: ProcedureItem, kind: ProcedureKind, categoryId: string) => {
      router.push(
        maintenanceGenerateProcedureRoute(kind, {
          categoryId,
          procedureId: item.title,
        }),
      );
    },
    [router],
  );

  const columns = useMemo(
    () =>
      getMaintenanceColumns({
        onViewDetails: handleViewDetails,
        labels: {
          colCategory: t("col_category"),
          colSubCategory: t("col_subCategory"),
          colCount: t("col_assets"),
          colMake: "Make",
          colTotalMops: t("col_total_mops"),
          colTotalEops: t("col_total_eops"),
          colTotalSops: t("col_total_sops"),
          colDetails: t("col_details"),
          colViewDetails: t("col_view_details"),
          btnShowDetails: t("btn_show_details"),
          btnHideDetails: t("btn_hide_details"),
          btnViewDetails: t("btn_view_details"),
        },
      }),
    [t, handleViewDetails],
  );

  const renderSubRow = useCallback(
    (row: Row<MaintenanceRow>) => (
      <div className="grid grid-cols-3 gap-4">
        <RequirementSection
          label={t("details_mops")}
          items={row.original.MOPs}
          colorClass="border-blue-200"
          noIcon
          onGenerate={(item) => {
            handleProcedureGenerate(item, "mop", row.original.id);
          }}
        />
        <RequirementSection
          label={t("details_eops")}
          items={row.original.EOPs}
          colorClass="border-red-200"
          noIcon
          onGenerate={(item) => {
            handleProcedureGenerate(item, "eop", row.original.id);
          }}
        />
        <RequirementSection
          label={t("details_sops")}
          items={row.original.SOPs}
          noIcon
          colorClass="border-green-200"
          onGenerate={(item) => {
            handleProcedureGenerate(item, "sop", row.original.id);
          }}
        />
      </div>
    ),
    [t, handleProcedureGenerate],
  );

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <Typography variant="caption" className="text-gray-400">
          Select a site to view the maintenance schedule.
        </Typography>
      </div>
    );
  }

  const handleRegenerate = () => {
    if (!site?._id) return;

    setIsGenerator(true);
    setMaintenanceData([]);

    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/maintenance-schedule/generateByStream/${site?._id}`,
    );

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.type === "chunk") {
          const newItem = parsed.data;

          setMaintenanceData((prev: any[]) => [...prev, newItem]);
        }

        if (parsed.type === "done") {
          toast.success("Maintenance schedule generated successfully");
          es.close();
          setIsGenerator(false);
        }

        if (parsed.type === "error") {
          toast.error(parsed.message || "Something went wrong");
          es.close();
          setIsGenerator(false);
        }
      } catch (err) {
        console.error("Stream parse error:", err);
      }
    };

    es.onerror = () => {
      toast.error("Streaming connection failed");
      es.close();
      setIsGenerator(false);
    };
  };

  const handleClear = async () => {
    try {
      setIsLoading(true);
      await maintenanceScheduleService.clearMaintenanceScheduleBySiteId(
        site._id,
      );
      toast.success("All previous schedule deleted successfully");
      fetchMaintenanceSchedule(site._id);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenLoader
        heading={"Fetching Maintenance Schedule"}
        description={"Please wait while we fetch the maintenance schedule"}
      />
    );
  }

  return (
    <div className="h-full">
      {isGenerator ? (
        <ScreenLoader
          heading={t("loader_heading")}
          description={t("loader_description")}
        />
      ) : null}

      <SectionWrapper>
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">{t("title")}</Typography>
          </div>
          {!schedule?.rows?.length ? (
            <AppButton
              title={t("btn_generate")}
              onClick={handleRegenerate}
              variant="secondary"
              icon={<CalendarDays className="h-4 w-4" />}
            />
          ) : (
            <div className="flex items-center gap-2">
              <AppButton
                title={t("btn_regenerate")}
                onClick={handleRegenerate}
                variant="default"
                icon={<RefreshCw className="h-4 w-4" />}
              />
              <AppButton
                title={t("btn_clear")}
                onClick={handleClear}
                variant="danger"
                icon={<Trash2 className="h-4 w-4" />}
              />
            </div>
          )}
        </div>

        {!maintenanceData?.length ? (
          <EmptyState
            icon={<CalendarDays className="h-10 w-10" />}
            heading={t("empty_heading")}
            description={t("empty_description")}
          />
        ) : (
          <>
            <div className="mb-4">
              <div className="relative max-w-sm min-w-55">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  placeholder={t("search_placeholder")}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
              <DataTable
                columns={columns}
                data={maintenanceData}
                getRowId={(row) => row.id}
                noDataMessage="No categories match your search."
                renderSubRow={renderSubRow}
                bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/5 transition-colors"
                bodyCellClassName="py-3 text-sm"
                headerCellClassName="text-center first:text-left"
              />
            </div>
          </>
        )}
      </SectionWrapper>
    </div>
  );
}

"use client";
import type { Row } from "@tanstack/react-table";
import {
  CalendarDays,
  Check,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

import {
  AppButton,
  EmptyState,
  Pagination,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { getMaintenanceColumns } from "@/components/sections/maintenance/MaintenanceTableColumns";
import { RequirementSection } from "@/components/sections/maintenance/RequirementSection";
import { DUMMY_MAINTENANCE_SCHEDULE } from "@/constants/maintenance-schedule";
import { DASHBOARD_ROUTES, maintenanceCategoryRoute } from "@/constants/routes";
import { useAppContext } from "@/context/AppContext";
import type {
  MaintenanceRow,
  MaintenanceScheduleData,
  ProcedureItem,
} from "@/types/maintenance-schedule";
import { formatDate } from "@/utils/formatters";

const MS_PAGE_SIZE = 5;

export default function MaintenanceSchedulePage() {
  const t = useTranslations("MaintenanceSchedule");
  const { site } = useAppContext();
  const router = useRouter();

  const [schedule, setSchedule] = useState<MaintenanceScheduleData | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [msPage, setMsPage] = useState(1);

  const simulate = (data: MaintenanceScheduleData) =>
    new Promise<void>((resolve) =>
      setTimeout(() => {
        setSchedule(data);
        resolve();
      }, 1800),
    );

  const handleGenerate = async () => {
    setIsGenerating(true);
    await simulate(DUMMY_MAINTENANCE_SCHEDULE);
    setMsPage(1);
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await simulate({
      ...DUMMY_MAINTENANCE_SCHEDULE,
      generatedAt: new Date().toISOString(),
    });
    setMsPage(1);
    setIsGenerating(false);
  };

  const handleClear = () => {
    setSchedule(null);
    setSearchQuery("");
    setMsPage(1);
  };

  const handleViewDetails = useCallback(
    (categoryId: string) => {
      router.push(maintenanceCategoryRoute(categoryId));
    },
    [router],
  );

  const handleProcedureGenerate = useCallback(
    (_item: ProcedureItem) => {
      router.push(DASHBOARD_ROUTES.DOCUMENT_MANAGEMENT);
    },
    [router],
  );

  const filteredRows = useMemo<MaintenanceRow[]>(() => {
    if (!schedule) {
      return [];
    }
    const q = searchQuery.trim().toLowerCase();
    return q
      ? schedule.rows.filter((r) => r.category.toLowerCase().includes(q))
      : schedule.rows;
  }, [schedule, searchQuery]);

  const msTotalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / MS_PAGE_SIZE),
  );

  const pagedRows = useMemo(
    () =>
      filteredRows.slice((msPage - 1) * MS_PAGE_SIZE, msPage * MS_PAGE_SIZE),
    [filteredRows, msPage],
  );

  const totals = useMemo(
    () => ({
      assets: filteredRows.reduce((s, r) => s + r.assetCount, 0),
      mops: filteredRows.reduce((s, r) => s + r.totalMOPs, 0),
      eops: filteredRows.reduce((s, r) => s + r.totalEOPs, 0),
      sops: filteredRows.reduce((s, r) => s + r.totalSOPs, 0),
    }),
    [filteredRows],
  );

  const columns = useMemo(
    () =>
      getMaintenanceColumns({
        onViewDetails: handleViewDetails,
        labels: {
          colCategory: t("col_category"),
          colAssets: t("col_assets"),
          colMonthly: t("col_monthly"),
          colQuarterly: t("col_quarterly"),
          colSemiAnnual: t("col_semi_annual"),
          colAnnual: t("col_annual"),
          colTwoYear: t("col_two_year"),
          colThreeYear: t("col_three_year"),
          colFiveYear: t("col_five_year"),
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
          items={row.original.mopRequirements}
          colorClass="border-blue-200"
          onGenerate={handleProcedureGenerate}
        />
        <RequirementSection
          label={t("details_eops")}
          items={row.original.eopRequirements}
          colorClass="border-red-200"
          onGenerate={handleProcedureGenerate}
        />
        <RequirementSection
          label={t("details_sops")}
          items={row.original.sopRequirements}
          colorClass="border-green-200"
          onGenerate={handleProcedureGenerate}
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

  return (
    <div className="h-full">
      {isGenerating && (
        <ScreenLoader
          heading={t("loader_heading")}
          description={t("loader_description")}
        />
      )}

      <SectionWrapper>
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">{t("title")}</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {schedule
                ? `${filteredRows.length} ${filteredRows.length !== 1 ? "categories" : "category"} · ${totals.assets} assets`
                : "Generate a schedule to view your maintenance plan"}
            </Typography>
          </div>
          {!schedule ? (
            <AppButton
              title={t("btn_generate")}
              onClick={handleGenerate}
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

        {!schedule ? (
          <EmptyState
            icon={<CalendarDays className="h-10 w-10" />}
            heading={t("empty_heading")}
            description={t("empty_description")}
          />
        ) : (
          <>
            {/* ── Search ── */}
            <div className="mb-4">
              <div className="relative max-w-sm min-w-[220px]">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setMsPage(1);
                  }}
                  placeholder={t("search_placeholder")}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setMsPage(1);
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ── DataTable ── */}
            <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
              <DataTable
                columns={columns}
                data={pagedRows}
                getRowId={(row) => row.id}
                noDataMessage="No categories match your search."
                renderSubRow={renderSubRow}
                bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/5 transition-colors"
                bodyCellClassName="py-3 text-sm"
                headerCellClassName="text-center first:text-left"
              />
            </div>

            {/* ── Pagination ── */}
            <Pagination
              totalPages={msTotalPages}
              currentPage={msPage}
              onPageChange={setMsPage}
              totalCount={filteredRows.length}
              pageSize={MS_PAGE_SIZE}
            />

            {/* ── Legend ── */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3">
              <Typography
                variant="caption"
                className="flex items-center gap-1.5 text-slate-500"
              >
                <Check className="h-3.5 w-3.5 text-teal-500" strokeWidth={3} />
                Scheduled Maintenance Frequency
              </Typography>
              <Typography
                variant="caption"
                className="flex items-center gap-1.5 text-slate-500"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  N
                </span>
                MOP / EOP / SOP Count
              </Typography>
            </div>

            {/* ── Summary footer ── */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-6 py-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:grid-cols-6">
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_generated")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {formatDate(schedule.generatedAt)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_groups")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {filteredRows.length}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_assets")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {totals.assets}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_mops")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {totals.mops}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_eops")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {totals.eops}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" className="text-slate-400">
                    {t("summary_sops")}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mt-0.5 font-medium text-slate-700"
                  >
                    {totals.sops}
                  </Typography>
                </div>
              </div>
            </div>
          </>
        )}
      </SectionWrapper>
    </div>
  );
}

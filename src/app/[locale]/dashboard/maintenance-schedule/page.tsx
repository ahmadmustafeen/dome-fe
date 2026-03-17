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
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import {
  AppButton,
  EmptyState,
  Pagination,
  ScreenLoader,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { getMaintenanceColumns } from "@/components/sections/maintenance/MaintenanceTableColumns";
import { DUMMY_MAINTENANCE_SCHEDULE } from "@/constants/maintenance-schedule";
import { useAppContext } from "@/context/AppContext";
import type {
  MaintenanceRow,
  MaintenanceScheduleData,
} from "@/types/maintenance-schedule";
import { formatDate } from "@/utils/formatters";

// ── Requirement list sub-component (used in renderSubRow) ─────────────────────

const RequirementList = ({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) => (
  <div className={`rounded-lg border ${color} p-4`}>
    <p
      className={`mb-3 text-xs font-bold tracking-wider uppercase ${color
        .replace("border-", "text-")
        .replace("-200", "-700")}`}
    >
      {label}
    </p>
    {items.length === 0 ? (
      <p className="text-xs text-gray-400 italic">None required</p>
    ) : (
      <ol className="list-inside list-decimal space-y-1.5">
        {items.map((req, i) => (
          <li key={i} className="text-xs leading-relaxed text-gray-700">
            {req}
          </li>
        ))}
      </ol>
    )}
  </div>
);

// ── Main page ────────────────────────────────────────────────────────────────

const MS_PAGE_SIZE = 5;

export default function MaintenanceSchedulePage() {
  const t = useTranslations("MaintenanceSchedule");
  const { site } = useAppContext();

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
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await simulate({
      ...DUMMY_MAINTENANCE_SCHEDULE,
      generatedAt: new Date().toISOString(),
    });
    setIsGenerating(false);
  };

  const handleClear = () => {
    setSchedule(null);
    setSearchQuery("");
    setMsPage(1);
  };

  const filteredRows = useMemo<MaintenanceRow[]>(() => {
    if (!schedule) {
      return [];
    }
    const q = searchQuery.trim().toLowerCase();
    const rows = q
      ? schedule.rows.filter((r) => r.category.toLowerCase().includes(q))
      : schedule.rows;
    setMsPage(1);
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        btnShowDetails: t("btn_show_details"),
        btnHideDetails: t("btn_hide_details"),
      }),
    [t],
  );

  const renderSubRow = (row: Row<MaintenanceRow>) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <RequirementList
        label={t("details_mops")}
        items={row.original.mopRequirements}
        color="border-blue-200"
      />
      <RequirementList
        label={t("details_eops")}
        items={row.original.eopRequirements}
        color="border-red-200"
      />
      <RequirementList
        label={t("details_sops")}
        items={row.original.sopRequirements}
        color="border-green-200"
      />
    </div>
  );

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-sm text-gray-400">
          Select a site to view the maintenance schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      {isGenerating && (
        <ScreenLoader
          heading="Generating Schedule"
          description="AI is analysing your uploaded assets and documents…"
        />
      )}

      <div className="p-8">
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              {t("title")}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {schedule
                ? `${filteredRows.length} ${filteredRows.length !== 1 ? "categories" : "category"} · ${totals.assets} assets`
                : "Generate a schedule to view your maintenance plan"}
            </p>
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
          /* ── Empty state ── */
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
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-500" strokeWidth={3} />
                Scheduled Maintenance Frequency
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  N
                </span>
                MOP / EOP / SOP Count
              </span>
            </div>

            {/* ── Summary footer ── */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 md:grid-cols-6">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_generated")}
                  </p>
                  <p className="mt-0.5 font-medium">
                    {formatDate(schedule.generatedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_groups")}
                  </p>
                  <p className="mt-0.5 font-medium">{filteredRows.length}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_assets")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.assets}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_mops")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.mops}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_eops")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.eops}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {t("summary_sops")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.sops}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

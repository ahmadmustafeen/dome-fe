"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { AppButton, EmptyState, ScreenLoader } from "@/components/common";
import { DUMMY_MAINTENANCE_SCHEDULE } from "@/constants/maintenance-schedule";
import { useAppContext } from "@/context/AppContext";
import type {
  MaintenanceRow,
  MaintenanceScheduleData,
} from "@/types/maintenance-schedule";
import { formatDate } from "@/utils/formatters";

// ── Helper components ────────────────────────────────────────────────────────

const FrequencyCell = ({ active }: { active: boolean }) =>
  active ? (
    <Check className="mx-auto h-4 w-4 text-teal-500" strokeWidth={3} />
  ) : null;

const CountBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
      {count}
    </span>
  ) : (
    <span className="text-xs text-gray-400">—</span>
  );

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
      className={`mb-3 text-xs font-bold uppercase tracking-wider ${color.replace("border-", "text-").replace("-200", "-700")}`}
    >
      {label}
    </p>
    {items.length === 0 ? (
      <p className="text-xs italic text-gray-400">None required</p>
    ) : (
      <ol className="space-y-1.5 list-decimal list-inside">
        {items.map((req, i) => (
          <li key={i} className="text-xs text-gray-700 leading-relaxed">
            {req}
          </li>
        ))}
      </ol>
    )}
  </div>
);

// ── Main page ────────────────────────────────────────────────────────────────

export default function MaintenanceSchedulePage() {
  const t = useTranslations("MaintenanceSchedule");
  const { site } = useAppContext();

  const [schedule, setSchedule] = useState<MaintenanceScheduleData | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    setExpandedId(null);
  };

  const filteredRows = useMemo<MaintenanceRow[]>(() => {
    if (!schedule) {
      return [];
    }
    const q = searchQuery.trim().toLowerCase();
    return q
      ? schedule.rows.filter((r) => r.category.toLowerCase().includes(q))
      : schedule.rows;
  }, [schedule, searchQuery]);

  const totals = useMemo(
    () => ({
      assets: filteredRows.reduce((s, r) => s + r.assetCount, 0),
      mops: filteredRows.reduce((s, r) => s + r.totalMOPs, 0),
      eops: filteredRows.reduce((s, r) => s + r.totalEOPs, 0),
      sops: filteredRows.reduce((s, r) => s + r.totalSOPs, 0),
    }),
    [filteredRows],
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
            {/* ── Search row ── */}
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

            {/* ── Table ── */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-xl shadow-black/20">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900 text-white">
                    <th className="sticky left-0 z-10 bg-slate-900 px-4 py-3 text-left text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_category")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_assets")}
                    </th>
                    {/* Frequency */}
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_monthly")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_quarterly")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_semi_annual")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_annual")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_two_year")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_three_year")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_five_year")}
                    </th>
                    {/* Totals */}
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_total_mops")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_total_eops")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_total_sops")}
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider whitespace-nowrap">
                      {t("col_details")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={13}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        No categories match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, idx) => {
                      const isExpanded = expandedId === row.id;
                      const rowBg = idx % 2 === 0 ? "bg-white" : "bg-slate-50";
                      return (
                        <>
                          {/* ── Data row ── */}
                          <tr
                            key={row.id}
                            className={`border-b border-slate-200 ${rowBg} transition-colors hover:bg-primary/5`}
                          >
                            <td
                              className={`sticky left-0 z-10 px-4 py-3 font-medium text-gray-900 whitespace-nowrap ${rowBg}`}
                            >
                              {row.category}
                            </td>
                            <td className="px-3 py-3 text-center font-semibold text-gray-700">
                              {row.assetCount}
                            </td>
                            {/* Frequency checkmarks */}
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.monthly} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.quarterly} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell
                                active={row.frequency.semiAnnual}
                              />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.annual} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.twoYear} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.threeYear} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <FrequencyCell active={row.frequency.fiveYear} />
                            </td>
                            {/* Totals */}
                            <td className="px-3 py-3 text-center">
                              <CountBadge count={row.totalMOPs} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <CountBadge count={row.totalEOPs} />
                            </td>
                            <td className="px-3 py-3 text-center">
                              <CountBadge count={row.totalSOPs} />
                            </td>
                            {/* Details toggle */}
                            <td className="px-3 py-3 text-center">
                              <button
                                onClick={() =>
                                  setExpandedId(isExpanded ? null : row.id)
                                }
                                className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="h-3 w-3" />{" "}
                                    {t("btn_hide_details")}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-3 w-3" />{" "}
                                    {t("btn_show_details")}
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>

                          {/* ── Expandable details row ── */}
                          {isExpanded && (
                            <tr
                              key={`${row.id}-details`}
                              className="border-b border-slate-200 bg-slate-100"
                            >
                              <td colSpan={13} className="px-6 py-5">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                  <RequirementList
                                    label={t("details_mops")}
                                    items={row.mopRequirements}
                                    color="border-blue-200"
                                  />
                                  <RequirementList
                                    label={t("details_eops")}
                                    items={row.eopRequirements}
                                    color="border-red-200"
                                  />
                                  <RequirementList
                                    label={t("details_sops")}
                                    items={row.sopRequirements}
                                    color="border-green-200"
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

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
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t("summary_generated")}
                  </p>
                  <p className="mt-0.5 font-medium">
                    {formatDate(schedule.generatedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t("summary_groups")}
                  </p>
                  <p className="mt-0.5 font-medium">{filteredRows.length}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t("summary_assets")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.assets}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t("summary_mops")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.mops}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t("summary_eops")}
                  </p>
                  <p className="mt-0.5 font-medium">{totals.eops}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
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

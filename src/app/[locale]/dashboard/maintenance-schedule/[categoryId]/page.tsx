"use client";
import { ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { use, useCallback, useMemo, useState } from "react";

import {
  AppButton,
  EmptyState,
  Pagination,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { getCategoryAssetColumns } from "@/components/sections/maintenance/CategoryAssetsTableColumns";
import { DUMMY_MAINTENANCE_SCHEDULE } from "@/constants/maintenance-schedule";
import { MOCK_CATEGORY_ASSETS } from "@/constants/maintenance-schedule-assets";
import type { CategoryAsset } from "@/types/maintenance-schedule";

const PAGE_SIZE = 10;

type PageProps = {
  params: Promise<{ categoryId: string }>;
};

export default function MaintenanceCategoryDetailPage({ params }: PageProps) {
  const { categoryId } = use(params);
  const t = useTranslations("MaintenanceCategoryDetail");
  const router = useRouter();
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryRow = useMemo(
    () => DUMMY_MAINTENANCE_SCHEDULE.rows.find((r) => r.id === categoryId),
    [categoryId],
  );

  const allAssets: CategoryAsset[] = useMemo(
    () => MOCK_CATEGORY_ASSETS[categoryId] ?? [],
    [categoryId],
  );

  const filteredAssets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return allAssets;
    }
    return allAssets.filter(
      (a) =>
        a.assetName.toLowerCase().includes(q) ||
        a.assetId.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q),
    );
  }, [allAssets, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));

  const pagedAssets = useMemo(
    () =>
      filteredAssets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredAssets, currentPage],
  );

  const handleGenerate = useCallback(
    (_assetId: string, _type: "mop" | "eop" | "sop") => {
      router.push(`/${locale}/dashboard/document-management`);
    },
    [router, locale],
  );

  const handleRowClick = useCallback(
    (asset: CategoryAsset) => {
      router.push(
        `/${locale}/dashboard/maintenance-schedule/${categoryId}/${asset.id}`,
      );
    },
    [router, locale, categoryId],
  );

  const columns = useMemo(
    () =>
      getCategoryAssetColumns({
        onGenerate: handleGenerate,
        labels: {
          colAssetId: t("col_asset_id"),
          colAssetName: t("col_asset_name"),
          colLocation: t("col_location"),
          colSerial: t("col_serial"),
          colMops: t("col_mops"),
          colEops: t("col_eops"),
          colSops: t("col_sops"),
        },
      }),
    [t, handleGenerate],
  );

  const assetCount = filteredAssets.length;

  return (
    <div className="h-full">
      <SectionWrapper>
        {/* ── Back button ── */}
        <div className="mb-4">
          <AppButton
            title={t("back")}
            onClick={() =>
              router.push(`/${locale}/dashboard/maintenance-schedule`)
            }
            variant="default"
            icon={<ArrowLeft className="size-4" />}
          />
        </div>

        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">
              {categoryRow?.category ?? "Category Detail"}
            </Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {assetCount !== 1
                ? t("assets_count_other", { count: assetCount })
                : t("assets_count_one", { count: assetCount })}
            </Typography>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="mb-4">
          <div className="relative max-w-sm min-w-[220px]">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t("search_placeholder")}
              className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        {filteredAssets.length === 0 ? (
          <EmptyState
            icon={<Search className="size-9" />}
            heading={t("empty_heading")}
            description={t("empty_description")}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
            <DataTable
              columns={columns}
              data={pagedAssets}
              getRowId={(row) => row.id}
              handleRowClick={handleRowClick}
              noDataMessage={t("empty_heading")}
              bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/5 transition-colors cursor-pointer"
              bodyCellClassName="py-3 text-sm"
              headerCellClassName="text-center first:text-left"
            />
          </div>
        )}

        {/* ── Pagination ── */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={filteredAssets.length}
          pageSize={PAGE_SIZE}
        />
      </SectionWrapper>
    </div>
  );
}

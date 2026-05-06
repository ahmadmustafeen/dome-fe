"use client";
import type { Row } from "@tanstack/react-table";
import { ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { use, useCallback, useEffect, useMemo, useState } from "react";

import {
  AppButton,
  EmptyState,
  Pagination,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { DataTable } from "@/components/DataTable";
import { CategoryAssetProcedurePanel } from "@/components/sections/maintenance/CategoryAssetProcedurePanel";
import { getCategoryAssetColumns } from "@/components/sections/maintenance/CategoryAssetsTableColumns";
import {
  DASHBOARD_ROUTES,
  maintenanceGenerateProcedureRoute,
} from "@/constants/routes";
import type {
  CategoryAsset,
  MaintenanceRow,
  MaintenanceScheduleData,
  ProcedureItem,
  ProcedureKind,
} from "@/types/maintenance-schedule";
import { useAppContext } from "@/context/AppContext";
import { maintenanceScheduleService } from "@/services/maintenance-schedule-service";
import * as assetService from "@/services/asset-service";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

type PageProps = {
  params: Promise<{ categoryId: string }>;
};

export default function MaintenanceCategoryDetailPage({ params }: PageProps) {
  const { categoryId } = use(params);
  const t = useTranslations("MaintenanceCategoryDetail");
  const router = useRouter();
  const [categoryRow, setCategoryRow] = useState<CategoryAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setData] = useState<MaintenanceRow[]>([]);
  const [, setSchedule] = useState<MaintenanceScheduleData | null>(null);
  const { site } = useAppContext();

  const fetchMaintenanceSchedule = useCallback(async (siteId: string) => {
    setIsLoading(true);
    try {
      const response =
        await maintenanceScheduleService.getMaintenanceScheduleBySiteId(siteId);
      setData(response.data);
      const category = response.data.find((item) => item._id === categoryId);
      const envelope = (await assetService.assetService.getAllAssetsByCategoryAndSubCategory(
        category?.category!,
        category?.subCategory!,
        category?.make!,
        site?._id!,
      )) as {
        data?: { assets?: CategoryAsset[] };
      };
      setCategoryRow(
        envelope.data?.assets?.map((item) => ({
          ...item,
          mops: category?.MOPs ?? [],
          sops: category?.SOPs ?? [],
          eops: category?.EOPs ?? [],
        })) ?? [],
      );

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
    if (site) {
      fetchMaintenanceSchedule(site._id);
    }
  }, [site]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAssets = useMemo(() => {
    searchQuery.trim().toLowerCase();
    return categoryRow;
  }, [categoryRow, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));

  const pagedAssets = useMemo(
    () =>
      filteredAssets.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredAssets, currentPage],
  );

  const handleProcedureGenerate = useCallback(
    (item: ProcedureItem, kind: ProcedureKind, assetRecordId: string) => {
      router.push(
        maintenanceGenerateProcedureRoute(kind, {
          categoryId,
          assetId: assetRecordId,
          procedureId: item.title,
        }),
      );
    },
    [router, categoryId],
  );

  const renderAssetSubRow = useCallback(
    (row: Row<CategoryAsset>) => (
      <CategoryAssetProcedurePanel
        asset={row.original}
        labels={{
          mops: t("details_mops"),
          eops: t("details_eops"),
          sops: t("details_sops"),
        }}
        onProcedureGenerate={handleProcedureGenerate}
      />
    ),
    [handleProcedureGenerate, t],
  );

  const columns = useMemo(
    () =>
      getCategoryAssetColumns({
        colAssetId: t("col_asset_id"),
        colAssetName: t("col_asset_name"),
        colLocation: t("col_location"),
        colSerial: t("col_serial"),
        colMops: t("col_mops"),
        colEops: t("col_eops"),
        colSops: t("col_sops"),
        colExpandHint: t("col_expand_hint"),
      }),
    [t],
  );

  const assetCount = filteredAssets.length;

  if (isLoading) {
    return (
      <ScreenLoader
        heading={t("loader_heading")}
        description={t("loader_description")}
      />
    );
  }
  return (
    <div className="h-full">
      <SectionWrapper>
        <div className="mb-4">
          <AppButton
            title={t("back")}
            onClick={() => router.push(DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE)}
            variant="default"
            icon={<ArrowLeft className="size-4" />}
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">Category Detail</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {assetCount !== 1
                ? t("assets_count_other", { count: assetCount })
                : t("assets_count_one", { count: assetCount })}
            </Typography>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative max-w-sm min-w-55">
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
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

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
              onRowActivate={(row) => {
                row.toggleExpanded();
              }}
              noDataMessage={t("empty_heading")}
              renderSubRow={renderAssetSubRow}
              bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/10 transition-colors"
              bodyCellClassName="py-3 text-sm"
              headerCellClassName="text-center first:text-left"
            />
          </div>
        )}

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

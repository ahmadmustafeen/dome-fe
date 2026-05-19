"use client";
import type { Row } from "@tanstack/react-table";
import { ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AppButton,
  DeleteConfirmationScreen,
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
import { generatedDocumentService } from "@/services/generatedDocument-service";
import { DocumentApiRecord, documentService } from "@/services/document-service";
import { extractDocumentName } from "@/utils/formatters";

const PAGE_SIZE = 10;

type PageProps = {
  params: {
    categoryId: string;
  };
};

export default function MaintenanceCategoryDetailPage({ params }: PageProps) {
  const { categoryId } = params;
  const t = useTranslations("MaintenanceCategoryDetail");
  const router = useRouter();
  const [categoryRow, setCategoryRow] = useState<CategoryAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setData] = useState<MaintenanceRow[]>([]);
  const [, setSchedule] = useState<MaintenanceScheduleData | null>(null);
  const { site, client } = useAppContext();
  const [documents, setDocuments] = useState<DocumentApiRecord[]>([]);
  const [ragDocuments, setRagDocuments] = useState<DocumentApiRecord[]>([]);


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
    if (client?._id && site?._id) {
      fetchMaintenanceSchedule(site._id);
    }
  }, [site, client]);

  const [searchQuery, setSearchQuery] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pdData, setPdData] = useState<{ type: string, pdId: string, assetId: string, custom: boolean } | null>(null)
  const [deletePdData, setdeletePdData] = useState<{ type: string, pdId: string, assetId: string } | null>(null)
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);

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
  const fetchDocuments = async () => {
    try {
      const response = await documentService.getApprovedDocumentsBySiteId(site?._id!);
      const ragResponse = await documentService.getApprovedRagDocuments()
      setDocuments(response.data.documents || []);
      setRagDocuments(ragResponse.data.documents || [])
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch documents");
    }
  };

  useEffect(() => {
    if (site?._id) {
      fetchDocuments();
    }
  }, [site?._id]);

  // Group documents by type
  const groupedDocuments = [...documents, ...ragDocuments].reduce((acc: any, doc: any) => {
    const type = doc.type || "other";

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(doc);

    return acc;
  }, {});


  // Toggle selection
  const toggleDocumentSelection = (doc: any) => {
    setSelectedDocuments((prev) => {
      const alreadySelected = prev.find((item) => item._id === doc._id);

      if (alreadySelected) {
        return prev.filter((item) => item._id !== doc._id);
      }

      return [...prev, doc];
    });
  };

  const handleNavigate = async (pdId: string, type: string, assetId: string, documentIds: string[]) => {

    const resp = await generatedDocumentService.createGeneratedDocument(pdId, type, assetId, site?._id!, documentIds, customTitle);
    if (resp) {
      if (resp.data.pdId) {
        let route = '';
        if (type === 'mop') route = 'mop-management';
        if (type === 'sop') route = 'sop-management';
        if (type === 'eop') route = 'eop-management';
        setPdData(null)
        setCustomTitle('')
        return router.push(`/en/dashboard/${route}/${resp.data.pdId}`)

      }
      let route = '';
      if (type === 'mop') route = 'mop-management';
      if (type === 'sop') route = 'sop-management';
      if (type === 'eop') route = 'eop-management';
      setPdData(null)
      setCustomTitle('')
      router.push(`/en/dashboard/${route}/create/${resp.data._id}`)
    }
  }

  const handleDeleteDocument = async (pdId: string, type: string, assetId: string) => {
    setdeletePdData({ pdId, type, assetId })
  }

  const confirmDeleteDocument = async () => {

    const resp = await generatedDocumentService.deleteGeneratedDocument(deletePdData?.pdId!, deletePdData?.type!, deletePdData?.assetId!, site?._id!);
    if (resp) {
      toast.success(`${deletePdData?.type} Deleted Succesfully.`)
      setdeletePdData(null)
      fetchMaintenanceSchedule(site?._id!)
    }
  }

  const handleCreateClick = async (pdId: string, type: string, assetId: string, custom?: boolean) => {
    setPdData({ pdId, type, assetId, custom: custom ?? false })
  }

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
        handleCreateClick={handleCreateClick}
        handleDeleteDocument={handleDeleteDocument}
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

  const handleContinue = () => {
    if (pdData?.custom && !customTitle) {
      toast.error("Title is required");
      return
    }
    handleNavigate(pdData?.pdId!, pdData?.type!, pdData?.assetId!, selectedDocuments.map(item => item._id))
  }

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
        {pdData ? (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
            <div className="relative flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">

              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => {
                  setCustomTitle('')
                  setPdData(null)
                }}
              >
                <X />
              </div>

              <div className="border-b border-gray-200 px-6 py-4 text-center">
                <Typography variant="h2">
                  Select documents to support generation
                </Typography>
              </div>
              {pdData?.custom ? <div className="flex flex-col gap-2 py-2 w-11/12 mx-auto">
                <h3 className="text-sm font-medium text-gray-700">
                  Custom Title
                </h3>

                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div> : null}

              <div className="px-6 py-6">
                <Typography variant="p" className="mb-6 text-center text-gray-500">
                  Select all documents you want included in this generation.
                </Typography>

                <div className="max-h-125 overflow-y-auto space-y-6">
                  {Object.entries(groupedDocuments).map(([type, docs]: any) => (
                    <div key={type}>

                      <div className="mb-3 text-sm font-semibold uppercase text-gray-400">
                        {type}
                      </div>

                      <div className="space-y-2">
                        {docs.map((doc: any) => {
                          const isSelected = selectedDocuments.some(
                            (item) => item._id === doc._id
                          );

                          const name = extractDocumentName(doc.documentUrl);
                          return (
                            <div
                              key={doc._id}
                              onClick={() => toggleDocumentSelection(doc)}
                              className={`cursor-pointer rounded-xl border p-3 transition-all ${isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">
                                    {name ?? "Name"}
                                  </div>

                                  <div className="text-sm text-gray-500">
                                    {doc.type}
                                  </div>
                                </div>

                                {isSelected && (
                                  <div className="text-sm font-medium text-blue-600">
                                    Selected
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleContinue}
                    className="rounded-xl cursor-pointer bg-black px-5 py-2 text-white"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {
          deletePdData ? <DeleteConfirmationScreen
            description={`Confirm you want to delete this ${deletePdData.type} document?`}
            heading="Delete Confirmation"
            handleCancel={() => setdeletePdData(null)}
            handleContinue={confirmDeleteDocument} />
            : null
        }

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

"use client";
import type { Asset } from "@/components";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import {
  AppButton,
  CreateAssetModal,
  DeleteConfirmationScreen,
  ScreenLoader,
  SideBarNavigation,
  UploadAssetModal,
} from "@/components";
import DynamicTable from "@/components/table/DynamicTable";
import { AssetTableHeaders } from "@/constants/data";
import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";

type SortOrder = "asc" | "desc";

const SORT_FIELDS = [
  { label: "Asset ID", value: "assetId" },
  { label: "Asset Name", value: "assetName" },
  { label: "Category", value: "category" },
  { label: "Sub Category", value: "subCategory" },
  { label: "Make", value: "make" },
  { label: "Model", value: "modelName" },
  { label: "Date Added", value: "createdAt" },
];

export default function AssetManagementPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [asset, setAsset] = useState<Asset | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [deleteId, setDeleteId] = useState("");
  const [confirmDeleteAllAssets, setConfirmDeleteAllAssets] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { site, client } = useAppContext();
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [showUploadAssets, setShowUploadAssets] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState(new Set<string>());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchAssetsBySiteId = useCallback(
    async (
      id: string,
      page?: number,
      search?: string,
      sort?: string,
      order?: SortOrder,
    ) => {
      try {
        setIsAssetsLoading(true);
        const assets = (await assetService.getAllAssetsBySiteId(id, {
          page: page || 1,
          search: (search ?? searchQuery) || undefined,
          sortBy: sort ?? sortBy,
          sortOrder: order ?? sortOrder,
        })) as {
          data: {
            assets: Asset[];
            totalPages: number;
            total: number;
            page: number;
          };
        };
        if (!assets || !assets?.data) {
          toast.error(
            "Something went wrong while fetching assets, refresh the page.",
          );
          return;
        }
        setAssets(assets.data.assets as Asset[]);
        setTotalPages(assets.data.totalPages);
        setTotalAssets(assets.data.total);
      } finally {
        setIsAssetsLoading(false);
      }
    },
    [searchQuery, sortBy, sortOrder],
  );

  const handlePageChange = (page: number) => {
    if (site?._id) {
      setCurrentPage(page);
      fetchAssetsBySiteId(site._id, page);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      if (site?._id) {
        setCurrentPage(1);
        fetchAssetsBySiteId(site._id, 1, value, sortBy, sortOrder);
      }
    }, 400);
  };

  const handleSortChange = (field: string) => {
    const newOrder: SortOrder =
      sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);
    if (site?._id) {
      setCurrentPage(1);
      fetchAssetsBySiteId(site._id, 1, searchQuery, field, newOrder);
    }
  };

  useEffect(() => {
    if (site?._id) {
      fetchAssetsBySiteId(site._id);
    }
  }, [site]);

  const toggleCreateAsset = () => {
    setShowCreateAsset((prevState) => !prevState);
  };

  const closeToggle = () => {
    toggleCreateAsset();
    setAsset(undefined);
  };

  const refetchAssets = () => {
    if (site?._id) {
      fetchAssetsBySiteId(site?._id);
      setCurrentPage(1);
    }
  };

  const handleEditPress = (id: string) => {
    const selectedAsset = assets.find((item) => item._id === id);
    if (!selectedAsset) {
      return;
    }
    setAsset(selectedAsset);
    toggleCreateAsset();
  };

  const handleUpdateAsset = async (id: string, data: Asset) => {
    try {
      // Create FormData
      const formData = new FormData();
      const fields = {
        assetId: data.assetId,
        assetName: data.assetName,
        category: data.category,
        subCategory: data.subCategory,
        serialNumber: data.serialNumber,
        make: data.make,
        modelName: data.modelName,
        equipmentName: data.equipmentName,
        location: data.location,
        siteId: data.siteId,
        comment: data.comment,
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append("images", JSON.stringify(data.images ?? []));

      files.forEach((file) => formData.append("files", file));
      const resp = (await assetService.updateAsset(id, formData)) as {
        data: unknown;
      };

      if (resp.data) {
        toast.success("Asset Updated Successfully");
        setFiles([]);
      } else {
        toast.error("Something went wrong while updating the Asset");
      }
    } catch (err) {
      toast.error(`Something went wrong while updating the Asset: ${err}`);
    } finally {
      closeToggle();
      if (site?._id) {
        fetchAssetsBySiteId(site?._id, currentPage);
      }
    }
  };

  const handleDeletePress = (id: string) => {
    setDeleteId(id);
  };

  const deleteAsset = async (assetId: string) => {
    await assetService.deleteAsset(assetId);
    setDeleteId("");
    toast.success("Asset deleted successfully");
    if (site?._id) {
      fetchAssetsBySiteId(site._id);
    }
  };

  const toggleUploadAsset = () => {
    setShowUploadAssets((prevState) => !prevState);
  };

  const toggleDeleteAllAssets = () => {
    setConfirmDeleteAllAssets((prev) => !prev);
  };

  const handleCancelDeleteAll = () => {
    setConfirmDeleteAllAssets(false);
    setSelectedAssets(new Set());
  };

  const handleConfirmDeleteAll = () => {
    try {
      assetService.deleteBulkAsset({ ids: Array.from(selectedAssets) });
      toast.success("All selected assets deleted!");
      setSelectedAssets(new Set());
      setConfirmDeleteAllAssets(false);
      refetchAssets();
    } catch (err) {
      toast.error(`something went wrong! ${err}`);
    }
  };

  return (
    <div className="flex h-screen overflow-y-scroll">
      {showCreateAsset ? (
        <CreateAssetModal
          files={files}
          setFiles={setFiles}
          toggleModal={closeToggle}
          refetchAssets={refetchAssets}
          editData={asset}
          updateAsset={handleUpdateAsset}
        />
      ) : null}
      {showUploadAssets ? (
        <UploadAssetModal
          toggleModal={toggleUploadAsset}
          refetchAssets={refetchAssets}
        />
      ) : null}
      {deleteId && (
        <DeleteConfirmationScreen
          heading="Delete Asset"
          description="Are you sure you want to delete the asset? This action is irreversible."
          handleCancel={() => setDeleteId("")}
          handleContinue={() => deleteAsset(deleteId)}
        />
      )}
      {confirmDeleteAllAssets && (
        <DeleteConfirmationScreen
          heading="Delete all selected asset(s)"
          description="Are you sure you want to delete all selected asset? This action is irreversible."
          handleCancel={handleCancelDeleteAll}
          handleContinue={handleConfirmDeleteAll}
        />
      )}
      {isAssetsLoading ? (
        <ScreenLoader
          heading="Loading"
          description="Assets are loading, please wait"
        />
      ) : null}
      {/* sidebar */}
      <div className="min-h-screen w-xs overflow-scroll bg-primary">
        <div className="my-5 flex w-full justify-center pt-10">
          <Image
            src="/assets/images/glenart-logo.png"
            alt="Glenart Group Logo"
            width={160}
            height={160}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-1">
          <div className="flex text-2xl text-white">
            Client:
            {client?.name}
          </div>
          <div className="flex text-2xl text-white">
            Site:
            {site?.name}
          </div>
          <div className="my-3 w-full gap-y-2">
            <SideBarNavigation currentPath="assets-management" />
          </div>
        </div>
      </div>

      <div className="w-[calc(100vw-320px)] p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              Assets
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalAssets} asset
              {totalAssets !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="flex gap-x-2">
            {selectedAssets?.size ? (
              <AppButton
                title="Delete Asset(s)"
                onClick={toggleDeleteAllAssets}
                variant="danger"
              />
            ) : null}
            <AppButton
              title="Upload CSV/XLSX"
              onClick={toggleUploadAsset}
              variant="secondary"
            />
            <AppButton
              title="Create Asset"
              onClick={toggleCreateAsset}
              variant="secondary"
            />
          </div>
        </div>

        {/* Search & Sort Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm min-w-[200px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search assets..."
              className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Sort by:</span>
            {SORT_FIELDS.map((field) => (
              <button
                key={field.value}
                onClick={() => handleSortChange(field.value)}
                className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  sortBy === field.value
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary"
                }`}
              >
                {field.label}
                {sortBy === field.value ? (
                  sortOrder === "asc" ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )
                ) : (
                  <ChevronsUpDown className="h-3 w-3 opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>

        <DynamicTable
          selectedIds={selectedAssets}
          currentPage={currentPage}
          totalPage={totalPages}
          changePage={handlePageChange}
          handleEditPress={handleEditPress}
          handleDeletePress={handleDeletePress}
          totalCount={totalAssets}
          setSelectedIds={setSelectedAssets}
          columns={AssetTableHeaders}
          data={assets as unknown as { [key: string]: string }[]}
        />
      </div>
    </div>
  );
}

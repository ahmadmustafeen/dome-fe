"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Asset } from "@/components";
import {
  AppButton,
  CreateAssetModal,
  DeleteConfirmationScreen,
  ScreenLoader,
} from "@/components";
import DynamicTable from "@/components/table/DynamicTable";
import { AssetTableHeaders } from "@/constants/data";
import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";

export default function InvalidAssetsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [asset, setAsset] = useState<Asset | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [confirmDeleteAllAssets, setConfirmDeleteAllAssets] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [totalAssets, setTotalAssets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { site } = useAppContext();
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState(new Set<string>());

  const fetchInvalidAssetsBySiteId = async (id: string, page?: number) => {
    try {
      setIsAssetsLoading(true);
      const response = (await assetService.getAllInvalidAssetsBySiteId(
        id,
        { page },
      )) as {
        data: {
          assets: Asset[];
          totalPages: number;
          page: number;
          total: number;
        };
      };
      if (!response?.data) {
        toast.error(
          "Something went wrong while fetching assets, refresh the page.",
        );
        return;
      }
      setAssets(response.data.assets);
      setTotalPages(response.data.totalPages);
      setTotalAssets(response.data.total);
    } finally {
      setIsAssetsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (site?._id) {
      setCurrentPage(page);
      fetchInvalidAssetsBySiteId(site._id, page);
    }
  };

  useEffect(() => {
    if (site?._id) {
      fetchInvalidAssetsBySiteId(site._id);
    }
  }, [site]);

  const toggleCreateAsset = () => setShowCreateAsset((prev) => !prev);

  const closeToggle = () => {
    toggleCreateAsset();
    setAsset(undefined);
  };

  const refetchAssets = () => {
    if (site?._id) {
      fetchInvalidAssetsBySiteId(site._id);
      setCurrentPage(1);
    }
  };

  const handleEditPress = (id: string) => {
    const selected = assets.find((item) => item._id === id);
    if (!selected) {
      return;
    }
    setAsset(selected);
    toggleCreateAsset();
  };

  const handleUpdateAsset = async (id: string, data: Asset) => {
    try {
      const formData = new FormData();
      const fields: Record<string, string | undefined> = {
        assetId: data.assetId,
        assetName: data.assetName,
        category: data.category,
        subCategory: data.subCategory,
        serialNumber: data.serialNumber,
        equipmentName: data.equipmentName,
        make: data.make,
        modelName: data.modelName,
        location: data.location,
        siteId: data.siteId,
        comment: data.comment,
      };
      Object.entries(fields).forEach(([key, value]) => {
        if (value != null) {
          formData.append(key, value);
        }
      });
      formData.append("images", JSON.stringify(data.images ?? []));
      files.forEach((file) => formData.append("files", file));

      const resp = (await assetService.updateAsset(id, formData)) as {
        data: unknown;
      };
      if (resp.data) {
        toast.success("Asset Updated Successfully");
      } else {
        toast.error("Something went wrong while updating the Asset");
      }
    } catch {
      toast.error("Something went wrong while updating the Asset");
    } finally {
      closeToggle();
      if (site?._id) {
        fetchInvalidAssetsBySiteId(site._id, currentPage);
      }
    }
  };

  const handleDeletePress = (id: string) => setDeleteId(id);

  const deleteAsset = async (assetId: string) => {
    await assetService.deleteAsset(assetId);
    setDeleteId("");
    toast.success("Asset deleted successfully");
    if (site?._id) {
      fetchInvalidAssetsBySiteId(site._id);
    }
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
      toast.error(`Something went wrong! ${err}`);
    }
  };

  return (
    <div className="h-full">
      {showCreateAsset && (
        <CreateAssetModal
          files={files}
          setFiles={setFiles}
          toggleModal={closeToggle}
          refetchAssets={refetchAssets}
          editData={asset}
          updateAsset={handleUpdateAsset}
        />
      )}
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
          description="Are you sure you want to delete all selected assets? This action is irreversible."
          handleCancel={handleCancelDeleteAll}
          handleContinue={handleConfirmDeleteAll}
        />
      )}
      {isAssetsLoading && (
        <ScreenLoader
          heading="Loading"
          description="Assets are loading, please wait"
        />
      )}

      <div className="p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Invalid Assets
          </h1>
          {selectedAssets.size > 0 && (
            <AppButton
              title="Delete Asset(s)"
              onClick={() => setConfirmDeleteAllAssets(true)}
              variant="danger"
            />
          )}
        </div>

        <DynamicTable
          selectedIds={selectedAssets}
          currentPage={currentPage}
          totalPage={totalPages}
          changePage={handlePageChange}
          totalCount={totalAssets}
          handleDeletePress={handleDeletePress}
          handleEditPress={handleEditPress}
          setSelectedIds={setSelectedAssets}
          columns={AssetTableHeaders}
          data={assets as unknown as { [key: string]: string }[]}
        />
      </div>
    </div>
  );
}

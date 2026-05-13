"use client";
import type { RowSelectionState } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Asset } from "@/components";
import {
  AppButton,
  CreateAssetModal,
  DeleteConfirmationScreen,
  Pagination,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from "@/components";
import { DataTable } from "@/components/DataTable";
import { getAssetColumns } from "@/components/sections/asset/AssetTableColumns";
import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";

const PAGE_SIZE = 10;

export default function InvalidAssetsPage() {
  const t = useTranslations("InvalidAssets");
  const { site } = useAppContext();

  const [files, setFiles] = useState<File[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [asset, setAsset] = useState<Asset | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [deleteId, setDeleteId] = useState("");
  const [confirmDeleteAllAssets, setConfirmDeleteAllAssets] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedIds = useMemo(
    () =>
      Object.entries(rowSelection)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [rowSelection],
  );

  const fetchInvalidAssets = async (id: string, page?: number) => {
    try {
      setIsAssetsLoading(true);
      const response = (await assetService.getAllInvalidAssetsBySiteId(id, {
        page,
      })) as {
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
      setRowSelection({});
      fetchInvalidAssets(site._id, page);
    }
  };

  useEffect(() => {
    if (site?._id) {
      fetchInvalidAssets(site._id);
    }
  }, [site]);

  const toggleCreateAsset = () => setShowCreateAsset((prev) => !prev);

  const closeToggle = () => {
    toggleCreateAsset();
    setAsset(undefined);
  };

  const refetchAssets = () => {
    if (site?._id) {
      fetchInvalidAssets(site._id);
      setCurrentPage(1);
      setRowSelection({});
    }
  };

  const handleEditPress = useCallback((id: string) => {
    const selected = assets.find((item) => item._id === id);
    if (!selected) {
      return;
    }
    setAsset(selected);
    setShowCreateAsset(true);
  }, [assets]);

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
        description: data.description,
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
        fetchInvalidAssets(site._id, currentPage);
      }
    }
  };

  const deleteAsset = async (assetId: string) => {
    await assetService.deleteAsset(assetId);
    setDeleteId("");
    toast.success("Asset deleted successfully");
    if (site?._id) {
      fetchInvalidAssets(site._id);
    }
  };

  const handleConfirmDeleteAll = () => {
    try {
      assetService.deleteBulkAsset({ ids: selectedIds });
      toast.success("All selected assets deleted!");
      setRowSelection({});
      setConfirmDeleteAllAssets(false);
      refetchAssets();
    } catch (err) {
      toast.error(`Something went wrong! ${err}`);
    }
  };

  const columns = useMemo(
    () =>
      getAssetColumns({
        onEdit: handleEditPress,
        onDelete: (id) => setDeleteId(id),
        labels: {
          colAssetId: "Asset Id",
          colAssetName: "Asset Name",
          colCategory: "Category",
          colSubCategory: "Sub Category",
          colDescription: "Description",
          colEquipmentName: "Equipment Name",
          colMake: "Make",
          colModel: "Model",
          colLocation: "Location",
          colSerial: "Serial Number",
          colActions: "Actions",
          actionEdit: "Edit",
          actionDelete: "Delete",
        },
      }),
    [handleEditPress],
  );

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
          handleCancel={() => {
            setConfirmDeleteAllAssets(false);
            setRowSelection({});
          }}
          handleContinue={handleConfirmDeleteAll}
        />
      )}
      {isAssetsLoading && (
        <ScreenLoader
          heading={t("loader_heading")}
          description={t("loader_description")}
        />
      )}

      <SectionWrapper>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">Invalid Assets</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {totalAssets} {totalAssets !== 1 ? "assets" : "asset"} found
            </Typography>
          </div>
          {selectedIds.length > 0 && (
            <AppButton
              title="Delete Asset(s)"
              onClick={() => setConfirmDeleteAllAssets(true)}
              variant="danger"
            />
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
          <DataTable
            columns={columns}
            data={assets}
            getRowId={(row) => row._id}
            loading={isAssetsLoading}
            noDataMessage="No invalid assets found."
            rowSelection={rowSelection}
            onRowSelectionStateChange={setRowSelection}
            bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/5 transition-colors"
          />
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalCount={totalAssets}
          pageSize={PAGE_SIZE}
        />
      </SectionWrapper>
    </div>
  );
}

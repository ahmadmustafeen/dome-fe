'use client'
import { AppButton, Asset, CreateAssetModal, DeleteConfirmationScreen, ScreenLoader, SideBarNavigation, UploadAssetModal } from "@/components";
import DynamicTable from "@/components/table/DynamicTable";
import { AssetTableHeaders } from "@/constants/data";
import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AssetManagementPage() {
  const [files, setFiles] = useState<File[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [asset, setAsset] = useState<Asset | undefined>()
  const [totalPages, setTotalPages] = useState(0)
  const [totalAssets, setTotalAssets] = useState(0)
  const [deleteId, setDeleteId] = useState("")
  const [confirmDeleteAllAssets, setConfirmDeleteAllAssets] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { site, client } = useAppContext()
  const [showCreateAsset, setShowCreateAsset] = useState(false)
  const [showUploadAssets, setShowUploadAssets] = useState(false)
  const [isAssetsLoading, setIsAssetsLoading] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState(new Set<string>());

  const fetchAssetsBySiteId = async (id: string, page?: number) => {
    try {
      setIsAssetsLoading(true);
      const assets = await assetService.getAllAssetsBySiteId(id, page) as {
        data: {
          assets: Asset[],
          totalPages: number,
          total: number
          page: number
        }
      };
      if (!assets || !assets?.data) {
        toast.error("Something went wrong while fetching assets, refresh the page.")
        return
      }
      setAssets(assets.data.assets as Asset[])
      setTotalPages(assets.data.totalPages)
      setTotalAssets(assets.data.total)

    } finally {
      setIsAssetsLoading(false);

    }
  }

  const handlePageChange = (page: number) => {
    if (site?._id) {
      setCurrentPage(page)
      fetchAssetsBySiteId(site._id, page)
    }
  }

  useEffect(() => {
    if (site?._id) {
      fetchAssetsBySiteId(site._id)
    }
  }, [site])

  const toggleCreateAsset = () => {
    setShowCreateAsset(prevState => !prevState)
  }

  const closeToggle = () => {
    toggleCreateAsset()
    setAsset(undefined)
  }

  const refetchAssets = () => {
    if (site?._id) {
      fetchAssetsBySiteId(site?._id)
      setCurrentPage(1)
    }
  }

  const handleEditPress = (id: string) => {
    const selectedAsset = assets.find(item => item._id === id)
    if (!selectedAsset) return;
    setAsset(selectedAsset)
    toggleCreateAsset()
  }

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
        location: data.location,
        siteId: data.siteId,
        comment: data.comment,
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append("images", JSON.stringify(data.images ?? []))

      files.forEach(file => formData.append("files", file));
      const resp = await assetService.updateAsset(id, formData) as { data: unknown };

      if (resp.data) {
        toast.success("Asset Updated Successfully");
        setFiles([]);
      } else {
        toast.error("Something went wrong while updating the Asset");
      }
    } catch (err) {
      toast.error("Something went wrong while updating the Asset");
    } finally {
      closeToggle();
      if (site?._id) {
        fetchAssetsBySiteId(site?._id, currentPage);
      }
    }
  };

  const handleDeletePress = (id: string) => {
    setDeleteId(id)
  }

  const deleteAsset = async (assetId: string) => {
    await assetService.deleteAsset(assetId);
    setDeleteId("")
    toast.success('Asset deleted successfully');
    fetchAssetsBySiteId(site?._id!);
  };

  const toggleUploadAsset = () => {
    setShowUploadAssets(prevState => !prevState)
  }

  const toggleDeleteAllAssets = () => {
    setConfirmDeleteAllAssets(prev => !prev)
  }

  const handleCancelDeleteAll = () => {
    setConfirmDeleteAllAssets(false);
    setSelectedAssets(new Set())
  }

  const handleConfirmDeleteAll = () => {
    try {
      assetService.deleteBulkAsset({ ids: Array.from(selectedAssets) });
      toast.success("All selected assets deleted!");
      setSelectedAssets(new Set())
      setConfirmDeleteAllAssets(false)
      refetchAssets()
    } catch (err) {
      toast.error("something went wrong!")
    }
    finally {
    }
  }


  return <div className="flex h-screen overflow-y-scroll">
    {showCreateAsset ? <CreateAssetModal
      files={files}
      setFiles={setFiles}
      toggleModal={closeToggle} refetchAssets={refetchAssets}
      editData={asset}
      updateAsset={handleUpdateAsset}

    /> : null}
    {showUploadAssets ? <UploadAssetModal toggleModal={toggleUploadAsset} refetchAssets={refetchAssets} /> : null}
    {deleteId &&
      <DeleteConfirmationScreen
        heading="Delete Asset"
        description='Are you sure you want to delete the asset? This action is irreversible.'
        handleCancel={() => setDeleteId("")}
        handleContinue={() => deleteAsset(deleteId)}
      />
    }
    {confirmDeleteAllAssets &&
      <DeleteConfirmationScreen
        heading="Delete all selected asset(s)"
        description='Are you sure you want to delete all selected asset? This action is irreversible.'
        handleCancel={handleCancelDeleteAll}
        handleContinue={handleConfirmDeleteAll}
      />
    }
    {isAssetsLoading ? <ScreenLoader
      heading="Loading"
      description='Assets are loading, please wait'
    /> : null}
    {/* sidebar */}
    <div className='bg-primary w-xs min-h-screen overflow-scroll'>
      <div className='w-full justify-center flex pt-10 my-5'>
        <Image
          src={'/assets/images/glenart-logo.png'}
          alt='Glenart Group Logo'
          width={160}
          height={160}
        />
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-y-1">
        <div className="flex text-white text-2xl">
          Client: {client?.name}
        </div>
        <div className="flex text-white text-2xl">
          Site: {site?.name}
        </div>
        <div className="my-3 w-full gap-y-2">
          <SideBarNavigation currentPath="assets-management" />
        </div>
      </div>
    </div>

    <div className='p-8 w-[calc(100vw-320px)]'>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Assets
          </h1>
        </div>
        <div className="flex gap-x-2">
          {selectedAssets?.size ? <AppButton title="Delete Asset(s)" onClick={toggleDeleteAllAssets} variant="danger" /> : null}
          <AppButton title="Upload CSV/XLSX" onClick={toggleUploadAsset} variant="secondary" />
          <AppButton title="Create Asset" onClick={toggleCreateAsset} variant="secondary" />
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
        data={assets as unknown as { [key: string]: string; }[]}
      />
    </div>
  </div>
}

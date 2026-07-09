'use client';
import type { RowSelectionState } from '@tanstack/react-table';
import type { Asset } from '@/components';
import type { SortOrder } from '@/types/asset';
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Download,
  Search,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  AppButton,
  CreateAssetModal,
  DeleteConfirmationScreen,
  Pagination,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from '@/components';
import { DataTable } from '@/components/DataTable';
import { getAssetColumns } from '@/components/sections/asset/AssetTableColumns';
import {
  ASSET_DEFAULT_SORT_BY,
  ASSET_DEFAULT_SORT_ORDER,
  ASSET_SORT_FIELDS,
} from '@/constants/assets';
import { useAppContext } from '@/context/AppContext';
import { assetService } from '@/services/asset-service';

const PAGE_SIZE = 10;

export default function InvalidAssetsPage() {
  const t = useTranslations('InvalidAssets');
  const { site } = useAppContext();

  const [files, setFiles] = useState<File[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [asset, setAsset] = useState<Asset | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [deleteId, setDeleteId] = useState('');
  const [confirmDeleteAllAssets, setConfirmDeleteAllAssets] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [isDownloadingAssets, setIsDownloadingAssets] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(ASSET_DEFAULT_SORT_BY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    ASSET_DEFAULT_SORT_ORDER,
  );
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedIds = useMemo(
    () =>
      Object.entries(rowSelection)
        .filter(([, v]) => v)
        .map(([k]) => k),
    [rowSelection],
  );

  const fetchInvalidAssets = useCallback(
    async (
      id: string,
      page?: number,
      search?: string,
      sort?: string,
      order?: SortOrder,
    ) => {
      try {
        setIsAssetsLoading(true);
        const response = (await assetService.getAllInvalidAssetsBySiteId(id, {
          page: page ?? 1,
          search: (search ?? searchQuery) || undefined,
          sortBy: sort ?? sortBy,
          sortOrder: order ?? sortOrder,
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
            'Something went wrong while fetching assets, refresh the page.',
          );
          return;
        }
        setAssets(response.data.assets);
        setTotalPages(response.data.totalPages);
        setTotalAssets(response.data.total);
      } finally {
        setIsAssetsLoading(false);
      }
    },
    [searchQuery, sortBy, sortOrder],
  );

  const handlePageChange = (page: number) => {
    if (site?._id) {
      setCurrentPage(page);
      setRowSelection({});
      fetchInvalidAssets(site._id, page);
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
        setRowSelection({});
        fetchInvalidAssets(site._id, 1, value, sortBy, sortOrder);
      }
    }, 400);
  };

  const handleSortChange = (field: string) => {
    const newOrder: SortOrder
      = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
    if (site?._id) {
      setCurrentPage(1);
      setRowSelection({});
      fetchInvalidAssets(site._id, 1, searchQuery, field, newOrder);
    }
  };

  useEffect(() => {
    if (site?._id) {
      fetchInvalidAssets(site._id);
    }
  }, [site]);

  const toggleCreateAsset = () => setShowCreateAsset(prev => !prev);

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
    const selected = assets.find(item => item._id === id);
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
      formData.append('images', JSON.stringify(data.images ?? []));
      files.forEach(file => formData.append('files', file));

      const resp = (await assetService.updateAsset(id, formData)) as {
        data: unknown;
      };
      if (resp.data) {
        toast.success('Asset Updated Successfully');
      } else {
        toast.error('Something went wrong while updating the Asset');
      }
    } catch {
      toast.error('Something went wrong while updating the Asset');
    } finally {
      closeToggle();
      if (site?._id) {
        fetchInvalidAssets(site._id, currentPage);
      }
    }
  };

  const deleteAsset = async (assetId: string) => {
    await assetService.deleteAsset(assetId);
    setDeleteId('');
    toast.success('Asset deleted successfully');
    if (site?._id) {
      fetchInvalidAssets(site._id);
    }
  };

  const handleConfirmDeleteAll = () => {
    try {
      assetService.deleteBulkAsset({ ids: selectedIds });
      toast.success('All selected assets deleted!');
      setRowSelection({});
      setConfirmDeleteAllAssets(false);
      refetchAssets();
    } catch (err) {
      toast.error(`Something went wrong! ${err}`);
    }
  };

  const handleDownloadInvalidAssets = async () => {
    if (!site?._id) {
      toast.error('Something went wrong while fetching assets, refresh the page.');
      return;
    }

    try {
      setIsDownloadingAssets(true);
      const blob = await assetService.downloadInvalidAssetsBySiteId(site._id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invalid-assets.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Something went wrong while fetching assets, refresh the page.',
      );
    } finally {
      setIsDownloadingAssets(false);
    }
  };

  const columns = useMemo(
    () =>
      getAssetColumns({
        onEdit: handleEditPress,
        onDelete: id => setDeleteId(id),
        labels: {
          colAssetId: 'Asset Id',
          colAssetName: 'Asset Name',
          colCategory: 'Category',
          colSubCategory: 'Sub Category',
          colDescription: 'Description',
          colEquipmentName: 'Equipment Name',
          colMake: 'Make',
          colModel: 'Model',
          colLocation: 'Location',
          colSerial: 'Serial Number',
          colActions: 'Actions',
          actionEdit: 'Edit',
          actionDelete: 'Delete',
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
          handleCancel={() => setDeleteId('')}
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
          heading={t('loader_heading')}
          description={t('loader_description')}
        />
      )}

      <SectionWrapper>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">Invalid Assets</Typography>
            <Typography variant="p" className="mt-1 text-gray-500">
              {totalAssets}
              {' '}
              {totalAssets !== 1 ? 'assets' : 'asset'}
              {' '}
              found
            </Typography>
          </div>
          <div className="flex gap-x-2">
            {selectedIds.length > 0 && (
              <AppButton
                title="Delete Asset(s)"
                onClick={() => setConfirmDeleteAllAssets(true)}
                variant="danger"
              />
            )}
            <AppButton
              title="Download CSV"
              icon={<Download className="h-4 w-4" />}
              onClick={handleDownloadInvalidAssets}
              variant="secondary"
              disabled={!site?._id || isDownloadingAssets}
              isLoading={isDownloadingAssets}
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
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search assets..."
              className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Typography variant="label" className="text-gray-500">
              Sort by:
            </Typography>
            {ASSET_SORT_FIELDS.map(field => (
              <button
                key={field.value}
                onClick={() => handleSortChange(field.value)}
                className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  sortBy === field.value
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {field.label}
                {sortBy === field.value
                  ? (
                      sortOrder === 'asc'
                        ? (
                            <ChevronUp className="h-3 w-3" />
                          )
                        : (
                            <ChevronDown className="h-3 w-3" />
                          )
                    )
                  : (
                      <ChevronsUpDown className="h-3 w-3 opacity-50" />
                    )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
          <DataTable
            columns={columns}
            data={assets}
            getRowId={row => row._id}
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

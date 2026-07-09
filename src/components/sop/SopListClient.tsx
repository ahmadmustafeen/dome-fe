'use client';

import type { ChangeEvent } from 'react';
import type { MOPStatus } from '@/types/mop';
import type { SopListSummaryRow } from '@/types/sop-api';
import { Eye, FileText, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppButton, Pagination, Typography } from '@/components/common';
import { ProcedureDocumentsListLayout } from '@/components/dashboard-procedure/ProcedureDocumentsListLayout';
import { mopDocumentStatusToFormLabel } from '@/components/mop/mop-document-status';
import { MopStatusBadge } from '@/components/mop/MopStatusBadge';
import { DASHBOARD_ROUTES, sopEditRoute } from '@/constants/routes';
import { useAppContext } from '@/context/AppContext';
import { getSOPList } from '@/services/sop-service';

const SOP_STATUS_FILTER_OPTIONS: { label: string; value: MOPStatus }[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Ready to Deliver', value: 'ready_to_deliver' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Revision Needed', value: 'revision_needed' },
];

const SOP_TABLE_COLUMNS = [
  'SOP Title',
  'Asset',
  'Version',
  'Status',
  'Last Modified',
  'Actions',
] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

type SopTableRowProps = {
  row: SopListSummaryRow;
  onView: (sopId: string) => void;
};

const SopTableRow = ({ row, onView }: SopTableRowProps) => {
  const handleView = useCallback(() => {
    onView(row.sopId);
  }, [onView, row.sopId]);

  return (
    <tr className="cursor-pointer bg-white transition-colors hover:bg-slate-50">
      <td className="px-4 py-3">
        <Typography variant="span" className="font-medium text-gray-900">
          {row.title !== '' ? row.title : '-'}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {row.assetName !== '' ? row.assetName : '-'}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <Typography variant="span" className="text-gray-600">
          {`v${row.versionNumber}`}
        </Typography>
      </td>
      <td className="px-4 py-3">
        <MopStatusBadge status={mopDocumentStatusToFormLabel(row.status)} />
      </td>
      <td className="px-4 py-3">
        <Typography variant="caption" className="text-gray-600">
          {row.lastModified !== '' ? formatDate(row.lastModified) : '-'}
        </Typography>
      </td>
      <td className="px-4 py-3 text-right">
        <AppButton
          variant="ghost"
          icon={<Eye className="h-4 w-4" />}
          title="View"
          onClick={handleView}
          className="inline-flex"
        />
      </td>
    </tr>
  );
};

export const SopListClient = () => {
  const router = useRouter();
  const { site } = useAppContext();
  const [sops, setSops] = useState<SopListSummaryRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MOPStatus | ''>('');
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const siteId = site?._id;

  const fetchSops = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getSOPList({
        siteId,
        search: debouncedSearch,
        filters: statusFilter !== '' ? { status: statusFilter } : undefined,
        pageNumber,
        pageSize,
      });
      setSops(result.rows);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to load SOPs.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, pageNumber, pageSize, siteId, statusFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPageNumber(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data is loaded asynchronously from the SOP API when list query params change.
    void fetchSops();
  }, [fetchSops]);

  const handleStatusFilterChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(event.target.value as MOPStatus | '');
      setPageNumber(1);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setStatusFilter('');
    setPageNumber(1);
  }, []);

  const goCreate = useCallback(() => {
    router.push(DASHBOARD_ROUTES.SOP_MANAGEMENT_CREATE);
  }, [router]);

  const handleView = useCallback(
    (sopId: string) => {
      router.push(sopEditRoute(sopId));
    },
    [router],
  );

  const toolbar = (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search SOPs..."
          className="h-10 w-full rounded-md border border-slate-300 bg-white pr-3 pl-9 text-sm text-gray-900 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <select
        value={statusFilter}
        onChange={handleStatusFilterChange}
        className="h-10 min-w-[180px] rounded-md border border-slate-300 bg-white px-3 text-sm text-gray-700 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        {SOP_STATUS_FILTER_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {(search.trim() !== '' || statusFilter !== '') && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );

  const table = (
    <>
      <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left uppercase">
            <tr>
              {SOP_TABLE_COLUMNS.map(col => (
                <th
                  key={col}
                  className={`px-4 py-3 ${col === 'Actions' ? 'text-right' : ''}`}
                >
                  <Typography variant="h6" className="text-gray-500">
                    {col}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sops.map(row => (
              <SopTableRow key={row.sopId} row={row} onView={handleView} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </>
  );

  return (
    <ProcedureDocumentsListLayout
      title="SOP Management"
      entitySingular="SOP"
      entityPlural="SOPs"
      totalCount={totalCount}
      isLoading={isLoading}
      createButtonTitle="Create SOP"
      onCreate={goCreate}
      emptyHeading="No SOPs yet"
      emptyDescription="Create a Standard Operating Procedure to see it listed here."
      emptyIcon={<FileText className="h-9 w-9" />}
      toolbar={toolbar}
      table={table}
    />
  );
};

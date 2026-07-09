'use client';
import type { Row } from '@tanstack/react-table';
import type { SortOrder } from '@/types/asset';
import type {
  ProcedureEstimationData,
  ProcedureEstimationRow,
  ProcedureItem,
  ProcedureKind,
} from '@/types/procedure-estimation';
import {
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  AppButton,
  EmptyState,
  ScreenLoader,
  SectionWrapper,
  Typography,
} from '@/components/common';
import { DataTable } from '@/components/DataTable';
import { getProcedureEstimationColumns } from '@/components/sections/procedure-estimation/ProcedureEstimationTableColumns';
import { RequirementSection } from '@/components/sections/procedure-estimation/RequirementSection';
import {
  procedureEstimationCategoryRoute,
  procedureEstimationGenerateProcedureRoute,
} from '@/constants/routes';
import { useAppContext } from '@/context/AppContext';
import { procedureEstimationService } from '@/services/procedure-estimation-service';

const PROCEDURE_ESTIMATION_SORT_FIELDS = [
  { label: 'Category', value: 'category' },
  { label: 'Sub Category', value: 'subCategory' },
  { label: 'Make', value: 'make' },
  { label: 'Assets', value: 'count' },
  { label: 'MOPs', value: 'totalMOPs' },
  { label: 'EOPs', value: 'totalEOPs' },
  { label: 'SOPs', value: 'totalSOPs' },
] as const;

type ProcedureEstimationSortField
  = typeof PROCEDURE_ESTIMATION_SORT_FIELDS[number]['value'];

const PROCEDURE_ESTIMATION_DEFAULT_SORT_BY: ProcedureEstimationSortField = 'category';
const PROCEDURE_ESTIMATION_DEFAULT_SORT_ORDER: SortOrder = 'asc';

export default function ProcedureEstimationPage() {
  const { site, client } = useAppContext();
  const router = useRouter();

  const [isGenerator, setIsGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [procedureEstimationData, setProcedureEstimationData] = useState<ProcedureEstimationRow[]>([]);
  const [schedule, setSchedule] = useState<ProcedureEstimationData | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<ProcedureEstimationSortField>(
    PROCEDURE_ESTIMATION_DEFAULT_SORT_BY,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    PROCEDURE_ESTIMATION_DEFAULT_SORT_ORDER,
  );
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = useTranslations('ProcedureEstimation');

  const visibleProcedureEstimationRows = useMemo(() => {
    const normalizedSearch = debouncedSearchQuery.trim().toLowerCase();
    const rows = normalizedSearch
      ? procedureEstimationData.filter((row: ProcedureEstimationRow) => {
          const searchableText = [
            row.category,
            row.subCategory,
            row.description,
            row.make,
          ].join(' ').toLowerCase();

          return searchableText.includes(normalizedSearch);
        })
      : procedureEstimationData;

    return [...rows].sort((a: ProcedureEstimationRow, b: ProcedureEstimationRow) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const direction = sortOrder === 'asc' ? 1 : -1;
      return String(aValue ?? '').localeCompare(String(bValue ?? '')) * direction;
    });
  }, [debouncedSearchQuery, procedureEstimationData, sortBy, sortOrder]);

  const fetchProcedureEstimation = useCallback(async (siteId: string) => {
    setIsLoading(true);
    try {
      const response
        = await procedureEstimationService.getProcedureEstimationBySiteId(siteId);

      setProcedureEstimationData(response.data);
      setSchedule({
        generatedAt: new Date().toDateString(),
        rows: response.data,
      });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Failed to load procedure estimation.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (client?._id && site?._id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- data is loaded asynchronously when the selected site changes.
      fetchProcedureEstimation(site._id);
    }
  }, [client, site]);

  const handleViewDetails = useCallback(
    (categoryId: string) => {
      router.push(procedureEstimationCategoryRoute(categoryId));
    },
    [router],
  );

  const handleProcedureGenerate = useCallback(
    (item: ProcedureItem, kind: ProcedureKind, categoryId: string) => {
      router.push(
        procedureEstimationGenerateProcedureRoute(kind, {
          categoryId,
          procedureId: item.title,
        }),
      );
    },
    [router],
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value);
    }, 400);
  };

  const handleSortChange = (field: ProcedureEstimationSortField) => {
    const newOrder: SortOrder
      = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
  };

  const columns = useMemo(
    () =>
      getProcedureEstimationColumns({
        onViewDetails: handleViewDetails,
        labels: {
          colCategory: t('col_category'),
          colSubCategory: t('col_subCategory'),
          colDescription: 'Description',
          colCount: t('col_assets'),
          colMake: 'Make',
          colTotalMops: t('col_total_mops'),
          colTotalEops: t('col_total_eops'),
          colTotalSops: t('col_total_sops'),
          colDetails: t('col_details'),
          colViewDetails: t('col_view_details'),
          btnShowDetails: t('btn_show_details'),
          btnHideDetails: t('btn_hide_details'),
          btnViewDetails: t('btn_view_details'),
        },
      }),
    [t, handleViewDetails],
  );

  const renderSubRow = useCallback(
    (row: Row<ProcedureEstimationRow>) => (
      <div className="grid grid-cols-3 gap-4">
        <RequirementSection
          label={t('details_mops')}
          items={row.original.MOPs}
          colorClass="border-blue-200"
          noIcon
          onGenerate={(item) => {
            handleProcedureGenerate(item, 'mop', row.original.id);
          }}
        />
        <RequirementSection
          label={t('details_eops')}
          items={row.original.EOPs}
          colorClass="border-red-200"
          noIcon
          onGenerate={(item) => {
            handleProcedureGenerate(item, 'eop', row.original.id);
          }}
        />
        <RequirementSection
          label={t('details_sops')}
          items={row.original.SOPs}
          noIcon
          colorClass="border-green-200"
          onGenerate={(item) => {
            handleProcedureGenerate(item, 'sop', row.original.id);
          }}
        />
      </div>
    ),
    [t, handleProcedureGenerate],
  );

  if (!site?._id) {
    return (
      <div className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <Typography variant="caption" className="text-gray-400">
          Select a site to view the procedure estimation.
        </Typography>
      </div>
    );
  }

  const handleRegenerate = () => {
    if (!site?._id) {
      return;
    }

    setIsGenerator(true);
    setProcedureEstimationData([]);

    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/maintenance-schedule/generateByStream/${site?._id}`,
    );

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.type === 'chunk') {
          const newItem = parsed.data;

          setProcedureEstimationData(prev => [...prev, newItem]);
        }

        if (parsed.type === 'done') {
          toast.success('Procedure estimation generated successfully');
          es.close();
          setIsGenerator(false);
        }

        if (parsed.type === 'error') {
          toast.error(parsed.message || 'Something went wrong');
          es.close();
          setIsGenerator(false);
        }
      } catch (err) {
        console.error('Stream parse error:', err);
      }
    };

    es.onerror = () => {
      toast.error('Streaming connection failed');
      es.close();
      setIsGenerator(false);
    };
  };

  const handleClear = async () => {
    try {
      setIsLoading(true);
      await procedureEstimationService.clearProcedureEstimationBySiteId(
        site._id,
      );
      toast.success('All previous procedure estimation data deleted successfully');
      fetchProcedureEstimation(site._id);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenLoader
        heading="Fetching Procedure Estimation"
        description="Please wait while we fetch the procedure estimation"
      />
    );
  }

  return (
    <div className="h-full">
      {isGenerator
        ? (
            <ScreenLoader
              heading={t('loader_heading')}
              description={t('loader_description')}
            />
          )
        : null}

      <SectionWrapper>
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography variant="h1">{t('title')}</Typography>
          </div>
          {!schedule?.rows?.length
            ? (
                <AppButton
                  title={t('btn_generate')}
                  onClick={handleRegenerate}
                  variant="secondary"
                  icon={<CalendarDays className="h-4 w-4" />}
                />
              )
            : (
                <div className="flex items-center gap-2">
                  <AppButton
                    title={t('btn_regenerate')}
                    onClick={handleRegenerate}
                    variant="default"
                    icon={<RefreshCw className="h-4 w-4" />}
                  />
                  <AppButton
                    title={t('btn_clear')}
                    onClick={handleClear}
                    variant="danger"
                    icon={<Trash2 className="h-4 w-4" />}
                  />
                </div>
              )}
        </div>

        {!procedureEstimationData?.length
          ? (
              <EmptyState
                icon={<CalendarDays className="h-10 w-10" />}
                heading={t('empty_heading')}
                description={t('empty_description')}
              />
            )
          : (
              <>
                <div className="mb-4">
                  <div className="relative max-w-sm min-w-55">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        handleSearchChange(e.target.value);
                      }}
                      placeholder={t('search_placeholder')}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-8 pl-9 text-sm focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          handleSearchChange('');
                        }}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Typography variant="label" className="text-gray-500">
                      Sort by:
                    </Typography>
                    {PROCEDURE_ESTIMATION_SORT_FIELDS.map(field => (
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
                                ? <ChevronUp className="h-3 w-3" />
                                : <ChevronDown className="h-3 w-3" />
                            )
                          : (
                              <ChevronsUpDown className="h-3 w-3 opacity-50" />
                            )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-800 shadow-xl shadow-black/20">
                  <DataTable
                    columns={columns}
                    data={visibleProcedureEstimationRows}
                    getRowId={row => row.id}
                    noDataMessage="No categories match your search."
                    renderSubRow={renderSubRow}
                    bodyRowClassName="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-primary/5 transition-colors"
                    bodyCellClassName="py-3 text-sm"
                    headerCellClassName="text-center first:text-left"
                  />
                </div>
              </>
            )}
      </SectionWrapper>
    </div>
  );
}

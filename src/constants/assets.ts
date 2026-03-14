import type { SortField, SortOrder } from '@/types/asset';

export const ASSET_SORT_FIELDS: SortField[] = [
  { label: 'Asset ID', value: 'assetId' },
  { label: 'Asset Name', value: 'assetName' },
  { label: 'Category', value: 'category' },
  { label: 'Sub Category', value: 'subCategory' },
  { label: 'Make', value: 'make' },
  { label: 'Model', value: 'modelName' },
  { label: 'Date Added', value: 'createdAt' },
];

export const ASSET_DEFAULT_SORT_BY = 'createdAt';
export const ASSET_DEFAULT_SORT_ORDER: SortOrder = 'desc';

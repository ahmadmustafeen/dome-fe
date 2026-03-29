import { MOCK_CATEGORY_ASSETS } from "@/constants/maintenance-schedule-assets";
import type {
  CategoryAsset,
  MaintenanceRow,
  ProcedureItem,
} from "@/types/maintenance-schedule";

const cloneProcedureItems = (items: ProcedureItem[]): ProcedureItem[] =>
  items.map((item) => ({ ...item }));

const cloneAsset = (asset: CategoryAsset): CategoryAsset => ({
  ...asset,
  mops: cloneProcedureItems(asset.mops),
  eops: cloneProcedureItems(asset.eops),
  sops: cloneProcedureItems(asset.sops),
});

const syntheticAsset = (row: MaintenanceRow, index: number): CategoryAsset => {
  const n = index + 1;
  const padded = String(n).padStart(3, "0");
  return {
    id: `syn-${row.id}-${n}`,
    assetId: `AST-${row.id}-${padded}`,
    assetName: `${row.category} ${n}`,
    location: "—",
    serialNumber: `SN-${row.id}-${n}`,
    mops: [],
    eops: [],
    sops: [],
  };
};

/**
 * Returns exactly `row.assetCount` assets for the category, cloning or
 * synthesizing rows so the detail table matches the schedule summary.
 */
export const buildCategoryAssetsForRow = (
  row: MaintenanceRow,
): CategoryAsset[] => {
  const n = row.assetCount;
  if (n <= 0) {
    return [];
  }

  const base = MOCK_CATEGORY_ASSETS[row.id] ?? [];
  if (base.length === 0) {
    return Array.from({ length: n }, (_, i) => syntheticAsset(row, i));
  }

  const templateForExtras = base[base.length - 1];
  if (!templateForExtras) {
    return [];
  }

  const out: CategoryAsset[] = [];
  for (let i = 0; i < n; i++) {
    const fromBase = base[i];
    if (fromBase !== undefined) {
      out.push(cloneAsset(fromBase));
    } else {
      const suffix = i + 1;
      out.push({
        ...cloneAsset(templateForExtras),
        id: `a${row.id}-${suffix}`,
        assetId: `AST-${row.id}-${String(suffix).padStart(3, "0")}`,
        assetName: `${row.category} Unit ${suffix}`,
        location:
          templateForExtras.location === "—"
            ? "—"
            : `${templateForExtras.location} (Unit ${suffix})`,
        serialNumber: `SN-${row.id}-${suffix}`,
      });
    }
  }
  return out;
};

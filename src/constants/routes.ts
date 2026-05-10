import type { ProcedureKind } from "@/types/maintenance-schedule";

export enum AUTH_ROUTES {
  SIGN_IN = "/en/sign-in",
  SIGN_UP = "/en/sign-up",
  FORGET_PASSWORD = "/en/forget-password",
}

export enum DASHBOARD_ROUTES {
  ROOT = "/en/dashboard",
  CLIENT = "/en/dashboard/client",
  ASSETS_MANAGEMENT = "/en/dashboard/assets-management",
  INVALID_ASSETS = "/en/dashboard/assets-management/invalid",
  MAINTENANCE_SCHEDULE = "/en/dashboard/maintenance-schedule",
  DOCUMENT_MANAGEMENT = "/en/dashboard/document-management",
  DOCUMENT_GENERATOR = "/en/dashboard/document-generator",
  SOP_MANAGEMENT = "/en/dashboard/sop-management",
  SOP_MANAGEMENT_CREATE = "/en/dashboard/sop-management/create",
  EOP_MANAGEMENT = "/en/dashboard/eop-management",
  EOP_MANAGEMENT_CREATE = "/en/dashboard/eop-management/create",
  MOP_MANAGEMENT = "/en/dashboard/mop-management",
  MOP_MANAGEMENT_CREATE = "/en/dashboard/mop-management/create",
}

export const mopEditRoute = (mopId: string): string =>
  `${DASHBOARD_ROUTES.MOP_MANAGEMENT}/${mopId}`;

export const eopEditRoute = (eopId: string): string =>
  `${DASHBOARD_ROUTES.EOP_MANAGEMENT}/${eopId}`;

export const sopEditRoute = (sopId: string): string =>
  `${DASHBOARD_ROUTES.SOP_MANAGEMENT}/${sopId}`;

export const maintenanceCategoryRoute = (categoryId: string): string =>
  `${DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE}/${categoryId}`;

export const maintenanceAssetRoute = (
  categoryId: string,
  assetId: string,
): string =>
  `${DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE}/${categoryId}/${assetId}`;

type MaintenanceGenerateQuery = {
  categoryId?: string;
  procedureId?: string;
  assetId?: string;
};

export const maintenanceGenerateProcedureRoute = (
  procedureType: ProcedureKind,
  query?: MaintenanceGenerateQuery,
): string => {
  const base = `${DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE}/generate/${procedureType}`;
  if (!query) {
    return base;
  }
  const params = new URLSearchParams();
  if (query.categoryId) {
    params.set("categoryId", query.categoryId);
  }
  if (query.procedureId) {
    params.set("procedureId", query.procedureId);
  }
  if (query.assetId) {
    params.set("assetId", query.assetId);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
};

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
  EOP_MANAGEMENT = "/en/dashboard/eop-management",
  MOP_MANAGEMENT = "/en/dashboard/mop-management",
}

export const maintenanceCategoryRoute = (categoryId: string): string =>
  `${DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE}/${categoryId}`;

export const maintenanceAssetRoute = (
  categoryId: string,
  assetId: string,
): string =>
  `${DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE}/${categoryId}/${assetId}`;

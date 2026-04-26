import { Typography } from "@/components/common";

type PageProps = {
  params: Promise<{ categoryId: string; assetId: string }>;
};

/**
 * Placeholder for deep-linked asset under maintenance schedule.
 * `maintenanceAssetRoute` points here; content can be expanded later.
 */
export default async function MaintenanceScheduleAssetPage({ params }: PageProps) {
  const { categoryId, assetId } = await params;
  return (
    <div className="p-6">
      <Typography className="text-lg font-semibold" variant="h1">
        Maintenance — asset
      </Typography>
      <p className="mt-2 text-sm text-gray-600">
        Category: {categoryId} · Asset: {assetId}
      </p>
    </div>
  );
}

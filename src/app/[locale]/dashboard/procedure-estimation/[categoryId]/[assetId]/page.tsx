import { Typography } from '@/components/common';

type PageProps = {
  params: Promise<{ categoryId: string; assetId: string }>;
};

/**
 * Placeholder for deep-linked asset under procedure estimation.
 * `procedureEstimationAssetRoute` points here; content can be expanded later.
 * @param root0
 * @param root0.params
 */
export default async function ProcedureEstimationAssetPage({ params }: PageProps) {
  const { categoryId, assetId } = await params;
  return (
    <div className="p-6">
      <Typography className="text-lg font-semibold" variant="h1">
        Procedure Estimation — asset
      </Typography>
      <p className="mt-2 text-sm text-gray-600">
        Category:
        {' '}
        {categoryId}
        {' '}
        · Asset:
        {' '}
        {assetId}
      </p>
    </div>
  );
}

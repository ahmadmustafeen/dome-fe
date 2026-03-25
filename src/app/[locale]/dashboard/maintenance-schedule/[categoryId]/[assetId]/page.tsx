"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { use, useMemo } from "react";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { MOCK_CATEGORY_ASSETS } from "@/constants/maintenance-schedule-assets";

type PageProps = {
  params: Promise<{ categoryId: string; assetId: string }>;
};

export default function MaintenanceAssetDetailPage({ params }: PageProps) {
  const { categoryId, assetId } = use(params);
  const t = useTranslations("MaintenanceAssetDetail");
  const router = useRouter();
  const locale = useLocale();

  const asset = useMemo(() => {
    const assets = MOCK_CATEGORY_ASSETS[categoryId] ?? [];
    return assets.find((a) => a.id === assetId);
  }, [categoryId, assetId]);

  return (
    <div className="h-full">
      <SectionWrapper>
        {/* ── Back button ── */}
        <div className="mb-4">
          <AppButton
            title={t("back")}
            onClick={() =>
              router.push(
                `/${locale}/dashboard/maintenance-schedule/${categoryId}`,
              )
            }
            variant="default"
            icon={<ArrowLeft className="h-4 w-4" />}
          />
        </div>

        {/* ── Placeholder content ── */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
          <Typography variant="h1" className="text-slate-700">
            {asset ? asset.assetName : t("placeholder_heading")}
          </Typography>
          {asset && (
            <Typography variant="p" className="mt-1 text-gray-500">
              {asset.assetId} · {asset.location}
            </Typography>
          )}
          <Typography variant="p" className="mt-4 max-w-sm text-gray-400">
            {t("placeholder_description")}
          </Typography>
        </div>
      </SectionWrapper>
    </div>
  );
}

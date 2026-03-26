"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { DASHBOARD_ROUTES, maintenanceCategoryRoute } from "@/constants/routes";
import type { ProcedureKind } from "@/types/maintenance-schedule";

type MaintenanceGenerateProcedureClientProps = {
  procedureType: ProcedureKind;
  categoryId?: string;
  procedureId?: string;
  assetId?: string;
};

const MaintenanceGenerateProcedureClient = ({
  procedureType,
  categoryId,
  procedureId,
  assetId,
}: MaintenanceGenerateProcedureClientProps) => {
  const t = useTranslations("MaintenanceGenerate");
  const router = useRouter();

  const contextLine = useMemo(() => {
    const parts: string[] = [];
    if (categoryId) {
      parts.push(`${t("context_category")}: ${categoryId}`);
    }
    if (procedureId) {
      parts.push(`${t("context_procedure")}: ${procedureId}`);
    }
    if (assetId) {
      parts.push(`${t("context_asset")}: ${assetId}`);
    }
    return parts.length > 0 ? parts.join(" · ") : null;
  }, [assetId, categoryId, procedureId, t]);

  const handleBack = useCallback(() => {
    if (categoryId) {
      router.push(maintenanceCategoryRoute(categoryId));
      return;
    }
    router.push(DASHBOARD_ROUTES.MAINTENANCE_SCHEDULE);
  }, [categoryId, router]);

  const handleGenerateClick = useCallback(() => {
    toast.info(t("toast_placeholder"));
  }, [t]);

  return (
    <div className="h-full">
      <SectionWrapper>
        <div className="mb-4">
          <AppButton
            title={t("back")}
            onClick={handleBack}
            variant="default"
            icon={<ArrowLeft className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-16 text-center sm:py-20">
          <Typography variant="h1" className="text-slate-800">
            {procedureType === "mop"
              ? t("heading_mop")
              : procedureType === "eop"
                ? t("heading_eop")
                : t("heading_sop")}
          </Typography>
          {contextLine ? (
            <Typography variant="caption" className="mt-2 max-w-lg text-gray-500">
              {contextLine}
            </Typography>
          ) : null}
          <Typography variant="p" className="mt-4 max-w-md text-gray-500">
            {t("description")}
          </Typography>
          <div className="mt-8">
            <AppButton
              title={t("btn_generate_document")}
              variant="secondary"
              onClick={handleGenerateClick}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export { MaintenanceGenerateProcedureClient };

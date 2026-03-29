"use client";

import { RequirementSection } from "@/components/sections/maintenance/RequirementSection";
import type {
  CategoryAsset,
  ProcedureItem,
  ProcedureKind,
} from "@/types/maintenance-schedule";

type CategoryAssetProcedurePanelProps = {
  asset: CategoryAsset;
  labels: { mops: string; eops: string; sops: string };
  onProcedureGenerate: (
    item: ProcedureItem,
    kind: ProcedureKind,
    assetRecordId: string,
  ) => void;
};

const CategoryAssetProcedurePanel = ({
  asset,
  labels,
  onProcedureGenerate,
}: CategoryAssetProcedurePanelProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RequirementSection
        label={labels.mops}
        items={asset.mops}
        colorClass="border-blue-200"
        onGenerate={(item) => {
          onProcedureGenerate(item, "mop", asset.id);
        }}
      />
      <RequirementSection
        label={labels.eops}
        items={asset.eops}
        colorClass="border-red-200"
        onGenerate={(item) => {
          onProcedureGenerate(item, "eop", asset.id);
        }}
      />
      <RequirementSection
        label={labels.sops}
        items={asset.sops}
        colorClass="border-green-200"
        onGenerate={(item) => {
          onProcedureGenerate(item, "sop", asset.id);
        }}
      />
    </div>
  );
};

export { CategoryAssetProcedurePanel };

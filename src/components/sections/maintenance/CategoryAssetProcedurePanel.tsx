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
  handleCreateClick: (id: string, type: string, assetId: string) => void;
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
  handleCreateClick,
}: CategoryAssetProcedurePanelProps) => {


  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RequirementSection
        label={labels.mops}
        items={asset.mops}
        existing={asset.mop}
        colorClass="border-blue-200"
        onGenerate={(item) => {
          onProcedureGenerate(item, "mop", asset.id);
        }}
        handleCreateClick={(id) => handleCreateClick(id, 'mop', asset?._id)}
      />
      <RequirementSection
        label={labels.eops}
        items={asset.eops}
        existing={asset.eop}

        colorClass="border-red-200"
        handleCreateClick={(id) => handleCreateClick(id, 'eop', asset?._id)}
        onGenerate={(item) => {
          onProcedureGenerate(item, "eop", asset.id);
        }}
      />
      <RequirementSection
        label={labels.sops}
        items={asset.sops}
        existing={asset.sop}
        colorClass="border-green-200"
        handleCreateClick={(id) => handleCreateClick(id, 'sop', asset?._id)}
        onGenerate={(item) => {
          onProcedureGenerate(item, "sop", asset.id);
        }}
      />
    </div>
  );
};

export { CategoryAssetProcedurePanel };

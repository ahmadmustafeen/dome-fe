"use client";

import { RequirementSection } from "@/components/sections/maintenance/RequirementSection";
import { useAppContext } from "@/context/AppContext";
import { generatedDocumentService } from "@/services/generatedDocument-service";
import type {
  CategoryAsset,
  ProcedureItem,
  ProcedureKind,
} from "@/types/maintenance-schedule";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const { site } = useAppContext()


  const handleCreateClick = async (mopId: string) => {
    const resp = await generatedDocumentService.createGeneratedDocument(mopId, 'mop', asset.assetId, site?._id!);
    if (resp) {
      console.log(resp);
      router.push(`/en/dashboard/mop-management/create/${resp.data._id}`)
    }
  }


  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RequirementSection
        label={labels.mops}
        items={asset.mops}
        colorClass="border-blue-200"
        onGenerate={(item) => {
          onProcedureGenerate(item, "mop", asset.id);
        }}
        handleCreateClick={handleCreateClick}
      />
      <RequirementSection
        label={labels.eops}
        items={asset.eops}
        colorClass="border-red-200"
        handleCreateClick={handleCreateClick}
        onGenerate={(item) => {
          onProcedureGenerate(item, "eop", asset.id);
        }}
      />
      <RequirementSection
        label={labels.sops}
        items={asset.sops}
        colorClass="border-green-200"
        handleCreateClick={handleCreateClick}
        onGenerate={(item) => {
          onProcedureGenerate(item, "sop", asset.id);
        }}
      />
    </div>
  );
};

export { CategoryAssetProcedurePanel };

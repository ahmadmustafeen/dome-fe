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


  const handleCreateClick = async (pdId: string, type: string) => {

    const resp = await generatedDocumentService.createGeneratedDocument(pdId, type, asset._id, site?._id!);
    if (resp) {
      if (resp.data.pdId) {
        let route = '';
        if (type === 'mop') route = 'mop-management';
        if (type === 'sop') route = 'sop-management';
        if (type === 'eop') route = 'eop-management';

        return router.push(`/en/dashboard/${route}/${resp.data.pdId}`)

      }
      let route = '';
      if (type === 'mop') route = 'mop-management';
      if (type === 'sop') route = 'sop-management';
      if (type === 'eop') route = 'eop-management';
      router.push(`/en/dashboard/${route}/create/${resp.data._id}`)
    }
  }

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
        handleCreateClick={(id) => handleCreateClick(id, 'mop')}
      />
      <RequirementSection
        label={labels.eops}
        items={asset.eops}
        existing={asset.eop}

        colorClass="border-red-200"
        handleCreateClick={(id) => handleCreateClick(id, 'eop')}
        onGenerate={(item) => {
          onProcedureGenerate(item, "eop", asset.id);
        }}
      />
      <RequirementSection
        label={labels.sops}
        items={asset.sops}
        existing={asset.sop}
        colorClass="border-green-200"
        handleCreateClick={(id) => handleCreateClick(id, 'sop')}
        onGenerate={(item) => {
          onProcedureGenerate(item, "sop", asset.id);
        }}
      />
    </div>
  );
};

export { CategoryAssetProcedurePanel };

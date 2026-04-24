import type { MopFormValues } from "@/types/mop-form";

import { MopFieldRow } from "../MopFieldRow";
import { MopSectionCard } from "../MopSectionCard";

type FormEquipmentProps = {
  form: MopFormValues;
  patch: (p: Partial<MopFormValues>) => void;
};

export const FormEquipment = ({ form, patch }: FormEquipmentProps) => {
  return (
    <MopSectionCard sectionNumber={2} title="Equipment Information" accent={2}>
      <div className="flex flex-col gap-3">
        <MopFieldRow label="Equipment / Asset Name">
          <input
            className="mop-doc-input"
            value={form.equipmentAssetName}
            onChange={(e) => patch({ equipmentAssetName: e.target.value })}
            placeholder="Linked or typed name"
          />
        </MopFieldRow>
        <MopFieldRow label="Equipment Type / Component">
          <input
            className="mop-doc-input"
            value={form.equipmentType}
            onChange={(e) => patch({ equipmentType: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Manufacturer / Make">
          <input
            className="mop-doc-input"
            value={form.manufacturer}
            onChange={(e) => patch({ manufacturer: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Model Number">
          <input
            className="mop-doc-input"
            value={form.modelNumber}
            onChange={(e) => patch({ modelNumber: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Serial Number">
          <input
            className="mop-doc-input"
            value={form.serialNumber}
            onChange={(e) => patch({ serialNumber: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Equipment Number">
          <input
            className="mop-doc-input"
            value={form.equipmentNumber}
            onChange={(e) => patch({ equipmentNumber: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Location / Site">
          <input
            className="mop-doc-input"
            value={form.locationSite}
            onChange={(e) => patch({ locationSite: e.target.value })}
          />
        </MopFieldRow>
      </div>
    </MopSectionCard>
  );
};

import type { MopFormValues } from "@/types/mop-form";

import { MopFieldRow } from "../MopFieldRow";
import { MopSectionCard } from "../MopSectionCard";

type FormSafetyProps = {
  form: MopFormValues;
  patch: (p: Partial<MopFormValues>) => void;
};

export const FormSafety = ({ form, patch }: FormSafetyProps) => {
  return (
    <MopSectionCard sectionNumber={5} title="Safety & Compliance" accent={5}>
      <div className="flex flex-col gap-3">
        <MopFieldRow label="Safety Precautions">
          <textarea
            className="mop-doc-input mop-doc-textarea"
            value={form.safetyPrecautions}
            onChange={(e) => patch({ safetyPrecautions: e.target.value })}
            rows={4}
          />
        </MopFieldRow>
        <MopFieldRow label="Required PPE">
          <textarea
            className="mop-doc-input mop-doc-textarea"
            value={form.requiredPpe}
            onChange={(e) => patch({ requiredPpe: e.target.value })}
            rows={3}
          />
        </MopFieldRow>
        <MopFieldRow label="Tools & Materials Required">
          <textarea
            className="mop-doc-input mop-doc-textarea"
            value={form.toolsAndMaterials}
            onChange={(e) => patch({ toolsAndMaterials: e.target.value })}
            rows={3}
          />
        </MopFieldRow>
      </div>
    </MopSectionCard>
  );
};

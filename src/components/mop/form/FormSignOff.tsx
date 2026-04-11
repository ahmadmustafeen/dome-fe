import type { MopFormValues } from "@/types/mop-form";

import { MopFieldRow } from "../MopFieldRow";
import { MopSectionCard } from "../MopSectionCard";

type FormSignOffProps = {
  form: MopFormValues;
  patch: (p: Partial<MopFormValues>) => void;
};

export const FormSignOff = ({ form, patch }: FormSignOffProps) => {
  return (
    <MopSectionCard sectionNumber={6} title="Sign Off" accent={6}>
      <div className="flex flex-col gap-3">
        <MopFieldRow label="Prepared By">
          <input
            className="mop-doc-input"
            value={form.preparedBy}
            onChange={(e) => patch({ preparedBy: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Reviewed By">
          <input
            className="mop-doc-input"
            value={form.reviewedBy}
            onChange={(e) => patch({ reviewedBy: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Approved By">
          <input
            className="mop-doc-input"
            value={form.approvedBy}
            onChange={(e) => patch({ approvedBy: e.target.value })}
          />
        </MopFieldRow>
      </div>
    </MopSectionCard>
  );
};

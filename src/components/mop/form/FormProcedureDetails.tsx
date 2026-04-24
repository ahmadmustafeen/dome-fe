import type { MopFormValues, MopPermitAnswer, MopRiskLevel } from "@/types/mop-form";
import { cn } from "@/utils/Helpers";

import { MopFieldRow } from "../MopFieldRow";
import { MopRichTextEditor } from "../MopRichTextEditor";
import { MopRiskPills } from "../MopRiskPills";
import { MopSectionCard } from "../MopSectionCard";

type FormProcedureDetailsProps = {
  form: MopFormValues;
  formNonce: number;
  patch: (p: Partial<MopFormValues>) => void;
  setWorkDescriptionHtml: (html: string) => void;
  setRisk: (r: MopRiskLevel | "") => void;
};

export const FormProcedureDetails = ({
  form,
  formNonce,
  patch,
  setWorkDescriptionHtml,
  setRisk,
}: FormProcedureDetailsProps) => {
  const permit = form.specialPermitsRequired;

  return (
    <MopSectionCard sectionNumber={3} title="Procedure Details" accent={3}>
      <div className="flex flex-col gap-3">
        <MopFieldRow label="Work Description">
          <MopRichTextEditor
            key={`work-${formNonce}`}
            initialContent={form.workDescriptionHtml}
            onHtmlChange={setWorkDescriptionHtml}
            className="min-h-[140px]"
          />
        </MopFieldRow>
        <MopFieldRow label="Duration / Estimated Time">
          <input
            className="mop-doc-input"
            value={form.duration}
            onChange={(e) => patch({ duration: e.target.value })}
            placeholder="e.g. 2 hours"
          />
        </MopFieldRow>
        <MopFieldRow label="Level of Risk (LOR)">
          <MopRiskPills
            value={form.levelOfRisk}
            onChange={(level) => setRisk(level)}
          />
        </MopFieldRow>
        <MopFieldRow label="CET Level Required">
          <input
            className="mop-doc-input"
            value={form.cetLevelRequired}
            onChange={(e) => patch({ cetLevelRequired: e.target.value })}
          />
        </MopFieldRow>
        <MopFieldRow label="Special Permits Required">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-3">
              {(["no", "yes"] as const).map((v) => {
                const active = permit === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      patch({
                        specialPermitsRequired: v as MopPermitAnswer,
                      })
                    }
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                );
              })}
            </div>
            {permit === "yes" ? (
              <textarea
                className="mop-doc-input mop-doc-textarea"
                value={form.specialPermitsNotes}
                onChange={(e) =>
                  patch({ specialPermitsNotes: e.target.value })
                }
                placeholder="Describe permits, numbers, or conditions…"
                rows={3}
              />
            ) : null}
          </div>
        </MopFieldRow>
      </div>
    </MopSectionCard>
  );
};

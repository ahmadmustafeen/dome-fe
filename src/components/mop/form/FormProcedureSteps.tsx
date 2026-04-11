import { Plus } from "lucide-react";

import type { MopFormValues } from "@/types/mop-form";

import { MopRichTextEditor } from "../MopRichTextEditor";
import { MopSectionCard } from "../MopSectionCard";

type FormProcedureStepsProps = {
  form: MopFormValues;
  formNonce: number;
  updateStepHtml: (stepId: string, html: string) => void;
  addStep: () => void;
};

export const FormProcedureSteps = ({
  form,
  formNonce,
  updateStepHtml,
  addStep,
}: FormProcedureStepsProps) => {
  return (
    <MopSectionCard sectionNumber={4} title="Procedure Steps" accent={4}>
      <div className="flex flex-col gap-4">
        {form.steps.map((step, index) => (
          <div
            key={`${step.id}-${formNonce}`}
            className="rounded-lg border border-gray-200 bg-gray-50/80 p-2"
          >
            <div className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
              Step {index + 1}
            </div>
            <MopRichTextEditor
              initialContent={step.html}
              onHtmlChange={(html) => updateStepHtml(step.id, html)}
              compact
              className="min-h-0"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/50 py-2.5 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100/80"
        >
          <Plus className="h-4 w-4" />
          Add Step
        </button>
      </div>
    </MopSectionCard>
  );
};

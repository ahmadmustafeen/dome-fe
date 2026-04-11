"use client";

import "@/styles/mop-document.css";

import type { MopFormValues, MopRiskLevel, MopStatus } from "@/types/mop-form";

import { FormDocumentHeader } from "./form/FormDocumentHeader";
import { FormEquipment } from "./form/FormEquipment";
import { FormProcedureDetails } from "./form/FormProcedureDetails";
import { FormProcedureSteps } from "./form/FormProcedureSteps";
import { FormSafety } from "./form/FormSafety";
import { FormSignOff } from "./form/FormSignOff";

type MopDocumentFormProps = {
  form: MopFormValues;
  formNonce: number;
  createdAtIso: string;
  lastModifiedIso: string;
  patch: (p: Partial<MopFormValues>) => void;
  setWorkDescriptionHtml: (html: string) => void;
  updateStepHtml: (stepId: string, html: string) => void;
  addStep: () => void;
  setStatus: (s: MopStatus) => void;
  setRisk: (r: MopRiskLevel | "") => void;
};

const formatStamp = (iso: string) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

export const MopDocumentForm = ({
  form,
  formNonce,
  createdAtIso,
  lastModifiedIso,
  patch,
  setWorkDescriptionHtml,
  updateStepHtml,
  addStep,
  setStatus,
  setRisk,
}: MopDocumentFormProps) => {
  return (
    <div className="mop-doc-page min-h-0 flex-1 overflow-y-auto pr-1">
      <FormDocumentHeader
        form={form}
        createdAtIso={createdAtIso}
        lastModifiedIso={lastModifiedIso}
        patch={patch}
        setStatus={setStatus}
        formatStamp={formatStamp}
      />
      <FormEquipment form={form} patch={patch} />
      <FormProcedureDetails
        form={form}
        formNonce={formNonce}
        patch={patch}
        setWorkDescriptionHtml={setWorkDescriptionHtml}
        setRisk={setRisk}
      />
      <FormProcedureSteps
        form={form}
        formNonce={formNonce}
        updateStepHtml={updateStepHtml}
        addStep={addStep}
      />
      <FormSafety form={form} patch={patch} />
      <FormSignOff form={form} patch={patch} />
    </div>
  );
};

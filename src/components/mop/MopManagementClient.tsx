"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { useMopForm } from "@/hooks/useMopForm";
import { downloadMopPdf } from "@/utils/mop-pdf";

import { MopDocumentForm } from "./MopDocumentForm";
import { MopDocumentPreview } from "./MopDocumentPreview";

const buildMopPdfFilename = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `mop-${y}-${m}-${day}.pdf`;
};

export const MopManagementClient = () => {
  const {
    form,
    formNonce,
    createdAtIso,
    lastModifiedIso,
    patch,
    setWorkDescriptionHtml,
    updateStepHtml,
    addStep,
    resetForm,
    payload,
    setStatus,
    setRisk,
  } = useMopForm();

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSave = useCallback(() => {
    // eslint-disable-next-line no-console -- intentional save stub until API
    console.log("MOP payload:", payload);
  }, [payload]);

  const handleClear = useCallback(() => {
    // eslint-disable-next-line no-alert -- confirm before reset
    const ok = window.confirm(
      "Reset the MOP form to defaults? All entered data will be lost.",
    );
    if (ok) {
      resetForm();
    }
  }, [resetForm]);

  const handleExportPdf = useCallback(async () => {
    const el = previewRef.current;
    if (!el) {
      toast.error("Preview is not ready yet.");
      return;
    }
    setIsExportingPdf(true);
    try {
      await downloadMopPdf({
        sourceElement: el,
        filename: buildMopPdfFilename(),
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not generate the PDF.",
      );
    } finally {
      setIsExportingPdf(false);
    }
  }, []);

  return (
    <SectionWrapper className="flex min-h-0 flex-1 flex-col">
      <Typography variant="h1" className="mb-6">
        Method of Procedure (MOP)
      </Typography>

      <div className="flex min-h-0 flex-1 flex-col gap-6 lg:h-[calc(100vh-14rem)] lg:flex-row">
        <section className="flex min-h-[420px] min-w-0 flex-1 flex-col gap-2 lg:min-h-0">
          <Typography variant="h3" className="text-primary">
            MOP Editor
          </Typography>
          <MopDocumentForm
            form={form}
            formNonce={formNonce}
            createdAtIso={createdAtIso}
            lastModifiedIso={lastModifiedIso}
            patch={patch}
            setWorkDescriptionHtml={setWorkDescriptionHtml}
            updateStepHtml={updateStepHtml}
            addStep={addStep}
            setStatus={setStatus}
            setRisk={setRisk}
          />
          <div className="flex shrink-0 flex-wrap gap-2 pt-2">
            <AppButton variant="secondary" title="Save" onClick={handleSave} />
            <AppButton variant="default" title="Clear" onClick={handleClear} />
            <AppButton
              variant="default"
              title="Export PDF"
              onClick={handleExportPdf}
              disabled={isExportingPdf}
            />
          </div>
        </section>

        <section className="flex min-h-[420px] min-w-0 flex-1 flex-col gap-2 lg:min-h-0">
          <Typography variant="h3" className="text-primary">
            Preview
          </Typography>
          <div className="min-h-0 flex-1 overflow-hidden">
            <MopDocumentPreview
              ref={previewRef}
              form={form}
              createdAtIso={createdAtIso}
              lastModifiedIso={lastModifiedIso}
            />
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
};

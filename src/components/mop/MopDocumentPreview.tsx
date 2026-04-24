"use client";

import "@/styles/mop-document.css";

import type { Ref } from "react";

import type { MopFormValues } from "@/types/mop-form";
import { isEffectivelyEmptyHtml } from "@/utils/mop-html";

import { MopFieldRow } from "./MopFieldRow";
import {
  formatPreviewStamp,
  PreviewVal,
  RiskReadOnly,
} from "./preview/MopPreviewHelpers";
import { MopSectionCard } from "./MopSectionCard";

type MopDocumentPreviewProps = {
  ref?: Ref<HTMLDivElement | null>;
  form: MopFormValues;
  createdAtIso: string;
  lastModifiedIso: string;
};

export const MopDocumentPreview = ({
  ref,
  form,
  createdAtIso,
  lastModifiedIso,
}: MopDocumentPreviewProps) => {
  const permitLabel =
    form.specialPermitsRequired === "yes"
      ? "Yes"
      : form.specialPermitsRequired === "no"
        ? "No"
        : "";

  return (
    <div
      ref={ref}
      className="mop-doc-preview-shell min-h-0 flex-1 overflow-y-auto"
    >
      <div className="mop-doc-preview-paper mop-doc-page">
        <h1 className="mop-doc-preview-title">METHOD OF PROCEDURE (MOP)</h1>

        <MopSectionCard sectionNumber={1} title="Document Header" accent={1}>
          <div className="mop-doc-preview-stack">
            <MopFieldRow label="MOP Title">
              <PreviewVal text={form.mopTitle} />
            </MopFieldRow>
            <MopFieldRow label="MOP Identifier / Reference #">
              <PreviewVal text={form.mopIdentifier} />
            </MopFieldRow>
            <MopFieldRow label="Version Number">
              <PreviewVal text={form.versionNumber} />
            </MopFieldRow>
            <MopFieldRow label="Status">
              <PreviewVal text={form.status} />
            </MopFieldRow>
            <MopFieldRow label="Created">
              <PreviewVal text={formatPreviewStamp(createdAtIso)} />
            </MopFieldRow>
            <MopFieldRow label="Last modified">
              <PreviewVal text={formatPreviewStamp(lastModifiedIso)} />
            </MopFieldRow>
          </div>
        </MopSectionCard>

        <MopSectionCard sectionNumber={2} title="Equipment Information" accent={2}>
          <div className="mop-doc-preview-stack">
            <MopFieldRow label="Equipment / Asset Name">
              <PreviewVal text={form.equipmentAssetName} />
            </MopFieldRow>
            <MopFieldRow label="Equipment Type / Component">
              <PreviewVal text={form.equipmentType} />
            </MopFieldRow>
            <MopFieldRow label="Manufacturer / Make">
              <PreviewVal text={form.manufacturer} />
            </MopFieldRow>
            <MopFieldRow label="Model Number">
              <PreviewVal text={form.modelNumber} />
            </MopFieldRow>
            <MopFieldRow label="Serial Number">
              <PreviewVal text={form.serialNumber} />
            </MopFieldRow>
            <MopFieldRow label="Equipment Number">
              <PreviewVal text={form.equipmentNumber} />
            </MopFieldRow>
            <MopFieldRow label="Location / Site">
              <PreviewVal text={form.locationSite} />
            </MopFieldRow>
          </div>
        </MopSectionCard>

        <MopSectionCard sectionNumber={3} title="Procedure Details" accent={3}>
          <div className="mop-doc-preview-stack">
            <MopFieldRow label="Work Description">
              {isEffectivelyEmptyHtml(form.workDescriptionHtml) ? (
                <div className="mop-doc-preview-value mop-doc-preview-value--muted">
                  —
                </div>
              ) : (
                <div
                  className="mop-doc-html mop-doc-html-surface mop-doc-preview-value"
                  dangerouslySetInnerHTML={{ __html: form.workDescriptionHtml }}
                />
              )}
            </MopFieldRow>
            <MopFieldRow label="Duration / Estimated Time">
              <PreviewVal text={form.duration} />
            </MopFieldRow>
            <MopFieldRow label="Level of Risk (LOR)">
              <RiskReadOnly level={form.levelOfRisk} />
            </MopFieldRow>
            <MopFieldRow label="CET Level Required">
              <PreviewVal text={form.cetLevelRequired} />
            </MopFieldRow>
            <MopFieldRow label="Special Permits Required">
              <div className="mop-doc-preview-stack mop-doc-preview-stack--tight">
                <PreviewVal text={permitLabel} />
                {form.specialPermitsRequired === "yes" ? (
                  <PreviewVal text={form.specialPermitsNotes} />
                ) : null}
              </div>
            </MopFieldRow>
          </div>
        </MopSectionCard>

        <MopSectionCard sectionNumber={4} title="Procedure Steps" accent={4}>
          <div className="mop-doc-preview-stack">
            {form.steps.map((step, index) => (
              <div key={step.id} className="mop-doc-step-preview">
                <div className="mop-doc-step-label">Step {index + 1}</div>
                {isEffectivelyEmptyHtml(step.html) ? (
                  <div className="mop-doc-preview-value mop-doc-preview-value--muted">
                    —
                  </div>
                ) : (
                  <div
                    className="mop-doc-html mop-doc-preview-value"
                    dangerouslySetInnerHTML={{ __html: step.html }}
                  />
                )}
              </div>
            ))}
          </div>
        </MopSectionCard>

        <MopSectionCard sectionNumber={5} title="Safety & Compliance" accent={5}>
          <div className="mop-doc-preview-stack">
            <MopFieldRow label="Safety Precautions">
              <PreviewVal text={form.safetyPrecautions} />
            </MopFieldRow>
            <MopFieldRow label="Required PPE">
              <PreviewVal text={form.requiredPpe} />
            </MopFieldRow>
            <MopFieldRow label="Tools & Materials Required">
              <PreviewVal text={form.toolsAndMaterials} />
            </MopFieldRow>
          </div>
        </MopSectionCard>

        <MopSectionCard sectionNumber={6} title="Sign Off" accent={6}>
          <div className="mop-doc-preview-stack">
            <MopFieldRow label="Prepared By">
              <PreviewVal text={form.preparedBy} />
            </MopFieldRow>
            <MopFieldRow label="Reviewed By">
              <PreviewVal text={form.reviewedBy} />
            </MopFieldRow>
            <MopFieldRow label="Approved By">
              <PreviewVal text={form.approvedBy} />
            </MopFieldRow>
          </div>
        </MopSectionCard>
      </div>
    </div>
  );
};

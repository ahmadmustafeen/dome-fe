import { MOP_STATUS_OPTIONS } from "@/constants/mop-form";
import type { MopFormValues, MopStatus } from "@/types/mop-form";

import { MopFieldRow } from "../MopFieldRow";
import { MopSectionCard } from "../MopSectionCard";

type FormDocumentHeaderProps = {
  form: MopFormValues;
  createdAtIso: string;
  lastModifiedIso: string;
  patch: (p: Partial<MopFormValues>) => void;
  setStatus: (s: MopStatus) => void;
  formatStamp: (iso: string) => string;
};

export const FormDocumentHeader = ({
  form,
  createdAtIso,
  lastModifiedIso,
  patch,
  setStatus,
  formatStamp,
}: FormDocumentHeaderProps) => {
  return (
    <MopSectionCard sectionNumber={1} title="Document Header" accent={1}>
      <div className="flex flex-col gap-3">
        <MopFieldRow label="MOP Title">
          <input
            className="mop-doc-input"
            value={form.mopTitle}
            onChange={(e) => patch({ mopTitle: e.target.value })}
            placeholder="Enter document title"
          />
        </MopFieldRow>
        <MopFieldRow label="MOP Identifier / Reference #">
          <input
            className="mop-doc-input"
            value={form.mopIdentifier}
            onChange={(e) => patch({ mopIdentifier: e.target.value })}
            placeholder="e.g. MOP-2026-001"
          />
        </MopFieldRow>
        <MopFieldRow label="Version Number">
          <input
            className="mop-doc-input"
            value={form.versionNumber}
            disabled
            readOnly
            aria-readonly="true"
          />
        </MopFieldRow>
        <MopFieldRow label="Status">
          <select
            className="mop-doc-input"
            value={form.status}
            onChange={(e) => setStatus(e.target.value as MopStatus)}
          >
            {MOP_STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </MopFieldRow>
        <MopFieldRow label="Created">
          <input
            className="mop-doc-input"
            value={formatStamp(createdAtIso)}
            disabled
            readOnly
          />
        </MopFieldRow>
        <MopFieldRow label="Last modified">
          <input
            className="mop-doc-input"
            value={formatStamp(lastModifiedIso)}
            disabled
            readOnly
          />
        </MopFieldRow>
      </div>
    </MopSectionCard>
  );
};

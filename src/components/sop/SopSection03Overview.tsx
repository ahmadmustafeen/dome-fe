"use client";

import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { SopSection03FieldRow } from "@/constants/sop-section03-overview";
import {
  SOP_SECTION_03_DELIVERY_OPTIONS,
  SOP_SECTION_03_HEADING,
  SOP_SECTION_03_LEAD_FIELD_ROWS,
  SOP_SECTION_03_TAIL_FIELD_ROWS,
} from "@/constants/sop-section03-overview";
import type { SOPSection03Overview, SOPWorkDeliveryType } from "@/types/sop";

type SopSection03OverviewProps = {
  overview: SOPSection03Overview;
  patchOverview: (partial: Partial<SOPSection03Overview>) => void;
};

const renderMappedRow = (
  row: SopSection03FieldRow,
  overview: SOPSection03Overview,
  patchOverview: SopSection03OverviewProps["patchOverview"],
) => {
  const handleValue = (value: string): void => {
    patchOverview({ [row.field]: value } as Partial<SOPSection03Overview>);
  };

  return (
    <MopFormTableRow key={row.id} label={row.label}>
      {row.control === "textarea" ? (
        <Textarea
          value={overview[row.field]}
          onChange={(event) => handleValue(event.target.value)}
          placeholder={row.placeholder}
          className="min-h-24"
        />
      ) : (
        <Input
          value={overview[row.field]}
          onChange={(event) => handleValue(event.target.value)}
          placeholder={row.placeholder}
        />
      )}
    </MopFormTableRow>
  );
};

export const SopSection03Overview = ({
  overview,
  patchOverview,
}: SopSection03OverviewProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_03_HEADING}>
        <div>
          {SOP_SECTION_03_LEAD_FIELD_ROWS.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}
          <MopFormTableRow label="Self Delivered / Vendor:">
            <select
              className="mop-doc-input"
              value={overview.workDeliveryType}
              onChange={(event) => {
                patchOverview({
                  workDeliveryType: event.target.value as SOPWorkDeliveryType,
                });
              }}
            >
              {SOP_SECTION_03_DELIVERY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </MopFormTableRow>
          {SOP_SECTION_03_TAIL_FIELD_ROWS.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

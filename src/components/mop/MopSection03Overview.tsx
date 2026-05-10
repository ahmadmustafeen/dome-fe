import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { MopSection03FieldRow } from "@/constants/mop-section03-overview";
import {
  MOP_SECTION_03_CONTRACTOR_FIELD_ROWS,
  MOP_SECTION_03_DELIVERY_OPTIONS,
  MOP_SECTION_03_HEADING,
  MOP_SECTION_03_LEAD_FIELD_ROWS,
  MOP_SECTION_03_TAIL_FIELD_ROWS,
} from "@/constants/mop-section03-overview";
import type { MOPSection03Overview, MOPWorkDeliveryType } from "@/types/mop";

import { MopFormTableRow } from "./MopFormTableRow";

type MopSection03OverviewProps = {
  overview: MOPSection03Overview;
  patchOverview: (p: Partial<MOPSection03Overview>) => void;
};

const renderMappedRow = (
  row: MopSection03FieldRow,
  overview: MOPSection03Overview,
  patchOverview: (p: Partial<MOPSection03Overview>) => void,
) => {
  const handleValue = (value: string) => {
    patchOverview({ [row.field]: value } as Partial<MOPSection03Overview>);
  };
  return (
    <MopFormTableRow key={row.id} label={row.label}>
      {row.control === "textarea" ? (
        <Textarea
          value={overview[row.field]}
          onChange={(e) => handleValue(e.target.value)}
          placeholder={row.placeholder}
          className="min-h-24"
        />
      ) : (
        <Input
          value={overview[row.field]}
          onChange={(e) => handleValue(e.target.value)}
          placeholder={row.placeholder}
        />
      )}
    </MopFormTableRow>
  );
};

export const MopSection03Overview = ({
  overview,
  patchOverview,
}: MopSection03OverviewProps) => {
  const showContractorBlock = overview.workDeliveryType === "subcontractor";

  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={MOP_SECTION_03_HEADING}>
        <div>
          {MOP_SECTION_03_LEAD_FIELD_ROWS.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}

          <MopFormTableRow label="Self Delivered / Vendor:">
            <select
              className="mop-doc-input"
              value={overview.workDeliveryType}
              onChange={(e) => {
                patchOverview({
                  workDeliveryType: e.target.value as MOPWorkDeliveryType,
                });
              }}
            >
              {MOP_SECTION_03_DELIVERY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </MopFormTableRow>

          {showContractorBlock
            ? MOP_SECTION_03_CONTRACTOR_FIELD_ROWS.map((row) =>
                renderMappedRow(row, overview, patchOverview),
              )
            : null}

          {MOP_SECTION_03_TAIL_FIELD_ROWS.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

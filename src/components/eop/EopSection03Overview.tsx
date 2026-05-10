import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { EopSection03FieldRow } from "@/constants/eop-section03-overview";
import {
  EOP_SECTION_03_DELIVERY_OPTIONS,
  EOP_SECTION_03_HEADING,
  EOP_SECTION_03_LEAD_FIELD_ROWS,
  EOP_SECTION_03_TAIL_FIELD_ROWS,
} from "@/constants/eop-section03-overview";
import type { EOPSection03Overview, EOPWorkDeliveryType } from "@/types/eop";

type EopSection03OverviewProps = {
  overview: EOPSection03Overview;
  patchOverview: (p: Partial<EOPSection03Overview>) => void;
};

const renderMappedRow = (
  row: EopSection03FieldRow,
  overview: EOPSection03Overview,
  patchOverview: (p: Partial<EOPSection03Overview>) => void,
) => {
  const onChangeValue = (value: string): void => {
    patchOverview({ [row.field]: value } as Partial<EOPSection03Overview>);
  };

  return (
    <MopFormTableRow key={row.id} label={row.label}>
      {row.control === "textarea" ? (
        <Textarea
          value={overview?.[row.field]}
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder={row.placeholder}
          className="min-h-24"
        />
      ) : (
        <Input
          value={overview?.[row.field]}
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder={row.placeholder}
        />
      )}
    </MopFormTableRow>
  );
};

export const EopSection03Overview = ({
  overview,
  patchOverview,
}: EopSection03OverviewProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={EOP_SECTION_03_HEADING}>
        <div>
          {EOP_SECTION_03_LEAD_FIELD_ROWS?.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}

          <MopFormTableRow label="Delivery Method:">
            <select
              className="mop-doc-input"
              value={overview?.workDeliveryType}
              onChange={(e) =>
                patchOverview({
                  workDeliveryType: e.target.value as EOPWorkDeliveryType,
                })}
            >
              {EOP_SECTION_03_DELIVERY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </MopFormTableRow>

          {EOP_SECTION_03_TAIL_FIELD_ROWS?.map((row) =>
            renderMappedRow(row, overview, patchOverview),
          )}
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

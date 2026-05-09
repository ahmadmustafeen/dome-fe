"use client";

import { Typography } from "@/components/common";
import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { SopSection01FieldRow } from "@/constants/sop-section01-field-rows";
import {
  SOP_SECTION_01_FIELD_ROWS,
} from "@/constants/sop-section01-field-rows";
import {
  getSopLorHelper,
  SOP_SECTION_01_LOR_OPTIONS,
} from "@/constants/sop-section01-fields";
import type { RiskLevelOrEmpty } from "@/types/mop";
import type { SOP } from "@/types/sop";

type SopSection01FieldRowsProps = {
  sop: SOP;
  patchDocument: (partial: Partial<SOP["document"]>) => void;
  patchEquipment: (partial: Partial<SOP["equipment"]>) => void;
  patchProcedure: (partial: Partial<SOP["procedure"]>) => void;
  patchSignOff: (partial: Partial<SOP["signOff"]>) => void;
};

const formatVersionDisplay = (version: number): string => `V${Math.max(1, version)}`;

const parseVersionInput = (raw: string): number => {
  const digits = raw.replace(/\D/g, "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const readRowValue = (row: SopSection01FieldRow, sop: SOP): string => {
  if (row.control === "version") {
    return formatVersionDisplay(sop.document.version);
  }
  if (row.source === "document") {
    return sop.document[row.field];
  }
  if (row.source === "equipment") {
    return sop.equipment[row.field];
  }
  if (row.source === "procedure") {
    return sop.procedure[row.field];
  }
  return sop.signOff[row.field];
};

const applyRowValue = (
  row: SopSection01FieldRow,
  value: string,
  props: SopSection01FieldRowsProps,
): void => {
  if (row.control === "version") {
    props.patchDocument({ version: parseVersionInput(value) });
    return;
  }
  if (row.source === "document") {
    props.patchDocument({ [row.field]: value } as Partial<SOP["document"]>);
    return;
  }
  if (row.source === "equipment") {
    props.patchEquipment({ [row.field]: value } as Partial<SOP["equipment"]>);
    return;
  }
  if (row.source === "procedure") {
    if (row.field === "levelOfRisk") {
      props.patchProcedure({ levelOfRisk: value as RiskLevelOrEmpty });
      return;
    }
    props.patchProcedure({ [row.field]: value } as Partial<SOP["procedure"]>);
    return;
  }
  props.patchSignOff({ [row.field]: value } as Partial<SOP["signOff"]>);
};

const renderControl = (row: SopSection01FieldRow, props: SopSection01FieldRowsProps) => {
  if (row.control === "textarea") {
    return (
      <Textarea
        value={readRowValue(row, props.sop)}
        onChange={(event) => applyRowValue(row, event.target.value, props)}
        placeholder={row.placeholder}
        className="min-h-24"
      />
    );
  }

  if (row.control === "lor") {
    const helper = getSopLorHelper(props.sop.procedure.levelOfRisk);
    return (
      <div>
        <select
          className="mop-doc-input"
          value={props.sop.procedure.levelOfRisk}
          onChange={(event) =>
            props.patchProcedure({
              levelOfRisk: event.target.value as RiskLevelOrEmpty,
            })}
        >
          {SOP_SECTION_01_LOR_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helper !== "" ? (
          <Typography variant="caption" className="mt-1 block text-gray-600">
            {helper}
          </Typography>
        ) : null}
      </div>
    );
  }

  return (
    <Input
      type={row.control === "date" ? "date" : "text"}
      value={readRowValue(row, props.sop)}
      onChange={(event) => applyRowValue(row, event.target.value, props)}
      placeholder={row.placeholder}
    />
  );
};

export const SopSection01FieldRows = (props: SopSection01FieldRowsProps) => {
  return (
    <div>
      {SOP_SECTION_01_FIELD_ROWS.map((row) => (
        <MopFormTableRow key={row.id} label={row.label}>
          {renderControl(row, props)}
        </MopFormTableRow>
      ))}
    </div>
  );
};

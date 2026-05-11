"use client";

import { Typography } from "@/components/common";
import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  EOP_SECTION_01_FIELD_ROWS,
  EOP_SECTION_01_LOR_OPTIONS,
  getEopLorHelper,
  type EopSection01FieldRow,
} from "@/constants/eop-section01-fields";
import type { EOP } from "@/types/eop";
import type { RiskLevelOrEmpty } from "@/types/mop";

type EopSection01FieldRowsProps = {
  eop: EOP;
  patchDocument: (p: Partial<EOP["document"]>) => void;
  patchEquipment: (p: Partial<EOP["equipment"]>) => void;
  patchProcedure: (p: Partial<EOP["procedure"]>) => void;
  patchSignOff: (p: Partial<EOP["signOff"]>) => void;
};

const formatVersionDisplay = (version: number): string => `V${Math.max(1, version)}`;

const parseVersionInput = (raw: string): number => {
  const digits = raw.replace(/\D/g, "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const readRowValue = (row: EopSection01FieldRow, eop: EOP): string => {
  if (row.control === "version") {
    return formatVersionDisplay(eop?.document?.version);
  }
  if (row.source === "document") {
    return eop?.document?.[row.field];
  }
  if (row.source === "equipment") {
    return eop.equipment[row.field];
  }
  if (row.source === "procedure") {
    return eop.procedure[row.field];
  }
  return eop.signOff[row.field];
};

const applyRowValue = (
  row: EopSection01FieldRow,
  value: string,
  props: EopSection01FieldRowsProps,
): void => {
  if (row.control === "version") {
    props.patchDocument({ version: parseVersionInput(value) });
    return;
  }
  if (row.source === "document") {
    props.patchDocument({ [row.field]: value } as Partial<EOP["document"]>);
    return;
  }
  if (row.source === "equipment") {
    props.patchEquipment({ [row.field]: value } as Partial<EOP["equipment"]>);
    return;
  }
  if (row.source === "procedure") {
    if (row.field === "levelOfRisk") {
      props.patchProcedure({ levelOfRisk: value as RiskLevelOrEmpty });
      return;
    }
    props.patchProcedure({ [row.field]: value } as Partial<EOP["procedure"]>);
    return;
  }
  props.patchSignOff({ [row.field]: value } as Partial<EOP["signOff"]>);
};

const renderControl = (row: EopSection01FieldRow, props: EopSection01FieldRowsProps) => {
  if (row.control === "textarea") {
    const value = readRowValue(row, props.eop);
    return (
      <Textarea
        value={value}
        onChange={(e) => applyRowValue(row, e.target.value, props)}
        placeholder={row.placeholder}
        className="min-h-24"
      />
    );
  }

  if (row.control === "lor") {
    const helper = getEopLorHelper(props.eop.procedure.levelOfRisk);
    return (
      <div>
        <select
          className="mop-doc-input"
          value={props.eop.procedure.levelOfRisk}
          onChange={(e) =>
            props.patchProcedure({
              levelOfRisk: e.target.value as RiskLevelOrEmpty,
            })
          }
        >
          {EOP_SECTION_01_LOR_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
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

  const value = readRowValue(row, props.eop);
  const inputType = row.control === "date" ? "date" : "text";
  return (
    <Input
      type={inputType}
      value={value}
      onChange={(e) => applyRowValue(row, e.target.value, props)}
      placeholder={row.placeholder}
    />
  );
};

export const EopSection01FieldRows = (props: EopSection01FieldRowsProps) => {
  return (
    <div>
      {EOP_SECTION_01_FIELD_ROWS?.map((row) => (
        <MopFormTableRow key={row.id} label={row.label}>
          {renderControl(row, props)}
        </MopFormTableRow>
      ))}
    </div>
  );
};

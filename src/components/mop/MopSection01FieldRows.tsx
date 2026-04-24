"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { MopSection01FieldRow } from "@/constants/mop-section01-fields";
import {
  getLorHelper,
  MOP_SECTION_01_FIELD_ROWS,
  MOP_SECTION_01_LOR_OPTIONS,
} from "@/constants/mop-section01-fields";
import type { MOP, RiskLevelOrEmpty } from "@/types/mop";

import { MopFormTableRow } from "./MopFormTableRow";

type MopSection01FieldRowsProps = {
  mop: MOP;
  patchDocument: (p: Partial<MOP["document"]>) => void;
  patchEquipment: (p: Partial<MOP["equipment"]>) => void;
  patchProcedure: (p: Partial<MOP["procedure"]>) => void;
  patchSignOff: (p: Partial<MOP["signOff"]>) => void;
};

const formatVersionDisplay = (version: number): string =>
  `V${Math.max(1, version)}`;

const parseVersionInput = (raw: string): number => {
  const digits = raw.replace(/\D/g, "");
  const n = Number.parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const readRowValue = (row: MopSection01FieldRow, mop: MOP): string => {
  if (row.control === "version") {
    return formatVersionDisplay(mop.document.version);
  }
  if (row.source === "document") {
    return mop.document[row.field];
  }
  if (row.source === "equipment") {
    return mop.equipment[row.field];
  }
  if (row.source === "procedure") {
    return mop.procedure[row.field];
  }
  return mop.signOff[row.field];
};

const applyRowValue = (
  row: MopSection01FieldRow,
  value: string,
  props: MopSection01FieldRowsProps,
) => {
  if (row.control === "version") {
    props.patchDocument({ version: parseVersionInput(value) });
    return;
  }
  if (row.source === "document") {
    props.patchDocument({ [row.field]: value } as Partial<MOP["document"]>);
    return;
  }
  if (row.source === "equipment") {
    props.patchEquipment({ [row.field]: value } as Partial<MOP["equipment"]>);
    return;
  }
  if (row.source === "procedure") {
    if (row.field === "levelOfRisk") {
      props.patchProcedure({
        levelOfRisk: value as RiskLevelOrEmpty,
      });
      return;
    }
    props.patchProcedure({ [row.field]: value } as Partial<MOP["procedure"]>);
    return;
  }
  props.patchSignOff({ [row.field]: value } as Partial<MOP["signOff"]>);
};

const textareaMinClass = (row: MopSection01FieldRow): string | undefined =>
  row.source === "procedure" &&
  (row.field === "workDescription" ||
    row.field === "duration" ||
    row.field === "cetLevelRequired")
    ? "min-h-28"
    : undefined;

const renderControl = (row: MopSection01FieldRow, props: MopSection01FieldRowsProps) => {
  if (row.control === "textarea") {
    const value = readRowValue(row, props.mop);
    const onChange = (next: string) => applyRowValue(row, next, props);
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={row.placeholder}
        className={textareaMinClass(row)}
      />
    );
  }

  if (row.control === "lor") {
    const helper = getLorHelper(props.mop.procedure.levelOfRisk);
    return (
      <div>
        <select
          className="mop-doc-input"
          value={props.mop.procedure.levelOfRisk}
          onChange={(e) =>
            props.patchProcedure({
              levelOfRisk: e.target.value as RiskLevelOrEmpty,
            })}
        >
          {MOP_SECTION_01_LOR_OPTIONS.map((o) => (
            <option key={o.value === "" ? "lor-empty" : o.value} value={o.value}>
              {o.label}
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

  const value = readRowValue(row, props.mop);
  const onChange = (next: string) => applyRowValue(row, next, props);
  const inputType = row.control === "date" ? "date" : "text";

  return (
    <Input
      type={inputType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={row.placeholder}
    />
  );
};

export const MopSection01FieldRows = (props: MopSection01FieldRowsProps) => {
  return (
    <div>
      {MOP_SECTION_01_FIELD_ROWS.map((row) => (
        <MopFormTableRow key={row.id} label={row.label}>
          {renderControl(row, props)}
        </MopFormTableRow>
      ))}
    </div>
  );
};

/* eslint-disable style/indent */
import type { RiskLevelOrEmpty } from "@/types/mop";

/** Portal-style LOR labels + helper line under the control. */
export type MopSection01LorOption = {
  value: RiskLevelOrEmpty;
  label: string;
  helper: string;
};

export const MOP_SECTION_01_LOR_OPTIONS: readonly MopSection01LorOption[] = [
  { value: "", label: "Select level", helper: "" },
  {
    value: "low",
    label: "Level 1 (Low)",
    helper: "Limited impact; standard controls apply.",
  },
  {
    value: "medium",
    label: "Level 2 (Medium)",
    helper: "Single system affected with redundancy available.",
  },
  {
    value: "high",
    label: "Level 3 (High)",
    helper: "Elevated impact; additional controls may be required.",
  },
  {
    value: "critical",
    label: "Level 4 (Critical)",
    helper: "Critical impact; full outage or safety risk possible.",
  },
] as const;

export type MopSection01FieldRow =
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "document";
      field:
        | "title"
        | "identifier"
        | "createdDate"
        | "author"
        | "authorCetLevel";
      control: "text" | "date";
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "document";
      field: "version";
      control: "version";
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "equipment";
      field:
        | "equipmentType"
        | "manufacturer"
        | "modelNumber"
        | "serialNumber"
        | "equipmentNumber"
        | "location";
      control: "text";
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "procedure";
      field: "workDescription" | "duration" | "cetLevelRequired";
      control: "textarea";
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "procedure";
      field: "levelOfRisk";
      control: "lor";
    }
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "signOff";
      field: "approvedBy";
      control: "text";
    };

/** Order matches data-centre portal Section 01 schedule rows. */
export const MOP_SECTION_01_FIELD_ROWS: readonly MopSection01FieldRow[] = [
  {
    id: "mop-title",
    label: "MOP Title:",
    placeholder: "CRACs Annual Preventative Maintenance",
    source: "document",
    field: "title",
    control: "text",
  },
  {
    id: "mop-identifier",
    label: "MOP Identifier:",
    placeholder: "To be assigned",
    source: "document",
    field: "identifier",
    control: "text",
  },
  {
    id: "version",
    label: "Version:",
    placeholder: "V1",
    source: "document",
    field: "version",
    control: "version",
  },
  {
    id: "creation-date",
    label: "Creation Date:",
    placeholder: "",
    source: "document",
    field: "createdDate",
    control: "date",
  },
  {
    id: "work-description",
    label: "Work Description:",
    placeholder: "Annual Preventative Maintenance",
    source: "procedure",
    field: "workDescription",
    control: "textarea",
  },
  {
    id: "component-type",
    label: "Component Type:",
    placeholder: "CRACs",
    source: "equipment",
    field: "equipmentType",
    control: "text",
  },
  {
    id: "manufacturer",
    label: "Manufacturer:",
    placeholder: "LIEBERT",
    source: "equipment",
    field: "manufacturer",
    control: "text",
  },
  {
    id: "model-number",
    label: "Model Number:",
    placeholder: "DA085DP1AD833B",
    source: "equipment",
    field: "modelNumber",
    control: "text",
  },
  {
    id: "serial-number",
    label: "Serial Number:",
    placeholder: "C16GCE0014",
    source: "equipment",
    field: "serialNumber",
    control: "text",
  },
  {
    id: "equipment-number",
    label: "Equipment Number:",
    placeholder: "CRAC 01",
    source: "equipment",
    field: "equipmentNumber",
    control: "text",
  },
  {
    id: "location",
    label: "Location:",
    placeholder: "MISSING",
    source: "equipment",
    field: "location",
    control: "text",
  },
  {
    id: "duration",
    label: "Duration:",
    placeholder:
      "6-8 hours. Annual preventative maintenance on CRAC units involves detailed inspections, filter changes, coil cleaning, and component testing, requiring a longer timeframe.",
    source: "procedure",
    field: "duration",
    control: "textarea",
  },
  {
    id: "lor",
    label: "Level of Risk (LOR):",
    placeholder: "",
    source: "procedure",
    field: "levelOfRisk",
    control: "lor",
  },
  {
    id: "cet-required",
    label: "CET Level Required:",
    placeholder:
      "CET-2 required to perform work\nStandard mechanical maintenance work",
    source: "procedure",
    field: "cetLevelRequired",
    control: "textarea",
  },
  {
    id: "author",
    label: "Author:",
    placeholder: "Enter Author Name",
    source: "document",
    field: "author",
    control: "text",
  },
  {
    id: "author-cet",
    label: "Author CET Level:",
    placeholder: "Enter Author CET level",
    source: "document",
    field: "authorCetLevel",
    control: "text",
  },
  {
    id: "approver",
    label: "Approver:",
    placeholder: "",
    source: "signOff",
    field: "approvedBy",
    control: "text",
  },
];

export const getLorHelper = (value: RiskLevelOrEmpty): string => {
  const found = MOP_SECTION_01_LOR_OPTIONS.find((o) => o.value === value);
  return found ? found.helper : "";
};

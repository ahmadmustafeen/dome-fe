import type { RiskLevelOrEmpty } from "@/types/mop";

export const EOP_SECTION_01_HEADING = "Section 01: EOP Identification & Control";

export type EopSection01LorOption = {
  value: RiskLevelOrEmpty;
  label: string;
  helper: string;
};

export const EOP_SECTION_01_LOR_OPTIONS: readonly EopSection01LorOption[] = [
  { value: "", label: "Select level", helper: "" },
  {
    value: "low",
    label: "Level 1 (Low)",
    helper: "Emergency response with low system impact.",
  },
  {
    value: "medium",
    label: "Level 2 (Medium)",
    helper: "Emergency response with moderate service impact.",
  },
  {
    value: "high",
    label: "Level 3 (High)",
    helper: "Emergency response procedure with critical system impact.",
  },
  {
    value: "critical",
    label: "Level 4 (Critical)",
    helper: "Critical impact with severe operational risk.",
  },
] as const;

export type EopSection01FieldRow =
  | {
      id: string;
      label: string;
      placeholder: string;
      source: "document";
      field: "title" | "identifier" | "createdDate" | "author" | "authorCetLevel";
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
        | "componentType"
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

export const EOP_SECTION_01_FIELD_ROWS: readonly EopSection01FieldRow[] = [
  {
    id: "eop-title",
    label: "EOP Title:",
    placeholder: "Air Handling Units - Power Failure",
    source: "document",
    field: "title",
    control: "text",
  },
  {
    id: "eop-identifier",
    label: "EOP Identifier:",
    placeholder: "TO BE ASSIGNED",
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
    placeholder: "Power Failure",
    source: "procedure",
    field: "workDescription",
    control: "textarea",
  },
  {
    id: "component-type",
    label: "Component Type:",
    placeholder: "Air Handling Units",
    source: "equipment",
    field: "componentType",
    control: "text",
  },
  {
    id: "manufacturer",
    label: "Manufacturer:",
    placeholder: "LENNOX",
    source: "equipment",
    field: "manufacturer",
    control: "text",
  },
  {
    id: "model-number",
    label: "Model Number:",
    placeholder: "HS29-060-13G",
    source: "equipment",
    field: "modelNumber",
    control: "text",
  },
  {
    id: "serial-number",
    label: "Serial Number:",
    placeholder: "5807C49911",
    source: "equipment",
    field: "serialNumber",
    control: "text",
  },
  {
    id: "equipment-number",
    label: "Equipment Number:",
    placeholder: "AHU 10 CDR",
    source: "equipment",
    field: "equipmentNumber",
    control: "text",
  },
  {
    id: "location",
    label: "Location:",
    placeholder: "Data Hall 1",
    source: "equipment",
    field: "location",
    control: "text",
  },
  {
    id: "duration",
    label: "Duration:",
    placeholder: "30-60 minutes",
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
      "CET-3 required to perform work\nEmergency response requiring technical expertise",
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
    placeholder: "Enter Author CET Level",
    source: "document",
    field: "authorCetLevel",
    control: "text",
  },
  {
    id: "approver",
    label: "Approver:",
    placeholder: "Enter Approver Name",
    source: "signOff",
    field: "approvedBy",
    control: "text",
  },
] as const;

export const getEopLorHelper = (value: RiskLevelOrEmpty): string => {
  const found = EOP_SECTION_01_LOR_OPTIONS.find((o) => o.value === value);
  return found ? found.helper : "";
};

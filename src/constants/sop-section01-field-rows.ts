export type SopSection01FieldRow =
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

export const SOP_SECTION_01_FIELD_ROWS: readonly SopSection01FieldRow[] = [
  ["sop-title", "SOP Title:", "", "document", "title", "text"],
  ["sop-identifier", "SOP Identifier:", "", "document", "identifier", "text"],
  ["version", "Version:", "", "document", "version", "version"],
  ["creation-date", "Creation Date:", "", "document", "createdDate", "date"],
  ["work-description", "Work Description:", "Weekly System Check", "procedure", "workDescription", "textarea"],
  ["component-type", "Component Type:", "", "equipment", "componentType", "text"],
  ["manufacturer", "Manufacturer:", "", "equipment", "manufacturer", "text"],
  ["model-number", "Model Number:", "", "equipment", "modelNumber", "text"],
  ["serial-number", "Serial Number:", "", "equipment", "serialNumber", "text"],
  ["equipment-number", "Equipment Number:", "", "equipment", "equipmentNumber", "text"],
  ["location", "Location:", "", "equipment", "location", "text"],
  ["duration", "Duration:", "", "procedure", "duration", "textarea"],
  ["lor", "Level of Risk (LOR):", "", "procedure", "levelOfRisk", "lor"],
  [
    "cet-required",
    "CET Level Required:",
    "CET-1 required to perform work - Basic rounds, readings, visual checks only",
    "procedure",
    "cetLevelRequired",
    "textarea",
  ],
  ["author", "Author:", "Enter author name", "document", "author", "text"],
  ["author-cet", "Author CET Level:", "Enter CET level", "document", "authorCetLevel", "text"],
  ["approver", "Approver:", "Enter approver name", "signOff", "approvedBy", "text"],
].map(([id, label, placeholder, source, field, control]) => ({
  id,
  label,
  placeholder,
  source,
  field,
  control,
})) as readonly SopSection01FieldRow[];

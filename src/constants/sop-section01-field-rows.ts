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
  ["sop-title", "SOP Title:", "Air Handling Units Weekly System Check", "document", "title", "text"],
  ["sop-identifier", "SOP Identifier:", "To be assigned", "document", "identifier", "text"],
  ["version", "Version:", "V1", "document", "version", "version"],
  ["creation-date", "Creation Date:", "", "document", "createdDate", "date"],
  ["work-description", "Work Description:", "Weekly System Check", "procedure", "workDescription", "textarea"],
  ["component-type", "Component Type:", "Air Handling Units", "equipment", "componentType", "text"],
  ["manufacturer", "Manufacturer:", "LENNOX", "equipment", "manufacturer", "text"],
  ["model-number", "Model Number:", "HS29-060-13G", "equipment", "modelNumber", "text"],
  ["serial-number", "Serial Number:", "5807C3674", "equipment", "serialNumber", "text"],
  ["equipment-number", "Equipment Number:", "AHU 15 CDR", "equipment", "equipmentNumber", "text"],
  ["location", "Location:", "MISSING", "equipment", "location", "text"],
  ["duration", "Duration:", "30-45 minutes", "procedure", "duration", "textarea"],
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

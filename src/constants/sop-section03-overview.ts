import type { SOPSection03Overview, SOPWorkDeliveryType } from "@/types/sop";

export const SOP_SECTION_03_HEADING = "Section 03: SOP Overview";

export const SOP_SECTION_03_DELIVERY_OPTIONS: {
  value: SOPWorkDeliveryType;
  label: string;
}[] = [
  { value: "self_delivered", label: "Self-Delivered" },
  { value: "vendor", label: "Vendor" },
];

export type SopSection03FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof SOPSection03Overview;
  control: "text" | "textarea";
};

export const SOP_SECTION_03_LEAD_FIELD_ROWS: readonly SopSection03FieldRow[] = [
  {
    id: "sop-title",
    label: "SOP Title:",
    placeholder: "Air Handling Units Weekly System Check",
    field: "sopTitle",
    control: "text",
  },
  {
    id: "work-area",
    label: "Work Area:",
    placeholder: "Enter work area",
    field: "workArea",
    control: "text",
  },
  {
    id: "building-floor-room",
    label: "Building/Floor/Room:",
    placeholder: "Enter building/floor/room",
    field: "buildingFloorRoom",
    control: "text",
  },
  {
    id: "access-requirements",
    label: "Access Requirements:",
    placeholder: "Enter access requirements",
    field: "accessRequirements",
    control: "text",
  },
];

export const SOP_SECTION_03_TAIL_FIELD_ROWS: readonly SopSection03FieldRow[] = [
  {
    id: "qualifications-required",
    label: "Qualifications Required:",
    placeholder: "Enter qualifications required",
    field: "qualificationsRequired",
    control: "textarea",
  },
  {
    id: "advance-notifications",
    label: "Advance notifications required:",
    placeholder: "Enter advance notifications required",
    field: "advanceNotifications",
    control: "textarea",
  },
  {
    id: "post-notifications",
    label: "Post notifications required:",
    placeholder: "Enter post notifications required",
    field: "postNotifications",
    control: "textarea",
  },
];

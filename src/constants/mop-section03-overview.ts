import type { MOPSection03Overview, MOPWorkDeliveryType } from "@/types/mop";

/** Section heading (`generateSection03` in portal `section-generators.js`). */
export const MOP_SECTION_03_HEADING = "Section 03: MOP Overview";

export const MOP_SECTION_03_DELIVERY_OPTIONS: {
  value: MOPWorkDeliveryType;
  label: string;
}[] = [
  { value: "self_delivered", label: "Self-Delivered" },
  { value: "subcontractor", label: "Subcontractor" },
];

export type MopSection03FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof MOPSection03Overview;
  control: "text" | "textarea";
};

/** Rows before the delivery / subcontractor block (portal `info-table`). */
export const MOP_SECTION_03_LEAD_FIELD_ROWS: readonly MopSection03FieldRow[] = [
  {
    id: "mop-title",
    label: "MOP Title:",
    placeholder: "MOP title",
    field: "mopTitle",
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
    placeholder: "Building/Floor/Room",
    field: "buildingFloorRoom",
    control: "text",
  },
  {
    id: "access-requirements",
    label: "Access Requirements:",
    placeholder: "Badge access, escort required, etc.",
    field: "accessRequirements",
    control: "text",
  },
];

/** Shown when `workDeliveryType` is `subcontractor` (portal `contractorFields`). */
export const MOP_SECTION_03_CONTRACTOR_FIELD_ROWS: readonly MopSection03FieldRow[] =
  [
    {
      id: "contractors-1-count",
      label: "# of Contractors #1:",
      placeholder: "Number",
      field: "contractors1Count",
      control: "text",
    },
    {
      id: "sub-company-1",
      label: "If Subcontractor - Company Name:",
      placeholder: "",
      field: "subcontractorCompany1",
      control: "text",
    },
    {
      id: "sub-personnel-1",
      label: "If Subcontractor - Personnel Name:",
      placeholder: "",
      field: "subcontractorPersonnel1",
      control: "text",
    },
    {
      id: "sub-contact-1",
      label: "If Subcontractor - Contact Details:",
      placeholder: "",
      field: "subcontractorContact1",
      control: "text",
    },
    {
      id: "contractors-2-count",
      label: "# of Contractors #2:",
      placeholder: "Number",
      field: "contractors2Count",
      control: "text",
    },
    {
      id: "sub-company-2",
      label: "If Subcontractor - Company Name:",
      placeholder: "",
      field: "subcontractorCompany2",
      control: "text",
    },
    {
      id: "sub-personnel-2",
      label: "If Subcontractor - Personnel Name:",
      placeholder: "",
      field: "subcontractorPersonnel2",
      control: "text",
    },
    {
      id: "sub-contact-2",
      label: "If Subcontractor - Contact Details:",
      placeholder: "",
      field: "subcontractorContact2",
      control: "text",
    },
  ];

export const MOP_SECTION_03_TAIL_FIELD_ROWS: readonly MopSection03FieldRow[] = [
  {
    id: "qualifications",
    label: "Qualifications Required:",
    placeholder:
      "Certifications, training, experience (HTML lists can be pasted for export)",
    field: "qualificationsRequired",
    control: "textarea",
  },
  {
    id: "advance-notifications",
    label: "Advance notifications required:",
    placeholder: "Advance notification requirements",
    field: "advanceNotifications",
    control: "textarea",
  },
  {
    id: "post-notifications",
    label: "Post notifications required:",
    placeholder: "Post notification requirements",
    field: "postNotifications",
    control: "textarea",
  },
];

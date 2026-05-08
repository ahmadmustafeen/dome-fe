import type { EOPSection03Overview, EOPWorkDeliveryType } from "@/types/eop";

export const EOP_SECTION_03_HEADING = "Section 03: EOP Overview";

export const EOP_SECTION_03_DELIVERY_OPTIONS: {
  value: EOPWorkDeliveryType;
  label: string;
}[] = [
  { value: "self_delivered", label: "Self-Delivered" },
  { value: "vendor", label: "Vendor" },
];

export type EopSection03FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof EOPSection03Overview;
  control: "text" | "textarea";
};

export const EOP_SECTION_03_LEAD_FIELD_ROWS: readonly EopSection03FieldRow[] = [
  {
    id: "eop-title",
    label: "EOP Title:",
    placeholder: "Air Handling Units - Power Failure",
    field: "eopTitle",
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

export const EOP_SECTION_03_TAIL_FIELD_ROWS: readonly EopSection03FieldRow[] = [
  {
    id: "qualifications-required",
    label: "Qualifications Required:",
    placeholder:
      "Minimum Certification: CET-3 Certified Technician\nManufacturer Requirement: Documented training on LENNOX or equivalent commercial Air Handling Units\nExperience Level: Minimum 3 years of experience working on critical cooling equipment",
    field: "qualificationsRequired",
    control: "textarea",
  },
  {
    id: "immediate-notifications",
    label: "Immediate notifications required:",
    placeholder:
      "Priority 1 (0-5 minutes): Notify Shift Supervisor and on-call CET-3 technician with Air Handling Units expertise.\nPriority 2 (5-15 minutes): Notify Facilities Manager and the Customer technical contact for Element Critical.\nEscalation Path: If the issue is not resolved within 30 minutes or impacts critical load, escalate to the Operations Manager.",
    field: "immediateNotifications",
    control: "textarea",
  },
  {
    id: "post-notifications",
    label: "Post notifications required:",
    placeholder:
      "Immediate (within 1 hour): Confirm with the Shift Supervisor that the AHU is stable or that the issue has been resolved.\nShort-term (1-4 hours): Notify the Operations Manager and customer technical contacts with a service restoration confirmation and preliminary cause.",
    field: "postNotifications",
    control: "textarea",
  },
];

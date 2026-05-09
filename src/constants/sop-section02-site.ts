import type { SOPSiteSection } from "@/types/sop";

export const SOP_SECTION_02_HEADING = "Section 02: Site Information";

export type SopSection02FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof SOPSiteSection;
};

export const SOP_SECTION_02_FIELD_ROWS: readonly SopSection02FieldRow[] = [
  {
    id: "customer",
    label: "Customer:",
    placeholder: "T5 Data Centers",
    field: "customer",
  },
  {
    id: "site-name",
    label: "Site Name:",
    placeholder: "T5 @ Chicago I",
    field: "siteName",
  },
  {
    id: "data-center-location",
    label: "Data Center Location:",
    placeholder: "MISSING",
    field: "dataCenterLocation",
  },
  {
    id: "site-address",
    label: "Site Address:",
    placeholder: "1000 Lunt Ave, Elk Grove Village, IL 60007",
    field: "siteAddress",
  },
  {
    id: "site-contact",
    label: "Site Contact:",
    placeholder: "Name, Phone, Job Title/Role",
    field: "siteContact",
  },
] as const;

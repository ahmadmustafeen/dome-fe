import type { EOPSiteSection } from "@/types/eop";

export const EOP_SECTION_02_HEADING = "Section 02: Site Information";

export type EopSection02FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof EOPSiteSection;
};

export const EOP_SECTION_02_FIELD_ROWS: readonly EopSection02FieldRow[] = [
  {
    id: "customer",
    label: "Customer:",
    placeholder: "Element Critical",
    field: "customer",
  },
  {
    id: "site-name",
    label: "Site Name:",
    placeholder: "Austin One",
    field: "siteName",
  },
  {
    id: "data-center-location",
    label: "Data Center Location:",
    placeholder: "Data Hall 1",
    field: "dataCenterLocation",
  },
  {
    id: "site-address",
    label: "Site Address:",
    placeholder: "8025 North Interstate Hwy 35, Austin, TX 78753",
    field: "siteAddress",
  },
  {
    id: "site-contact",
    label: "Site Contact:",
    placeholder: "Enter Site Contact Name/Number",
    field: "siteContact",
  },
] as const;

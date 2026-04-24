import type { MOPSiteSection } from "@/types/mop";

/** Section heading (`generateSection02` in portal `section-generators.js`). */
export const MOP_SECTION_02_HEADING = "Section 02: Site Information";

export type MopSection02FieldRow = {
  id: string;
  label: string;
  placeholder: string;
  field: keyof MOPSiteSection;
};

/** Same row order as portal HTML table. All values are editable inputs in DOME-FE. */
export const MOP_SECTION_02_FIELD_ROWS: readonly MopSection02FieldRow[] = [
  { id: "customer", label: "Customer:", placeholder: "", field: "customer" },
  { id: "site-name", label: "Site Name:", placeholder: "", field: "siteName" },
  {
    id: "data-center-location",
    label: "Data Center Location:",
    placeholder: "",
    field: "dataCenterLocation",
  },
  {
    id: "site-address",
    label: "Site Address:",
    placeholder: "Street, City, State ZIP",
    field: "siteAddress",
  },
  {
    id: "site-contact",
    label: "Site Contact:",
    placeholder: "Name, Phone, Job Title/Role",
    field: "siteContact",
  },
];

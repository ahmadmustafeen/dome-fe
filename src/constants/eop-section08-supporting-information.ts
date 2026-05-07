import type {
  EopSection08InfrastructureRow,
  EopSection08PolicyDocumentRow,
  EopSection08RelatedDocument,
  EopSection08SparePartRow,
} from "@/types/eop";

export const EOP_SECTION_08_HEADING = "Section 08: Supporting Information";

export const EOP_SECTION_08_POLICY_HEADING = "Company Policy Documents Consulted";

export const EOP_SECTION_08_POLICY_INTRO =
  "The following company emergency response policies were referenced during EOP creation. The specific requirements from these policies have been incorporated directly into the emergency procedure steps in Sections 04 and 05 above.";

export const EOP_SECTION_08_POLICY_NOTE =
  "Note: The emergency procedures in this EOP have been informed by the company policies listed above. All policy requirements have been expanded inline within the emergency action steps for immediate reference during emergencies.";

export const EOP_SECTION_08_INFRASTRUCTURE_HEADING =
  "Critical Infrastructure Locations";

export const EOP_SECTION_08_SPARE_PARTS_HEADING = "Spare Parts Inventory";

export const EOP_SECTION_08_SPARE_PARTS_INTRO =
  "Critical spare parts for LENNOX HS29-060-13G emergency response:";

export const EOP_SECTION_08_RELATED_DOCUMENTS_HEADING = "Related Documents";

export const EOP_SECTION_08_DEFAULT_POLICY_DOCUMENTS: EopSection08PolicyDocumentRow[] = [
  {
    id: "policy-doc-procedure-final",
    documentName: "Procedure Policy Final.pdf",
    uploadDate: "10/8/2025",
    documentType: "Company Policy",
  },
  {
    id: "policy-doc-contractor-escort",
    documentName: "EC Contractor Escort Policy.pdf",
    uploadDate: "10/15/2025",
    documentType: "Company Policy",
  },
];

export const EOP_SECTION_08_DEFAULT_INFRASTRUCTURE_ROWS: EopSection08InfrastructureRow[] = [
  {
    id: "infrastructure-lennox-location",
    infrastructureElement: "LENNOX HS29-060-13G Location",
    locationDetails: "",
    accessRequirements: "",
  },
  {
    id: "infrastructure-main-control-panel",
    infrastructureElement: "Main Control Panel",
    locationDetails: "",
    accessRequirements: "",
  },
];

export const EOP_SECTION_08_DEFAULT_SPARE_PARTS: EopSection08SparePartRow[] = [
  {
    id: "spare-part-main-breaker-fuses",
    partDescription: "Main Breaker/Fuses",
    partNumber: "",
    quantity: "",
    storageLocation: "",
  },
  {
    id: "spare-part-control-fuses",
    partDescription: "Control Fuses",
    partNumber: "",
    quantity: "",
    storageLocation: "",
  },
];

export const EOP_SECTION_08_DEFAULT_RELATED_DOCUMENTS: EopSection08RelatedDocument[] = [
  {
    id: "related-doc-equipment-system-drawings",
    label: "Equipment System Drawings",
    description: "Internal Document",
    href: "#",
  },
  {
    id: "related-doc-single-line-diagram",
    label: "Single Line Diagram",
    description: "Internal Document",
    href: "#",
  },
  {
    id: "related-doc-arc-flash-study",
    label: "Arc Flash Study",
    description: "Internal Document",
    href: "#",
  },
];

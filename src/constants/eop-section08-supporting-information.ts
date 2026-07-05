export const EOP_SECTION_08_HEADING = "Section 08: References and Documentation";

export const EOP_SECTION_08_POLICY_HEADING = "Company Policy Documents Consulted";

export const EOP_SECTION_08_POLICY_INTRO =
  "The following company emergency response policies were referenced during EOP creation. The specific requirements from these policies have been incorporated directly into the emergency procedure steps in Sections 04 and 05 above.";

export const EOP_SECTION_08_INFRASTRUCTURE_HEADING =
  "Critical Infrastructure Locations";

export const EOP_SECTION_08_SPARE_PARTS_HEADING = "Spare Parts Inventory";

export const EOP_SECTION_08_RELATED_DOCUMENTS_HEADING = "Related Documents";

export const newEopSection08PolicyDocumentRow = () => ({
  id: crypto.randomUUID(),
  documentName: "",
  uploadDate: "",
  documentType: "",
});

export const newEopSection08InfrastructureRow = () => ({
  id: crypto.randomUUID(),
  infrastructureElement: "",
  locationDetails: "",
  accessRequirements: "",
});

export const newEopSection08SparePartRow = () => ({
  id: crypto.randomUUID(),
  partDescription: "",
  partNumber: "",
  quantity: "",
  storageLocation: "",
});

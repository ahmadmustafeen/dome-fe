export const EOP_SECTION_05_HEADING =
  "Section 05: External Response Actions";

export const newEopSection05ExternalActionRow = () => ({
  id: crypto.randomUUID(),
  stepNumber: 0,
  externalEquipment: "",
  connectionToUnit: "",
  potentialFailureMode: "",
  verificationMethod: "",
  actualStatus: "",
  actualStatusPlaceholder: "",
  passFail: "" as const,
});

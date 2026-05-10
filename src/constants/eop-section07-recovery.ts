import type { EopSection07FunctionalityRow } from "@/types/eop";

export const EOP_SECTION_07_HEADING =
  "Section 07: Recovery & Return to Service";

export const newEopSection07ChecklistItem = () => ({
  id: crypto.randomUUID(),
  text: "",
  checked: false,
});

export const newEopSection07FunctionalityRow =
  (): EopSection07FunctionalityRow => ({
    id: crypto.randomUUID(),
    parameter: "",
    expectedRange: "",
    actualReading: "",
    actualReadingPlaceholder: "",
    passFail: "",
  });

/** Section heading (data centre portal wording). */
export const MOP_SECTION_02_HEADING = "Section 02: Site Information";

export const MOP_MBM_REQUIRED_OPTIONS = ["Yes", "No", "N/A"] as const;

export type MopMbmRequiredOption = (typeof MOP_MBM_REQUIRED_OPTIONS)[number];

export const MOP_SITE_LOR_LEVELS = ["1", "2", "3", "4"] as const;

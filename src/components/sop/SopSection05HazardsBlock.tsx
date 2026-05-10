"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopSiteHazardRow,
  SOP_SECTION_05_HAZARD_COLUMNS,
} from "@/constants/sop-section05-hazards";
import type { SOPSafetyRequirements, SOPSiteHazardRow } from "@/types/sop";

type SopSection05HazardsBlockProps = {
  rows: SOPSiteHazardRow[];
  patchSafety: (partial: Partial<SOPSafetyRequirements>) => void;
};

export const SopSection05HazardsBlock = ({
  rows,
  patchSafety,
}: SopSection05HazardsBlockProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      columns={SOP_SECTION_05_HAZARD_COLUMNS}
      ariaLabelGroup="SOP site hazards table row controls"
      newRow={newSopSiteHazardRow}
      onRowsChange={(siteHazardRows: SOPSiteHazardRow[]) =>
        patchSafety({ siteHazardRows })}
    />
  );
};

"use client";

import { Typography } from "@/components/common";
import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import { newMopSiteHazardRow, MOP_SECTION_05_HAZARDS_SUBHEADING } from "@/constants/mop-section05-safety";
import type { MOPSafety, MopSiteHazardRow } from "@/types/mop";

type MopSection05HazardsBlockProps = {
  rows: MopSiteHazardRow[];
  patchSafety: (partial: Partial<MOPSafety>) => void;
};

export const MopSection05HazardsBlock = ({ rows, patchSafety }: MopSection05HazardsBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <Typography variant="h6" className="mb-4 capitalize text-base font-semibold text-gray-900">
        {MOP_SECTION_05_HAZARDS_SUBHEADING}
      </Typography>
      <ProcedureEditableRowsTable
        rows={rows}
        columns={[
          { header: "Hazard Type", field: "hazardType" },
          { header: "Description", field: "description" },
          { header: "Control Measures", field: "controlMeasures" },
        ]}
        className="bg-[#0F3456]!"
        ariaLabelGroup="MOP site hazards table row controls"
        newRow={newMopSiteHazardRow}
        onRowsChange={(siteHazardRows: MopSiteHazardRow[]) =>
          patchSafety({ siteHazardRows })}
      />
    </div>
  );
};

"use client";

import { ProcedureEditableRowsTable } from "@/components/procedure/ProcedureEditableRowsTable";
import {
  newSopEmergencyContactRow,
  SOP_SECTION_05_EMERGENCY_COLUMNS,
} from "@/constants/sop-section05-safety";
import type {
  SOPEmergencyContactRow,
  SOPSafetyRequirements,
} from "@/types/sop";

type SopSection05EmergencyBlockProps = {
  rows: SOPEmergencyContactRow[];
  patchSafety: (partial: Partial<SOPSafetyRequirements>) => void;
};

export const SopSection05EmergencyBlock = ({
  rows,
  patchSafety,
}: SopSection05EmergencyBlockProps) => {
  return (
    <ProcedureEditableRowsTable
      rows={rows}
      columns={SOP_SECTION_05_EMERGENCY_COLUMNS}
      ariaLabelGroup="SOP emergency contacts table row controls"
      newRow={newSopEmergencyContactRow}
      onRowsChange={(emergencyContactRows: SOPEmergencyContactRow[]) =>
        patchSafety({ emergencyContactRows })}
    />
  );
};

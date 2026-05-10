"use client";

import { ProcedureFacilityEffectTable } from "@/components/procedure/ProcedureFacilityEffectTable";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  SOP_SECTION_04_HEADING,
  SOP_SECTION_04_SYSTEM_ROWS,
} from "@/constants/sop-section04-facility";
import type { SOPFacilityEffectRow } from "@/types/sop";

type SopSection04FacilityProps = {
  facilityEffects: SOPFacilityEffectRow[];
  patchFacilityEffects: (rows: SOPFacilityEffectRow[]) => void;
};

export const SopSection04Facility = ({
  facilityEffects,
  patchFacilityEffects,
}: SopSection04FacilityProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_04_HEADING}>
        <ProcedureFacilityEffectTable
          systemRows={SOP_SECTION_04_SYSTEM_ROWS}
          effects={facilityEffects}
          namePrefix="sop-facility"
          clearDetailsWhenNotYes={false}
          onChange={patchFacilityEffects}
        />
      </ProcedureSectionCard>
    </div>
  );
};

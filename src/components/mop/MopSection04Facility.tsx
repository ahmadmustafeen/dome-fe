import { ProcedureFacilityEffectTable } from "@/components/procedure/ProcedureFacilityEffectTable";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  MOP_SECTION_04_HEADING,
  MOP_SECTION_04_SYSTEM_ROWS,
} from "@/constants/mop-section04-facility";
import type { MopFacilityEffectRow } from "@/types/mop";

type MopSection04FacilityProps = {
  facilityEffects: MopFacilityEffectRow[];
  patchFacilityEffects: (rows: MopFacilityEffectRow[]) => void;
};

export const MopSection04Facility = ({
  facilityEffects,
  patchFacilityEffects,
}: MopSection04FacilityProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={MOP_SECTION_04_HEADING}>
        <ProcedureFacilityEffectTable
          systemRows={MOP_SECTION_04_SYSTEM_ROWS}
          effects={facilityEffects}
          namePrefix="mop-facility"
          onChange={patchFacilityEffects}
        />
      </ProcedureSectionCard>
    </div>
  );
};

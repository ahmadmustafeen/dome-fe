import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { MOP_SECTION_01_HEADING } from "@/constants/mop-form";
import type { MOP } from "@/types/mop";

import { MopSection01FieldRows } from "./MopSection01FieldRows";

type MopSection01ScheduleProps = {
  mop: MOP;
  patchDocument: (p: Partial<MOP["document"]>) => void;
  patchEquipment: (p: Partial<MOP["equipment"]>) => void;
  patchProcedure: (p: Partial<MOP["procedure"]>) => void;
  patchSignOff: (p: Partial<MOP["signOff"]>) => void;
};

export const MopSection01Schedule = ({
  mop,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
}: MopSection01ScheduleProps) => {
  return (
    <ProcedureSectionCard heading={MOP_SECTION_01_HEADING}>
      <div>
        <MopSection01FieldRows
          mop={mop}
          patchDocument={patchDocument}
          patchEquipment={patchEquipment}
          patchProcedure={patchProcedure}
          patchSignOff={patchSignOff}
        />
      </div>
    </ProcedureSectionCard>
  );
};

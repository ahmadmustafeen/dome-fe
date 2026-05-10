"use client";

import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { SOP_SECTION_01_HEADING } from "@/constants/sop-section01-fields";
import type { SOP } from "@/types/sop";

import { SopSection01FieldRows } from "./SopSection01FieldRows";

type SopSection01ScheduleProps = {
  sop: SOP;
  patchDocument: (partial: Partial<SOP["document"]>) => void;
  patchEquipment: (partial: Partial<SOP["equipment"]>) => void;
  patchProcedure: (partial: Partial<SOP["procedure"]>) => void;
  patchSignOff: (partial: Partial<SOP["signOff"]>) => void;
};

export const SopSection01Schedule = ({
  sop,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
}: SopSection01ScheduleProps) => {
  return (
    <ProcedureSectionCard heading={SOP_SECTION_01_HEADING}>
      <SopSection01FieldRows
        sop={sop}
        patchDocument={patchDocument}
        patchEquipment={patchEquipment}
        patchProcedure={patchProcedure}
        patchSignOff={patchSignOff}
      />
    </ProcedureSectionCard>
  );
};

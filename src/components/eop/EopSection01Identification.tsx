import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { EOP_SECTION_01_HEADING } from "@/constants/eop-section01-fields";
import type { EOP } from "@/types/eop";

import { EopSection01FieldRows } from "./EopSection01FieldRows";

type EopSection01IdentificationProps = {
  eop: EOP;
  patchDocument: (p: Partial<EOP["document"]>) => void;
  patchEquipment: (p: Partial<EOP["equipment"]>) => void;
  patchProcedure: (p: Partial<EOP["procedure"]>) => void;
  patchSignOff: (p: Partial<EOP["signOff"]>) => void;
};

export const EopSection01Identification = ({
  eop,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
}: EopSection01IdentificationProps) => {
  return (
    <ProcedureSectionCard heading={EOP_SECTION_01_HEADING}>
      <EopSection01FieldRows
        eop={eop}
        patchDocument={patchDocument}
        patchEquipment={patchEquipment}
        patchProcedure={patchProcedure}
        patchSignOff={patchSignOff}
      />
    </ProcedureSectionCard>
  );
};

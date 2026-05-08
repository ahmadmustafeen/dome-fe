"use client";

import { Typography } from "@/components/common";
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
    <div className="rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_01_HEADING}
      </Typography>

      <EopSection01FieldRows
        eop={eop}
        patchDocument={patchDocument}
        patchEquipment={patchEquipment}
        patchProcedure={patchProcedure}
        patchSignOff={patchSignOff}
      />
    </div>
  );
};

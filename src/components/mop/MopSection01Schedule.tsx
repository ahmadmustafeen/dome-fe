"use client";

import { Typography } from "@/components/common";
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
    <div className="rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_01_HEADING}
      </Typography>

      <div>
        <MopSection01FieldRows
          mop={mop}
          patchDocument={patchDocument}
          patchEquipment={patchEquipment}
          patchProcedure={patchProcedure}
          patchSignOff={patchSignOff}
        />
      </div>
    </div>
  );
};

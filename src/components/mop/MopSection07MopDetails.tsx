"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_07_HEADING } from "@/constants/mop-section07-details";

import type { MOPSection07Details } from "@/types/mop";

import { MopSection07EnginePerformance } from "./MopSection07EnginePerformance";
import { MopSection07FaultHistory } from "./MopSection07FaultHistory";
import { MopSection07GeneratorLog } from "./MopSection07GeneratorLog";
import { MopSection07HeaderFields } from "./MopSection07HeaderFields";
import { MopSection07ImportantIndicators } from "./MopSection07ImportantIndicators";
import { MopSection07ProcedureSteps } from "./MopSection07ProcedureSteps";

type MopSection07MopDetailsProps = {
  details: MOPSection07Details;
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
};

export const MopSection07MopDetails = ({ details, patchMopDetails }: MopSection07MopDetailsProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-4 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_07_HEADING}
      </Typography>
      <MopSection07HeaderFields details={details} patchMopDetails={patchMopDetails} />
      <MopSection07GeneratorLog
        rows={details.generatorOperationalRows}
        patchMopDetails={patchMopDetails}
      />
      <MopSection07EnginePerformance
        rows={details.enginePerformanceRows}
        patchMopDetails={patchMopDetails}
      />
      <MopSection07FaultHistory
        rows={details.faultAlarmHistoryRows}
        patchMopDetails={patchMopDetails}
      />
      <MopSection07ImportantIndicators />
      <MopSection07ProcedureSteps details={details} patchMopDetails={patchMopDetails} />
    </div>
  );
};

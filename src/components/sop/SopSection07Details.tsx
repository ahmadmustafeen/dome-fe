"use client";

import { Typography } from "@/components/common";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import {
  SOP_SECTION_07_DETAILED_STEPS_SUBHEADING,
  SOP_SECTION_07_HEADING,
  SOP_SECTION_07_PRE_CHECKS_SUBHEADING,
} from "@/constants/sop-section07-details";
import type { SOPDetails } from "@/types/sop";
import { MOP_SECTION_07_IMPORTANT_INDICATORS } from "@/constants/mop-section07-important-indicators";
import { SopSection07IndicatorIcon } from "./SopSection07IndicatorIcons";

import { SopSection07DetailedProcedureSteps } from "./SopSection07DetailedProcedureSteps";
import { SopSection07PreProcedureChecks } from "./SopSection07PreProcedureChecks";

type SopSection07DetailsProps = {
  details: SOPDetails;
  patchDetails: (partial: Partial<SOPDetails>) => void;
};

export const SopSection07Details = ({
  details,
  patchDetails,
}: SopSection07DetailsProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_07_HEADING}>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_07_PRE_CHECKS_SUBHEADING}
          </Typography>
          <SopSection07PreProcedureChecks
            rows={details?.preProcedureCheckRows}
            patchDetails={patchDetails}
          />
        </div>
        <div className="mb-4">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            Important Indicators
          </Typography>
          <table className="w-full border-collapse text-sm ">
            <thead className="bg-[#0F4D2E]">
              <tr className="text-white">
                <th className="border border-black p-3 text-left">Icon</th>
                <th className="border border-black min-w-20 p-3 text-left">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {MOP_SECTION_07_IMPORTANT_INDICATORS.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 1 ? "bg-gray-200" : ""}
                >
                  <td className="border border-black min-w-20 p-3 align-top">
                    <div className="flex justify-center items-center h-full">
                      <SopSection07IndicatorIcon
                        indicatorId={row.id}
                        className="h-6 w-6"
                        aria-hidden
                      />
                    </div>
                  </td>
                  <td className="border border-black p-3 align-top">
                    <span className="font-semibold">{row.title}</span>{" "}
                    <span>{row.body}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-8 last:mb-0">
          <Typography
            variant="h6"
            className="mb-2 text-base font-semibold text-gray-900"
          >
            {SOP_SECTION_07_DETAILED_STEPS_SUBHEADING}
          </Typography>

          <SopSection07DetailedProcedureSteps
            rows={details?.detailedProcedureStepRows}
            patchDetails={patchDetails}
          />
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

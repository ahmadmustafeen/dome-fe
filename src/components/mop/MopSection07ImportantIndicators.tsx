"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_07_IMPORTANT_SUBHEADING } from "@/constants/mop-section07-details";
import { MOP_SECTION_07_IMPORTANT_INDICATORS } from "@/constants/mop-section07-important-indicators";

import { MopSection07IndicatorIcon } from "./MopSection07IndicatorIcons";

export const MopSection07ImportantIndicators = () => {
  return (
    <div>
      <Typography
        variant="h6"
        className="mb-3 text-base font-semibold capitalize text-gray-900"
      >
        {MOP_SECTION_07_IMPORTANT_SUBHEADING}
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#0f3456] text-white">
              <th className="w-20 px-3 py-2 text-center font-semibold">Icon</th>
              <th className="px-3 py-2 text-left font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {MOP_SECTION_07_IMPORTANT_INDICATORS.map((row) => (
              <tr key={row.id} className="bg-white">
                <td className="border border-gray-200 px-2 py-2 text-center align-middle text-[#0f3456]">
                  <span className="inline-flex justify-center" aria-hidden>
                    <MopSection07IndicatorIcon
                      indicatorId={row.id}
                      className="h-6 w-6"
                      aria-hidden
                    />
                  </span>
                </td>
                <td className="border border-gray-200 px-3 py-2 text-gray-800">
                  <span className="font-semibold">{row.title}:</span> {row.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

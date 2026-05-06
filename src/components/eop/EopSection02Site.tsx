"use client";

import { Typography } from "@/components/common";
import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { Input } from "@/components/ui/Input";
import {
  EOP_SECTION_02_FIELD_ROWS,
  EOP_SECTION_02_HEADING,
} from "@/constants/eop-section02-site";
import type { EOPSiteSection } from "@/types/eop";

type EopSection02SiteProps = {
  site: EOPSiteSection;
  patchSite: (p: Partial<EOPSiteSection>) => void;
};

export const EopSection02Site = ({ site, patchSite }: EopSection02SiteProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_02_HEADING}
      </Typography>

      <div>
        {EOP_SECTION_02_FIELD_ROWS.map((row) => (
          <MopFormTableRow key={row.id} label={row.label}>
            <Input
              value={site[row.field]}
              onChange={(e) => {
                patchSite({ [row.field]: e.target.value } as Partial<EOPSiteSection>);
              }}
              placeholder={row.placeholder}
            />
          </MopFormTableRow>
        ))}
      </div>
    </div>
  );
};

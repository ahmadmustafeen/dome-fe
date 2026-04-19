"use client";

import { Typography } from "@/components/common";
import { Input } from "@/components/ui/Input";
import {
  MOP_SECTION_02_FIELD_ROWS,
  MOP_SECTION_02_HEADING,
} from "@/constants/mop-section02-site";
import type { MOPSiteSection } from "@/types/mop";

import { MopFormTableRow } from "./MopFormTableRow";

type MopSection02SiteProps = {
  site: MOPSiteSection;
  patchSite: (p: Partial<MOPSiteSection>) => void;
};

export const MopSection02Site = ({ site, patchSite }: MopSection02SiteProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_02_HEADING}
      </Typography>

      <div>
        {MOP_SECTION_02_FIELD_ROWS.map((row) => (
          <MopFormTableRow key={row.id} label={row.label}>
            <Input
              value={site[row.field]}
              onChange={(e) => {
                patchSite({ [row.field]: e.target.value } as Partial<MOPSiteSection>);
              }}
              placeholder={row.placeholder}
            />
          </MopFormTableRow>
        ))}
      </div>
    </div>
  );
};

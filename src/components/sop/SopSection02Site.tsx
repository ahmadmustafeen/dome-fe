"use client";

import { MopFormTableRow } from "@/components/mop/MopFormTableRow";
import { ProcedureSectionCard } from "@/components/procedure/ProcedureSectionCard";
import { Input } from "@/components/ui/Input";
import {
  SOP_SECTION_02_FIELD_ROWS,
  SOP_SECTION_02_HEADING,
} from "@/constants/sop-section02-site";
import type { SOPSiteSection } from "@/types/sop";

type SopSection02SiteProps = {
  site: SOPSiteSection;
  patchSite: (partial: Partial<SOPSiteSection>) => void;
};

export const SopSection02Site = ({ site, patchSite }: SopSection02SiteProps) => {
  return (
    <div className="mt-5 sm:mt-6">
      <ProcedureSectionCard heading={SOP_SECTION_02_HEADING}>
        <div>
          {SOP_SECTION_02_FIELD_ROWS?.map((row) => (
            <MopFormTableRow key={row.id} label={row.label}>
              <Input
                value={site?.[row.field]}
                onChange={(event) => {
                  patchSite({ [row.field]: event.target.value });
                }}
                placeholder={row.placeholder}
              />
            </MopFormTableRow>
          ))}
        </div>
      </ProcedureSectionCard>
    </div>
  );
};

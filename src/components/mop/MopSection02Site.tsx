"use client";

import { Typography } from "@/components/common";
import {
  MOP_MBM_REQUIRED_OPTIONS,
  MOP_SECTION_02_HEADING,
  MOP_SITE_LOR_LEVELS,
} from "@/constants/mop-section02-site";
import type { MOPMbm, MOPSiteSection } from "@/types/mop";

import { MopFormTableRow } from "./MopFormTableRow";

type MopSection02SiteProps = {
  site: MOPSiteSection;
  patchSite: (p: Partial<MOPSiteSection>) => void;
};

export const MopSection02Site = ({
  site,
  patchSite,
}: MopSection02SiteProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {MOP_SECTION_02_HEADING}
      </Typography>

      <div>
        <MopFormTableRow label="Customer:">
          <input
            className="mop-doc-input"
            value={site.customer}
            onChange={(e) => patchSite({ customer: e.target.value })}
            placeholder="Customer name"
          />
        </MopFormTableRow>

        <MopFormTableRow label="Site Name:">
          <input
            className="mop-doc-input"
            value={site.siteName}
            onChange={(e) => patchSite({ siteName: e.target.value })}
            placeholder="Site or facility name"
          />
        </MopFormTableRow>

        <MopFormTableRow label="Site Contact:">
          <input
            className="mop-doc-input"
            value={site.contact}
            onChange={(e) => patchSite({ contact: e.target.value })}
            placeholder="Name, phone, job title / role"
          />
        </MopFormTableRow>

        <MopFormTableRow label="Street:">
          <input
            className="mop-doc-input"
            value={site.street}
            onChange={(e) => patchSite({ street: e.target.value })}
            placeholder="Street address"
          />
        </MopFormTableRow>

        <MopFormTableRow label="City:">
          <input
            className="mop-doc-input"
            value={site.city}
            onChange={(e) => patchSite({ city: e.target.value })}
            placeholder="City"
          />
        </MopFormTableRow>

        <MopFormTableRow label="State:">
          <input
            className="mop-doc-input"
            value={site.state}
            onChange={(e) => patchSite({ state: e.target.value })}
            placeholder="State"
          />
        </MopFormTableRow>

        <MopFormTableRow label="ZIP Code:">
          <input
            className="mop-doc-input"
            value={site.zip}
            onChange={(e) => patchSite({ zip: e.target.value })}
            placeholder="ZIP code"
          />
        </MopFormTableRow>

        <MopFormTableRow label="Service Ticket / Project Number:">
          <input
            className="mop-doc-input"
            value={site.serviceTicket}
            onChange={(e) => patchSite({ serviceTicket: e.target.value })}
            placeholder="Ticket or project number"
          />
        </MopFormTableRow>

        <MopFormTableRow label="Level of Risk:">
          <select
            className="mop-doc-input"
            value={site.levelOfRiskNumeric}
            onChange={(e) => patchSite({ levelOfRiskNumeric: e.target.value })}
          >
            <option value="">Select level</option>
            {MOP_SITE_LOR_LEVELS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </MopFormTableRow>

        <MopFormTableRow label="MBM Required?:">
          <select
            className="mop-doc-input"
            value={site.mbm}
            onChange={(e) => patchSite({ mbm: e.target.value as MOPMbm })}
          >
            <option value="">Select</option>
            {MOP_MBM_REQUIRED_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </MopFormTableRow>
      </div>
    </div>
  );
};

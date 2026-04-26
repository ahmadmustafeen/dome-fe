"use client";

import "@/styles/mop-document.css";

import { Typography } from "@/components/common";
import { MOP_PAGE_SUBTITLE } from "@/constants/mop-form";
import type {
  MOP,
  MOPAssumptions,
  MopFacilityEffectRow,
  MopFacilitySystemKey,
  MOPSafety,
  MOPSection07Details,
} from "@/types/mop";

import { MopPortalShell } from "./MopPortalShell";
import { MopSection01Schedule } from "./MopSection01Schedule";
import { MopSection02Site } from "./MopSection02Site";
import { MopSection03Overview } from "./MopSection03Overview";
import { MopSection04Facility } from "./MopSection04Facility";
import { MopSection05Safety } from "./MopSection05Safety";
import { MopSection06Assumptions } from "./MopSection06Assumptions";
import { MopSection07MopDetails } from "./MopSection07MopDetails";

type MopDocumentFormProps = {
  mop: MOP;
  isBootstrapping: boolean;
  patchDocument: (p: Partial<MOP["document"]>) => void;
  patchEquipment: (p: Partial<MOP["equipment"]>) => void;
  patchProcedure: (p: Partial<MOP["procedure"]>) => void;
  patchSignOff: (p: Partial<MOP["signOff"]>) => void;
  patchSite: (p: Partial<MOP["site"]>) => void;
  patchOverview: (p: Partial<MOP["overview"]>) => void;
  patchSafety: (p: Partial<MOPSafety>) => void;
  patchAssumptions: (p: Partial<MOPAssumptions>) => void;
  patchMopDetails: (p: Partial<MOPSection07Details>) => void;
  patchFacilityRow: (
    systemKey: MopFacilitySystemKey,
    partial: Partial<Pick<MopFacilityEffectRow, "choice" | "details">>,
  ) => void;
};

export const MopDocumentForm = ({
  mop,
  isBootstrapping,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
  patchSite,
  patchOverview,
  patchSafety,
  patchAssumptions,
  patchMopDetails,
  patchFacilityRow,
}: MopDocumentFormProps) => {
  return (
    <div className="mop-portal-form-root min-h-0 flex-1 overflow-y-auto bg-linear-to-b from-white to-[#f9fafb] py-2 pr-1 pb-6">
      <MopPortalShell bannerSubtitle={MOP_PAGE_SUBTITLE}>
        {isBootstrapping ? (
          <Typography variant="p" className="text-gray-500">
            Loading example MOP…
          </Typography>
        ) : (
          <>
            <MopSection01Schedule
              mop={mop}
              patchDocument={patchDocument}
              patchEquipment={patchEquipment}
              patchProcedure={patchProcedure}
              patchSignOff={patchSignOff}
            />
            <MopSection02Site site={mop.site} patchSite={patchSite} />
            <MopSection03Overview
              overview={mop.overview}
              patchOverview={patchOverview}
            />
            <MopSection04Facility
              facilityEffects={mop.facilityEffects}
              patchFacilityRow={patchFacilityRow}
            />
            <MopSection05Safety safety={mop.safety} patchSafety={patchSafety} />
            <MopSection06Assumptions
              assumptions={mop.assumptions}
              patchAssumptions={patchAssumptions}
            />
            <MopSection07MopDetails
              details={mop.mopDetails}
              patchMopDetails={patchMopDetails}
            />
          </>
        )}
      </MopPortalShell>
    </div>
  );
};

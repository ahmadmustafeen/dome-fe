"use client";

import "@/styles/mop-document.css";

import { Typography } from "@/components/common";
import { MopPortalShell } from "@/components/mop/MopPortalShell";
import type { SOP } from "@/types/sop";

import { SopSection01Schedule } from "./SopSection01Schedule";
import { SopSection02Site } from "./SopSection02Site";
import { SopSection03Overview } from "./SopSection03Overview";
import { SopSection04Facility } from "./SopSection04Facility";
import { SopSection05Safety } from "./SopSection05Safety";
import { SopSection06RisksAssumptions } from "./SopSection06RisksAssumptions";
import { SopSection07Details } from "./SopSection07Details";
import { SopSection08BackOutProcedures } from "./SopSection08BackOutProcedures";

type SopDocumentFormProps = {
  sop: SOP;
  isBootstrapping: boolean;
  patchDocument: (partial: Partial<SOP["document"]>) => void;
  patchEquipment: (partial: Partial<SOP["equipment"]>) => void;
  patchProcedure: (partial: Partial<SOP["procedure"]>) => void;
  patchSignOff: (partial: Partial<SOP["signOff"]>) => void;
  patchSite: (partial: Partial<SOP["site"]>) => void;
  patchOverview: (partial: Partial<SOP["overview"]>) => void;
  patchFacilityEffects: (rows: SOP["facilityEffects"]) => void;
  patchSafety: (partial: Partial<SOP["safety"]>) => void;
  patchRisksAssumptions: (partial: Partial<SOP["risksAssumptions"]>) => void;
  patchDetails: (partial: Partial<SOP["details"]>) => void;
  patchBackOutProcedures: (
    partial: Partial<SOP["backOutProcedures"]>,
  ) => void;
};

export const SopDocumentForm = ({
  sop,
  isBootstrapping,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
  patchSite,
  patchOverview,
  patchFacilityEffects,
  patchSafety,
  patchRisksAssumptions,
  patchDetails,
  patchBackOutProcedures,
}: SopDocumentFormProps) => {
  const bannerTitle =
    sop.document.title.trim() !== ""
      ? sop.document.title.trim()
      : "Standard Operating Procedure";

  return (
    <div className="mop-portal-form-root min-h-0 w-full flex-1 overflow-x-hidden bg-linear-to-b from-white to-[#f9fafb] py-2 pr-1 pb-6">
      <MopPortalShell bannerSubtitle={bannerTitle}>
        {isBootstrapping ? (
          <Typography variant="p" className="text-gray-500">
            Loading SOP...
          </Typography>
        ) : (
          <>
            <SopSection01Schedule
              sop={sop}
              patchDocument={patchDocument}
              patchEquipment={patchEquipment}
              patchProcedure={patchProcedure}
              patchSignOff={patchSignOff}
            />
            <SopSection02Site site={sop.site} patchSite={patchSite} />
            <SopSection03Overview
              overview={sop.overview}
              patchOverview={patchOverview}
            />
            <SopSection04Facility
              facilityEffects={sop.facilityEffects}
              patchFacilityEffects={patchFacilityEffects}
            />
            <SopSection05Safety safety={sop.safety} patchSafety={patchSafety} />
            <SopSection06RisksAssumptions
              risksAssumptions={sop.risksAssumptions}
              patchRisksAssumptions={patchRisksAssumptions}
            />
            <SopSection07Details
              details={sop.details}
              patchDetails={patchDetails}
            />
            <SopSection08BackOutProcedures
              backOutProcedures={sop.backOutProcedures}
              patchBackOutProcedures={patchBackOutProcedures}
            />
          </>
        )}
      </MopPortalShell>
    </div>
  );
};

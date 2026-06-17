"use client";

import "@/styles/mop-document.css";

import { Typography } from "@/components/common";
import type {
  MOP,
  MOPAssumptions,
  MopFacilityEffectRow,
  MOPSafety,
  MOPSection07Details,
  MOPSection08BackOut,
  MOPSection09MopApproval,
  MOPSection10MopComments,
  MOPSection11References,
} from "@/types/mop";

import { MopPortalShell } from "./MopPortalShell";
import { MopSection01Schedule } from "./MopSection01Schedule";
import { MopSection02Site } from "./MopSection02Site";
import { MopSection03Overview } from "./MopSection03Overview";
import { MopSection04Facility } from "./MopSection04Facility";
import { MopSection05Safety } from "./MopSection05Safety";
import { MopSection06Assumptions } from "./MopSection06Assumptions";
import { MopSection07MopDetails } from "./MopSection07MopDetails";
import { MopSection08BackOut as MopSection08BackOutForm } from "./MopSection08BackOut";
import { MopSection09MopApproval as MopSection09MopApprovalForm } from "./MopSection09MopApproval";
import { MopSection10MopComments as MopSection10MopCommentsForm } from "./MopSection10MopComments";
import { MopSection11ReferencesBlock } from "./MopSection11References";

type MopDocumentFormProps = {
  mop: MOP;
  asset: {
    name: string
  }
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
  patchBackOut: (p: Partial<MOPSection08BackOut>) => void;
  patchMopApproval: (p: Partial<MOPSection09MopApproval>) => void;
  patchMopComments: (p: Partial<MOPSection10MopComments>) => void;
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
  patchFacilityEffects: (rows: MopFacilityEffectRow[]) => void;
  patchSteps: (rows: MOP["steps"]) => void;
};

export const MopDocumentForm = ({
  mop,
  asset,
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
  patchBackOut,
  patchMopApproval,
  patchMopComments,
  patchMopReferences,
  patchFacilityEffects,
  patchSteps,
}: MopDocumentFormProps) => {
  return (
    <div className="mop-portal-form-root min-h-0 w-full flex-1 overflow-x-hidden bg-linear-to-b from-white to-[#f9fafb] py-2 pr-1 pb-6">
      <MopPortalShell bannerSubtitle={mop.document.title || "Loading"} type="mop">
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
              patchFacilityEffects={patchFacilityEffects}
            />
            <MopSection05Safety safety={mop.safety}
              mopTitle={mop.document.title}
              patchSafety={patchSafety} assetName={asset?.name!} />
            <MopSection06Assumptions
              assumptions={mop.assumptions}
              patchAssumptions={patchAssumptions}
              assetName={asset?.name!}
            />
            <MopSection07MopDetails
              steps={mop.steps}
              patchSteps={patchSteps}
              details={mop.mopDetails}
              assetName={asset?.name!}
              patchMopDetails={patchMopDetails}
            />
            <MopSection08BackOutForm
              backOut={mop.backOut}
              patchBackOut={patchBackOut}
            />
            <MopSection09MopApprovalForm
              mopApproval={mop.mopApproval}
              patchMopApproval={patchMopApproval}
            />
            <MopSection10MopCommentsForm
              mopComments={mop.mopComments}
              patchMopComments={patchMopComments}
            />
            <MopSection11ReferencesBlock
              references={mop.references}
              patchMopReferences={patchMopReferences}
            />
          </>
        )}
      </MopPortalShell>
    </div>
  );
};

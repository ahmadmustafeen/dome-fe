"use client";

import "@/styles/mop-document.css";

import { Typography } from "@/components/common";
import { MOP_PAGE_SUBTITLE } from "@/constants/mop-section01-schedule";
import type { MOP } from "@/types/mop";

import { MopPortalShell } from "./MopPortalShell";
import { MopSection01Schedule } from "./MopSection01Schedule";
import { MopSection02Site } from "./MopSection02Site";

type MopDocumentFormProps = {
  mop: MOP;
  isBootstrapping: boolean;
  patchDocument: (p: Partial<MOP["document"]>) => void;
  patchEquipment: (p: Partial<MOP["equipment"]>) => void;
  patchProcedure: (p: Partial<MOP["procedure"]>) => void;
  patchSignOff: (p: Partial<MOP["signOff"]>) => void;
  patchSite: (p: Partial<MOP["site"]>) => void;
};

export const MopDocumentForm = ({
  mop,
  isBootstrapping,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
  patchSite,
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
          </>
        )}
      </MopPortalShell>
    </div>
  );
};

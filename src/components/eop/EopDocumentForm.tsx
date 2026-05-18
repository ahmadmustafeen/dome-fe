"use client";

import "@/styles/mop-document.css";

import { Typography } from "@/components/common";
import { MopPortalShell } from "@/components/mop/MopPortalShell";
import type { EOP } from "@/types/eop";

import { EopSection01Identification } from "./EopSection01Identification";
import { EopSection02Site } from "./EopSection02Site";
import { EopSection03Overview } from "./EopSection03Overview";
import { EopSection04ImmediateActionsSection } from "./EopSection04ImmediateActions";
import { EopSection05ExternalActions } from "./EopSection05ExternalActions";
import { EopSection06Communication } from "./EopSection06Communication";
import { EopSection07Recovery } from "./EopSection07Recovery";
import { EopSection08SupportingInformationSection } from "./EopSection08SupportingInformation";
import { EopSection09ApprovalReview } from "./EopSection09ApprovalReview";

type EopDocumentFormProps = {
  eop: EOP;
  isBootstrapping: boolean;
  patchDocument: (p: Partial<EOP["document"]>) => void;
  patchEquipment: (p: Partial<EOP["equipment"]>) => void;
  patchProcedure: (p: Partial<EOP["procedure"]>) => void;
  patchSignOff: (p: Partial<EOP["signOff"]>) => void;
  patchSite: (p: Partial<EOP["site"]>) => void;
  patchOverview: (p: Partial<EOP["overview"]>) => void;
  assetName?: string
  patchPreActionSafety: (
    p: Partial<EOP["immediateActions"]["preActionSafety"]>,
  ) => void;
  patchInternalDiagnostics: (
    p: Partial<EOP["immediateActions"]["internalDiagnostics"]>,
  ) => void;
  patchExternalActions: (p: Partial<EOP["externalActions"]>) => void;
  patchCommunication: (p: Partial<EOP["communication"]>) => void;
  patchRecovery: (p: Partial<EOP["recovery"]>) => void;
  patchSupportingInformation: (
    p: Partial<EOP["supportingInformation"]>,
  ) => void;
  patchApprovalReview: (p: Partial<EOP["approvalReview"]>) => void;
};

export const EopDocumentForm = ({
  eop,
  isBootstrapping,
  patchDocument,
  patchEquipment,
  patchProcedure,
  patchSignOff,
  patchSite,
  patchOverview,
  patchPreActionSafety,
  patchInternalDiagnostics,
  patchExternalActions,
  patchCommunication,
  patchRecovery,
  patchSupportingInformation,
  patchApprovalReview,
  assetName,
}: EopDocumentFormProps) => {
  return (
    <div className="mop-portal-form-root min-h-0 w-full flex-1 overflow-x-hidden bg-linear-to-b from-white to-[#f9fafb] py-2 pr-1 pb-6">
      <MopPortalShell bannerSubtitle={eop?.document?.title || "Loading"}>
        {isBootstrapping ? (
          <Typography variant="p" className="text-gray-500">
            Loading example EOP…
          </Typography>
        ) : (
          <>
            <EopSection01Identification
              eop={eop}
              patchDocument={patchDocument}
              patchEquipment={patchEquipment}
              patchProcedure={patchProcedure}
              patchSignOff={patchSignOff}
            />
            <EopSection02Site site={eop?.site} patchSite={patchSite} />
            <EopSection03Overview
              overview={eop?.overview}
              patchOverview={patchOverview}
            />
            <EopSection04ImmediateActionsSection
              immediateActions={eop?.immediateActions}
              patchPreActionSafety={patchPreActionSafety}
              assetName={assetName}
              patchInternalDiagnostics={patchInternalDiagnostics}
            />
            <EopSection05ExternalActions
              externalActions={eop?.externalActions}
              patchExternalActions={patchExternalActions}
              assetName={assetName}
            />
            <EopSection06Communication
              communication={eop?.communication}
              address={eop?.site?.siteAddress || ''}
              patchCommunication={patchCommunication}
            />
            <EopSection07Recovery
              recovery={eop?.recovery}
              patchRecovery={patchRecovery}
            />
            <EopSection08SupportingInformationSection
              supportingInformation={eop?.supportingInformation}
              patchSupportingInformation={patchSupportingInformation}
            />
            <EopSection09ApprovalReview
              approvalReview={eop?.approvalReview}
              patchApprovalReview={patchApprovalReview}
            />
          </>
        )}
      </MopPortalShell>
    </div>
  );
};

"use client";

import { Typography } from "@/components/common";
import { EOP_SECTION_06_HEADING } from "@/constants/eop-section06-communication";
import type { EOPSection06Communication } from "@/types/eop";

import { EopSection06EmergencyContactsTable } from "./EopSection06EmergencyContactsTable";
import { EopSection06EscalationTable } from "./EopSection06EscalationTable";

type EopSection06CommunicationProps = {
  communication: EOPSection06Communication;
  patchCommunication: (p: Partial<EOPSection06Communication>) => void;
};

export const EopSection06Communication = ({
  communication,
  patchCommunication,
}: EopSection06CommunicationProps) => {
  return (
    <div className="mt-5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-4 shadow-sm sm:mt-6 sm:px-4 sm:py-5">
      <Typography
        variant="h6"
        className="mb-3 border-b border-gray-200 pb-2 font-bold text-gray-900"
      >
        {EOP_SECTION_06_HEADING}
      </Typography>

      <EopSection06EscalationTable
        communication={communication}
        patchCommunication={patchCommunication}
      />
      <EopSection06EmergencyContactsTable
        communication={communication}
        patchCommunication={patchCommunication}
      />
    </div>
  );
};

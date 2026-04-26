"use client";

import { Typography } from "@/components/common";
import { MOP_SECTION_11_COMPREHENSIVE_LIB_LABEL, MOP_SECTION_11_HEADING } from "@/constants/mop-section11-references";
import type { MOPSection11References } from "@/types/mop";

import { MopSection11DocTable } from "./MopSection11DocTable";
import { MopSection11Notices } from "./MopSection11Notices";
import { MopSection11PolicyTable } from "./MopSection11PolicyTable";
import { MopSection11SafetyTable } from "./MopSection11SafetyTable";

type MopSection11ReferencesBlockProps = {
  references: MOPSection11References;
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
};

export const MopSection11ReferencesBlock = ({ references, patchMopReferences }: MopSection11ReferencesBlockProps) => {
  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography variant="h5" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_11_HEADING}
      </Typography>
      <Typography variant="h6" className="mb-4 text-sm font-semibold text-gray-900">
        {MOP_SECTION_11_COMPREHENSIVE_LIB_LABEL}
      </Typography>

      <MopSection11PolicyTable
        rows={references.policyDocumentRows}
        patchMopReferences={patchMopReferences}
        references={references}
      />

      <MopSection11DocTable
        variant="equipment"
        rows={references.equipmentDocumentRows}
        patchMopReferences={patchMopReferences}
        references={references}
      />
      <MopSection11SafetyTable
        rows={references.safetyStandardRows}
        patchMopReferences={patchMopReferences}
        references={references}
      />
      <MopSection11DocTable
        variant="additional"
        rows={references.additionalResourceRows}
        patchMopReferences={patchMopReferences}
        references={references}
      />
      <MopSection11Notices />
    </div>
  );
};

'use client';

import type { MOPSection11References } from '@/types/mop';

import { useEffect, useMemo } from 'react';

import { Typography } from '@/components/common';
import { MOP_SECTION_11_HEADING } from '@/constants/mop-section11-references';

import { MopSection11DocTable } from './MopSection11DocTable';
import { MopSection11Notices } from './MopSection11Notices';
import { MopSection11PolicyTable } from './MopSection11PolicyTable';
import { MopSection11SafetyTable } from './MopSection11SafetyTable';

type MopSection11ReferencesBlockProps = {
  references: MOPSection11References;
  patchMopReferences: (p: Partial<MOPSection11References>) => void;
};

export const MopSection11ReferencesBlock = ({ references, patchMopReferences }: MopSection11ReferencesBlockProps) => {
  const normalizedReferences: MOPSection11References = useMemo(
    () => ({
      ...references,
      equipmentDocumentRows: references.equipmentDocumentRows.map(row => ({ ...row, internalAccess: '' })),
      safetyStandardRows: references.safetyStandardRows.map(row => ({ ...row, internalAccess: '' })),
      additionalResourceRows: references.additionalResourceRows.map(row => ({ ...row, internalAccess: '' })),
    }),
    [references],
  );
  const hasInternalAccess = references.equipmentDocumentRows.some(row => row.internalAccess)
    || references.safetyStandardRows.some(row => row.internalAccess)
    || references.additionalResourceRows.some(row => row.internalAccess);

  useEffect(() => {
    if (!hasInternalAccess) {
      return;
    }

    patchMopReferences({
      equipmentDocumentRows: normalizedReferences.equipmentDocumentRows,
      safetyStandardRows: normalizedReferences.safetyStandardRows,
      additionalResourceRows: normalizedReferences.additionalResourceRows,
    });
  }, [hasInternalAccess, normalizedReferences, patchMopReferences]);

  return (
    <div className="mb-8 border-t border-gray-200 pt-6 last:mb-0">
      <Typography variant="h5" className="mb-2 text-base font-semibold text-gray-900">
        {MOP_SECTION_11_HEADING}
      </Typography>

      <MopSection11DocTable
        variant="equipment"
        rows={normalizedReferences.equipmentDocumentRows}
        patchMopReferences={patchMopReferences}
        references={normalizedReferences}
      />
      <MopSection11SafetyTable
        rows={normalizedReferences.safetyStandardRows}
        patchMopReferences={patchMopReferences}
        references={normalizedReferences}
      />
      <MopSection11DocTable
        variant="additional"
        rows={normalizedReferences.additionalResourceRows}
        patchMopReferences={patchMopReferences}
        references={normalizedReferences}
      />
      <MopSection11Notices />
    </div>
  );
};

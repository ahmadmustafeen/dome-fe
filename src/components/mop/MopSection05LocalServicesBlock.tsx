'use client';

import type { MopLocalEmergencyServiceRow, MOPSafety } from '@/types/mop';
import { InfoBanner } from '@/components/common';
import {
  MOP_SECTION_05_BANNER_CRITICAL_SAFETY,
  MOP_SECTION_05_BANNER_RESEARCHED,
} from '@/constants/mop-section05-safety';


type MopSection05LocalServicesBlockProps = {
  address: string;
  rows: MopLocalEmergencyServiceRow[];
  patchSafety: (p: Partial<MOPSafety>) => void;
};

export const MopSection05LocalServicesBlock = ({
}: MopSection05LocalServicesBlockProps) => {
  return (
    <div className="mb-8 last:mb-0">
      <InfoBanner variant="success" className="mb-4">
        {MOP_SECTION_05_BANNER_RESEARCHED}
      </InfoBanner>
      <InfoBanner variant="critical" className="mt-4">
        {MOP_SECTION_05_BANNER_CRITICAL_SAFETY}
      </InfoBanner>
    </div>
  );
};

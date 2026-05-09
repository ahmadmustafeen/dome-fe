import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";

import type { SOP } from "@/types/sop";
import { bumpSopModified, patchSopSection } from "@/utils/sop-document-state";

export const useSopPatchers = (setSop: Dispatch<SetStateAction<SOP | null>>) => {
  const patchDocument = useCallback((partial: Partial<SOP["document"]>) => {
    setSop((prev) => patchSopSection<SOP["document"]>(prev, "document", partial));
  }, [setSop]);

  const patchEquipment = useCallback((partial: Partial<SOP["equipment"]>) => {
    setSop((prev) =>
      patchSopSection<SOP["equipment"]>(prev, "equipment", partial),
    );
  }, [setSop]);

  const patchProcedure = useCallback((partial: Partial<SOP["procedure"]>) => {
    setSop((prev) =>
      patchSopSection<SOP["procedure"]>(prev, "procedure", partial),
    );
  }, [setSop]);

  const patchSignOff = useCallback((partial: Partial<SOP["signOff"]>) => {
    setSop((prev) => patchSopSection<SOP["signOff"]>(prev, "signOff", partial));
  }, [setSop]);

  const patchSite = useCallback((partial: Partial<SOP["site"]>) => {
    setSop((prev) => patchSopSection<SOP["site"]>(prev, "site", partial));
  }, [setSop]);

  const patchOverview = useCallback((partial: Partial<SOP["overview"]>) => {
    setSop((prev) => patchSopSection<SOP["overview"]>(prev, "overview", partial));
  }, [setSop]);

  const patchFacilityEffects = useCallback((rows: SOP["facilityEffects"]) => {
    setSop((prev) =>
      prev === null
        ? prev
        : bumpSopModified({ ...prev, facilityEffects: rows }),
    );
  }, [setSop]);

  const patchSafety = useCallback((partial: Partial<SOP["safety"]>) => {
    setSop((prev) => patchSopSection<SOP["safety"]>(prev, "safety", partial));
  }, [setSop]);

  const patchRisksAssumptions = useCallback(
    (partial: Partial<SOP["risksAssumptions"]>) => {
      setSop((prev) =>
        patchSopSection<SOP["risksAssumptions"]>(
          prev,
          "risksAssumptions",
          partial,
        ),
      );
    },
    [setSop],
  );

  const patchDetails = useCallback((partial: Partial<SOP["details"]>) => {
    setSop((prev) => patchSopSection<SOP["details"]>(prev, "details", partial));
  }, [setSop]);

  return {
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
  };
};

import { useCallback, useEffect, useState } from "react";

import {
  generateMOP,
  getAutoFilledContext,
  saveMOP,
} from "@/services/mop-mock-service";
import type {
  MOP,
  MOPAssumptions,
  MOPDocument,
  MOPEquipment,
  MOPProcedure,
  MOPSection03Overview,
  MOPSafety,
  MOPSignOff,
  MOPSiteSection,
  MopFacilityEffectRow,
  MopFacilitySystemKey,
} from "@/types/mop";

export type MopMockContextParams = {
  clientName?: string;
  siteName?: string;
  siteId?: string;
};

const bumpModified = (m: MOP): MOP => ({
  ...m,
  document: {
    ...m.document,
    lastModified: new Date().toISOString(),
  },
});

const buildBootstrapKey = (c: MopMockContextParams) =>
  `${c.clientName ?? ""}|${c.siteId ?? ""}|${c.siteName ?? ""}`;

export const useMopMockDocument = (ctx: MopMockContextParams) => {
  const [mop, setMop] = useState<MOP>(() => getAutoFilledContext(ctx));
  const [loadedBootstrapKey, setLoadedBootstrapKey] = useState<string | null>(
    null,
  );
  const bootstrapKey = buildBootstrapKey(ctx);
  const isBootstrapping = loadedBootstrapKey !== bootstrapKey;
  const { clientName, siteId, siteName } = ctx;

  useEffect(() => {
    let cancelled = false;
    void generateMOP(siteId || "mock-asset", {
      clientName,
      siteName,
      siteId,
    }).then((data) => {
      if (!cancelled) {
        setMop(data);
        setLoadedBootstrapKey(bootstrapKey);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bootstrapKey, clientName, siteId, siteName]);

  const patchDocument = useCallback((partial: Partial<MOPDocument>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        document: { ...prev.document, ...partial },
      }),
    );
  }, []);

  const patchEquipment = useCallback((partial: Partial<MOPEquipment>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        equipment: { ...prev.equipment, ...partial },
      }),
    );
  }, []);

  const patchProcedure = useCallback((partial: Partial<MOPProcedure>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        procedure: { ...prev.procedure, ...partial },
      }),
    );
  }, []);

  const patchSignOff = useCallback((partial: Partial<MOPSignOff>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        signOff: { ...prev.signOff, ...partial },
      }),
    );
  }, []);

  const patchSite = useCallback((partial: Partial<MOPSiteSection>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        site: { ...prev.site, ...partial },
      }),
    );
  }, []);

  const patchOverview = useCallback((partial: Partial<MOPSection03Overview>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        overview: { ...prev.overview, ...partial },
      }),
    );
  }, []);

  const patchSafety = useCallback((partial: Partial<MOPSafety>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        safety: { ...prev.safety, ...partial },
      }),
    );
  }, []);

  const patchAssumptions = useCallback((partial: Partial<MOPAssumptions>) => {
    setMop((prev) =>
      bumpModified({
        ...prev,
        assumptions: { ...prev.assumptions, ...partial },
      }),
    );
  }, []);

  const patchFacilityRow = useCallback(
    (
      systemKey: MopFacilitySystemKey,
      partial: Partial<Pick<MopFacilityEffectRow, "choice" | "details">>,
    ) => {
      setMop((prev) =>
        bumpModified({
          ...prev,
          facilityEffects: prev.facilityEffects.map((row) =>
            row.systemKey === systemKey ? { ...row, ...partial } : row,
          ),
        }),
      );
    },
    [],
  );

  const resetMop = useCallback(() => {
    setLoadedBootstrapKey(null);
    void generateMOP(siteId || "mock-asset", {
      clientName,
      siteName,
      siteId,
    }).then((data) => {
      setMop(data);
      setLoadedBootstrapKey(bootstrapKey);
    });
  }, [bootstrapKey, clientName, siteId, siteName]);

  const persistMop = useCallback(async () => saveMOP(mop), [mop]);

  return {
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
    patchFacilityRow,
    resetMop,
    persistMop,
  };
};

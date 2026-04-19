import type { MOP, MOPGenerateContext } from "@/types/mop";
import { getTodayDateInputValue } from "@/utils/mop-dates";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const createEmptyMop = (): MOP => ({
  document: {
    title: "",
    identifier: "",
    version: 1,
    status: "draft",
    createdDate: getTodayDateInputValue(),
    lastModified: new Date().toISOString(),
    author: "",
    authorCetLevel: "",
  },
  equipment: {
    assetName: "",
    equipmentType: "",
    manufacturer: "",
    modelNumber: "",
    serialNumber: "",
    equipmentNumber: "",
    location: "",
  },
  procedure: {
    workDescription: "",
    duration: "",
    levelOfRisk: "",
    cetLevelRequired: "",
    specialPermitsRequired: false,
    specialPermitsNotes: "",
  },
  steps: [],
  safety: {
    precautions: "",
    requiredPPE: "",
    toolsAndMaterials: "",
  },
  signOff: {
    preparedBy: "",
    reviewedBy: "",
    approvedBy: "",
  },
  context: {
    clientName: "",
    siteName: "",
    siteId: "",
    assetId: "",
  },
  site: {
    customer: "",
    siteName: "",
    contact: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    serviceTicket: "",
    levelOfRiskNumeric: "",
    mbm: "",
  },
});

/**
 * Session-style defaults (prompt `getAutoFilledContext`).
 * Components call this; later swap for API merge only.
 */
export const getAutoFilledContext = (params: {
  clientName?: string;
  siteName?: string;
  siteId?: string;
  assetId?: string;
}): MOP => {
  const now = new Date().toISOString();
  const m = createEmptyMop();
  return {
    ...m,
    document: {
      ...m.document,
      createdDate: getTodayDateInputValue(),
      lastModified: now,
      version: 1,
      status: "draft",
    },
    context: {
      clientName: params.clientName ?? "",
      siteName: params.siteName ?? "",
      siteId: params.siteId ?? "",
      assetId: params.assetId ?? "mock-asset",
    },
  };
};

export const MOCK_GENERATED_MOP: MOP = {
  document: {
    title: "CRACs Annual Preventative Maintenance",
    identifier: "",
    version: 1,
    status: "draft",
    createdDate: "2026-01-12",
    lastModified: new Date().toISOString(),
    author: "",
    authorCetLevel: "",
  },
  equipment: {
    assetName: "CRAC 01",
    equipmentType: "CRACs",
    manufacturer: "LIEBERT",
    modelNumber: "DA085DP1AD833B",
    serialNumber: "C16GCE0014",
    equipmentNumber: "CRAC 01",
    location: "MISSING",
  },
  procedure: {
    workDescription: "Annual Preventative Maintenance",
    duration:
      "6-8 hours. Annual preventative maintenance on CRAC units involves detailed inspections, filter changes, coil cleaning, and component testing, requiring a longer timeframe.",
    levelOfRisk: "medium",
    cetLevelRequired:
      "CET-2 required to perform work\nStandard mechanical maintenance work",
    specialPermitsRequired: false,
    specialPermitsNotes: "",
  },
  steps: [
    {
      id: "1",
      stepNumber: 1,
      description: "Notify all affected personnel and obtain work permit.",
    },
    {
      id: "2",
      stepNumber: 2,
      description: "Power down non-critical loads connected to UPS.",
    },
    {
      id: "3",
      stepNumber: 3,
      description: "Put UPS in bypass mode using front panel controls.",
    },
    {
      id: "4",
      stepNumber: 4,
      description: "Remove old battery modules carefully.",
    },
    {
      id: "5",
      stepNumber: 5,
      description: "Install new battery modules and secure connections.",
    },
    {
      id: "6",
      stepNumber: 6,
      description: "Return UPS to normal operation and verify runtime.",
    },
  ],
  safety: {
    precautions:
      "Risk of electric shock. Do not short circuit battery terminals.",
    requiredPPE: "Insulated gloves, safety glasses, steel-toed boots.",
    toolsAndMaterials:
      "Replacement battery kit, insulated screwdriver set, multimeter.",
  },
  signOff: {
    preparedBy: "",
    reviewedBy: "",
    approvedBy: "",
  },
  context: {
    clientName: "Acme Corp",
    siteName: "Downtown Data Center",
    siteId: "site_001",
    assetId: "asset_ups_001",
  },
  site: {
    customer: "",
    siteName: "",
    contact: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    serviceTicket: "",
    levelOfRiskNumeric: "",
    mbm: "",
  },
};

export const generateMOP = async (
  assetId: string,
  ctx?: MOPGenerateContext,
): Promise<MOP> => {
  await delay(600);
  const data: MOP = structuredClone(MOCK_GENERATED_MOP);
  data.context.assetId = assetId;
  if (ctx?.clientName !== undefined) {
    data.context.clientName = ctx.clientName;
  }
  if (ctx?.siteName !== undefined) {
    data.context.siteName = ctx.siteName;
  }
  if (ctx?.siteId !== undefined) {
    data.context.siteId = ctx.siteId;
  }
  data.document.lastModified = new Date().toISOString();
  return data;
};

export const saveMOP = async (mop: MOP): Promise<{ success: boolean }> => {
  await delay(400);
  // Later: POST /api/mop — replace body with real request.
  // eslint-disable-next-line no-console -- mock persistence
  console.log("saveMOP (mock):", JSON.stringify(mop, null, 2));
  return { success: true };
};

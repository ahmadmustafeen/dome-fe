import { buildDefaultMopSection04Rows } from "@/constants/mop-section04-facility";
import {
  buildDefaultEmergencyContactRows,
  buildDefaultLocalEmergencyServiceRows,
  buildDefaultPpeRows,
  buildDefaultSafetyProcedureRows,
  buildDefaultToolRows,
  MOP_LOCAL_EMERGENCY_SAMPLE_ADDRESS,
  MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT,
  resolveEmergencyContactRows,
  resolveLocalEmergencyServiceRows,
  resolvePpeRequirementRows,
  resolveSafetyProcedureRows,
  resolveToolRequirementRows,
} from "@/constants/mop-section05-safety";
import type { MOP, MOPGenerateContext, MOPSection03Overview } from "@/types/mop";
import { getTodayDateInputValue } from "@/utils/mop-dates";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const emptyOverview = (): MOPSection03Overview => ({
  mopTitle: "",
  workArea: "",
  buildingFloorRoom: "",
  accessRequirements: "",
  workDeliveryType: "self_delivered",
  contractors1Count: "",
  subcontractorCompany1: "",
  subcontractorPersonnel1: "",
  subcontractorContact1: "",
  contractors2Count: "",
  subcontractorCompany2: "",
  subcontractorPersonnel2: "",
  subcontractorContact2: "",
  qualificationsRequired: "",
  advanceNotifications: "",
  postNotifications: "",
});

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
    localEmergencyServicesAddress: "",
    ppeRequirementRows: buildDefaultPpeRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT),
    toolRequirementRows: buildDefaultToolRows(MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT),
    safetyProcedureRows: buildDefaultSafetyProcedureRows(
      MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT,
    ),
    emergencyContactRows: buildDefaultEmergencyContactRows(
      MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT,
    ),
    localEmergencyServiceRows: buildDefaultLocalEmergencyServiceRows(
      MOP_SECTION_05_DEFAULT_TABLE_ROW_COUNT,
    ),
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
    dataCenterLocation: "",
    siteAddress: "",
    siteContact: "",
  },
  overview: emptyOverview(),
  facilityEffects: buildDefaultMopSection04Rows(),
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
    site: {
      ...m.site,
      customer: params.clientName ?? "",
      siteName: params.siteName ?? "",
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
    ppeRequirementRows: [
      {
        id: "ppe-mock-eye",
        category: "Eye / face",
        specification: "ANSI Z87.1 safety glasses with side shields",
        whenRequired: "Whenever entering the generator set enclosure or adjacent service zones.",
      },
      {
        id: "ppe-mock-hearing",
        category: "Hearing",
        specification: "Ear plugs or earmuffs rated for engine-room noise levels",
        whenRequired: "During engine start, load bank, or any running-generator maintenance tests.",
      },
      {
        id: "ppe-mock-hands",
        category: "Hand",
        specification: "Insulated gloves appropriate for DC/AC exposure class per site LOTO",
        whenRequired: "When working on batteries, alternator leads, or live control circuits.",
      },
      {
        id: "ppe-mock-foot",
        category: "Foot",
        specification: "Dielectric or safety-toe footwear per site electrical PPE policy",
        whenRequired: "At all times inside the generator yard and electrical service areas.",
      },
    ],
    toolRequirementRows: [
      {
        id: "tool-mock-torque",
        toolCategory: "Torque & fasteners",
        specificToolsList:
          "Torque wrench (calibrated)\nSocket set (metric/SAE per unit)\nAnti-seize compound",
        purpose: "Re-torque critical connections per Cummins maintenance interval chart.",
      },
      {
        id: "tool-mock-electrical",
        toolCategory: "Electrical test",
        specificToolsList: "Digital multimeter\nMegohmmeter (if required by site)\nInsulated tools set",
        purpose: "Verify winding insulation, battery voltage, and control circuit integrity.",
      },
    ],
    safetyProcedureRows: [
      {
        id: "proc-mock-loto",
        procedure: "Lockout / tagout",
        requirements: "Isolate starting system and prime mover per site LOTO; verify zero energy.",
        initials: "",
        time: "",
      },
      {
        id: "proc-mock-fire",
        procedure: "Fire protection awareness",
        requirements: "Confirm suppression status with facility; no hot work without permit.",
        initials: "",
        time: "",
      },
      {
        id: "proc-mock-fuel",
        procedure: "Fuel / coolant handling",
        requirements: "Contain spills; use absorbent; follow site hazmat disposal rules.",
        initials: "",
        time: "",
      },
    ],
    emergencyContactRows: [
      {
        id: "emg-mock-site",
        emergencyType: "Site security / access",
        contact: "Data center operations desk",
        phoneNumber: "",
      },
      {
        id: "emg-mock-fire",
        emergencyType: "Fire / medical",
        contact: "Local emergency services",
        phoneNumber: "911",
      },
    ],
    localEmergencyServicesAddress: MOP_LOCAL_EMERGENCY_SAMPLE_ADDRESS,
    localEmergencyServiceRows: [
      {
        id: "les-mock-pd",
        service: "Police (non-emergency)",
        contactName: "Austin Police Department",
        phoneNumber: "311",
        address: "715 E 8th St, Austin, TX 78701",
      },
      {
        id: "les-mock-fd",
        service: "Fire & EMS (emergency)",
        contactName: "Austin-Travis County EMS / AFD",
        phoneNumber: "911",
        address: "As dispatched — verify coverage for site ZIP",
      },
      {
        id: "les-mock-er",
        service: "Nearest hospital ER (verify)",
        contactName: "St. David's North Austin Medical Center (example)",
        phoneNumber: "",
        address: "12221 N Mopac Expy, Austin, TX 78758",
      },
    ],
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
    customer: "Acme Corp",
    siteName: "Downtown Data Center",
    dataCenterLocation: "MISSING",
    siteAddress: "123 Data Center Way, Metro City, CA 90210",
    siteContact: "",
  },
  overview: {
    mopTitle: "CRACs Annual Preventative Maintenance",
    workArea: "Data center white floor",
    buildingFloorRoom: "Hall A / Raised floor",
    accessRequirements: "Badge access per site security policy; escort if required.",
    workDeliveryType: "self_delivered",
    contractors1Count: "",
    subcontractorCompany1: "",
    subcontractorPersonnel1: "",
    subcontractorContact1: "",
    contractors2Count: "",
    subcontractorCompany2: "",
    subcontractorPersonnel2: "",
    subcontractorContact2: "",
    qualificationsRequired:
      "CET-2 or equivalent; OEM familiarization recommended for coil and filter service.",
    advanceNotifications:
      "Operations and security per site policy (typically 48 hours).",
    postNotifications:
      "Operations confirmation of stable temperatures and alarms cleared.",
  },
  facilityEffects: buildDefaultMopSection04Rows(),
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
  data.safety = {
    ...data.safety,
    localEmergencyServicesAddress: data.safety.localEmergencyServicesAddress ?? "",
    ppeRequirementRows: resolvePpeRequirementRows(data.safety.ppeRequirementRows),
    toolRequirementRows: resolveToolRequirementRows(data.safety.toolRequirementRows),
    safetyProcedureRows: resolveSafetyProcedureRows(data.safety.safetyProcedureRows),
    emergencyContactRows: resolveEmergencyContactRows(data.safety.emergencyContactRows),
    localEmergencyServiceRows: resolveLocalEmergencyServiceRows(
      data.safety.localEmergencyServiceRows,
    ),
  };
  return data;
};

export const saveMOP = async (mop: MOP): Promise<{ success: boolean }> => {
  await delay(400);
  // Later: POST /api/mop — replace body with real request.
  // eslint-disable-next-line no-console -- mock persistence
  console.log("saveMOP (mock):", JSON.stringify(mop, null, 2));
  return { success: true };
};

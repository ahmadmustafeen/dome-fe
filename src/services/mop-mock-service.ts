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
import {
  buildDefaultAssumptionRows,
  buildDefaultCriticalDecisionItems,
  MOP_SECTION_06_DEFAULT_DECISION_LIST_COUNT,
  MOP_SECTION_06_DEFAULT_TABLE_ROW_COUNT,
  MOP_SECTION_06_DEFAULT_UNIT_LABEL,
  resolveAssumptionRows,
  resolveCriticalDecisionItems,
} from "@/constants/mop-section06-assumptions";
import {
  buildDefaultEnginePerformanceRows,
  buildDefaultFaultAlarmRows,
  buildDefaultGeneratorOperationalRows,
  MOP_SECTION_07_DEFAULT_FAULT_ROW_COUNT,
  resolveEnginePerformanceRows,
  resolveFaultAlarmHistoryRows,
  resolveGeneratorOperationalRows,
} from "@/constants/mop-section07-details";
import {
  buildDefaultDetailedProcedureRows,
  mapMopStepsToDetailedProcedureRows,
  MOP_SECTION_07_DEFAULT_DETAILED_STEP_COUNT,
  resolveDetailedProcedureStepRows,
} from "@/constants/mop-section07-procedure-steps";
import { buildDefaultBackOutStepRows, resolveBackOutStepRows } from "@/constants/mop-section08-backout";
import { buildDefaultMopApproval, resolveMopApproval } from "@/constants/mop-section09-approval";
import { buildDefaultMopComments, resolveMopComments } from "@/constants/mop-section10-comments";
import { buildDefaultMopReferences, resolveMopReferences } from "@/constants/mop-section11-references";
import type { MOP, MOPGenerateContext, MOPSection03Overview, MOPSection11References, MOPStep } from "@/types/mop";
import { getTodayDateInputValue } from "@/utils/mop-dates";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const mockSampleMopReferences = (): MOPSection11References => ({
  policyDocumentRows: [
    {
      id: "mock-pol-1",
      policyDocument: "Data Center Electrical Safety Policy",
      uploadDate: "2025-08-15",
      type: "Company Policy",
    },
    {
      id: "mock-pol-2",
      policyDocument: "LOTO Program Standard",
      uploadDate: "2025-03-01",
      type: "Company Policy",
    },
    { id: "mock-pol-3", policyDocument: "", uploadDate: "", type: "Company Policy" },
  ],
  equipmentDocumentRows: [
    {
      id: "mock-eq-1",
      title: "LIEBERT DA085DP1AD833B Installation and Operation Manual",
      type: "Technical Manual",
      linkUrl: "https://www.vertiv.com/en-us/support/software-download/",
      internalAccess: "",
    },
    {
      id: "mock-eq-2",
      title: "Battery System Documentation",
      type: "Technical Manual",
      linkUrl: "",
      internalAccess: "Internal Document — Request from Site Manager",
    },
  ],
  safetyStandardRows: [
    {
      id: "mock-sf-1",
      safetyStandard: "NFPA 70E - Electrical Safety in the Workplace",
      authority: "NFPA",
      linkUrl:
        "https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70E",
      internalAccess: "",
    },
    {
      id: "mock-sf-2",
      safetyStandard: "OSHA 29 CFR 1910.147 - Control of Hazardous Energy",
      authority: "OSHA",
      linkUrl: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147",
      internalAccess: "",
    },
    { id: "mock-sf-3", safetyStandard: "", authority: "", linkUrl: "", internalAccess: "" },
  ],
  additionalResourceRows: [
    {
      id: "mock-ar-1",
      title: "Site-Specific Emergency Response Plan",
      type: "Internal Document",
      linkUrl: "",
      internalAccess: "Internal Document — Request from Site Manager",
    },
    {
      id: "mock-ar-2",
      title: "Safety Data Sheets (SDS) Information",
      type: "Chemical Safety",
      linkUrl: "https://www.osha.gov/safety-data-sheets",
      internalAccess: "",
    },
    {
      id: "mock-ar-3",
      title: "Equipment History and Maintenance Records",
      type: "CMMS Database",
      linkUrl: "",
      internalAccess: "Internal Document — Request from Site Manager",
    },
  ],
});

/** Shared by legacy `steps` and Section 08 detailed procedure grid in mock data. */
const MOCK_GENERATED_STEPS: MOPStep[] = [
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
];

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
  generatedDocumentId: "",
  asset: {
    _id: "",
    serialNumber: "",
    assetId: "",
    siteId: "",
    assetName: "",
    category: "",
    subCategory: "",
    modelName: "",
    location: "",
    equipmentName: "",
    comment: "",
    images: [],
    make: "",
    description: "",
  },
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
  assumptions: {
    assumptionRows: buildDefaultAssumptionRows(MOP_SECTION_06_DEFAULT_TABLE_ROW_COUNT),
    criticalDecisionUnitLabel: MOP_SECTION_06_DEFAULT_UNIT_LABEL,
    criticalDecisionPointItems: buildDefaultCriticalDecisionItems(
      MOP_SECTION_06_DEFAULT_DECISION_LIST_COUNT,
    ),
  },
  mopDetails: {
    datePerformed: "",
    timeBegun: "",
    timeCompleted: "",
    facilitiesPersonnel: "",
    contractorPersonnel: "",
    generatorOperationalRows: buildDefaultGeneratorOperationalRows(),
    enginePerformanceRows: buildDefaultEnginePerformanceRows(),
    faultAlarmHistoryRows: buildDefaultFaultAlarmRows(MOP_SECTION_07_DEFAULT_FAULT_ROW_COUNT),
    detailedProcedures: {
      stepRows: buildDefaultDetailedProcedureRows(MOP_SECTION_07_DEFAULT_DETAILED_STEP_COUNT),
      criticalStepNotes: "",
    },
  },
  backOut: {
    stepRows: buildDefaultBackOutStepRows(),
  },
  mopApproval: buildDefaultMopApproval(),
  mopComments: buildDefaultMopComments(),
  references: buildDefaultMopReferences(),
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
  generatedDocumentId: "",
  asset: {
    _id: "",
    serialNumber: "",
    assetId: "",
    siteId: "",
    assetName: "",
    category: "",
    subCategory: "",
    modelName: "",
    location: "",
    equipmentName: "",
    comment: "",
    images: [],
    make: "",
    description: "",
  },
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
  steps: MOCK_GENERATED_STEPS,
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
  assumptions: {
    criticalDecisionUnitLabel: MOP_SECTION_06_DEFAULT_UNIT_LABEL,
    assumptionRows: [
      {
        id: "asm-mock-1",
        category: "Site access",
        assumption: "Badge and escort policy remains unchanged for the work window listed on the work order.",
      },
      {
        id: "asm-mock-2",
        category: "Utilities",
        assumption: "Normal utility power and building services are available unless noted in the facility event log.",
      },
      {
        id: "asm-mock-3",
        category: "OEM & parts",
        assumption: "Required filters, lubricants, and OEM consumables are on hand before the maintenance start.",
      },
    ],
    criticalDecisionPointItems: [
      {
        id: "cdp-mock-1",
        text: "Confirm generator is offline / isolated and tagged per site LOTO before opening enclosures.",
      },
      {
        id: "cdp-mock-2",
        text: "Verify battery system voltage and charger status before any cranking or control testing.",
      },
      {
        id: "cdp-mock-3",
        text: "Obtain hot-work and fuel-handling clearance if the task plan includes those activities.",
      },
      {
        id: "cdp-mock-4",
        text: "Document load-transfer criteria with operations before return-to-service and witness transfer steps.",
      },
    ],
  },
  mopDetails: {
    datePerformed: "2026-01-20",
    timeBegun: "08:00",
    timeCompleted: "14:30",
    facilitiesPersonnel: "Data center operations + assigned electrical tech",
    contractorPersonnel: "OEM or subcontractor as referenced in Section 3",
    generatorOperationalRows: (() => {
      const g = buildDefaultGeneratorOperationalRows();
      if (g.length === 0) {
        return g;
      }
      const n = [...g];
      const first = n[0];
      if (first) {
        n[0] = { ...first, asFound: "478", asLeft: "480" };
      }
      return n;
    })(),
    enginePerformanceRows: (() => {
      const e = buildDefaultEnginePerformanceRows();
      return e.map((row) => {
        if (row.rowId === "eng-hours") {
          return { ...row, reading: "1,240", status: "OK — within PM window" };
        }
        if (row.rowId === "eng-last") {
          return { ...row, reading: "2025-11-10", status: "Verified" };
        }
        if (row.rowId === "eng-next") {
          return { ...row, reading: "1,500 hrs / 2026-07-14", status: "Scheduled" };
        }
        return row;
      });
    })(),
    faultAlarmHistoryRows: [
      {
        id: "fl-mock-1",
        dateTime: "2026-01-20 09:15",
        faultCode: "WARN-CLT",
        description: "Transient coolant high — cleared after inspection",
        actionTaken: "Verified thermostat; no leak",
        initials: "JS",
      },
      { id: "fl-mock-2", dateTime: "", faultCode: "", description: "", actionTaken: "", initials: "" },
      { id: "fl-mock-3", dateTime: "", faultCode: "", description: "", actionTaken: "", initials: "" },
    ],
    detailedProcedures: {
      stepRows: mapMopStepsToDetailedProcedureRows(MOCK_GENERATED_STEPS),
      criticalStepNotes:
        "Torque: verify battery inter-cell connections to OEM values. Megger: attach separate log if insulation testing is in scope for this MOP.",
    },
  },
  backOut: {
    stepRows: buildDefaultBackOutStepRows(),
  },
  mopApproval: {
    ...buildDefaultMopApproval(),
    mopEffectiveDate: "2026-01-12",
    mopExpirationDate: "2026-12-31",
  },
  mopComments: {
    ...buildDefaultMopComments(),
    additionalNotes: "Log CMMS work order number here after upload.",
  },
  references: mockSampleMopReferences(),
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
    localEmergencyServicesAddress: data.safety?.localEmergencyServicesAddress ?? "",
    ppeRequirementRows: resolvePpeRequirementRows(data.safety?.ppeRequirementRows),
    toolRequirementRows: resolveToolRequirementRows(data.safety?.toolRequirementRows),
    safetyProcedureRows: resolveSafetyProcedureRows(data.safety?.safetyProcedureRows),
    emergencyContactRows: resolveEmergencyContactRows(data.safety?.emergencyContactRows),
    localEmergencyServiceRows: resolveLocalEmergencyServiceRows(
      data.safety?.localEmergencyServiceRows,
    ),
  };
  data.assumptions = {
    ...data.assumptions,
    criticalDecisionUnitLabel:
      data.assumptions.criticalDecisionUnitLabel ?? MOP_SECTION_06_DEFAULT_UNIT_LABEL,
    assumptionRows: resolveAssumptionRows(data.assumptions.assumptionRows),
    criticalDecisionPointItems: resolveCriticalDecisionItems(
      data.assumptions.criticalDecisionPointItems,
    ),
  };
  const baseMop = createEmptyMop().mopDetails;
  data.mopDetails = {
    ...(data.mopDetails ?? baseMop),
    generatorOperationalRows: resolveGeneratorOperationalRows(
      data.mopDetails?.generatorOperationalRows,
    ),
    enginePerformanceRows: resolveEnginePerformanceRows(data.mopDetails?.enginePerformanceRows),
    faultAlarmHistoryRows: resolveFaultAlarmHistoryRows(data.mopDetails?.faultAlarmHistoryRows),
    detailedProcedures: {
      stepRows: resolveDetailedProcedureStepRows(
        data.mopDetails?.detailedProcedures?.stepRows,
      ),
      criticalStepNotes: data.mopDetails?.detailedProcedures?.criticalStepNotes ?? "",
    },
  };
  const baseBackOut = createEmptyMop().backOut;
  data.backOut = {
    stepRows: resolveBackOutStepRows(data.backOut?.stepRows ?? baseBackOut.stepRows),
  };
  data.mopApproval = resolveMopApproval(data.mopApproval);
  data.mopComments = resolveMopComments(data.mopComments);
  data.references = resolveMopReferences(data.references);
  return data;
};

export const saveMOP = async (): Promise<{ success: boolean }> => {
  await delay(400);
  return { success: true };
};

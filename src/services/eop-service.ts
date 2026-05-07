import {
  EOP_SECTION_04_DEFAULT_PPE_INTRO,
  EOP_SECTION_04_DEFAULT_PPE_ROWS,
  EOP_SECTION_04_DEFAULT_SAFETY_CHECKLIST,
  EOP_SECTION_04_DEFAULT_TOOL_ROWS,
} from "@/constants/eop-section04-immediate-actions";
import {
  EOP_SECTION_04_DEFAULT_INTERNAL_DIAGNOSTIC_ROWS,
  EOP_SECTION_04_INTERNAL_DIAGNOSTICS_INTRO,
} from "@/constants/eop-section04-internal-diagnostics";
import {
  EOP_SECTION_05_DEFAULT_ACTION_ROWS,
  EOP_SECTION_05_INTRO,
} from "@/constants/eop-section05-external-actions";
import {
  EOP_SECTION_06_DEFAULT_EMERGENCY_ROWS,
  EOP_SECTION_06_DEFAULT_ESCALATION_ROWS,
} from "@/constants/eop-section06-communication";
import { EOP_SECTION_09_DEFAULT_REVIEW_ROWS } from "@/constants/eop-section09-approval-review";
import type { EOP } from "@/types/eop";
import type { EopListSummaryRow } from "@/types/eop-api";

const getTodayDateInputValue = (): string =>
  new Date().toISOString().slice(0, 10);

const cloneEop = (eop: EOP): EOP => {
  return JSON.parse(JSON.stringify(eop)) as EOP;
};

const createBaseEop = (): EOP => ({
  id: "",
  document: {
    title: "Air Handling Units - Power Failure",
    identifier: "TO BE ASSIGNED",
    version: 1,
    createdDate: getTodayDateInputValue(),
    author: "",
    authorCetLevel: "",
  },
  equipment: {
    componentType: "Air Handling Units",
    manufacturer: "LENNOX",
    modelNumber: "HS29-060-13G",
    serialNumber: "5807C49911",
    equipmentNumber: "AHU 10 CDR",
    location: "Data Hall 1",
  },
  procedure: {
    workDescription: "Power Failure",
    duration: "30-60 minutes",
    levelOfRisk: "high",
    cetLevelRequired:
      "CET-3 required to perform work\nEmergency response requiring technical expertise",
  },
  signOff: {
    approvedBy: "",
  },
  site: {
    customer: "Element Critical",
    siteName: "Austin One",
    dataCenterLocation: "Data Hall 1",
    siteAddress: "8025 North Interstate Hwy 35, Austin, TX 78753",
    siteContact: "",
  },
  overview: {
    eopTitle: "Air Handling Units - Power Failure",
    workArea: "",
    buildingFloorRoom: "",
    accessRequirements: "",
    workDeliveryType: "self_delivered",
    qualificationsRequired:
      "Minimum Certification: CET-3 Certified Technician\nManufacturer Requirement: Documented training on LENNOX or equivalent commercial Air Handling Units\nExperience Level: Minimum 3 years of experience working on critical cooling equipment",
    immediateNotifications:
      "Priority 1 (0-5 minutes): Notify Shift Supervisor and on-call CET-3 technician with Air Handling Units expertise.\nPriority 2 (5-15 minutes): Notify Facilities Manager and the Customer technical contact for Element Critical.\nEscalation Path: If the issue is not resolved within 30 minutes or impacts critical load, escalate to the Operations Manager.",
    postNotifications:
      "Immediate (within 1 hour): Confirm with the Shift Supervisor that the AHU is stable or that the issue has been resolved.\nShort-term (1-4 hours): Notify the Operations Manager and customer technical contacts with a service restoration confirmation and preliminary cause.",
  },
  immediateActions: {
    preActionSafety: {
      ppeIntroText: EOP_SECTION_04_DEFAULT_PPE_INTRO,
      ppeRows: EOP_SECTION_04_DEFAULT_PPE_ROWS.map((row) => ({ ...row })),
      toolRows: EOP_SECTION_04_DEFAULT_TOOL_ROWS.map((row) => ({ ...row })),
      safetyChecklistItems: EOP_SECTION_04_DEFAULT_SAFETY_CHECKLIST.map((it) => ({ ...it })),
    },
    internalDiagnostics: {
      introText: EOP_SECTION_04_INTERNAL_DIAGNOSTICS_INTRO,
      diagnosticRows: EOP_SECTION_04_DEFAULT_INTERNAL_DIAGNOSTIC_ROWS.map(
        (row) => ({ ...row }),
      ),
    },
  },
  externalActions: {
    introText: EOP_SECTION_05_INTRO,
    actionRows: EOP_SECTION_05_DEFAULT_ACTION_ROWS.map((row) => ({ ...row })),
  },
  communication: {
    escalationMatrixRows: EOP_SECTION_06_DEFAULT_ESCALATION_ROWS.map((row) => ({
      ...row,
    })),
    emergencyContactRows: EOP_SECTION_06_DEFAULT_EMERGENCY_ROWS.map((row) => ({
      ...row,
    })),
    verificationContactName: "",
    verificationPhoneNumber: "",
  },
  approvalReview: {
    reviewRows: EOP_SECTION_09_DEFAULT_REVIEW_ROWS.map((row) => ({ ...row })),
  },
});

let memoryStore: EOP[] = [];

const nextId = (): string => {
  return `eop-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

const ensureSeedData = (): void => {
  if (memoryStore.length > 0) {
    return;
  }
  const seeded = createBaseEop();
  seeded.id = nextId();
  seeded.document.author = "Enter Author Name";
  seeded.document.authorCetLevel = "Enter Author CET Level";
  seeded.signOff.approvedBy = "Enter Approver Name";
  memoryStore = [seeded];
};

export const generateEOP = async (): Promise<EOP> => {
  return Promise.resolve(cloneEop(createBaseEop()));
};

export const getLatestEOP = async (eopId: string): Promise<EOP | null> => {
  ensureSeedData();
  const id = eopId.trim();
  if (id === "") {
    return Promise.resolve(null);
  }
  const found = memoryStore.find((row) => row.id === id);
  return Promise.resolve(found ? cloneEop(found) : null);
};

export const createEOP = async (eop: EOP): Promise<EOP> => {
  const next = cloneEop(eop);
  next.id = nextId();
  memoryStore = [next, ...memoryStore];
  return Promise.resolve(cloneEop(next));
};

export const saveEOP = async (eop: EOP, eopId: string): Promise<EOP> => {
  ensureSeedData();
  const id = eopId.trim();
  const idx = memoryStore.findIndex((row) => row.id === id);
  if (idx < 0) {
    throw new Error("EOP not found");
  }
  const updated = cloneEop(eop);
  updated.id = id;
  memoryStore[idx] = updated;
  return Promise.resolve(cloneEop(updated));
};

export const getEOPList = async (): Promise<EopListSummaryRow[]> => {
  ensureSeedData();
  const rows = memoryStore.map((row) => ({
    eopId: row.id,
    title: row.document.title,
    assetName: row.equipment.componentType,
    versionNumber: row.document.version,
    status: "draft" as const,
    lastModified: new Date().toISOString(),
  }));
  return Promise.resolve(rows);
};

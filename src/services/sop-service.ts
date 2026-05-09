import type { SOP } from "@/types/sop";
import type {
  CanonicalSopVersionApiRow,
  SopListSummaryRow,
} from "@/types/sop-api";

const DUMMY_SOP: SOP = {
  id: "dummy-sop-ahu-weekly-system-check",
  document: {
    title: "Air Handling Units Weekly System Check",
    identifier: "To be assigned",
    version: 1,
    createdDate: "2026-05-01",
    author: "",
    authorCetLevel: "",
    status: "draft",
    lastModified: "2026-05-01T00:00:00.000Z",
  },
  equipment: {
    componentType: "Air Handling Units",
    manufacturer: "LENNOX",
    modelNumber: "HS29-060-13G",
    serialNumber: "5807C3674",
    equipmentNumber: "AHU 15 CDR",
    location: "MISSING",
  },
  procedure: {
    workDescription: "Weekly System Check",
    duration: "30-45 minutes",
    levelOfRisk: "low",
    cetLevelRequired:
      "CET-1 required to perform work - Basic rounds, readings, visual checks only",
  },
  signOff: {
    approvedBy: "",
  },
};

const cloneSOP = (sop: SOP): SOP => ({
  ...sop,
  document: { ...sop.document },
  equipment: { ...sop.equipment },
  procedure: { ...sop.procedure },
  signOff: { ...sop.signOff },
});

const toListRow = (sop: SOP): SopListSummaryRow => ({
  sopId: sop.id,
  title: sop.document.title,
  assetName: sop.equipment.equipmentNumber,
  versionNumber: sop.document.version,
  status: sop.document.status,
  lastModified: sop.document.lastModified,
});

export const generateSOP = async (): Promise<SOP> => {
  return Promise.resolve(cloneSOP(DUMMY_SOP));
};

export const getLatestSOP = async (sopId: string): Promise<SOP | null> => {
  if (sopId.trim() === "") {
    return Promise.resolve(null);
  }

  return Promise.resolve({ ...cloneSOP(DUMMY_SOP), id: sopId.trim() });
};

export const saveSOP = async (sop: SOP, sopId: string): Promise<SOP> => {
  const id = sopId.trim() === "" || sopId === "new" ? DUMMY_SOP.id : sopId.trim();

  return Promise.resolve({
    ...cloneSOP(sop),
    id,
    document: {
      ...sop.document,
      lastModified: new Date().toISOString(),
    },
  });
};

export const getSOPList = async (
  siteId?: string,
): Promise<SopListSummaryRow[]> => {
  void siteId;
  return Promise.resolve([toListRow(DUMMY_SOP)]);
};

export const getSOPVersions = async (
  sopId: string,
): Promise<CanonicalSopVersionApiRow[]> => {
  const liveSop = { ...cloneSOP(DUMMY_SOP), id: sopId.trim() };
  const archivedSop = {
    ...cloneSOP(liveSop),
    document: {
      ...liveSop.document,
      version: 1,
      lastModified: "2026-05-01T00:00:00.000Z",
    },
  };

  return Promise.resolve([
    {
      versionNumber: 2,
      isLatest: true,
      archivedAt: null,
      sop: { ...liveSop, document: { ...liveSop.document, version: 2 } },
    },
    {
      versionNumber: 1,
      isLatest: false,
      archivedAt: "2026-05-01T00:00:00.000Z",
      sop: archivedSop,
    },
  ]);
};

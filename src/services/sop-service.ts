import { buildDefaultSopSection04Rows } from "@/constants/sop-section04-facility";
import { buildDefaultSopSiteHazardRows } from "@/constants/sop-section05-hazards";
import {
  buildDefaultSopEmergencyContactRows,
  buildDefaultSopPpeRows,
  buildDefaultSopToolRows,
} from "@/constants/sop-section05-safety";
import {
  buildDefaultSopCriticalDecisionItems,
  buildDefaultSopKeyAssumptionRows,
  buildDefaultSopRiskAnalysisRows,
} from "@/constants/sop-section06-risks";
import { buildDefaultSopPreProcedureCheckRows } from "@/constants/sop-section07-details";
import { buildDefaultSopDetailedProcedureStepRows } from "@/constants/sop-section07-procedure-steps";
import { buildDefaultSopBackOutProcedureRows } from "@/constants/sop-section08-back-out";
import { buildDefaultSopApproval } from "@/constants/sop-section09-approval";
import { buildDefaultSopComments } from "@/constants/sop-section10-comments";
import { buildDefaultSopReferences } from "@/constants/sop-section11-references";
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
  site: {
    customer: "T5 Data Centers",
    siteName: "T5 @ Chicago I",
    dataCenterLocation: "MISSING",
    siteAddress: "1000 Lunt Ave, Elk Grove Village, IL 60007",
    siteContact: "",
  },
  overview: {
    sopTitle: "Air Handling Units Weekly System Check",
    workArea: "",
    buildingFloorRoom: "",
    accessRequirements: "",
    workDeliveryType: "self_delivered",
    qualificationsRequired:
      "CET-1 Certification: Demonstrated basic competency in data center operations and safety protocols.\nHVAC Fundamentals Training: Basic understanding of HVAC system components, airflow, and refrigeration cycles.\nLENNOX HS29-060-13G Familiarization: Knowledge of the specific unit's operational characteristics, control panel, and safety features as outlined in the manufacturer's manual.\nSite-Specific Safety Training: Completion of all required site safety orientations and hazard awareness training.\nLockout/Tagout (LOTO) Awareness: Understanding of LOTO procedures, even if not performing LOTO for this specific check, to identify when it might be required for further intervention.",
    advanceNotifications:
      "Building Management System (BMS)/DCIM Operator: Notify of impending weekly check to ensure no alarms are generated due to routine inspection activities and to coordinate any necessary data logging.\nSite Operations Manager: Inform of planned activity and estimated duration.\nRelevant Data Center Tenants (if applicable): If the AHU directly serves a specific tenant space, a courtesy notification may be required.\nSecurity Personnel: For access to restricted areas or if external checks of the outdoor unit are required.",
    postNotifications:
      "Building Management System (BMS)/DCIM Operator: Confirm completion of the check, report any anomalies found, and ensure all system points are returned to normal monitoring.\nSite Operations Manager: Provide a brief summary of the check, including any findings or actions taken.\nLogbook/CMMS Update: Document completion of the weekly check in the equipment logbook or Computerized Maintenance Management System (CMMS).",
  },
  facilityEffects: buildDefaultSopSection04Rows(),
  safety: {
    ppeRequirementRows: buildDefaultSopPpeRows(),
    toolRequirementRows: buildDefaultSopToolRows(),
    emergencyContactRows: buildDefaultSopEmergencyContactRows(),
    siteHazardRows: buildDefaultSopSiteHazardRows(),
  },
  risksAssumptions: {
    riskAnalysisRows: buildDefaultSopRiskAnalysisRows(),
    keyAssumptionRows: buildDefaultSopKeyAssumptionRows(),
    criticalDecisionPointItems: buildDefaultSopCriticalDecisionItems(),
  },
  details: {
    preProcedureCheckRows: buildDefaultSopPreProcedureCheckRows(),
    detailedProcedureStepRows: buildDefaultSopDetailedProcedureStepRows(),
  },
  backOutProcedures: {
    rows: buildDefaultSopBackOutProcedureRows(),
  },
  approval: buildDefaultSopApproval(),
  comments: buildDefaultSopComments(),
  references: buildDefaultSopReferences(),
};

const cloneSOP = (sop: SOP): SOP => ({
  ...sop,
  document: { ...sop.document },
  equipment: { ...sop.equipment },
  procedure: { ...sop.procedure },
  signOff: { ...sop.signOff },
  site: { ...sop.site },
  overview: { ...sop.overview },
  facilityEffects: sop.facilityEffects.map((row) => ({ ...row })),
  safety: {
    ppeRequirementRows: sop.safety.ppeRequirementRows.map((row) => ({ ...row })),
    toolRequirementRows: sop.safety.toolRequirementRows.map((row) => ({ ...row })),
    emergencyContactRows: sop.safety.emergencyContactRows.map((row) => ({
      ...row,
    })),
    siteHazardRows: sop.safety.siteHazardRows.map((row) => ({ ...row })),
  },
  risksAssumptions: {
    riskAnalysisRows: sop.risksAssumptions.riskAnalysisRows.map((row) => ({
      ...row,
    })),
    keyAssumptionRows: sop.risksAssumptions.keyAssumptionRows.map((row) => ({
      ...row,
    })),
    criticalDecisionPointItems:
      sop.risksAssumptions.criticalDecisionPointItems.map((row) => ({
        ...row,
      })),
  },
  details: {
    preProcedureCheckRows: sop.details.preProcedureCheckRows.map((row) => ({
      ...row,
    })),
    detailedProcedureStepRows: sop.details.detailedProcedureStepRows.map((row) => ({
      ...row,
    })),
  },
  backOutProcedures: {
    rows: sop.backOutProcedures.rows.map((row) => ({ ...row })),
  },
  approval: {
    reviewRows: sop.approval.reviewRows.map((row) => ({ ...row })),
    effectiveDate: sop.approval.effectiveDate,
    expirationDate: sop.approval.expirationDate,
  },
  comments: {
    relevantCommentItems: sop.comments.relevantCommentItems.map((row) => ({
      ...row,
    })),
    postOperationRequirementItems:
      sop.comments.postOperationRequirementItems.map((row) => ({ ...row })),
    additionalNoteItems: sop.comments.additionalNoteItems.map((row) => ({
      ...row,
    })),
  },
  references: {
    equipmentDocumentRows: sop.references.equipmentDocumentRows.map((row) => ({
      ...row,
    })),
    safetyStandardRows: sop.references.safetyStandardRows.map((row) => ({
      ...row,
    })),
    additionalResourceRows: sop.references.additionalResourceRows.map((row) => ({
      ...row,
    })),
    usageGuidelineItems: sop.references.usageGuidelineItems.map((row) => ({
      ...row,
    })),
    verificationNotice: sop.references.verificationNotice,
  },
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

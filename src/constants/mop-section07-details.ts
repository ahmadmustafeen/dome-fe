import { newMopRowId } from "@/utils/mopRowId";

import type {
  MopEnginePerformanceDataRow,
  MopFaultAlarmHistoryRow,
  MopGeneratorOperationalDataRow,
} from "@/types/mop";

type MopGeneratorOperationalInputRow = MopGeneratorOperationalDataRow & { id?: string };

export const MOP_SECTION_07_HEADING = "Section 07: MOP Details";

export const MOP_SECTION_07_GENERATOR_LOG_SUBHEADING =
  "Operational Data Log";

export const MOP_SECTION_07_ENGINE_PERFORMANCE_SUBHEADING = "Performance Data";

export const MOP_SECTION_07_FAULT_HISTORY_SUBHEADING = "System Fault/Alarm History";

export const MOP_SECTION_07_IMPORTANT_SUBHEADING = "Important Indicators";

export const MOP_SECTION_07_DEFAULT_FAULT_ROW_COUNT = 3;

const generatorOpStatic: readonly {
  rowId: string;
  parameter: string;
  units: string;
  acceptableRange: string;
}[] = [];

export const buildDefaultGeneratorOperationalRows = (): MopGeneratorOperationalDataRow[] =>
  generatorOpStatic.map((s) => ({
    rowId: s.rowId,
    parameter: s.parameter,
    asFound: "",
    asLeft: "",
    units: s.units,
    acceptableRange: s.acceptableRange,
  }));

const engineStatic: readonly {
  rowId: string;
  parameter: string;
  units: string;
}[] = [
    { rowId: "eng-hours", parameter: "Hours of Operation", units: "Hours" },
    { rowId: "eng-last", parameter: "Last Service Date", units: "Date" },
    { rowId: "eng-next", parameter: "Next Service Due", units: "Hours/Date" },
  ];

export const buildDefaultEnginePerformanceRows = (): MopEnginePerformanceDataRow[] =>
  engineStatic.map((s) => ({
    rowId: s.rowId,
    parameter: s.parameter,
    reading: "",
    units: s.units,
    status: "",
  }));

export const newFaultAlarmRow = (): MopFaultAlarmHistoryRow => ({
  id: newMopRowId("fl"),
  dateTime: "",
  faultCode: "",
  description: "",
  actionTaken: "",
  initials: "",
});

export const buildDefaultFaultAlarmRows = (count: number): MopFaultAlarmHistoryRow[] =>
  Array.from({ length: count }, () => newFaultAlarmRow());

const ensureFaultId = (r: MopFaultAlarmHistoryRow): MopFaultAlarmHistoryRow => ({
  ...r,
  id: r.id && r.id.length > 0 ? r.id : newMopRowId("fl"),
});

export const resolveGeneratorOperationalRows = (
  rows: MopGeneratorOperationalInputRow[] | undefined,
): MopGeneratorOperationalDataRow[] => {
  const defaults = buildDefaultGeneratorOperationalRows();
  if (!rows?.length) return defaults;
  const byId = new Map<string, MopGeneratorOperationalInputRow>();
  rows.forEach((r) => {
    const id = r.rowId ?? r.id;
    if (id) byId.set(id, r);
  });
  const byParameter = new Map(rows.filter((r) => r.parameter).map((r) => [r.parameter, r]));
  return defaults.map((d, index) => {
    const v = byId.get(d.rowId) ?? byParameter.get(d.parameter) ?? rows[index];
    return v
      ? {
        ...d,
        asFound: v.asFound,
        asLeft: v.asLeft,
      }
      : d;
  });
};

export const resolveEnginePerformanceRows = (
  rows: MopEnginePerformanceDataRow[] | undefined,
): MopEnginePerformanceDataRow[] => {
  const defaults = buildDefaultEnginePerformanceRows();
  if (!rows?.length) return defaults;
  const byId = new Map(rows?.map((r) => [r.rowId, r]));
  return defaults.map((d) => {
    const v = byId.get(d.rowId);
    return v
      ? { ...d, reading: v.reading, status: v.status }
      : d;
  });
};

export const resolveFaultAlarmHistoryRows = (
  rows: MopFaultAlarmHistoryRow[] | undefined,
): MopFaultAlarmHistoryRow[] => {
  if (!rows || rows.length === 0) {
    return buildDefaultFaultAlarmRows(MOP_SECTION_07_DEFAULT_FAULT_ROW_COUNT);
  }
  return rows?.map((r) => ensureFaultId(r));
};

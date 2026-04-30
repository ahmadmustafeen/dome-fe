import { newMopRowId } from "@/utils/mopRowId";

import type {
  MopEnginePerformanceDataRow,
  MopFaultAlarmHistoryRow,
  MopGeneratorOperationalDataRow,
} from "@/types/mop";

export const MOP_SECTION_07_HEADING = "Section 07: MOP Details";

export const MOP_SECTION_07_GENERATOR_LOG_SUBHEADING =
  "Generator Operational Data Log (Unit: GENERATOR 1)";

export const MOP_SECTION_07_ENGINE_PERFORMANCE_SUBHEADING = "Engine Performance Data";

export const MOP_SECTION_07_FAULT_HISTORY_SUBHEADING = "System Fault/Alarm History";

export const MOP_SECTION_07_IMPORTANT_SUBHEADING = "Important Indicators";

export const MOP_SECTION_07_DEFAULT_FAULT_ROW_COUNT = 3;

const generatorOpStatic: readonly {
  rowId: string;
  parameter: string;
  units: string;
  acceptableRange: string;
}[] = [
  { rowId: "gen-v-l1l2", parameter: "Output Voltage L1-L2", units: "VAC", acceptableRange: "480 ±5%" },
  { rowId: "gen-v-l2l3", parameter: "Output Voltage L2-L3", units: "VAC", acceptableRange: "480 ±5%" },
  { rowId: "gen-v-l1l3", parameter: "Output Voltage L1-L3", units: "VAC", acceptableRange: "480 ±5%" },
  { rowId: "gen-i-l1", parameter: "Output Current L1", units: "Amps", acceptableRange: "Per load" },
  { rowId: "gen-i-l2", parameter: "Output Current L2", units: "Amps", acceptableRange: "Per load" },
  { rowId: "gen-i-l3", parameter: "Output Current L3", units: "Amps", acceptableRange: "Per load" },
  { rowId: "gen-freq", parameter: "Frequency", units: "Hz", acceptableRange: "60 ±0.5" },
  { rowId: "gen-rpm", parameter: "Engine RPM", units: "RPM", acceptableRange: "1800 ±1%" },
  { rowId: "gen-oil", parameter: "Oil Pressure", units: "PSI", acceptableRange: "30-80 PSI" },
  { rowId: "gen-cool", parameter: "Coolant Temperature", units: "°F", acceptableRange: "160-200°F" },
  { rowId: "gen-fuel", parameter: "Fuel Level", units: "%", acceptableRange: ">25%" },
  { rowId: "gen-batt", parameter: "Battery Voltage", units: "VDC", acceptableRange: "24-28 VDC" },
];

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
  rows: MopGeneratorOperationalDataRow[] | undefined,
): MopGeneratorOperationalDataRow[] => {
  const defaults = buildDefaultGeneratorOperationalRows();
  if (!rows?.length) return defaults;
  const byId = new Map(rows.map((r) => [r.rowId, r]));
  return defaults.map((d) => {
    const v = byId.get(d.rowId);
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
  const byId = new Map(rows.map((r) => [r.rowId, r]));
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
  return rows.map((r) => ensureFaultId(r));
};

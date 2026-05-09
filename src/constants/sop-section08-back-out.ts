import type { SOPBackOutProcedureRow } from "@/types/sop";
import { newProcedureRowId } from "@/utils/procedure-row-id";

export const SOP_SECTION_08_HEADING = "Section 08: Back-out Procedures";

export const SOP_SECTION_08_BACK_OUT_ROWS: readonly SOPBackOutProcedureRow[] = [
  {
    id: "return-ahu-to-normal-operation",
    step: 1,
    description:
      "Return AHU to Normal Operation\nEnsure all access panels are securely closed and latched. Confirm all temporary tools or equipment are removed from the work area.",
    verification: "All panels secured, no tools left behind.",
    actionRequired:
      "If panels are not secured, re-secure them. If tools are left, retrieve them.",
  },
  {
    id: "verify-ahu-operational-status",
    step: 2,
    description:
      "Verify AHU Operational Status\nCheck BMS/local display for AHU 15 CDR to confirm it is running in its normal operating mode, with no new alarms generated.",
    verification: "AHU operating normally, no alarms.",
    actionRequired:
      "If alarms are present or AHU is not operating correctly, troubleshoot minor issues (e.g., reset controller if safe) or escalate to Site Operations Manager/HVAC technician.",
  },
  {
    id: "confirm-environmental-stability",
    step: 3,
    description:
      "Confirm Environmental Stability\nMonitor data center temperature and humidity via BMS/DCIM to ensure stability after the check.",
    verification: "Data center environment stable and within setpoints.",
    actionRequired:
      "If environmental parameters are unstable, investigate AHU operation and escalate if necessary.",
  },
  {
    id: "notify-bms-dcim-operator-completion",
    step: 4,
    description:
      "Notify BMS/DCIM Operator of Completion\nInform the BMS/DCIM operator that the weekly check is complete and to resume normal monitoring.",
    verification: "BMS/DCIM operator acknowledges completion.",
    actionRequired:
      "If operator cannot be reached, leave a detailed message and follow up.",
  },
  {
    id: "document-back-out-verification",
    step: 5,
    description:
      "Document Back-out/Verification\nRecord details of any back-out steps taken or issues encountered during verification in the logbook/CMMS.",
    verification: "Documentation is complete and accurate.",
    actionRequired: "Ensure all details are logged for future reference.",
  },
] as const;

export const buildDefaultSopBackOutProcedureRows =
  (): SOPBackOutProcedureRow[] =>
    SOP_SECTION_08_BACK_OUT_ROWS.map((row) => ({ ...row }));

export const newSopBackOutProcedureRow = (): SOPBackOutProcedureRow => ({
  id: newProcedureRowId("sop-back-out"),
  step: 0,
  description: "",
  verification: "",
  actionRequired: "",
});

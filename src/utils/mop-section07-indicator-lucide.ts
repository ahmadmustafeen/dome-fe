import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  RefreshCw,
  Shield,
  UserCheck,
} from "lucide-react";

import type { MopImportantIndicatorId } from "@/constants/mop-section07-important-indicators";

/**
 * One Lucide component per `MopImportantIndicatorId` — matches the Section 7 legend.
 * API/JSON should send the `id` string; the UI resolves the icon from the same id.
 */
export const MOP_SECTION_07_IMPORTANT_INDICATOR_LUCIDE_BY_ID: Readonly<
  Record<MopImportantIndicatorId, LucideIcon>
> = {
  changeOfState: ArrowLeftRight,
  safetyAlert: AlertTriangle,
  stopValidate: Shield,
  importantNote: HelpCircle,
  rollback: RefreshCw,
  twoPerson: UserCheck,
  expectedResult: CheckCircle2,
  loto: ClipboardList,
};

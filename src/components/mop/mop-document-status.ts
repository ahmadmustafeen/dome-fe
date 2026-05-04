import type { MOPStatus as MopDocumentApiStatus } from "@/types/mop";
import type { MopStatus } from "@/types/mop-form";

export const mopDocumentStatusToFormLabel = (s: MopDocumentApiStatus): MopStatus => {
  if (s === "draft") {
    return "Draft";
  }
  if (s === "ready_to_deliver") {
    return "Ready to Deliver";
  }
  if (s === "delivered") {
    return "Delivered to Client";
  }
  return "Revision Needed";
};

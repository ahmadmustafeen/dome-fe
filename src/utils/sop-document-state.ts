import type { SOP } from "@/types/sop";

export const bumpSopModified = (sop: SOP): SOP => ({
  ...sop,
  document: { ...sop.document, lastModified: new Date().toISOString() },
});

export const patchSopSection = <Section>(
  prev: SOP,
  key: keyof SOP,
  partial: Partial<Section>,
): SOP => {
  if (prev === null) {
    return prev;
  }

  return bumpSopModified({
    ...prev,
    [key]: { ...(prev[key] as object), ...partial },
  });
};

export const sopBootstrapKey = (
  mode: "create" | "edit",
  id: string | undefined,
): string => `${mode}|${id ?? ""}`;

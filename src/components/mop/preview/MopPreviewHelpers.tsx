import { MOP_RISK_STYLES } from "@/constants/mop-form";
import type { MopRiskLevel } from "@/types/mop-form";

export const formatPreviewStamp = (iso: string) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

export const PreviewVal = ({ text }: { text: string }) =>
  text.trim() ? (
    <div className="mop-doc-preview-value">{text}</div>
  ) : (
    <div className="mop-doc-preview-value mop-doc-preview-value--muted">—</div>
  );

export const RiskReadOnly = ({ level }: { level: MopRiskLevel | "" }) => {
  if (!level) {
    return (
      <div className="mop-doc-preview-value mop-doc-preview-value--muted">—</div>
    );
  }
  const st = MOP_RISK_STYLES[level];
  return <span className={st.previewClass}>{st.label}</span>;
};

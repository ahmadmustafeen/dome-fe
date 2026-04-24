import type { ReactNode } from "react";

type MopFieldRowProps = {
  label: string;
  children: ReactNode;
};

export const MopFieldRow = ({ label, children }: MopFieldRowProps) => {
  return (
    <div className="mop-doc-grid">
      <div className="mop-doc-label">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
};

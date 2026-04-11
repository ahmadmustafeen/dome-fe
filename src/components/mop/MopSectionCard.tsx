import type { ReactNode } from "react";

import { cn } from "@/utils/Helpers";

type SectionAccent = 1 | 2 | 3 | 4 | 5 | 6;

type MopSectionCardProps = {
  sectionNumber: number;
  title: string;
  accent: SectionAccent;
  children: ReactNode;
};

const accentMap: Record<SectionAccent, { section: string; badge: string }> = {
  1: { section: "mop-doc-accent-1", badge: "mop-doc-badge-1" },
  2: { section: "mop-doc-accent-2", badge: "mop-doc-badge-2" },
  3: { section: "mop-doc-accent-3", badge: "mop-doc-badge-3" },
  4: { section: "mop-doc-accent-4", badge: "mop-doc-badge-4" },
  5: { section: "mop-doc-accent-5", badge: "mop-doc-badge-5" },
  6: { section: "mop-doc-accent-6", badge: "mop-doc-badge-6" },
};

export const MopSectionCard = ({
  sectionNumber,
  title,
  accent,
  children,
}: MopSectionCardProps) => {
  const a = accentMap[accent];
  return (
    <section className={cn("mop-doc-section", a.section)}>
      <div className="mop-doc-section-head">
        <span className={cn("mop-doc-section-badge", a.badge)}>
          {sectionNumber}
        </span>
        <h2 className="mop-doc-section-title">{title}</h2>
      </div>
      <div className="mop-doc-section-body">{children}</div>
    </section>
  );
};

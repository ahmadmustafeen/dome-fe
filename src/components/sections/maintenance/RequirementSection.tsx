"use client";
import type { ProcedureItem } from "@/types/maintenance-schedule";

type RequirementSectionProps = {
  label: string;
  items: ProcedureItem[];
  colorClass: string;
  onGenerate: (item: ProcedureItem) => void;
};

const RequirementSection = ({
  label,
  items,
  colorClass,
}: RequirementSectionProps) => {
  const textColorClass = colorClass
    .replace("border-", "text-")
    .replace("-200", "-700");

  return (
    <div className={`rounded-lg border ${colorClass} p-4`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p
          className={`text-xs font-bold tracking-wider uppercase ${textColorClass}`}
        >
          {label}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-400 italic">None required</p>
      ) : (
        <ol className="list-inside list-decimal space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-xs leading-relaxed text-gray-700"
            >
              <div className="flex-1 text-left">{item}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export { RequirementSection };

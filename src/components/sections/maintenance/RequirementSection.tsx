"use client";
import { Eye, FilePlus } from "lucide-react";

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
  onGenerate,
}: RequirementSectionProps) => {
  const generatedCount = items.filter((i) => i.generated).length;
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
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${textColorClass} bg-white/60`}
          title={`${generatedCount} of ${items.length} generated`}
        >
          {generatedCount}/{items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-400 italic">None required</p>
      ) : (
        <ol className="list-inside list-decimal space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2 text-xs leading-relaxed text-gray-700"
            >
              <span className="flex-1">{item.description}</span>
              <span className="flex shrink-0 items-center gap-1 pt-0.5">
                {item.generated ? (
                  <button
                    onClick={() =>
                      window.open(
                        item.documentUrl ?? "#",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    title="View generated document"
                    className="rounded p-0.5 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Eye className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onGenerate(item)}
                    title="Generate document"
                    className="rounded p-0.5 text-primary transition-colors hover:bg-primary/10"
                  >
                    <FilePlus className="size-4" />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export { RequirementSection };

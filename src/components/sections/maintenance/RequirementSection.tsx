"use client";
import type { ProcedureItem } from "@/types/maintenance-schedule";
import { Eye, PenIcon, PlusCircleIcon, Trash } from 'lucide-react'

type RequirementSectionProps = {
  label: string;
  items: ProcedureItem[];
  handleCreateClick?: (mopId: string, isCustom: boolean) => void,
  handleDeleteDocument?: (mopId: string) => void,
  noIcon?: boolean;
  colorClass: string;
  existing?: string[]
  onGenerate: (item: ProcedureItem) => void;
};

const RequirementSection = ({
  label,
  handleDeleteDocument,
  handleCreateClick,
  items,
  noIcon,
  colorClass,
  existing,
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
        {noIcon ? null : <div title="Create custom">
          <PlusCircleIcon className="w-4 h-4 cursor-pointer" size={2}
            onClick={() => handleCreateClick?.('custom', true)}
          />
        </div>}
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-400 italic">None required</p>
      ) : (
        <ol className="list-inside list-decimal space-y-2">
          {items?.map((item) => {
            return <li
              key={item._id}
              className="flex min-h-10 items-start gap-2 text-xs leading-relaxed text-gray-700"
            >
              <div className="flex-1 text-left">
                {item.title}</div>
              {noIcon ? null : existing?.includes(item._id.toString()) ?
                <Eye className="w-4 h-4 cursor-pointer" size={2}
                  onClick={() => handleCreateClick?.(item._id, false)} />
                : <PenIcon className="w-4 h-4 cursor-pointer" size={2}
                  onClick={() => handleCreateClick?.(item._id, false)}
                />}
              {
                existing?.includes(item._id.toString()) ?
                  <Trash className="w-4 h-4 cursor-pointer" size={2}
                    onClick={() => handleDeleteDocument?.(item._id)} /> : null
              }
            </li>
          }
          )}
        </ol>
      )}
    </div>
  );
};

export { RequirementSection };

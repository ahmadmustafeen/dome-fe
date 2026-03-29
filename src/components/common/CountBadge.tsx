import { cn } from "@/utils/Helpers";

type CountBadgeProps = {
  count: number;
  className?: string;
  emptyClassName?: string;
};

/** Rounded primary pill for numeric counts (e.g. MOP/EOP/SOP totals). */
const CountBadge = ({ count, className, emptyClassName }: CountBadgeProps) => {
  if (count > 0) {
    return (
      <div className={cn("flex justify-center", className)}>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn("block text-center text-xs text-gray-400", emptyClassName)}
    >
      —
    </span>
  );
};

export { CountBadge };

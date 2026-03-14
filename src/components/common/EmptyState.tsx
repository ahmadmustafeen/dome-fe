import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  heading: string;
  description?: string;
  action?: ReactNode;
};

const EmptyState = ({
  icon,
  heading,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-base font-semibold text-slate-700">{heading}</p>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export { EmptyState };

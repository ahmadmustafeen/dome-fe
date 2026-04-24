import { MOP_STATUS_STYLES } from "@/constants/mop-form";
import type { MopStatus } from "@/types/mop-form";

interface MopStatusBadgeProps {
  status: MopStatus;
  className?: string;
}

export const MopStatusBadge = ({
  status,
  className = "",
}: MopStatusBadgeProps) => {
  const { badgeClass } = MOP_STATUS_STYLES[status] ?? MOP_STATUS_STYLES.Draft;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass} ${className}`}
    >
      {status}
    </span>
  );
};

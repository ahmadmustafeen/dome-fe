import Link from "next/link";

import { SectionWrapper, Typography } from "@/components/common";
import { DASHBOARD_ROUTES } from "@/constants/routes";

export const SopNotFoundState = () => {
  return (
    <SectionWrapper className="flex min-h-0 flex-1 flex-col">
      <Typography variant="h1" className="mb-2">
        SOP not found
      </Typography>
      <Typography variant="p" className="mb-4 text-gray-600">
        This SOP may have been deleted or the link is invalid.
      </Typography>
      <Link
        href={DASHBOARD_ROUTES.SOP_MANAGEMENT}
        className="font-medium text-primary underline"
      >
        Back to SOP listing
      </Link>
    </SectionWrapper>
  );
};

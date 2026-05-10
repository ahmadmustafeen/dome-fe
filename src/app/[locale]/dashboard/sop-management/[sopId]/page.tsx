import { Suspense } from "react";

import { Typography } from "@/components/common";
import { SopManagementClient } from "@/components/sop/SopManagementClient";

export default async function SopEditPage(props: {
  params: Promise<{ locale: string; sopId: string }>;
}) {
  const { sopId } = await props.params;

  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading...
        </Typography>
      }
    >
      <SopManagementClient sopId={sopId} />
    </Suspense>
  );
}

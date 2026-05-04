import { Suspense } from "react";

import { Typography } from "@/components/common";
import { MopManagementClient } from "@/components/mop/MopManagementClient";

export default async function MopEditPage(props: {
  params: Promise<{ locale: string; mopId: string }>;
}) {
  const { mopId } = await props.params;

  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading…
        </Typography>
      }
    >
      <MopManagementClient mopId={mopId} />
    </Suspense>
  );
}

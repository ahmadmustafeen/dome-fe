import { Suspense } from "react";

import { Typography } from "@/components/common";
import { EopManagementClient } from "@/components/eop/EopManagementClient";

export default async function EopEditPage(props: {
  params: Promise<{ locale: string; eopId: string }>;
}) {
  const { eopId } = await props.params;

  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading…
        </Typography>
      }
    >
      <EopManagementClient eopId={eopId} />
    </Suspense>
  );
}

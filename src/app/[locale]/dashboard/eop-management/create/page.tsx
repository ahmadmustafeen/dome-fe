"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { EopManagementClient } from "@/components/eop/EopManagementClient";

export default function EopManagementCreatePage() {
  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading…
        </Typography>
      }
    >
      <EopManagementClient />
    </Suspense>
  );
}

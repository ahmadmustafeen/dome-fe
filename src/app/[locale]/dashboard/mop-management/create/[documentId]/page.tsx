"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { MopManagementClient } from "@/components/mop/MopManagementClient";

export default function MopManagementCreatePage() {

  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading…
        </Typography>
      }
    >
      <MopManagementClient />
    </Suspense>
  );
}

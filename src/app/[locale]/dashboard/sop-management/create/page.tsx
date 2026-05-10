"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { SopManagementClient } from "@/components/sop/SopManagementClient";

export default function SopManagementCreatePage() {
  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading...
        </Typography>
      }
    >
      <SopManagementClient />
    </Suspense>
  );
}

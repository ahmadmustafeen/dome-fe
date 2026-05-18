"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { EopManagementClient } from "@/components/eop/EopManagementClient";
import { useParams } from "next/navigation";

export default function EopManagementCreatePage() {
  const params = useParams();

  const documentId = params.documentId as string;
  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading…
        </Typography>
      }
    >
      <EopManagementClient documentId={documentId} noDownload />
    </Suspense>
  );
}

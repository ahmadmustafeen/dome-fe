"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { MopManagementClient } from "@/components/mop/MopManagementClient";
import { useParams } from "next/navigation";

export default function MopManagementCreatePage() {
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
      <MopManagementClient documentId={documentId} noDownload />
    </Suspense>
  );
}

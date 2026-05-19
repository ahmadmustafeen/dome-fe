"use client";

import { Suspense } from "react";

import { Typography } from "@/components/common";
import { SopManagementClient } from "@/components/sop/SopManagementClient";
import { useParams } from "next/navigation";

export default function SopManagementCreatePage() {
  const params = useParams();

  const documentId = params.documentId as string;
  return (
    <Suspense
      fallback={
        <Typography variant="p" className="p-6 text-gray-500">
          Loading...
        </Typography>
      }
    >
      <SopManagementClient documentId={documentId} noDownload/>
    </Suspense>
  );
}

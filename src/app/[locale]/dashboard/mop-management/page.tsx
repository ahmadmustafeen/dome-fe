"use client";

import { useRouter } from "next/navigation";

import { AppButton, SectionWrapper, Typography } from "@/components/common";
import { DASHBOARD_ROUTES } from "@/constants/routes";

export default function MopManagementPage() {
  const router = useRouter();

  return (
    <div className="h-full min-h-0">
      <SectionWrapper className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <Typography variant="h1" className="mb-2">
          MOP Management
        </Typography>
        <Typography variant="p" className="mb-8 max-w-md text-gray-600">
          Create and manage Method of Procedure documents. Open the editor to
          fill out a structured MOP with live preview and PDF export.
        </Typography>
        <AppButton
          variant="secondary"
          title="Create new MOP"
          onClick={() => router.push(DASHBOARD_ROUTES.MOP_MANAGEMENT_CREATE)}
        />
      </SectionWrapper>
    </div>
  );
}

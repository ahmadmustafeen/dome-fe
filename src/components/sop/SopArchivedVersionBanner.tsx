"use client";

import { Typography } from "@/components/common";

type SopArchivedVersionBannerProps = {
  versionNumber: number;
  onResumeLatest: () => void;
};

export const SopArchivedVersionBanner = ({
  versionNumber,
  onResumeLatest,
}: SopArchivedVersionBannerProps) => {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950"
    >
      <Typography variant="span" className="font-medium">
        {`You are viewing Version ${versionNumber}. Click Resume Editing to return to the latest version.`}
      </Typography>
      <button
        type="button"
        className="shrink-0 font-semibold underline decoration-amber-800 hover:text-amber-900"
        onClick={onResumeLatest}
      >
        Resume Editing
      </button>
    </div>
  );
};

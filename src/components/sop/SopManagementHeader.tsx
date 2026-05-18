"use client";

import { Download, History } from "lucide-react";

import { AppButton, Typography } from "@/components/common";

type SopManagementHeaderProps = {
  isBootstrapping: boolean;
  showVersionHistory: boolean;
  isDownloading: boolean;
  onDownload: () => void,
  noDownload?: boolean;
  onOpenHistory: () => void;
};

export const SopManagementHeader = ({
  isBootstrapping,
  showVersionHistory,
  isDownloading,
  noDownload,
  onDownload,
  onOpenHistory,
}: SopManagementHeaderProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
      <Typography variant="h1" className="min-w-0 flex-1">
        Standard Operating Procedure (SOP)
      </Typography>
      {!noDownload ? <AppButton
        variant="secondary"
        icon={<Download className="h-4 w-4" />}
        title={isDownloading ? "Downloading..." : "Download"}
        onClick={onDownload}
        disabled={isBootstrapping || isDownloading}
        className="shrink-0"
      /> : null}
      <AppButton
        variant="default"
        icon={<History className="h-4 w-4" />}
        title="Version History"
        onClick={onOpenHistory}
        disabled={isBootstrapping || showVersionHistory === false}
        className="shrink-0"
      />
    </div>
  );
};

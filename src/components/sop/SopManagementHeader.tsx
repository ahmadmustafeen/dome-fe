'use client';

import { BadgeCheck, Download, History } from 'lucide-react';

import { AppButton, Typography } from '@/components/common';

type SopManagementHeaderProps = {
  isBootstrapping: boolean;
  showVersionHistory: boolean;
  showVerify: boolean;
  isDownloading: boolean;
  isVerifying: boolean;
  isVerified: boolean;
  onDownload: () => void;
  onVerify: () => void;
  noDownload?: boolean;
  onOpenHistory: () => void;
};

export const SopManagementHeader = ({
  isBootstrapping,
  showVersionHistory,
  showVerify,
  isDownloading,
  isVerifying,
  isVerified,
  noDownload,
  onDownload,
  onVerify,
  onOpenHistory,
}: SopManagementHeaderProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
      <Typography variant="h1" className="min-w-0 flex-1">
        Standard Operating Procedure (SOP)
      </Typography>
      {!noDownload
        ? (
            <AppButton
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              title={isDownloading ? 'Downloading...' : 'Download'}
              onClick={onDownload}
              disabled={isBootstrapping || isDownloading}
              className="shrink-0"
            />
          )
        : null}
      {showVerify
        ? (
            <AppButton
              variant="secondary"
              icon={<BadgeCheck className="h-4 w-4" />}
              title={isVerified ? 'Verified' : isVerifying ? 'Verifying...' : 'Verify'}
              onClick={onVerify}
              disabled={isBootstrapping || isVerifying || isVerified}
              className="shrink-0"
            />
          )
        : null}
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

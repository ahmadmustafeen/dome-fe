"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { Typography } from "@/components/common";

interface MopVersionHistoryDrawerProps {
  onClose: () => void;
  versionCount: number;
  children: ReactNode;
}

export const MopVersionHistoryDrawer = ({
  onClose,
  versionCount,
  children,
}: MopVersionHistoryDrawerProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Version History"
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl sm:max-w-sm"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <Typography variant="h4">Version History</Typography>
            {versionCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                {versionCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close version history"
            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </>
  );
};

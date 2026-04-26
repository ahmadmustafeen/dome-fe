"use client";

import { Input } from "@/components/ui/Input";
import { isHttpUrl } from "@/constants/mop-section11-references";

type MopSection11AccessColumnProps = {
  rowId: string;
  groupLabel: string;
  linkUrl: string;
  internalAccess: string;
  onLinkUrlChange: (value: string) => void;
  onInternalAccessChange: (value: string) => void;
};

export const MopSection11AccessColumn = ({
  rowId,
  groupLabel,
  linkUrl,
  internalAccess,
  onLinkUrlChange,
  onInternalAccessChange,
}: MopSection11AccessColumnProps) => {
  const showView = isHttpUrl(linkUrl);
  return (
    <div className="flex min-w-[140px] flex-col gap-1">
      <label className="sr-only" htmlFor={`${rowId}-access-url`}>
        {`${groupLabel} access URL`}
      </label>
      <Input
        id={`${rowId}-access-url`}
        value={linkUrl}
        onChange={(e) => onLinkUrlChange(e.target.value)}
        placeholder="https://…"
        className="w-full text-sm"
        autoComplete="off"
      />
      <label className="sr-only" htmlFor={`${rowId}-access-internal`}>
        {`${groupLabel} internal access`}
      </label>
      <Input
        id={`${rowId}-access-internal`}
        value={internalAccess}
        onChange={(e) => onInternalAccessChange(e.target.value)}
        placeholder="Internal — e.g. Request from Site Manager"
        className="w-full text-sm"
        autoComplete="off"
      />
      {showView ? (
        <a
          href={linkUrl.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-blue-700 underline"
        >
          View
        </a>
      ) : null}
    </div>
  );
};

"use client";

import type { ReactNode } from "react";

import { AppButton, EmptyState, SectionWrapper, Typography } from "@/components/common";

type ProcedureDocumentsListLayoutProps = {
  title: string;
  entitySingular: string;
  entityPlural: string;
  totalCount: number;
  isLoading: boolean;
  createButtonTitle: string;
  onCreate: () => void;
  emptyHeading: string;
  emptyDescription: string;
  emptyIcon: ReactNode;
  table: ReactNode;
};

/** Shared list chrome for dashboard procedure modules (MOP, EOP, …). */
export const ProcedureDocumentsListLayout = ({
  title,
  entitySingular,
  entityPlural,
  totalCount,
  isLoading,
  createButtonTitle,
  onCreate,
  emptyHeading,
  emptyDescription,
  emptyIcon,
  table,
}: ProcedureDocumentsListLayoutProps) => {
  const countLabel =
    isLoading === true
      ? "Loading…"
      : `${totalCount} ${totalCount !== 1 ? entityPlural : entitySingular} total`;

  return (
    <SectionWrapper>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="p" className="mt-1 text-gray-500">
            {countLabel}
          </Typography>
        </div>
        <AppButton variant="secondary" title={createButtonTitle} onClick={onCreate} />
      </div>

      {isLoading ? (
        <Typography variant="p" className="py-12 text-center text-gray-400">
          Loading…
        </Typography>
      ) : totalCount === 0 ? (
        <EmptyState
          icon={emptyIcon}
          heading={emptyHeading}
          description={emptyDescription}
          action={
            <AppButton variant="secondary" title={createButtonTitle} onClick={onCreate} />
          }
        />
      ) : (
        table
      )}
    </SectionWrapper>
  );
};

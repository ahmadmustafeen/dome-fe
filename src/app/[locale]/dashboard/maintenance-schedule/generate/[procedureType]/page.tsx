import { notFound } from "next/navigation";

import { MaintenanceGenerateProcedureClient } from "@/components/sections/maintenance/MaintenanceGenerateProcedureClient";
import { isProcedureKind } from "@/types/maintenance-schedule";

type PageProps = {
  params: Promise<{ procedureType: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const firstString = (value: string | string[] | undefined): string | undefined => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value[0]) {
    return value[0];
  }
  return undefined;
};

export default async function MaintenanceGenerateProcedurePage({
  params,
  searchParams,
}: PageProps) {
  const { procedureType } = await params;
  if (!isProcedureKind(procedureType)) {
    notFound();
  }

  const sp = await searchParams;

  return (
    <MaintenanceGenerateProcedureClient
      procedureType={procedureType}
      categoryId={firstString(sp.categoryId)}
      procedureId={firstString(sp.procedureId)}
      assetId={firstString(sp.assetId)}
    />
  );
}

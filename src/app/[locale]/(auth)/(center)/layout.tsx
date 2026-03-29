import { setRequestLocale } from "next-intl/server";
import * as React from "react";

export default async function CenterLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <>{props.children}</>;
}

import { setRequestLocale } from 'next-intl/server';

export default async function CenterLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div >{props.children}</div>
    </div>
  );
}

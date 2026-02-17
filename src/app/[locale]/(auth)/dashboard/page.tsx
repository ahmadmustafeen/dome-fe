import { setRequestLocale } from 'next-intl/server';

export default async function DashboardPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Authentication has been removed. This is a dashboard placeholder.
      </p>
    </div>
  );
}

import { setRequestLocale } from 'next-intl/server';

import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { AppProvider } from '@/context/AppContext';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </AppProvider>
  );
}

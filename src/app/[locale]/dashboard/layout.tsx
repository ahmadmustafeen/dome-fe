import { setRequestLocale } from 'next-intl/server';
import { AppProvider } from '@/context/AppContext';


export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AppProvider>
    {props.children}
  </AppProvider>

}

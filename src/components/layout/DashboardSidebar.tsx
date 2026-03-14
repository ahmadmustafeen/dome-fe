'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { SideBarNavigation } from '@/components/common';
import { useAppContext } from '@/context/AppContext';

const DashboardSidebar = () => {
  const { client, site } = useAppContext();
  const pathname = usePathname();

  // Derive the path segment after /dashboard
  // e.g. /en/dashboard                        → ""
  //      /en/dashboard/assets-management       → "assets-management"
  //      /en/dashboard/assets-management/invalid → "assets-management/invalid"
  const parts = pathname.split('/dashboard');
  const currentPath = parts[1]?.replace(/^\//, '') ?? '';

  return (
    <aside className="flex min-h-screen w-xs shrink-0 flex-col overflow-y-auto bg-primary">
      <div className="flex justify-center pt-10 pb-5">
        <Image
          src="/assets/images/glenart-logo.png"
          alt="Glenart Group Logo"
          width={160}
          height={160}
        />
      </div>

      <div className="flex flex-col items-center gap-y-1 px-2">
        {client?.name && (
          <p className="text-center text-xl text-white">
            Client:
            {' '}
            {client.name}
          </p>
        )}
        {site?.name && (
          <p className="text-center text-xl text-white">
            Site:
            {' '}
            {site.name}
          </p>
        )}
      </div>

      <div className="mt-3 flex-1">
        <SideBarNavigation currentPath={currentPath} />
      </div>
    </aside>
  );
};

export { DashboardSidebar };

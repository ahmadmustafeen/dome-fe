"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SideBarNavigation, Typography } from "@/components/common";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/utils/Helpers";

type DashboardSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const { client, site } = useAppContext();
  const pathname = usePathname();

  const parts = pathname.split("/dashboard");
  const currentPath = parts[1]?.replace(/^\//, "") ?? "";

  return (
    <aside
      className={cn(
        // Base: fixed overlay on mobile, sliding in/out
        "fixed left-0 top-0 z-30 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-primary",
        "transition-transform duration-300 ease-in-out",
        // Desktop: always visible, relative in flow
        "lg:relative lg:translate-x-0 lg:z-auto",
        // Mobile: translate based on open state
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Mobile close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 lg:hidden"
        aria-label="Close sidebar"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Logo */}
      <div className="flex justify-center pt-10 pb-5">
        <Image
          src="/assets/images/glenart-logo.png"
          alt="Glenart Group Logo"
          width={140}
          height={140}
        />
      </div>

      {/* Client / site info */}
      <div className="flex flex-col items-center gap-y-1 px-3">
        {client?.name && (
          <Typography
            variant="p"
            className="text-center font-medium text-white"
          >
            Client: {client.name}
          </Typography>
        )}
        {site?.name && (
          <Typography
            variant="p"
            className="text-center font-medium text-white"
          >
            Site: {site.name}
          </Typography>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-3 flex-1">
        <SideBarNavigation currentPath={currentPath} onClose={onClose} />
      </div>
    </aside>
  );
};

export { DashboardSidebar };

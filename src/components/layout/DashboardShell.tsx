"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Typography } from "@/components/common";
import { cn } from "@/utils/Helpers";

import { DashboardSidebar } from "./DashboardSidebar";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { site, client } = useAppContext()
  console.log({ reloading: "here" });


  useEffect(() => {
    if (!client?._id) {
      return router.push("/en/dashboard")
    }
    if (!site?._id) {
      return router.push("/en/dashboard/client")
    }

  }, [site, client])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 lg:hidden",
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Typography variant="h5" className="text-gray-800">
            DOME
          </Typography>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export { DashboardShell };

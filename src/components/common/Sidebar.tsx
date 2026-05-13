"use client";

import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Navbar, NavItem } from "@/constants/data";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth-service";

import { Typography } from "./Typography";

type SideBarNavigationProps = {
  currentPath: string;
  onClose?: () => void;
};

const SideBarNavigation = ({ currentPath, onClose }: SideBarNavigationProps) => {
  const router = useRouter();
  const [openItem, setOpenItem] = useState<number | null>(null);

  const navigateToLink = (path: string) => {
    router.push(`${DASHBOARD_ROUTES.ROOT}/${path}`);
    onClose?.();
  };

  const handleParentClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setOpenItem((prev) => (prev === item.id ? null : item.id));
    } else {
      navigateToLink(item.link);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.clear()
      toast.success("Logged out successfully");
      window.location.replace(AUTH_ROUTES.SIGN_IN);
    } catch (error) {
      console.error({ error });
      toast.error("An error occurred during logout");
    }
  };

  return (
    <div className="my-3 flex w-full flex-col gap-y-1">
      {Navbar.map((item: NavItem) => {
        const isOpen = openItem === item.id;
        const isParentActive =
          item.subItems?.some((sub) => sub.link === currentPath) ??
          currentPath === item.link;

        return (
          <div key={item.id} className="w-full">
            {/* Parent item */}
            <div
              className={`mx-auto flex w-11/12 cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-white transition-colors hover:bg-white/10 ${
                isParentActive ? "bg-white/20" : ""
              }`}
              onClick={() => handleParentClick(item)}
            >
              <Typography variant="p" className="font-medium text-white">
                {item.title}
              </Typography>

              {item.subItems &&
                (isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-white/70" />
                ))}
            </div>

            {/* Sub items */}
            {item.subItems && isOpen && (
              <div className="mt-0.5 ml-3 flex flex-col gap-y-0.5">
                {item.subItems.map((sub) => {
                  const isSubActive = currentPath === sub.link;

                  return (
                    <div
                      key={sub.id}
                      className={`mx-auto w-10/12 cursor-pointer rounded-lg px-4 py-2 transition-colors hover:bg-white/10 ${
                        isSubActive ? "bg-white/20" : ""
                      }`}
                      onClick={() => navigateToLink(sub.link)}
                    >
                      <Typography variant="caption" className="font-medium text-white/90">
                        {sub.title}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Logout */}
      <button
        type="button"
        className="mx-auto flex w-11/12 cursor-pointer items-center gap-x-2 rounded-lg px-4 py-2.5 text-white transition-colors hover:bg-white/10"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <Typography variant="p" className="font-medium text-white">
          Logout
        </Typography>
      </button>
    </div>
  );
};

export { SideBarNavigation };

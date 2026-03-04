'use client'
import { useState } from "react"
import { Navbar, NavItem } from "@/constants/data"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth-service"
import { toast } from "react-toastify"
import { LogOutIcon } from 'lucide-react'

const SideBarNavigation = ({ currentPath }: { currentPath: string }) => {
  const router = useRouter()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const navigateToLink = (path: string) => {
    router.push(`/en/dashboard/${path}`)
  }

  const handleParentClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0) {
      // toggle dropdown
      setOpenItem(prev => (prev === item.id ? null : item.id))
    } else {
      // normal navigation
      navigateToLink(item.link)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
      window.location.replace('/en/sign-in');
      // Redirect to login page or perform other actions after logout
    } catch (error) {
      console.log({ error });

      toast.error('An error occurred during logout');
    }
  }

  return (
    <div className="my-3 w-full flex flex-col gap-y-2 relative">

      {Navbar.map((item: NavItem) => {


        const isOpen = openItem === item.id
        const isParentActive =
          item.subItems?.some(sub => sub.link === currentPath)

        return (
          <div key={item.id} className="w-full">

            {/* Parent */}
            <div
              className={`py-3 text-white cursor-pointer hover:bg-secondary w-11/12 mx-auto text-center rounded-lg flex justify-between items-center px-4 ${isParentActive ? "bg-secondary" : ""
                }`}
              onClick={() => handleParentClick(item)}
            >
              <span>{item.title}</span>

              {/* Arrow if has subItems */}
              {item.subItems && (
                <span className="text-sm">
                  {isOpen ? "▲" : "▼"}
                </span>
              )}
            </div>

            {/* Sub Items */}
            {item.subItems && isOpen && (
              <div className="flex flex-col gap-y-1 mt-1">

                {item.subItems.map(sub => {
                  const isSubActive = currentPath === sub.link

                  return (
                    <div
                      key={sub.id}
                      className={`py-2 text-sm text-white cursor-pointer hover:bg-secondary w-9/12 mx-auto px-4 rounded-lg ${isSubActive ? "bg-secondary" : ""
                        }`}
                      onClick={() => navigateToLink(sub.link)}
                    >
                      {sub.title}
                    </div>
                  )
                })}

              </div>
            )}

          </div>
        )
      })}
      <div
        className={`py-3 text-white cursor-pointer bg-secondary/50 w-11/12 mx-auto text-center rounded-lg flex justify-start gap-x-3 items-center px-4`}
        onClick={() => handleLogout()}
      >
        Logout
      </div>

    </div>
  )
}

export { SideBarNavigation }
'use client'
import { Navbar } from "@/constants/data"
import { useRouter } from "next/navigation"

const SideBarNavigation = ({ currentPath }: { currentPath: string }) => {

  const router = useRouter();
  const navigateToLink = (path: string) => {
    router.push(`/en/dashboard/${path}`)
  }
  return <div className="my-3 w-full flex flex-col gap-y-2">
    {
      Navbar.map((item) => {
        const selected = item.link === currentPath;
        return <div className={`py-3 text-white cursor-pointer hover:bg-secondary w-11/12 mx-auto text-center rounded-lg ${selected ? "bg-secondary" : ""}`}
          key={item.id}

          onClick={() => navigateToLink(item.link)}
        >
          {item.title}
        </div>
      })
    }


  </div>
}

export { SideBarNavigation }
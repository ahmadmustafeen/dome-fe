'use client'
import { SideBarNavigation } from "@/components";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

export default function DashboardPage() {
  const { site, client } = useAppContext()

  return <div className="flex">
    <div className='bg-primary w-xs h-screen'>
      <div className='w-full justify-center flex pt-10 my-5'>
        <Image
          src={'/assets/images/glenart-logo.png'}
          alt='Glenart Group Logo'
          width={160}
          height={160}
        />
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-y-1">
        <div className="flex text-white text-2xl">
          Client: {client?.name}
        </div>
        <div className="flex text-white text-2xl">
          Site: {site?.name}
        </div>
        <div className="my-3 w-full gap-y-2">
          <SideBarNavigation currentPath="" />

        </div>
      </div>
    </div>
    <div className='flex-1'>

    </div>
  </div>
}

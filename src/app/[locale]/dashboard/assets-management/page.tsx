'use client'
import { AppButton, SideBarNavigation } from "@/components";
import DynamicTable from "@/components/table/DynamicTable";
import { AssetTableHeaders } from "@/constants/data";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useState } from "react";

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultRows = [
  { id: generateId(), "col-name": "Alice Johnson", "col-role": "Engineer", "col-status": "Active" },
  { id: generateId(), "col-name": "Bob Martinez", "col-role": "Designer", "col-status": "On Leave" },
  { id: generateId(), "col-name": "Carol White", "col-role": "Manager", "col-status": "Active" },
];




export default function AssetManagementPage() {
  const { site, client } = useAppContext()
  const [selectedAssets, setSelectedAssets] = useState(new Set<string>());


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
          <SideBarNavigation currentPath="assets-management" />
        </div>
      </div>
    </div>
    <div className='flex-1  p-8'>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            Assets
          </h1>
        </div>
        <div className="flex gap-x-2">
          {selectedAssets?.size ? <AppButton title="Delete Asset(s)" onClick={() => { }} variant="danger" /> : null}
          <AppButton title="Upload CSV/XLSX" onClick={() => { }} variant="secondary" />
          <AppButton title="Create Asset" onClick={() => { }} variant="secondary" />
        </div>
      </div>

      <DynamicTable
        selectedIds={selectedAssets}
        setSelectedIds={setSelectedAssets}
        columns={AssetTableHeaders}
        data={defaultRows}
      />
    </div>
  </div>
}

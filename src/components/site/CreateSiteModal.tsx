'use client'
import { useState } from "react";
import { X } from "lucide-react";
import { Button, InputWithLabel } from "../common";
import { toast } from "react-toastify";
import { Site } from "../cards";
import { siteService } from "@/services/site-service";

const CreateSiteModal = ({ editData, toggleModal, refetchClients, updateSite, clientId }: { editData?: Site, toggleModal: () => void, refetchClients: () => void, updateSite: (id: string, data: any) => Promise<void>, clientId: string }) => {
  const [data, setData] = useState(editData || {
    clientId: clientId,
    name: '',
    timeline: '',
    startDate: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    resetData();
    toggleModal();
  }

  const resetData = () => {
    setData({
      clientId,
      name: '',
      timeline: '',
      startDate: '',
      address: '',
    });
  }

  const handleChange = (key: string, value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (editData) {
      await updateSite(editData._id, data);
      resetData();
      return;
    }
    try {
      await siteService.createSite({ ...data, clientId }) as Response;
      toast.success('Site created successfully');
      handleToggle();
      refetchClients();
    }
    catch (err) {
      console.log({ err });
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed z-10 h-screen w-screen flex justify-center items-center bg-black/50 text-white">
      <div className="w-lg bg-white rounded-xl py-4 px-2 relative  ">
        <X onClick={handleToggle} className="absolute text-xl text-black top-4 right-4 cursor-pointer rounded-full w-8 h-8 p-2 hover:bg-primary hover:text-white" />

        <h1 className="text-2xl text-center mt-5 text-primary font-bold">{editData ? 'Edit Site' : 'Create Site'}</h1>
        <div className="w-full flex flex-col mt-5 px-10">
          <InputWithLabel type="text" placeholder="Acme" label="Site Name" value={data.name} onChange={(e) => handleChange('name', e.target.value)} />
          <InputWithLabel type="text" placeholder="123 Main St, Anytown, USA" label="Site Address" value={data.address} onChange={(e) => handleChange('address', e.target.value)} />
          <InputWithLabel type="text" placeholder="2 weeks" label="Timeline (in weeks)" value={data.timeline} onChange={(e) => handleChange('timeline', e.target.value)} />
          <InputWithLabel type="date" label="Start Date"
            value={data.startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={e => handleChange('startDate', e.target.value)}
          />

          <div className="flex justify-center gap-x-2 mt-2">
            <div className="w-40">
              <Button onClick={handleSubmit} text={editData ? 'Update Site' : 'Create Site'} isLoading={loading} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { CreateSiteModal }
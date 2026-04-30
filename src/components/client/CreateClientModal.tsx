'use client'
import { useState } from "react";
import { X } from "lucide-react";
import { Button, InputWithLabel } from "../common";
import { clientService } from "@/services/client-service";
import { toast } from "react-toastify";
import { Client } from "../cards";
import { formatPhoneNumber } from "@/utils/Helpers";
import { handleValidate } from "@/helpers";

const CreateClientModal = ({ editData, toggleModal, refetchClients, updateClient }: { editData?: Client, toggleModal: () => void, refetchClients: () => void, updateClient: (id: string, data: any) => Promise<void> }) => {
  const [data, setData] = useState(editData || {
    name: '',
    email: '',
    phone: '',
    state: '',
    zipCode: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    resetData();
    toggleModal();
  }

  const resetData = () => {
    setData({
      name: '',
      email: '',
      phone: '',
      state: '',
      zipCode: '',
      country: '',
      city: '',
      address1: '',
      address2: '',
    });
  }

  const handleChange = (key: string, value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    const validationFields = [
      'name',
      'email',
      'phone',
      'state',
      'zipCode',
      'country',
      'address1',
      'city',
    ]
    if (!handleValidate(data, validationFields)) return false;

    setLoading(true);

    if (editData) {
      await updateClient(editData._id, data);
      resetData();
      return;
    }
    try {
      await clientService.createClient(data) as Response;
      toast.success('Client created successfully');
      handleToggle();
      refetchClients();
    }
    catch (err) {
      console.log({ err });
    }
    finally {
      setLoading(false);
      return true
    }
  }

  return (
    <div className="fixed z-10 h-screen w-screen flex top-0 left-0 justify-center items-center bg-black/50 text-white">
      <div className="w-11/12 md:w-3xl bg-white rounded-xl py-4 px-2 relative  ">
        <X onClick={handleToggle} className="absolute text-xl text-black top-4 right-4 cursor-pointer rounded-full w-8 h-8 p-2 hover:bg-primary hover:text-white" />

        <h1 className="text-2xl text-center mt-5 text-primary font-bold">{editData ? 'Edit Client' : 'Create Client'}</h1>
        <div className="w-full flex flex-col mt-5 px-10 max-h-150 overflow-scroll pb-3">
          <div className="flex flex-col md:flex-row md:gap-x-4">
            <InputWithLabel
              type="text"
              placeholder="Acme"
              label="Name*"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <InputWithLabel
              type="email"
              placeholder="info@acmecorp.com"
              label="Email*"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-4">
            <InputWithLabel
              type="tel"
              placeholder="(555) 123-4567"
              label="Phone*"
              value={formatPhoneNumber(data.phone)}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                handleChange('phone', raw);
              }}
            />
            <InputWithLabel
              type="text"
              placeholder="USA"
              label="Country*"
              value={data.country}
              onChange={(e) => handleChange('country', e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="Dallas"
              label="City*"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-4">
            <InputWithLabel
              type="text"
              placeholder="Texas"
              label="State*"
              value={data.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
            <InputWithLabel
              type="number"
              placeholder="34233"
              label="Zip Code*"
              value={data.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-4">
            <InputWithLabel
              type="text"
              placeholder="123 Main St, Anytown, USA"
              label="Address Line 1*"
              value={data.address1}
              onChange={(e) => handleChange('address1', e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-x-4">
            <InputWithLabel
              type="text"
              placeholder="123 Main St, Anytown, USA"
              label="Address Line 2"
              value={data.address2}
              onChange={(e) => handleChange('address2', e.target.value)}
            />
          </div>


          <div className="flex justify-center gap-x-2 mt-2">
            <div className="w-40">
              <Button onClick={handleSubmit} text={editData ? 'Update Client' : 'Create Client'} isLoading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CreateClientModal }
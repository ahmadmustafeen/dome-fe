'use client'
import { useState } from "react";
import { X } from "lucide-react";
import { Button, InputWithLabel } from "../common";
import { toast } from "react-toastify";
import { assetService } from "@/services/asset-service";
import { useAppContext } from "@/context/AppContext";

export interface Asset {
  _id: '',
  assetId: '',
  assetName: '',
  category: '',
  subCategory: '',
  make: '',
  modelName: '',
  serialNumber: '',
  location: '',
  siteId: '',

}

const CreateAssetModal = ({ editData, toggleModal, refetchAssets, updateAsset }: { editData?: Asset, toggleModal: () => void, refetchAssets: () => void, updateAsset?: (id: string, data: any) => Promise<void> }) => {
  const { site } = useAppContext()
  const [data, setData] = useState(editData || {
    assetId: '',
    assetName: '',
    category: '',
    subCategory: '',
    make: '',
    modelName: '',
    serialNumber: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    resetData();
    toggleModal();
  }

  const resetData = () => {
    setData({
      assetId: '',
      assetName: '',
      category: '',
      subCategory: '',
      make: '',
      modelName: '',
      serialNumber: '',
      location: '',
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
    if (!site?._id) {
      toast.error("Please reselect site, SiteId not found.")
      return
    }

    if (editData) {
      await updateAsset?.(editData._id, data);
      resetData();
      return;
    }
    try {
      await assetService.createAsset({ ...data, siteId: site._id }) as Response;
      toast.success('Asset created successfully');
      handleToggle();
      refetchAssets();
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
      <div className="w-5xl bg-white rounded-xl py-4 px-2 relative  ">
        <X onClick={handleToggle} className="absolute text-xl text-black top-4 right-4 cursor-pointer rounded-full w-8 h-8 p-2 hover:bg-primary hover:text-white" />

        <h1 className="text-2xl text-center mt-5 text-primary font-bold">{editData ? 'Edit Asset' : 'Create Asset'}</h1>
        <div className="w-full flex flex-col mt-5 px-10">
          <div className="flex gap-x-2">
            <InputWithLabel
              type="text"
              placeholder="asset-232434"
              label="Asset Id"
              value={data.assetId}
              onChange={(e) => handleChange('assetId', e.target.value)}
            />
            <InputWithLabel type="text"
              placeholder="Generator"
              label="Asset Name"
              value={data.assetName}
              onChange={(e) => handleChange('assetName', e.target.value)}
            />
          </div>
          <div className="flex gap-x-2">
            <InputWithLabel
              type="text"
              placeholder="Power"
              label="Category"
              value={data.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="electrical"
              label="Sub Category"
              value={data.subCategory}
              onChange={(e) => handleChange('subCategory', e.target.value)}
            />
          </div>
          <div className="flex gap-x-2">
            <InputWithLabel
              type="text"
              placeholder="American"
              label="Make"
              value={data.make}
              onChange={(e) => handleChange('make', e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="2022"
              label="Model"
              value={data.modelName}
              onChange={(e) => handleChange('modelName', e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="SER-12312312"
              label="Serial Number"
              value={data.serialNumber}
              onChange={(e) => handleChange('serialNumber', e.target.value)}
            />
          </div>
          <InputWithLabel
            type="text"
            placeholder="123 Main St, Anytown, USA"
            label="Location"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />

          <div className="flex justify-center gap-x-2 mt-2">
            <div className="w-40">
              <Button onClick={handleSubmit} text={editData ? 'Update Asset' : 'Create Asset'} isLoading={loading} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { CreateAssetModal }
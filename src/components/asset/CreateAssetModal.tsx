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
  equipmentName: '',
  category: '',
  subCategory: '',
  make: '',
  modelName: '',
  serialNumber: '',
  location: '',
  siteId: '',
  comment: '',
  images: string[]

}


export const RenderLocalImage = ({ file, removeFile }: { file: File, removeFile: () => void }) => {
  return <div className="relative group border rounded p-1">
    <img
      src={URL.createObjectURL(file)}
      alt={file.name}
      className="h-20 w-20 rounded"
    />
    <X
      onClick={removeFile}
      className="absolute top-1 right-0 bg-red-500 text-white text-xs rounded px-1 cursor-pointer"
    />
  </div>
}

export const RenderHostedImage = ({ imageUrl, removeFile }: { imageUrl: string, removeFile: () => void }) => {
  return <div className="relative group border rounded p-1">
    <img
      src={imageUrl}
      alt={'image'}
      className="h-20 w-20 rounded"
    />
    <X
      onClick={removeFile}
      className="absolute top-1 right-0 bg-red-500 text-white text-xs rounded px-1 cursor-pointer"
    />
  </div>
}



const CreateAssetModal = ({ editData, toggleModal, refetchAssets, updateAsset, files, setFiles }: { editData?: Asset, toggleModal: () => void, refetchAssets: () => void, updateAsset?: (id: string, data: any) => Promise<void>, files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>> }) => {
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
    comment: '',
    equipmentName: '',
    images: []
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
      equipmentName: '',
      location: '',
      comment: '',
      images: []
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

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed z-10 h-screen w-screen flex justify-center items-center bg-black/50 text-white">
      <div className="w-5xl max-h-140 overflow-y-scroll bg-white rounded-xl py-4 px-2 relative  ">
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
          <div className="flex gap-x-2">
            <InputWithLabel
              type="text"
              placeholder="123 Main St, Anytown, USA"
              label="Location"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="Equipment Name"
              label="Equipment Name"
              value={data.equipmentName}
              onChange={(e) => handleChange('equipmentName', e.target.value)}
            />
          </div>
          ‰
          {
            editData ?
              <>
                <InputWithLabel
                  type="text"
                  placeholder=""
                  label="Comments"
                  value={data.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images
                  </label>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {!data.images?.length ? <p className="text-black text-xs">No images</p> : null}
                    {
                      data.images?.map((image, idx) => {
                        return <RenderHostedImage key={idx} imageUrl={image} removeFile={() => setData({ ...data, images: data.images.filter(item => item !== image) as [] })} />
                      })
                    }
                  </div>
                </div>


                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload New Images
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setFiles(prevFiles => [...(prevFiles ?? []), ...files]);
                        e.target.value = ""; // reset input so user can re-upload same file
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="block w-full text-sm text-gray-500
                  py-2 px-4 rounded-md border border-gray-300
                  text-center hover:bg-gray-100">
                      Click to select files
                    </div>
                  </div>

                  {files?.length! > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {files?.map((file, idx) => (
                        <RenderLocalImage file={file} removeFile={() => removeFile(idx)} />
                      ))}
                    </div>
                  )}
                </div>
              </> : null
          }

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
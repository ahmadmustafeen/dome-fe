"use client";
import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";

import { Button, InputWithLabel } from "../common";

export interface Asset {
  _id: string;
  assetId: string;
  assetName: string;
  equipmentName: string;
  category: string;
  description: string;
  subCategory: string;
  make: string;
  modelName: string;
  serialNumber: string;
  location: string;
  siteId: string;
  comment: string;
  images: string[];
}

export const RenderLocalImage = ({
  file,
  removeFile,
}: {
  file: File;
  removeFile: () => void;
}) => {
  return (
    <div className="group relative rounded border p-1">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
      />
      <button
        type="button"
        onClick={removeFile}
        className="absolute top-0 right-0 min-h-8 min-w-8 rounded bg-red-500 px-1 text-xs text-white"
        aria-label="Remove image"
      >
        <X className="mx-auto size-4" />
      </button>
    </div>
  );
};

export const RenderHostedImage = ({
  imageUrl,
  removeFile,
}: {
  imageUrl: string;
  removeFile: () => void;
}) => {
  return (
    <div className="group relative rounded border p-1">
      <img
        src={imageUrl}
        alt=""
        className="h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
      />
      <button
        type="button"
        onClick={removeFile}
        className="absolute top-0 right-0 min-h-8 min-w-8 rounded bg-red-500 px-1 text-xs text-white"
        aria-label="Remove image"
      >
        <X className="mx-auto size-4" />
      </button>
    </div>
  );
};

const defaultFormState = {
  assetId: "",
  assetName: "",
  category: "",
  subCategory: "",
  make: "",
  modelName: "",
  serialNumber: "",
  location: "",
  comment: "",
  equipmentName: "",
  description: "",
  images: [] as string[],
};

const assetToFormState = (asset: Asset) => ({
  assetId: asset.assetId ?? "",
  assetName: asset.assetName ?? "",
  category: asset.category ?? "",
  subCategory: asset.subCategory ?? "",
  make: asset.make ?? "",
  modelName: asset.modelName ?? "",
  serialNumber: asset.serialNumber ?? "",
  location: asset.location ?? "",
  comment: asset.comment ?? "",
  equipmentName: asset.equipmentName ?? "",
  images: asset.images ?? [],
  description: asset.description ?? "",
});

const CreateAssetModal = ({
  editData,
  toggleModal,
  refetchAssets,
  updateAsset,
  files,
  setFiles,
}: {
  editData?: Asset;
  toggleModal: () => void;
  refetchAssets: () => void;
  updateAsset?: (id: string, data: any) => Promise<void>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const { site } = useAppContext();
  const [data, setData] = useState(() =>
    editData ? assetToFormState(editData) : { ...defaultFormState },
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setData(assetToFormState(editData));
    } else {
      setData({ ...defaultFormState });
    }
  }, [editData?._id]);

  const resetData = () => {
    setData({ ...defaultFormState });
  };

  const handleToggle = () => {
    resetData();
    toggleModal();
  };

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!site?._id) {
      toast.error("Please reselect site, SiteId not found.");
      return;
    }

    if (editData) {
      await updateAsset?.(editData._id, data);
      resetData();
      return;
    }
    try {
      (await assetService.createAsset({
        ...data,
        siteId: site._id,
      })) as Response;
      toast.success("Asset created successfully");
      handleToggle();
      refetchAssets();
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto overscroll-y-contain bg-black/50 sm:items-center sm:p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleToggle();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-asset-modal-title"
        className="relative flex max-h-dvh w-full max-w-full flex-col overflow-hidden rounded-t-2xl bg-white text-gray-900 shadow-xl sm:max-h-[min(90vh,46rem)] sm:rounded-xl sm:shadow-2xl md:max-w-3xl lg:max-w-5xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="absolute top-3 right-3 z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-gray-800 transition-colors hover:bg-primary hover:text-white sm:top-4 sm:right-4"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <h1
          id="create-asset-modal-title"
          className="shrink-0 px-4 pt-14 pb-2 text-center text-xl font-bold text-primary sm:px-6 sm:pt-6 sm:pb-3 sm:text-2xl"
        >
          {editData ? "Edit Asset" : "Create Asset"}
        </h1>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2">
            <InputWithLabel
              type="text"
              placeholder="asset-232434"
              label="Asset Id"
              value={data.assetId}
              onChange={(e) => handleChange("assetId", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="Generator"
              label="Asset Name"
              value={data.assetName}
              onChange={(e) => handleChange("assetName", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2">
            <InputWithLabel
              type="text"
              placeholder="Power"
              label="Category"
              value={data.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="electrical"
              label="Sub Category"
              value={data.subCategory}
              onChange={(e) => handleChange("subCategory", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder=""
              label="Description"
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            <InputWithLabel
              type="text"
              placeholder="American"
              label="Make"
              value={data.make}
              onChange={(e) => handleChange("make", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="2022"
              label="Model"
              value={data.modelName}
              onChange={(e) => handleChange("modelName", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="SER-12312312"
              label="Serial Number"
              value={data.serialNumber}
              onChange={(e) => handleChange("serialNumber", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2">
            <InputWithLabel
              type="text"
              placeholder="123 Main St, Anytown, USA"
              label="Location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
            <InputWithLabel
              type="text"
              placeholder="Equipment Name"
              label="Equipment Name"
              value={data.equipmentName}
              onChange={(e) => handleChange("equipmentName", e.target.value)}
            />
          </div>
          {editData ? (
            <>
              <InputWithLabel
                type="text"
                placeholder=""
                label="Comments"
                value={data.comment}
                onChange={(e) => handleChange("comment", e.target.value)}
              />
              <div className="mt-4">
                <p className="mb-2 block text-sm font-medium text-gray-700">
                  Uploaded Images
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {!data.images?.length ? (
                    <p className="text-xs text-black">No images</p>
                  ) : null}
                  {data.images?.map((image) => {
                    return (
                      <RenderHostedImage
                        key={image}
                        imageUrl={image}
                        removeFile={() => {
                          setData({
                            ...data,
                            images: data.images.filter(
                              (item) => item !== image,
                            ) as [],
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 block text-sm font-medium text-gray-700">
                  Upload New Images
                </p>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFiles((prevFiles) => [...(prevFiles ?? []), ...files]);
                      e.target.value = ""; // reset input so user can re-upload same file
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="block w-full rounded-md border border-gray-300 px-4 py-3 text-center text-sm text-gray-500 hover:bg-gray-100">
                    Click to select files
                  </div>
                </div>

                {files.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {files.map((file, idx) => (
                      <RenderLocalImage
                        key={`${file.name}-${idx}`}
                        file={file}
                        removeFile={() => {
                          removeFile(idx);
                        }}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          <div className="mt-4 flex justify-center sm:mt-6">
            <div className="w-full max-w-xs sm:w-40 sm:max-w-none">
              <Button
                onClick={handleSubmit}
                text={editData ? "Update Asset" : "Create Asset"}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateAssetModal };

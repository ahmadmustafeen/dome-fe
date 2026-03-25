"use client";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type * as React from "react";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useAppContext } from "@/context/AppContext";
import { assetService } from "@/services/asset-service";

import { AppButton, ScreenLoader } from "../common";

const UploadAssetModal = ({
  toggleModal,
  refetchAssets,
}: {
  toggleModal: () => void;
  refetchAssets: () => void;
}) => {
  const t = useTranslations("AssetsManagement");
  const { site } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer?.files[0];
    if (dropped) {
      setFile(dropped);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    toggleModal();
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!site?._id) {
      toast.error("Please reselect site, SiteId not found.");
      return;
    }
    try {
      (await assetService.uploadAssets(site._id, file!)) as Response;
      toast.success("Asset created successfully");
      handleToggle();
      refetchAssets();
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ScreenLoader
          heading={t("upload_loader_heading")}
          description={t("upload_loader_description")}
        />
      ) : null}
      <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-black/50 text-white">
        <div className="relative w-3xl rounded-xl bg-white p-4  ">
          <X
            onClick={handleToggle}
            className="absolute top-4 right-4 h-8 w-8 cursor-pointer rounded-full p-2 text-xl text-black hover:bg-primary hover:text-white"
          />

          <h1 className="mt-5 text-center text-2xl font-bold text-primary">
            Upload Asset File
          </h1>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={`
            relative mt-6 cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 select-none
            ${
              file
                ? "cursor-default border-stone-600 bg-primary"
                : isDragging
                  ? "scale-[1.01] border-amber-400 bg-amber-400/5"
                  : "border-stone-700 bg-primary hover:border-stone-500 hover:bg-primary/80"
            }
          `}
          >
            {/* Glow effect when dragging */}
            {isDragging && (
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-secondary/30" />
            )}

            <div className="p-8">
              {!file ? (
                /* Empty state */
                <div className="flex flex-col items-center gap-4 text-center">
                  <div
                    className={`
                    flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-300
                    ${isDragging ? "scale-110 bg-secondary/50" : "bg-secondary"}
                  `}
                  >
                    {isDragging ? "✦" : "↑"}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors duration-200 ${isDragging ? "text-amber-300" : "text-white"}`}
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {isDragging ? "Release to upload" : "Drop your file here"}
                    </p>
                    <p className="mt-1 text-xs text-white">
                      or{" "}
                      <span className="cursor-pointer text-white underline underline-offset-2 transition-colors hover:text-stone-200">
                        browse files
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                /* File preview */
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-stone-800 text-xl"></div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-medium text-stone-200"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {file.name}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs text-stone-500 transition-all duration-200 hover:bg-red-900/60 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Hidden input */}
            <input
              ref={inputRef}
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {file ? (
            <div className="flex w-full items-center justify-center pt-4">
              <AppButton
                title="Upload"
                onClick={handleSubmit}
                variant="secondary"
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export { UploadAssetModal };

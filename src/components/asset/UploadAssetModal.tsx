'use client'
import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { AppButton, ScreenLoader } from "../common";
import { toast } from "react-toastify";
import { assetService } from "@/services/asset-service";
import { useAppContext } from "@/context/AppContext";


const UploadAssetModal = ({ toggleModal, refetchAssets }: { toggleModal: () => void, refetchAssets: () => void, }) => {
  const { site } = useAppContext()
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
    if (dropped) setFile(dropped);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleRemove = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };




  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    toggleModal();
  }

  const handleSubmit = async () => {
    setLoading(true);
    if (!site?._id) {
      toast.error("Please reselect site, SiteId not found.")
      return
    }
    try {
      await assetService.uploadAssets(site._id, file!) as Response;
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
    <>
      {loading ? <ScreenLoader heading="Uploading XLSX" description="Please wait, while we upload and bulk create." containerClass="w-lg" /> : null}
      <div className="fixed z-10 h-screen w-screen flex justify-center items-center bg-black/50 text-white">
        <div className="w-3xl bg-white rounded-xl p-4 relative  ">
          <X onClick={handleToggle} className="absolute text-xl text-black top-4 right-4 cursor-pointer rounded-full w-8 h-8 p-2 hover:bg-primary hover:text-white" />

          <h1 className="text-2xl text-center mt-5 text-primary font-bold">Upload Asset File</h1>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={`
            relative rounded-xl mt-6 border-2 border-dashed transition-all duration-300 cursor-pointer select-none
            ${file
                ? "border-stone-600 bg-primary cursor-default"
                : isDragging
                  ? "border-amber-400 bg-amber-400/5 scale-[1.01]"
                  : "border-stone-700 bg-primary hover:border-stone-500 hover:bg-primary/80"
              }
          `}
          >
            {/* Glow effect when dragging */}
            {isDragging && (
              <div className="absolute inset-0 rounded-xl bg-secondary/30 pointer-events-none" />
            )}

            <div className="p-8">
              {!file ? (
                /* Empty state */
                <div className="flex flex-col items-center gap-4 text-center">
                  <div
                    className={`
                    w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300
                    ${isDragging ? "bg-secondary/50 scale-110" : "bg-secondary"}
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
                    <p className="text-xs text-white mt-1">
                      or{" "}
                      <span className="text-white underline underline-offset-2 cursor-pointer hover:text-stone-200 transition-colors">
                        browse files
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                /* File preview */
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-stone-800 flex items-center justify-center text-xl flex-shrink-0">
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm text-stone-200 font-medium truncate"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {file.name}
                    </p>

                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                    className="w-7 h-7 rounded-full bg-stone-800 hover:bg-red-900/60 flex items-center justify-center text-stone-500 hover:text-red-400 transition-all duration-200 flex-shrink-0 text-xs"
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
          {file ? <div className="w-full flex justify-center items-center pt-4">
            <AppButton title="Upload" onClick={handleSubmit} variant="secondary" />
          </div> : null}
        </div>
      </div>
    </>

  )
}

export { UploadAssetModal }
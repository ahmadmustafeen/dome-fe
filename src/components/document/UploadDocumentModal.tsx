"use client";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Upload, X } from "lucide-react";

import { AppButton, Button } from "@/components/common";
import type { DocumentRecord, DocumentType } from "@/types/document";

const DOCUMENT_TYPES: DocumentType[] = [
  "Asset Maintenance and Service Documents",
  "Asset Manuals and Diagrams",
  "Site Diagrams and Documents",
  "Outdated MOPs, SOPs and EOPs",
  "Company Policies and Documents",
  "Asset List",
];

const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx", "txt"];
const ACCEPTED_MIME = ".pdf,.doc,.docx,.txt";

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface UploadDocumentModalProps {
  onClose: () => void;
  onSuccess: (doc: DocumentRecord) => void;
}

const UploadDocumentModal = ({
  onClose,
  onSuccess,
}: UploadDocumentModalProps) => {
  const [documentType, setDocumentType] = useState<DocumentType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = documentType !== "" && file !== null;

  const validateFile = (f: File): boolean => {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setErrorMsg(
        `File type ".${ext}" is not supported. Accepted: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG.`,
      );
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleFileSelect = (f: File) => {
    if (validateFile(f)) {
      setFile(f);
    }
  };

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
      handleFileSelect(dropped);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      handleFileSelect(selected);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setErrorMsg("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!isValid) {
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      // ── API INTEGRATION POINT ──────────────────────────────────────────────
      // When the backend is ready, replace this block with:
      //
      //   const formData = new FormData();
      //   formData.append('file', file!);
      //   formData.append('documentType', documentType);
      //   const response = await documentService.uploadDocument(formData) as DocumentUploadResponse;
      //   onSuccess(response.data);
      //
      // ──────────────────────────────────────────────────────────────────────

      // Simulate network delay
      await new Promise((res) => setTimeout(res, 800));

      const ext = (file!.name.split(".").pop()?.toLowerCase() ??
        "pdf") as DocumentRecord["fileExtension"];
      const newDoc: DocumentRecord = {
        id: `doc_${Date.now()}`,
        name: file!.name,
        documentType: documentType as DocumentType,
        fileSize: file!.size,
        uploadDate: new Date().toISOString(),
        fileUrl: URL.createObjectURL(file!),
        fileExtension: ext,
      };

      toast.success("Document uploaded successfully");
      onSuccess(newDoc);
      onClose();
    } catch {
      setErrorMsg("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6">
        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-black hover:bg-primary hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="mt-2 text-center text-2xl font-bold text-primary">
          Upload Document
        </h2>

        <div className="mt-6 space-y-5">
          {/* Document Type Select */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Document Type
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              value={documentType}
              onChange={(e) =>
                setDocumentType(e.target.value as DocumentType | "")
              }
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="" disabled>
                Select document type
              </option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Drag-and-drop zone */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              File
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && inputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 select-none ${file
                ? "cursor-default border-primary/40 bg-primary/5"
                : isDragging
                  ? "scale-[1.01] border-secondary bg-secondary/5"
                  : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary/5"
                }`}
            >
              <div className="p-6">
                {file ? (
                  /* File selected preview */
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  /* Empty drop zone */
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${isDragging ? "bg-secondary/20" : "bg-gray-200"}`}
                    >
                      <Upload
                        className={`h-5 w-5 ${isDragging ? "text-secondary" : "text-gray-500"}`}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {isDragging
                        ? "Release to upload"
                        : "Drag & drop your file here"}
                    </p>
                    <p className="text-xs text-gray-400">
                      or{" "}
                      <span className="font-medium text-primary underline underline-offset-2">
                        Browse
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_MIME}
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Accepted types: PDF, DOC, DOCX, TXT
            </p>
          </div>

          {/* Inline error */}
          {errorMsg && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <AppButton
              title="Cancel"
              onClick={onClose}
              variant="default"
              disabled={loading}
            />
            <div className="w-36">
              <Button
                text="Upload"
                onClick={handleSubmit}
                isLoading={loading}
                disabled={!isValid || loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UploadDocumentModal };

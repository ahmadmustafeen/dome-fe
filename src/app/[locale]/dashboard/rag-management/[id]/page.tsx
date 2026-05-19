"use client";

import { documentService } from "@/services/document-service";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

type PageProps = {
  params: {
    id: string;
  };
};

export default function PolicyEditor({ params }: PageProps) {
  const { id } = params;
  const router = useRouter();

  const [form, setForm] = useState({});
  const [initialData, setInitialData] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false);

  const fetchDocuments = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await documentService.fetchIngestedDocument(id);
      setInitialData(response.data)
      setForm(
        Object.fromEntries(
          Object.entries(response.data?.extraction || {}).map(([k, v]) => [
            k,
            v ?? "",
          ])
        )
      );

    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load documents.",
      );
    } finally {
      setLoading(false);
    }
  }, []);


  const updateDocument = async () => {
    setLoading(true);
    try {
      await documentService.updateIngestedDocument(id, { ...initialData, extraction: form });

      toast.success("Document Ingested Data Updated Successfully")
      router.push("/en/dashboard/rag-management")

    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load documents.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDocuments(id)
  }, [id])

  const updateField = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6 max-w-3xl space-y-4">
      <h1 className="text-xl font-bold">{initialData?.extraction?.title}</h1>

      <div className="space-y-3">
        {Object.entries(form).map(([key, value]: any) => {
          // skip huge raw blobs if needed
          if (key === "original_extraction") return null;

          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium capitalize">{key.split("_").join(" ")}</label>

              {typeof value === "string" ? (
                <input
                  className="border p-2 rounded"
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              ) : typeof value === "boolean" ? (
                <div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateField(key, e.target.checked)}
                  />
                </div>
              ) : Array.isArray(value) ? (
                <textarea
                  className="border p-2 rounded min-h-37.5 font-mono"
                  value={
                    value.every((v) => typeof v === "string")
                      ? value.join("\n")
                      : JSON.stringify(value, null, 2)
                  }
                  onChange={(e) => {
                    try {
                      // try parsing JSON first (for array of objects)
                      updateField(key, JSON.parse(e.target.value));
                    } catch {
                      // fallback to string array
                      updateField(key, e.target.value.split("\n"));
                    }
                  }}
                />
              ) : (
                <textarea
                  className="border p-2 rounded"
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      updateField(key, JSON.parse(e.target.value));
                    } catch { }
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => router.push("/en/dashboard/document-management")}
          className="cursor-pointer border-blue-600 border text-blue-600 bg-white px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={updateDocument}
          disabled={loading}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

    </div>
  );
}
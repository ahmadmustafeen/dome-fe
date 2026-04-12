"use client";

import { History } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  AppButton,
  DeleteConfirmationScreen,
  SectionWrapper,
  Typography,
} from "@/components/common";
import { useAppContext } from "@/context/AppContext";
import { useMopForm } from "@/hooks/useMopForm";
import { mopService } from "@/services/mop-service";
import type { MopApiRecord, MopArchiveApiRecord } from "@/types/mop-api";
import { downloadMopPdf } from "@/utils/mop-pdf";

import { MopDocumentForm } from "./MopDocumentForm";
import { MopDocumentPreview } from "./MopDocumentPreview";
import { MopVersionHistory } from "./MopVersionHistory";
import { MopVersionHistoryDrawer } from "./MopVersionHistoryDrawer";

interface MopManagementClientProps {
  mopId?: string;
}

const buildPdfFilename = () => {
  const d = new Date();
  return `mop-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}.pdf`;
};

export const MopManagementClient = ({ mopId }: MopManagementClientProps) => {
  const { site, client } = useAppContext();
  const {
    form,
    formNonce,
    createdAtIso,
    lastModifiedIso,
    patch,
    setWorkDescriptionHtml,
    updateStepHtml,
    addStep,
    resetForm,
    loadFromRecord,
    payload,
    setStatus,
    setRisk,
  } = useMopForm();

  const [isSaving, setIsSaving] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<MopApiRecord | null>(null);
  const [history, setHistory] = useState<MopArchiveApiRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const loadMopData = useCallback(
    async (id: string) => {
      setHistoryLoading(true);
      try {
        const [mopRes, histRes] = await Promise.all([
          mopService.getById(id),
          mopService.getHistory(id),
        ]);
        setCurrentRecord(mopRes.data);
        setHistory(histRes.data);
        loadFromRecord(mopRes.data);
        setActiveVersionId(mopRes.data._id);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Failed to load MOP.");
      } finally {
        setHistoryLoading(false);
      }
    },
    [loadFromRecord],
  );

  useEffect(() => {
    if (!mopId) {
      return;
    }
    loadMopData(mopId);
  }, [mopId, loadMopData]);

  const handleLoadVersion = useCallback(
    (record: MopApiRecord | MopArchiveApiRecord) => {
      loadFromRecord(record);
      setActiveVersionId(record._id);
      setShowHistoryDrawer(false);
    },
    [loadFromRecord],
  );

  const handleSave = useCallback(async () => {
    if (!site?._id) {
      toast.error("Please select a site first.");
      return;
    }
    setIsSaving(true);
    try {
      if (mopId) {
        const res = await mopService.update(mopId, payload);
        setCurrentRecord(res.data);
        setActiveVersionId(res.data._id);
        const histRes = await mopService.getHistory(mopId);
        setHistory(histRes.data);
        toast.success(`Saved as v${res.data.versionNumber}`);
      } else {
        const res = await mopService.create({
          ...payload,
          siteId: site._id,
          clientId: client?._id,
        });
        setCurrentRecord(res.data);
        setActiveVersionId(res.data._id);
        toast.success("MOP created successfully.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }, [mopId, payload, site, client]);

  const handleClearConfirmed = useCallback(() => {
    resetForm();
    setShowClearConfirm(false);
  }, [resetForm]);

  const handleExportPdf = useCallback(async () => {
    const el = previewRef.current;
    if (!el) {
      toast.error("Preview is not ready yet.");
      return;
    }
    setIsExportingPdf(true);
    try {
      await downloadMopPdf({ sourceElement: el, filename: buildPdfFilename() });
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Could not generate the PDF.",
      );
    } finally {
      setIsExportingPdf(false);
    }
  }, []);

  const totalVersions = history.length + (currentRecord ? 1 : 0);

  return (
    <>
      {showClearConfirm && (
        <DeleteConfirmationScreen
          heading="Reset MOP Form"
          description="All entered data will be lost and the form will return to its defaults. This cannot be undone."
          confirmLabel="Reset"
          confirmVariant="danger"
          handleCancel={() => setShowClearConfirm(false)}
          handleContinue={handleClearConfirmed}
        />
      )}

      {showHistoryDrawer && mopId && (
        <MopVersionHistoryDrawer
          onClose={() => setShowHistoryDrawer(false)}
          versionCount={totalVersions}
        >
          <MopVersionHistory
            currentRecord={currentRecord}
            history={history}
            activeVersionId={activeVersionId}
            onLoadVersion={handleLoadVersion}
            isLoading={historyLoading}
            showTitle={false}
          />
        </MopVersionHistoryDrawer>
      )}

      <SectionWrapper className="flex min-h-0 flex-1 flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Typography variant="h1">Method of Procedure (MOP)</Typography>
          {mopId && (
            <AppButton
              variant="default"
              icon={<History className="h-4 w-4" />}
              title="Version History"
              onClick={() => setShowHistoryDrawer(true)}
            />
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 lg:h-[calc(100vh-14rem)] lg:flex-row">
          <section className="flex min-h-[420px] min-w-0 flex-1 flex-col gap-2 lg:min-h-0">
            <Typography variant="h3" className="text-primary">
              MOP Editor
            </Typography>
            <MopDocumentForm
              form={form}
              formNonce={formNonce}
              createdAtIso={createdAtIso}
              lastModifiedIso={lastModifiedIso}
              patch={patch}
              setWorkDescriptionHtml={setWorkDescriptionHtml}
              updateStepHtml={updateStepHtml}
              addStep={addStep}
              setStatus={setStatus}
              setRisk={setRisk}
            />
            <div className="flex shrink-0 flex-wrap gap-2 pt-2">
              <AppButton
                variant="secondary"
                title={isSaving ? "Saving…" : "Save"}
                onClick={handleSave}
                disabled={isSaving}
              />
              <AppButton
                variant="ghost"
                title="Clear"
                disabled={isSaving || isExportingPdf}
                onClick={() => setShowClearConfirm(true)}
              />
              <AppButton
                variant="default"
                title={isExportingPdf ? "Exporting…" : "Export PDF"}
                onClick={handleExportPdf}
                disabled={isExportingPdf || isSaving}
              />
            </div>
          </section>

          <section className="flex min-h-[420px] min-w-0 flex-1 flex-col gap-2 lg:min-h-0">
            <Typography variant="h3" className="text-primary">
              Preview
            </Typography>
            <div className="min-h-0 flex-1 overflow-hidden">
              <MopDocumentPreview
                ref={previewRef}
                form={form}
                createdAtIso={createdAtIso}
                lastModifiedIso={lastModifiedIso}
              />
            </div>
          </section>
        </div>
      </SectionWrapper>
    </>
  );
};

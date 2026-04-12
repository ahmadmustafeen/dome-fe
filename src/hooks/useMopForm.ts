import { useCallback, useMemo, useState } from "react";

import { createInitialMopFormValues, createNewMopStep } from "@/constants/mop-form";
import type { MopApiRecord, MopArchiveApiRecord } from "@/types/mop-api";
import type { MopFormValues, MopRiskLevel, MopStatus } from "@/types/mop-form";

export const useMopForm = () => {
  const [formNonce, setFormNonce] = useState(0);
  const [createdAtIso, setCreatedAtIso] = useState(() => new Date().toISOString());
  const [lastModifiedIso, setLastModifiedIso] = useState(() => new Date().toISOString());
  const [form, setForm] = useState<MopFormValues>(() => createInitialMopFormValues());

  const touch = useCallback(() => {
    setLastModifiedIso(new Date().toISOString());
  }, []);

  const patch = useCallback(
    (partial: Partial<MopFormValues>) => {
      setForm((prev) => ({ ...prev, ...partial }));
      touch();
    },
    [touch],
  );

  const setWorkDescriptionHtml = useCallback(
    (workDescriptionHtml: string) => {
      setForm((prev) => ({ ...prev, workDescriptionHtml }));
      touch();
    },
    [touch],
  );

  const updateStepHtml = useCallback(
    (stepId: string, html: string) => {
      setForm((prev) => ({
        ...prev,
        steps: prev.steps.map((s) => (s.id === stepId ? { ...s, html } : s)),
      }));
      touch();
    },
    [touch],
  );

  const addStep = useCallback(() => {
    setForm((prev) => ({ ...prev, steps: [...prev.steps, createNewMopStep()] }));
    touch();
  }, [touch]);

  const resetForm = useCallback(() => {
    setForm(createInitialMopFormValues());
    setCreatedAtIso(new Date().toISOString());
    setLastModifiedIso(new Date().toISOString());
    setFormNonce((n) => n + 1);
  }, []);

  const loadFromRecord = useCallback((record: MopApiRecord | MopArchiveApiRecord) => {
    setForm({
      mopTitle: record.mopTitle,
      mopIdentifier: record.mopIdentifier,
      versionNumber: record.versionNumber,
      status: record.status,
      equipmentAssetName: record.equipmentAssetName,
      equipmentType: record.equipmentType,
      manufacturer: record.manufacturer,
      modelNumber: record.modelNumber,
      serialNumber: record.serialNumber,
      equipmentNumber: record.equipmentNumber,
      locationSite: record.locationSite,
      workDescriptionHtml: record.workDescriptionHtml,
      duration: record.duration,
      levelOfRisk: record.levelOfRisk,
      cetLevelRequired: record.cetLevelRequired,
      specialPermitsRequired: record.specialPermitsRequired,
      specialPermitsNotes: record.specialPermitsNotes,
      steps: record.steps.map((s) => ({ id: s.id, html: s.html })),
      safetyPrecautions: record.safetyPrecautions,
      requiredPpe: record.requiredPpe,
      toolsAndMaterials: record.toolsAndMaterials,
      preparedBy: record.preparedBy,
      reviewedBy: record.reviewedBy,
      approvedBy: record.approvedBy,
    });
    setCreatedAtIso(record.createdAt);
    setLastModifiedIso(record.updatedAt);
    setFormNonce((n) => n + 1);
  }, []);

  const payload = useMemo(
    () => ({ ...form, meta: { createdAtIso, lastModifiedIso } }),
    [form, createdAtIso, lastModifiedIso],
  );

  return {
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
    setStatus: (status: MopStatus) => patch({ status }),
    setRisk: (levelOfRisk: MopRiskLevel | "") => patch({ levelOfRisk }),
  };
};

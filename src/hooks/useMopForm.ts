import { useCallback, useMemo, useState } from "react";

import {
  createInitialMopFormValues,
  createNewMopStep,
} from "@/constants/mop-form";
import type { MopFormValues, MopRiskLevel, MopStatus } from "@/types/mop-form";

export const useMopForm = () => {
  const [formNonce, setFormNonce] = useState(0);
  const [createdAtIso] = useState(() => new Date().toISOString());
  const [lastModifiedIso, setLastModifiedIso] = useState(() =>
    new Date().toISOString(),
  );
  const [form, setForm] = useState<MopFormValues>(() =>
    createInitialMopFormValues(),
  );

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
    setForm((prev) => ({
      ...prev,
      steps: [...prev.steps, createNewMopStep()],
    }));
    touch();
  }, [touch]);

  const resetForm = useCallback(() => {
    setForm(createInitialMopFormValues());
    setFormNonce((n) => n + 1);
    setLastModifiedIso(new Date().toISOString());
  }, []);

  const payload = useMemo(
    () => ({
      ...form,
      meta: { createdAtIso, lastModifiedIso },
    }),
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
    payload,
    setStatus: (status: MopStatus) => patch({ status }),
    setRisk: (levelOfRisk: MopRiskLevel | "") => patch({ levelOfRisk }),
  };
};

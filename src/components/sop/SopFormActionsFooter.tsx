"use client";

import { AppButton } from "@/components/common";

type SopFormActionsFooterProps = {
  isSaving: boolean;
  isBootstrapping: boolean;
  readOnlyForm: boolean;
  onClear: () => void;
  onSave: () => void;
};

export const SopFormActionsFooter = ({
  isSaving,
  isBootstrapping,
  readOnlyForm,
  onClear,
  onSave,
}: SopFormActionsFooterProps) => {
  const disabled = isSaving || isBootstrapping || readOnlyForm;

  return (
    <footer
      className="sticky bottom-0 z-10 -mx-4 mt-auto border-t border-gray-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      aria-label="SOP form actions"
    >
      <div className="flex flex-wrap items-center justify-end gap-2">
        <AppButton
          variant="ghost"
          title="Clear"
          disabled={disabled}
          onClick={onClear}
        />
        <AppButton
          variant="secondary"
          title={isSaving ? "Saving..." : "Save"}
          disabled={disabled}
          onClick={onSave}
        />
      </div>
    </footer>
  );
};

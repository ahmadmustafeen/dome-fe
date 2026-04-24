import { AppButton } from "./Button";
import { Typography } from "./Typography";

interface ConfirmationDialogProps {
  heading: string;
  description: string;
  handleCancel: () => void;
  handleContinue: () => void;
  /** Label for the confirm button. Defaults to "Delete". */
  confirmLabel?: string;
  /** Variant for the confirm button. Defaults to "danger". */
  confirmVariant?: "primary" | "default" | "secondary" | "danger" | "ghost";
  /** Whether the confirm action is in progress. */
  isConfirming?: boolean;
}

const DeleteConfirmationScreen = ({
  heading,
  description,
  handleCancel,
  handleContinue,
  confirmLabel = "Delete",
  confirmVariant = "danger",
  isConfirming = false,
}: ConfirmationDialogProps) => {
  return (
    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className="flex min-h-60 w-full max-w-md flex-col items-center rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 w-full border-b border-gray-200 pb-3 text-center">
          <Typography variant="h2">{heading}</Typography>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-2">
          <Typography variant="p" className="text-center text-gray-600">
            {description}
          </Typography>
          <div className="flex gap-2">
            <AppButton
              variant="secondary"
              onClick={handleCancel}
              title="Cancel"
              disabled={isConfirming}
            />
            <AppButton
              variant={confirmVariant}
              onClick={handleContinue}
              isLoading={isConfirming}
              title={confirmLabel}
              disabled={isConfirming}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeleteConfirmationScreen };

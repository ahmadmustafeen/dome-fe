import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

const Button = ({
  text,
  onClick,
  variant,
  isLoading,
  disabled,
}: {
  text: string;
  onClick: () => void;
  variant?: string;
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  const isDisabled = isLoading || disabled;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex w-full items-center justify-center gap-2 rounded-lg p-2 text-white transition md:rounded-xl md:p-4 ${
        isDisabled
          ? "cursor-not-allowed bg-slate-400"
          : "cursor-pointer bg-primary hover:bg-secondary"
      } ${variant || ""}`}
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : text}
    </button>
  );
};

type iAppButton = {
  onClick: () => void;
  icon?: ReactNode;
  title?: string;
  variant: "primary" | "default" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
};

const AppButton = ({
  onClick,
  icon,
  title,
  variant,
  disabled,
  className,
  isLoading,
}: iAppButton) => {
  let variantClass =
    "bg-white text-primary border-primary hover:bg-primary hover:text-white hover:border-white border";
  if (variant === "secondary") {
    variantClass =
      "bg-primary text-white hover:border-primary border border-white hover:bg-white hover:text-primary";
  }
  if (variant === "danger") {
    variantClass =
      "bg-red-500 hover:border-red-500 text-white border border-white hover:bg-white hover:text-red-500";
  }
  if (variant === "ghost") {
    variantClass =
      " hover:bg-primary/10 border border-transparent font-medium text-blue-600";
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mr-2 flex cursor-pointer! items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-sm transition-all duration-500 disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-white ${variantClass} ${className ?? ""}`}
    >
      {icon} {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : title}
    </button>
  );
};

export { AppButton, Button };

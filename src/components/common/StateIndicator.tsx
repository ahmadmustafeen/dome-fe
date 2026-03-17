import { Loader2 } from "lucide-react";
import * as React from "react";

import { LOADING_STATE } from "@/constants/common";
import { cn } from "@/utils/Helpers";

import { Typography } from ".";

interface Props {
  state: LOADING_STATE;
  noDataMessage?: string;
  errorMessage?: string;
  className?: string;
  loaderSize?: number;
}

const StateIndicator: React.FC<Props> = ({
  state,
  noDataMessage = "No data available",
  errorMessage = "Something went wrong",
  className,
  loaderSize = 24,
}) => {
  const Content = () => {
    switch (state) {
      case LOADING_STATE.LOADING:
        return (
          <Loader2 className="animate-spin text-primary" size={loaderSize} />
        );
      case LOADING_STATE.EMPTY:
        return (
          <Typography variant="p" className=" text-slate-500">
            {noDataMessage}
          </Typography>
        );
      default:
        return (
          <Typography variant="p" className=" text-red-500">
            {errorMessage}
          </Typography>
        );
    }
  };

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      {Content()}
    </div>
  );
};

export default StateIndicator;

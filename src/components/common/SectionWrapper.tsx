import type { ReactNode } from "react";

import { cn } from "@/utils/Helpers";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ children, className }: SectionWrapperProps) => {
  return (
    <div className={cn("bg-white p-4 sm:p-6 lg:p-8", className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;

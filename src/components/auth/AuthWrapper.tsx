import Image from "next/image";
import type { ReactNode } from "react";

import { Typography } from "@/components/common";

type AuthWrapperProps = {
  children: ReactNode;
  /** Path to the GIF / illustration shown in the left panel on desktop */
  image: string;
  imageAlt?: string;
};

const AuthWrapper = ({
  children,
  image,
  imageAlt = "Auth illustration",
}: AuthWrapperProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* ── Left panel (desktop only) ── */}
      <div className="hidden items-center justify-center bg-gray-50 lg:flex lg:w-1/2">
        <Image
          src={image}
          alt={imageAlt}
          width={420}
          height={420}
          className="object-contain"
          unoptimized
          priority
        />
      </div>

      {/* ── Right panel (always visible) ── */}
      <div className="flex min-h-screen flex-1 flex-col bg-white lg:w-1/2">
        {/* Mobile logo — hidden on desktop */}
        <div className="flex justify-center pt-8 pb-2 lg:hidden">
          <Image
            src="/assets/images/glenart-logo.svg"
            alt="Glenart Group Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* Form area — vertically centered */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <Typography variant="caption">
            © {new Date().getFullYear()} Glenart Group. All rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { AuthWrapper };

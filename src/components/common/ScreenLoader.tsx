import Image from "next/image";

import { Typography } from "./Typography";

interface ScreenLoaderProps {
  heading: string;
  description: string;
  containerClass?: string;
}

const ScreenLoader = ({
  heading,
  description,
  containerClass,
}: ScreenLoaderProps) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
      <div
        className={`flex w-full max-w-lg flex-col items-center rounded-2xl bg-white shadow-xl ${containerClass ?? ""}`}
      >
        <div className="w-full border-b border-gray-200 px-6 py-4 text-center sm:px-8 sm:py-5">
          <Typography variant="h2">{heading}</Typography>
        </div>
        <div className="flex flex-col items-center gap-3 px-6 py-6 sm:px-8 sm:py-8">
          <Typography variant="p" className="text-center text-gray-500">
            {description}
          </Typography>
          <Image
            src="/assets/gifs/Loading.gif"
            alt="Loading..."
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
};

export { ScreenLoader };

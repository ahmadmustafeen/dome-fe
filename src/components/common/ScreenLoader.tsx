import Image from "next/image";

interface iScreenLoader {
  heading: string;
  description: string;
  containerClass?: string;
}
const ScreenLoader = ({
  heading,
  description,
  containerClass,
}: iScreenLoader) => {
  return (
    <div
      className={`fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/30 `}
    >
      <div
        className={`flex min-h-60 min-w-xl flex-col items-center rounded-2xl bg-white p-3 ${containerClass}`}
      >
        <div className="w-full border-b-2 border-gray-200 text-center">
          <h1 className="text-heading mb-2 text-lg font-bold tracking-tight md:text-xl lg:text-3xl">
            {heading}
          </h1>
        </div>
        <div className="flex h-40 flex-col items-center justify-center">
          <p className="text-body text-base font-normal lg:text-lg ">
            {description}
          </p>
          <Image
            src="/assets/gifs/Loading.gif"
            alt="Loading..."
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export { ScreenLoader };

import Image from "next/image";

interface iScreenLoader {
  heading: string;
  description: string;
  containerClass?: string;
}
const ScreenLoader = ({ heading, description, containerClass }: iScreenLoader) => {
  return <div className={`fixed z-30 h-screen w-screen bg-black/30 flex justify-center items-center `}>
    <div className={`min-w-xl min-h-60 rounded-2xl p-3 bg-white flex items-center flex-col ${containerClass}`}>
      <div className="border-b-2 border-gray-200 w-full text-center">
        <h1 className="mb-2 text-lg font-bold tracking-tight text-heading md:text-xl lg:text-3xl">{heading}</h1>
      </div>
      <div className="h-40 flex justify-center items-center flex-col">
        <p className="text-base font-normal text-body lg:text-lg ">{description}</p>
        <Image
          src="/assets/gifs/Loading.gif"
          alt="Loading..."
          width={100}
          height={100}
        />
      </div>
    </div>
  </div>
}

export { ScreenLoader }
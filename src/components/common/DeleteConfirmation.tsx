import { AppButton } from "./Button";

interface iDeleteConfirmationScreen {
  heading: string;
  description: string;
  handleCancel: () => void;
  handleContinue: () => void;
}
const DeleteConfirmationScreen = ({ heading, description, handleCancel, handleContinue }: iDeleteConfirmationScreen) => {
  return <div className="fixed z-30 h-screen w-screen bg-black/30 flex justify-center items-center top-0 left-0">
    <div className="min-w-xl min-h-60 rounded-2xl p-3 bg-white flex items-center flex-col">
      <div className="border-b-2 border-gray-200 w-full text-center">
        <h1 className="mb-2 text-lg font-bold tracking-tight text-heading md:text-xl lg:text-3xl">{heading}</h1>
      </div>
      <div className="h-40 flex justify-center items-center flex-col">
        <p className="text-base font-normal text-body lg:text-lg py-4">{description}</p>
        <div className="flex">
          <AppButton variant="secondary" onClick={handleCancel} title="Cancel" />
          <AppButton variant="default" onClick={handleContinue} title="Delete" />
        </div>
      </div>
    </div>
  </div>
}

export { DeleteConfirmationScreen }
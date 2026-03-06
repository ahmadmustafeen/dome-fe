import { ReactNode } from "react";

const Button = ({ text, onClick, variant, isLoading }: { text: string; onClick: () => void; variant?: string; isLoading?: boolean }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full cursor-pointer bg-primary text-white p-2 md:p-4 rounded-lg md:rounded-xl hover:bg-secondary transition ${variant || ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isLoading ? "Loading..." : text}
  </button>
);

interface iAppButton {
  onClick: () => void,
  icon?: ReactNode
  title?: string
  variant: 'primary' | 'default' | 'secondary' | 'danger',
  disabled?: boolean
}

const AppButton = ({ onClick, icon, title, variant, disabled }: iAppButton) => {
  let variantClass = 'bg-white text-primary border-primary hover:bg-primary hover:text-white hover:border-white border'
  if (variant === 'secondary') {
    variantClass = 'bg-primary text-white hover:border-primary border border-white hover:bg-white hover:text-primary'
  }
  if (variant === 'danger') {
    variantClass = 'bg-red-500 hover:border-red-500 text-white border border-white hover:bg-white hover:text-red-500'
  }
  return <button
    onClick={onClick}
    disabled={disabled}
    className={`
      transition-all disabled:text-black disabled:bg-gray-300 disabled:border-none disabled:cursor-not-allowed duration-500 px-4 py-2 rounded-lg mr-2 flex justify-center items-center gap-x-2 cursor-pointer
      ${variantClass}`
    }>{icon} {title}</button>

}

export { Button, AppButton };

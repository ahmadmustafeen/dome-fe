'use client';
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface iInputWithLabel extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  showEye?: boolean
}

const InputWithLabel = ({ label, type, placeholder, onChange, value, showEye, ...rest }: iInputWithLabel) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  }
  return <div className="relative mb-2 md:mb-4 w-full">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={showEye ? (showPassword ? "text" : "password") : type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...rest}
      className="shadow appearance-none border rounded-lg md:rounded-xl w-full  p-2 md:p-4 text-gray-700 leading-tight placeholder:text-sm focus:outline-none focus:shadow-outline"
    />
    {showEye && (
      <button type="button" onClick={toggleShowPassword} className="cursor-pointer absolute right-3 top-9 md:top-11 text-gray-600">
        {showPassword ? <Eye /> : <EyeClosed />}
      </button>
    )}
  </div>

};

export { InputWithLabel };
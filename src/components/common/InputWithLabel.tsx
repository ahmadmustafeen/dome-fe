const InputWithLabel = ({ label, type, placeholder }: { label: string; type: string; placeholder: string }) => (
  <div className="mb-2 md:mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="shadow appearance-none border rounded-lg md:rounded-xl w-full  p-2 md:p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export { InputWithLabel };
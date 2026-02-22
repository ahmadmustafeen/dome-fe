const Button = ({ text, onClick, variant, isLoading }: { text: string; onClick: () => void; variant?: string; isLoading?: boolean }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full cursor-pointer bg-primary text-white p-2 md:p-4 rounded-lg md:rounded-xl hover:bg-secondary transition ${variant || ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isLoading ? "Loading..." : text}
  </button>
);

export { Button };
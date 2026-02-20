const Button = ({ text, onClick, variant }: { text: string; onClick: () => void; variant?: string }) => (
  <button
    onClick={onClick}
    className={`w-full cursor-pointer bg-primary text-white p-2 md:p-4 rounded-lg md:rounded-xl hover:bg-secondary transition ${variant || ''}`}
  >
    {text}
  </button>
);

export { Button };
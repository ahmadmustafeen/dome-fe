const Button = ({ text, onClick, variant }: { text: string; onClick: () => void; variant?: string }) => (
  <button
    onClick={onClick}
    className={`w-full cursor-pointer bg-primary text-white py-4 px-4 rounded-xl hover:bg-secondary transition ${variant || ''}`}
  >
    {text}
  </button>
);

export { Button };
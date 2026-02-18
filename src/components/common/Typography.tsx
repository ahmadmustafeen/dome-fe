const Typography = ({ text, variant }: { text: string; variant?: string }) => (
  <p className={`text-gray-600 mt-2 text-center ${variant || ''}`}>{text}</p>
);

export { Typography };
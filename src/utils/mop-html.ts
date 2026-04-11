/** True when TipTap-style HTML has no visible text (e.g. `<p></p>`). */
export const isEffectivelyEmptyHtml = (html: string): boolean => {
  const plain = html.replace(/<[^>]+>/g, "").trim();
  return plain.length === 0;
};

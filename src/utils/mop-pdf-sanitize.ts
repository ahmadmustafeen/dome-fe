/**
 * html2canvas cannot parse modern CSS color functions (oklab / oklch).
 * Rewrite computed colors on a cloned subtree to hex fallbacks before rasterizing.
 */
const needsFallback = (value: string): boolean =>
  value.includes("oklab") || value.includes("oklch");

const fallbackBackground = (el: HTMLElement): string => {
  if (el.classList.contains("mop-doc-badge-1")) {
    return "#162233";
  }
  if (el.classList.contains("mop-doc-badge-2")) {
    return "#0d9488";
  }
  if (el.classList.contains("mop-doc-badge-3")) {
    return "#7c3aed";
  }
  if (el.classList.contains("mop-doc-badge-4")) {
    return "#d97706";
  }
  if (el.classList.contains("mop-doc-badge-5")) {
    return "#e11d48";
  }
  if (el.classList.contains("mop-doc-badge-6")) {
    return "#15803d";
  }
  if (el.classList.contains("mop-doc-preview-shell")) {
    return "#e5e7eb";
  }
  if (el.classList.contains("mop-doc-preview-paper")) {
    return "#ffffff";
  }
  if (el.classList.contains("mop-doc-html-surface")) {
    return "#f9fafb";
  }
  if (el.classList.contains("mop-doc-section-head")) {
    return "#f3f4f6";
  }
  if (el.classList.contains("mop-doc-risk-pill--low")) {
    return "#d1fae5";
  }
  if (el.classList.contains("mop-doc-risk-pill--medium")) {
    return "#fef3c7";
  }
  if (el.classList.contains("mop-doc-risk-pill--high")) {
    return "#ffedd5";
  }
  if (el.classList.contains("mop-doc-risk-pill--critical")) {
    return "#fee2e2";
  }
  if (el.classList.contains("mop-doc-section")) {
    return "#ffffff";
  }
  return "#ffffff";
};

const fallbackColor = (el: HTMLElement): string => {
  if (el.classList.contains("mop-doc-section-badge")) {
    return "#ffffff";
  }
  if (el.classList.contains("mop-doc-risk-pill--low")) {
    return "#065f46";
  }
  if (el.classList.contains("mop-doc-risk-pill--medium")) {
    return "#78350f";
  }
  if (el.classList.contains("mop-doc-risk-pill--high")) {
    return "#9a3412";
  }
  if (el.classList.contains("mop-doc-risk-pill--critical")) {
    return "#991b1b";
  }
  if (el.classList.contains("mop-doc-preview-value--muted")) {
    return "#9ca3af";
  }
  if (el.classList.contains("mop-doc-label")) {
    return "#6b7280";
  }
  if (el.classList.contains("mop-doc-step-label")) {
    return "#6b7280";
  }
  return "#111827";
};

export const sanitizeMopCloneForCanvas = (
  clonedDoc: Document,
  root: HTMLElement,
): void => {
  const win = clonedDoc.defaultView;
  if (!win) {
    return;
  }

  const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];

  for (const el of nodes) {
    const cs = win.getComputedStyle(el);

    if (needsFallback(cs.color)) {
      el.style.color = fallbackColor(el);
    }

    if (needsFallback(cs.backgroundColor)) {
      el.style.backgroundColor = fallbackBackground(el);
    }

    if (
      needsFallback(cs.borderTopColor) ||
      needsFallback(cs.borderRightColor) ||
      needsFallback(cs.borderBottomColor) ||
      needsFallback(cs.borderLeftColor)
    ) {
      el.style.borderColor = "#e5e7eb";
    }
  }
};

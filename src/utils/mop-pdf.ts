import { sanitizeMopCloneForCanvas } from "@/utils/mop-pdf-sanitize";

export type DownloadMopPdfInput = {
  sourceElement: HTMLElement;
  filename?: string;
};

const DEFAULT_FILENAME = "method-of-procedure.pdf";

export const downloadMopPdf = async ({
  sourceElement,
  filename = DEFAULT_FILENAME,
}: DownloadMopPdfInput): Promise<void> => {
  const { default: html2pdf } = await import("html2pdf.js");

  await html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename,
      image: { type: "jpeg", quality: 0.92 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        // @ts-expect-error
        onclone: (clonedDoc, clonedElement) => {
          const root =
            clonedElement instanceof HTMLElement
              ? clonedElement
              : (clonedDoc.querySelector(
                  ".mop-doc-preview-shell",
                ) as HTMLElement | null);
          if (root) {
            sanitizeMopCloneForCanvas(clonedDoc, root);
          }
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(sourceElement)
    .save();
};

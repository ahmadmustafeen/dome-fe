import { NextResponse } from "next/server";
import { chromium } from "playwright";

async function generatePdf(url: string) {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle",
  });

  await page.evaluate(() => {

    const renderSections = (containerClass: string, subSectionClass: string) => {

      const container = document.querySelector(containerClass);
      if (!container) return;
      const rows = Array.from(
        document.querySelectorAll<HTMLElement>(subSectionClass)
      );

      const pages: HTMLElement[] = [];

      let currentPage = document.createElement("div");
      currentPage.className = "pdf-page";

      let usedHeight = 0;

      const createPageWrapper = () => {
        const page = document.createElement("div");
        page.className = "pdf-page";
        return page;
      };

      rows.forEach((row) => {

        const rowHeight = row.getBoundingClientRect().height;

        if (usedHeight + rowHeight > (!pages.length ? FIRST_PAGE_HEIGHT : PAGE_HEIGHT)) {
          pages.push(currentPage);
          currentPage = createPageWrapper();
          usedHeight = 0;
        }

        currentPage.appendChild(row.cloneNode(true));
        usedHeight += rowHeight;
      });

      if (currentPage.childNodes.length > 0) {
        pages.push(currentPage);
      }

      container.innerHTML = "";
      pages.forEach((p) => container.appendChild(p));
    }
    const FIRST_PAGE_HEIGHT = 500; // A4 approx safe zone
    const PAGE_HEIGHT = 650; // A4 approx safe zone

    renderSections(
      '.section-container',
      '.subsection-row'
    )
    renderSections(
      '.section-container-2',
      '.subsection-row-2'
    )
    renderSections(
      '.section-container-3',
      '.subsection-row-3'
    )
    renderSections(
      '.section-container-6',
      '.subsection-row-6'
    )
    renderSections(
      '.section-container-7',
      '.subsection-row-7'
    )

        renderSections(
      '.section-container-7b',
      '.subsection-row-7b'
    )
  });



  const pdf = await page.pdf({
    format: "Letter",
    printBackground: true,
    margin: {
      top: "0in",
      right: "0in",
      bottom: "0in",
      left: "0in",
    },
  });

  await browser.close();

  return pdf;
}

export async function GET(
  req: NextResponse,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const url = `${process.env.NEXT_PUBLIC_FE_URL}/sops/${id}/print`;

  const pdfBuffer = await generatePdf(url);

  // @ts-expect-error
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="sop-${id}.pdf"`,
    },
  });
}
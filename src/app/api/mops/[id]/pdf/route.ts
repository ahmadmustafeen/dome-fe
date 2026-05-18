import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import chromiumMin from "@sparticuz/chromium-min";

async function generatePdf(url: string) {
  const isServerless = !!process.env.VERCEL;

  const browser = await chromium.launch({
    headless: true,
    ...(isServerless
      ? {
          executablePath: await chromiumMin.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar"
          ),
          args: [...chromiumMin.args],
        }
      : {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }),
  });

  const context = await browser.newContext({
    viewport: {
      width: 1280,
      height: 720,
    },
  });

  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // wait for React / layout stability
  await page.waitForTimeout(3000);

  await page.evaluate(() => {
    const renderSections = (containerClass: string, subSectionClass: string) => {
      const container = document.querySelector(containerClass);
      if (!container) return;

      const rows = Array.from(
        document.querySelectorAll<HTMLElement>(subSectionClass)
      );

      const FIRST_PAGE_HEIGHT = 500;
      const PAGE_HEIGHT = 650;

      const pages: HTMLElement[] = [];
      let currentPage = document.createElement("div");
      currentPage.className = "pdf-page";

      let usedHeight = 0;

      const createPage = () => {
        const page = document.createElement("div");
        page.className = "pdf-page";
        return page;
      };

      rows.forEach((row) => {
        const rowHeight = row.getBoundingClientRect().height || 0;

        const limit =
          pages.length === 0 ? FIRST_PAGE_HEIGHT : PAGE_HEIGHT;

        if (usedHeight + rowHeight > limit) {
          pages.push(currentPage);
          currentPage = createPage();
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
    };

    renderSections(".section-container", ".subsection-row");
    renderSections(".section-container-2", ".subsection-row-2");
    renderSections(".section-container-3", ".subsection-row-3");
    renderSections(".section-container-6", ".subsection-row-6");
    renderSections(".section-container-7", ".subsection-row-7");
    renderSections(".section-container-7b", ".subsection-row-7b");
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
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const url = `${process.env.NEXT_PUBLIC_FE_URL}/mops/${id}/print`;

  const pdfBuffer = await generatePdf(url);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="mop-${id}.pdf"`,
    },
  });
}
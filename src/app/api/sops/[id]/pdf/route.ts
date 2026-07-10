import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import chromiumMin from "@sparticuz/chromium-min";
import fs from "fs";
import path from "path";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    let browser = null;

    try {
      const isServerless =
        !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

      // Launch browser with standard desktop settings
      if (isServerless) {
        console.log(
          `[PDF Generation] Running in serverless environment, using @sparticuz/chromium-min`
        );
        browser = await chromium.launch({
          headless: true,
          executablePath: await chromiumMin.executablePath(
            "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar"
          ),
          args: [
            ...chromiumMin.args,
            "--disable-web-security",
            "--disable-features=IsolateOrigins",
            "--disable-site-isolation-trials",
          ],
        });
        const after = fs.readdirSync("/tmp");
        console.log("[PDF] /tmp after:", after);
      } else {
        browser = await chromium.launch({
          headless: true,
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins",
            "--disable-site-isolation-trials",
          ],
        });
      }
      const context = await browser.newContext({
        viewport: {
          width: 1920,
          height: 1080,
        },
        // Set HTTP headers to ensure proper access to resources
        extraHTTPHeaders: {
          Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "no-cache",
        },
        // Allow all permissions
        permissions: ["geolocation", "clipboard-read", "clipboard-write"],
        // Accept downloads (for blob URLs)
        acceptDownloads: true,
      });

      const page = await context.newPage();
      const url = `${process.env.NEXT_PUBLIC_FE_URL}/sops/${id}/print`;


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



      const documentTitle = await page.evaluate(() => {
        const title = document.querySelector("main h3")?.textContent?.trim();
        return title || "Standard Operating Procedure (SOP)";
      });

      const pdf = await page.pdf({
        format: "Letter",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: "<div></div>",
        footerTemplate: `
          <div style="width: 100%; padding: 0 0.35in; box-sizing: border-box; font-family: Arial, sans-serif; font-size: 10px; color: #111;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #111; padding-top: 6px;">
              <span>${escapeHtml(documentTitle)}</span>
              <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>
          </div>
        `,
        margin: {
          top: "0in",
          right: "0in",
          bottom: "0.45in",
          left: "0in",
        },
      });

      await browser.close();
      try {
        for (const file of fs.readdirSync("/tmp")) {
          fs.rmSync(path.join("/tmp", file), { recursive: true, force: true });
        }
        console.log(`[PDF Generation] /tmp cleaned up`);
      } catch (e) {
        console.warn(`[PDF Generation] /tmp cleanup failed:`, e);
      }
      browser = null;

      console.log(`[PDF Generation] Browser Closed`);

      // Generate filename with timestamp

      // Return PDF as download
      return new Response(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="sop-${new Date().toISOString()}.pdf"`,
          "Content-Length": pdf.length.toString(),
        },
      });
    } catch (error) {
      console.log({ error });

      console.error("[PDF Generation] Error generating PDF:", error);

      // Close browser if still open
      if (browser) {
        try {
          await browser.close();
        } catch (closeError) {
          console.error("[PDF Generation] Error closing browser:", closeError);
        }
      }

      // Return appropriate error response
      if (error instanceof Error) {
        if (
          error.message.includes("timeout") ||
          error.message.includes("Navigation timeout")
        ) {
          return NextResponse.json(
            {
              error:
                "PDF generation timed out. The report may be too large or the server is slow.",
            },
            { status: 504 }
          );
        }

        return NextResponse.json(
          { error: `Failed to generate PDF: ${error.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to generate PDF" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[PDF Generation] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

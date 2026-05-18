import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright-core";
import chromiumMin from "@sparticuz/chromium-min";

async function generatePdf(url: string) {
  const browser = await chromium.launch({
    headless: true,
    executablePath: await chromiumMin.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar"
    ),
    args: [
      ...chromiumMin.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

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

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="mop-${id}.pdf"`,
    },
  });
}
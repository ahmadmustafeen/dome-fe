import { generatePdfMOP } from "@/lib/pdf/generatePdf";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";


export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const url = `${process.env.NEXT_PUBLIC_FE_URL}/mops/${id}/print`;

  const pdfBuffer = await generatePdfMOP(url);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="mop-${id}.pdf"`,
    },
  });
}
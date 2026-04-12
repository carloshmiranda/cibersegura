import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// GET /api/download/checklist — download cybersecurity checklist
export async function GET(req: NextRequest) {
  try {
    const filePath = join(process.cwd(), "public", "downloads", "lista-verificacao-ciberseguranca-pme.html");
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": "attachment; filename=lista-verificacao-ciberseguranca-pme.html",
        "Cache-Control": "public, max-age=86400", // 24 hours cache
      },
    });
  } catch (error) {
    console.error("Error serving checklist download:", error);
    return NextResponse.json(
      { ok: false, error: "Checklist not found" },
      { status: 404 }
    );
  }
}
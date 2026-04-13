import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

// GET /api/download/rgpd-audit — download RGPD compliance audit
export async function GET(req: NextRequest) {
  try {
    const filePath = join(process.cwd(), "public", "downloads", "auditoria-rgpd-simplificada.html");
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": "attachment; filename=auditoria-rgpd-simplificada.html",
        "Cache-Control": "public, max-age=86400", // 24 hours cache
      },
    });
  } catch (error) {
    console.error("Error serving RGPD audit download:", error);
    return NextResponse.json(
      { ok: false, error: "RGPD audit not found" },
      { status: 404 }
    );
  }
}
import { NextResponse } from "next/server";
import { listPages, savePage } from "@/lib/storage";
import type { PageSnapshot } from "@/types";

export async function GET() {
  const pages = await listPages();
  return NextResponse.json({ pages });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PageSnapshot;
    if (!body.id || !body.templateSlug || !body.sections) {
      return NextResponse.json({ error: "Invalid page data" }, { status: 400 });
    }
    const saved = await savePage(body);
    return NextResponse.json({ page: saved });
  } catch {
    // On Vercel, filesystem may be unavailable — client uses URL-encoded sharing
    return NextResponse.json({ ok: true, stored: false });
  }
}

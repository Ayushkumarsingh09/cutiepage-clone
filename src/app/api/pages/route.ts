import { NextResponse } from "next/server";
import { storePage } from "@/lib/page-store";
import { listPages } from "@/lib/storage";
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
    const saved = await storePage(body);
    return NextResponse.json({ page: saved, stored: true });
  } catch (error) {
    console.error("Failed to save page:", error);
    const message = error instanceof Error ? error.message : "Failed to save page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getPage } from "@/lib/storage";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const page = await getPage(id);
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  if (!page.password) {
    return NextResponse.json({ success: true });
  }

  try {
    const { password } = (await request.json()) as { password?: string };
    if (password !== page.password) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

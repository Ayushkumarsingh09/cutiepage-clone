import { promises as fs } from "fs";
import path from "path";
import type { PageSnapshot, PublishedPageMeta } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data", "pages");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function pagePath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

export async function savePage(snapshot: PageSnapshot): Promise<PageSnapshot> {
  await ensureDataDir();
  const updated = {
    ...snapshot,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(pagePath(snapshot.id), JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export async function getPage(id: string): Promise<PageSnapshot | null> {
  try {
    const raw = await fs.readFile(pagePath(id), "utf8");
    return JSON.parse(raw) as PageSnapshot;
  } catch {
    return null;
  }
}

export async function listPages(): Promise<PublishedPageMeta[]> {
  await ensureDataDir();
  const files = await fs.readdir(DATA_DIR);
  const pages: PublishedPageMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
      const page = JSON.parse(raw) as PageSnapshot;
      pages.push({
        id: page.id,
        templateSlug: page.templateSlug,
        title: page.title,
        hasPassword: Boolean(page.password),
        createdAt: page.createdAt,
      });
    } catch {
      // skip invalid files
    }
  }

  return pages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function deletePage(id: string): Promise<boolean> {
  try {
    await fs.unlink(pagePath(id));
    return true;
  } catch {
    return false;
  }
}

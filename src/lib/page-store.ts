import { head, put } from "@vercel/blob";
import type { PageSnapshot } from "@/types";
import { savePage as savePageFile, getPage as getPageFile } from "./storage";

const BLOB_PREFIX = "pages/";

function blobPath(id: string) {
  return `${BLOB_PREFIX}${id}.json`;
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function storePage(snapshot: PageSnapshot): Promise<PageSnapshot> {
  const updated: PageSnapshot = {
    ...snapshot,
    updatedAt: new Date().toISOString(),
  };

  if (hasBlobStorage()) {
    await put(blobPath(updated.id), JSON.stringify(updated), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return updated;
  }

  return savePageFile(updated);
}

export async function loadPage(id: string): Promise<PageSnapshot | null> {
  if (hasBlobStorage()) {
    try {
      const meta = await head(blobPath(id));
      const res = await fetch(meta.url);
      if (!res.ok) return null;
      return (await res.json()) as PageSnapshot;
    } catch {
      return null;
    }
  }

  return getPageFile(id);
}

export function isServerStorageAvailable() {
  return hasBlobStorage() || !process.env.VERCEL;
}

import { get, put } from "@vercel/blob";
import type { PageSnapshot } from "@/types";
import { savePage as savePageFile, getPage as getPageFile } from "./storage";

const BLOB_PREFIX = "pages/";

function blobPath(id: string) {
  return `${BLOB_PREFIX}${id}.json`;
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(merged);
}

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
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
      token: blobToken(),
    });
    return updated;
  }

  return savePageFile(updated);
}

export async function loadPage(id: string): Promise<PageSnapshot | null> {
  if (hasBlobStorage()) {
    try {
      const result = await get(blobPath(id), {
        access: "private",
        token: blobToken(),
      });
      if (!result || result.statusCode !== 200 || !result.stream) {
        return null;
      }
      const text = await streamToText(result.stream);
      return JSON.parse(text) as PageSnapshot;
    } catch (error) {
      console.error(`Failed to load page ${id} from blob:`, error);
      return null;
    }
  }

  return getPageFile(id);
}

export function isServerStorageAvailable() {
  return hasBlobStorage() || !process.env.VERCEL;
}

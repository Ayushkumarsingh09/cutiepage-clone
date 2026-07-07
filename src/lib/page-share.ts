import type { PageSnapshot } from "@/types";

const DRAFT_PREFIX = "draft-";
const PUBLISHED_PREFIX = "published-";

export function buildShareUrl(snapshot: PageSnapshot, origin?: string): string {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/p/${snapshot.id}`;
}

export function saveDraftLocal(snapshot: PageSnapshot) {
  localStorage.setItem(`${DRAFT_PREFIX}${snapshot.id}`, JSON.stringify(snapshot));
}

export function savePublishedLocal(snapshot: PageSnapshot) {
  localStorage.setItem(`${PUBLISHED_PREFIX}${snapshot.id}`, JSON.stringify(snapshot));
  saveDraftLocal(snapshot);
}

export function loadDraftLocal(id: string): PageSnapshot | null {
  try {
    const raw = localStorage.getItem(`${DRAFT_PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as PageSnapshot) : null;
  } catch {
    return null;
  }
}

export function loadPublishedLocal(id: string): PageSnapshot | null {
  try {
    const raw =
      localStorage.getItem(`${PUBLISHED_PREFIX}${id}`) ??
      localStorage.getItem(`${DRAFT_PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as PageSnapshot) : null;
  } catch {
    return null;
  }
}

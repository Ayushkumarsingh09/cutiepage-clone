import LZString from "lz-string";
import type { PageSnapshot } from "@/types";

const DRAFT_PREFIX = "draft-";
const PUBLISHED_PREFIX = "published-";

export function encodePage(snapshot: PageSnapshot): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(snapshot));
}

export function decodePage(encoded: string): PageSnapshot | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as PageSnapshot;
  } catch {
    return null;
  }
}

export function buildShareUrl(snapshot: PageSnapshot, origin?: string): string {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/p/${snapshot.id}`;
}

export function buildFallbackShareUrl(snapshot: PageSnapshot, origin?: string): string {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  const encoded = encodePage(snapshot);
  return `${base}/p/${snapshot.id}#d=${encoded}`;
}

export function readEncodedFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  return params.get("d");
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

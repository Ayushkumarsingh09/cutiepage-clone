"use client";

import { useEffect, useState } from "react";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { decodePage, loadPublishedLocal, readEncodedFromHash } from "@/lib/page-share";
import type { PageSnapshot } from "@/types";

interface LivePageClientProps {
  pageId: string;
}

export function LivePageClient({ pageId }: LivePageClientProps) {
  const [snapshot, setSnapshot] = useState<PageSnapshot | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const encoded = readEncodedFromHash();
      if (encoded) {
        const decoded = decodePage(encoded);
        if (decoded) {
          setSnapshot(decoded);
          return;
        }
      }

      try {
        const res = await fetch(`/api/pages/${pageId}`);
        if (res.ok) {
          const data = await res.json();
          setSnapshot(data.page);
          return;
        }
      } catch {
        // fall through
      }

      const local = loadPublishedLocal(pageId);
      if (local) {
        setSnapshot(local);
        return;
      }

      setError("This page could not be found. Ask the sender to share the link again.");
    }

    load();

    const onHashChange = () => load();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pageId]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffbf7] p-6 text-center">
        <div className="max-w-sm">
          <h1 className="font-display text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-sm text-[var(--color-dim)]">{error}</p>
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffbf7]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return <TemplateRenderer snapshot={snapshot} />;
}

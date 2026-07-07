"use client";

import { useEffect, useState } from "react";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import type { PageSnapshot } from "@/types";

interface LivePageClientProps {
  pageId: string;
}

export function LivePageClient({ pageId }: LivePageClientProps) {
  const [snapshot, setSnapshot] = useState<PageSnapshot | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/pages/${pageId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Page not found");
        return res.json();
      })
      .then((data) => setSnapshot(data.page))
      .catch(() => setError("This page could not be found."));
  }, [pageId]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffbf7] p-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-[var(--color-dim)]">{error}</p>
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

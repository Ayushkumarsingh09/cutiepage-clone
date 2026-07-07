"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { createSnapshotFromTemplate } from "@/lib/snapshot";
import { getTemplate } from "@/lib/templates";
import type { PageSnapshot } from "@/types";

interface PreviewClientProps {
  slug: string;
}

export function PreviewClient({ slug }: PreviewClientProps) {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");
  const template = getTemplate(slug);
  const [snapshot, setSnapshot] = useState<PageSnapshot | null>(null);

  useEffect(() => {
    async function load() {
      if (draftId) {
        const draft = localStorage.getItem(`draft-${draftId}`);
        if (draft) {
          const parsed = JSON.parse(draft) as PageSnapshot;
          setSnapshot({ ...parsed, password: undefined });
          return;
        }
        const res = await fetch(`/api/pages/${draftId}`);
        if (res.ok) {
          const data = await res.json();
          setSnapshot({ ...data.page, password: undefined });
          return;
        }
      }
      const created = createSnapshotFromTemplate(slug);
      setSnapshot(created ? { ...created, password: undefined } : null);
    }
    load();
  }, [slug, draftId]);

  if (!template) return <div className="p-8">Template not found</div>;

  if (!snapshot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="preview-shell relative min-h-screen">
      <div className="preview-bar-top fixed left-0 right-0 top-0 z-[9999] flex items-center gap-3 bg-black/85 px-4 py-2 backdrop-blur-md">
        <Link
          href={`/templates/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-sm transition hover:bg-white/90"
        >
          <ArrowLeft className="size-3.5" /> Back to details
        </Link>
        <span className="ml-auto text-[11px] text-white/60">Preview</span>
      </div>
      <div className="preview-content pt-10">
        <TemplateRenderer snapshot={snapshot} preview />
      </div>
    </div>
  );
}

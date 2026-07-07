"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Rocket, Save } from "lucide-react";
import { EditorField } from "@/components/editor/EditorField";
import { ShareModal } from "@/components/editor/ShareModal";
import { createSnapshotFromTemplate, updateSectionValue } from "@/lib/snapshot";
import { getTemplate } from "@/lib/templates";
import type { PageSnapshot } from "@/types";

interface EditorClientProps {
  slug: string;
  pageId?: string;
}

export function EditorClient({ slug, pageId }: EditorClientProps) {
  const router = useRouter();
  const template = getTemplate(slug);
  const [snapshot, setSnapshot] = useState<PageSnapshot | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      if (pageId) {
        const res = await fetch(`/api/pages/${pageId}`);
        if (res.ok) {
          const data = await res.json();
          setSnapshot(data.page);
          setPassword(data.page.password ?? "");
          return;
        }
        const draft = localStorage.getItem(`draft-${pageId}`);
        if (draft) {
          const parsed = JSON.parse(draft) as PageSnapshot;
          setSnapshot(parsed);
          setPassword(parsed.password ?? "");
          return;
        }
      }

      const created = createSnapshotFromTemplate(slug);
      if (created) {
        if (pageId) created.id = pageId;
        setSnapshot(created);
      }
    }
    load();
  }, [slug, pageId]);

  const currentSection = useMemo(() => {
    if (!template || !snapshot) return null;
    return template.sections[activeSection];
  }, [template, snapshot, activeSection]);

  if (!template) {
    return <div className="p-8 text-center">Template not found.</div>;
  }

  if (!snapshot) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  function updateField(fieldId: string, value: string) {
    if (!currentSection) return;
    setSnapshot((prev) =>
      prev
        ? {
            ...prev,
            sections: updateSectionValue(prev.sections, currentSection.id, fieldId, value),
          }
        : prev,
    );
  }

  async function saveDraft() {
    if (!snapshot) return;
    setSaving(true);
    setStatus("");
    try {
      const draft = { ...snapshot, password: password || snapshot.password };
      localStorage.setItem(`draft-${snapshot.id}`, JSON.stringify(draft));
      const method = pageId ? "PUT" : "POST";
      const res = await fetch(pageId ? `/api/pages/${snapshot.id}` : "/api/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("Saved!");
      if (!pageId) {
        router.replace(`/create/${slug}?id=${snapshot.id}`);
      }
    } catch {
      setStatus("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    if (!snapshot) return;
    setPublishing(true);
    setStatus("");
    try {
      const published = {
        ...snapshot,
        password: password || undefined,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(`draft-${snapshot.id}`, JSON.stringify(published));
      const method = pageId ? "PUT" : "POST";
      const res = await fetch(pageId ? `/api/pages/${snapshot.id}` : "/api/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(published),
      });
      if (!res.ok) throw new Error("Publish failed");
      setSnapshot(published);
      setShareOpen(true);
      if (!pageId) {
        router.replace(`/create/${slug}?id=${snapshot.id}`);
      }
    } catch {
      setStatus("Publish failed. Try again.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fffbf7]">
      <div className="sticky top-0 z-40 border-b border-violet-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href={`/templates/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-dim)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-[var(--color-slate)]">Editing</p>
            <h1 className="font-display text-lg font-semibold">{template.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/preview/${slug}?draft=${snapshot.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
            >
              <Eye className="size-3.5" /> Preview
            </Link>
            <button
              type="button"
              onClick={saveDraft}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 disabled:opacity-60"
            >
              <Save className="size-3.5" /> {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={publish}
              disabled={publishing}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-violet)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-electric)] disabled:opacity-60"
            >
              <Rocket className="size-3.5" /> {publishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-2">
          <p className="px-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
            Sections
          </p>
          {template.sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(index)}
              className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                activeSection === index
                  ? "bg-[var(--color-violet)] font-semibold text-white"
                  : "bg-white hover:bg-violet-50"
              }`}
            >
              {section.label}
            </button>
          ))}

          <div className="mt-6 rounded-2xl border border-violet-100 bg-white p-4">
            <label className="mb-1.5 block text-sm font-medium">Page password (optional)</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for open access"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--color-violet)]"
            />
            <p className="mt-1 text-xs text-[var(--color-dim)]">
              Recipients must enter this password to view the page.
            </p>
          </div>
        </aside>

        <main className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
          {currentSection && (
            <>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-semibold">{currentSection.label}</h2>
                <p className="mt-1 text-sm text-[var(--color-dim)]">{currentSection.description}</p>
              </div>
              <div className="space-y-5">
                {currentSection.fields.map((field) => (
                  <EditorField
                    key={field.id}
                    field={field}
                    value={snapshot.sections.find((s) => s.id === currentSection.id)?.values[field.id] ?? ""}
                    onChange={(value) => updateField(field.id, value)}
                  />
                ))}
              </div>
            </>
          )}
          {status && <p className="mt-4 text-sm font-medium text-[var(--color-violet)]">{status}</p>}
        </main>
      </div>

      <ShareModal
        pageId={snapshot.id}
        title={snapshot.title}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}

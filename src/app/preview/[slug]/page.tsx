import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PreviewClient } from "@/components/preview/PreviewClient";
import { getTemplate } from "@/lib/templates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
        </div>
      }
    >
      <PreviewClient slug={slug} />
    </Suspense>
  );
}

import { notFound } from "next/navigation";
import { EditorClient } from "@/components/editor/EditorClient";
import { getTemplate, getTemplateSlugs } from "@/lib/templates";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export function generateStaticParams() {
  return getTemplateSlugs().map((slug) => ({ slug }));
}

export default async function CreatePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { id } = await searchParams;
  const template = getTemplate(slug);
  if (!template) notFound();

  return <EditorClient slug={slug} pageId={id} />;
}

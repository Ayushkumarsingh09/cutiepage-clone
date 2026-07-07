import { LivePageClient } from "@/components/live/LivePageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LivePage({ params }: PageProps) {
  const { id } = await params;
  return <LivePageClient pageId={id} />;
}

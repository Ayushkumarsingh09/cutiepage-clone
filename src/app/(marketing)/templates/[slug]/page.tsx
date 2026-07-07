import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  Sparkles,
  Star,
  QrCode,
  Clock,
  Smartphone,
  Pencil,
} from "lucide-react";
import TemplateCard from "@/components/marketing/TemplateCard";
import { getAllTemplates, getTemplate } from "@/lib/templates";
import { reviews } from "@/lib/reviews";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTemplates().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return { title: "Template not found" };
  return {
    title: `${template.name} - Cutiepage Clone`,
    description: template.description,
  };
}

const features = [
  { icon: Clock, text: "Make it in just 30 seconds" },
  { icon: QrCode, text: "Beautiful live QR code included" },
  { icon: Smartphone, text: "Looks great on every device" },
  { icon: Pencil, text: "Edit anytime after publishing" },
];

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const allTemplates = getAllTemplates();
  const related = allTemplates
    .filter((t) => t.slug !== slug)
    .slice(0, 4);

  const templateReviews = reviews.filter(
    (r) => r.template?.toLowerCase().includes(template.name.split(" ")[0].toLowerCase())
  );
  const displayReviews = templateReviews.length > 0 ? templateReviews : reviews.slice(0, 3);

  const sectionFeatures = template.sections.map((s) => s.label);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 text-sm text-dim">
          <Link href="/products" className="hover:text-violet transition-colors">
            Templates
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{template.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-violet/10 bg-violet/5 shadow-lg shadow-violet/10">
            <Image
              src={template.coverImage}
              alt={template.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {template.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-dim">
              {template.description}
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
                    <feature.icon className="h-4 w-4" />
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/create/${template.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet/25 transition-all hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                Make it yours
              </Link>
              <Link
                href={`/preview/${template.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet/20 bg-white px-6 py-4 text-base font-semibold text-violet transition-colors hover:bg-violet/5"
              >
                <Eye className="h-4 w-4" />
                Take a preview
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-16 rounded-2xl border border-violet/10 bg-white p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            What you can customise
          </h2>
          <p className="mt-2 text-dim">
            This template includes {template.sections.length} sections to personalise.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((label) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl bg-violet/[0.03] px-4 py-3"
              >
                <Check className="h-4 w-4 shrink-0 text-violet" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground">
            What creators are saying
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-violet/10 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                You might also like
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-semibold text-violet hover:text-electric transition-colors"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t) => (
                <TemplateCard key={t.slug} template={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

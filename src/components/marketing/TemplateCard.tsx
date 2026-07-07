import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TemplateDefinition } from "@/types";

interface TemplateCardProps {
  template: TemplateDefinition;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-violet/10 bg-white shadow-sm transition-all duration-300 hover:border-violet/20 hover:shadow-lg hover:shadow-violet/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-violet/5">
        <Image
          src={template.coverImage}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {template.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-dim">
          {template.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/templates/${template.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-violet/20 px-4 py-2.5 text-sm font-medium text-violet transition-colors hover:bg-violet/5"
          >
            Take a look
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/create/${template.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet/20 transition-all hover:brightness-110"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Make it yours
          </Link>
        </div>
      </div>
    </article>
  );
}

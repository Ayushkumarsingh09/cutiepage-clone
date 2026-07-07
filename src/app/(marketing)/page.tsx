import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/marketing/Hero";
import Marquee from "@/components/marketing/Marquee";
import Stats from "@/components/marketing/Stats";
import TemplateCard from "@/components/marketing/TemplateCard";
import Testimonials from "@/components/marketing/Testimonials";
import HowItWorks from "@/components/marketing/HowItWorks";
import FAQ from "@/components/marketing/FAQ";
import Comparison from "@/components/marketing/Comparison";
import Newsletter from "@/components/marketing/Newsletter";
import CTA from "@/components/marketing/CTA";
import { getAllTemplates } from "@/lib/templates";

export default function HomePage() {
  const templates = getAllTemplates().slice(0, 8);

  return (
    <>
      <Hero />
      <Marquee />
      <Stats />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet">
                Trending
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Popular templates
              </h2>
              <p className="mt-3 max-w-lg text-dim">
                Our most-loved gift page designs, ready for your personal touch.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet transition-colors hover:text-electric"
            >
              View all templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <HowItWorks />
      <FAQ />
      <Comparison />
      <Newsletter />
      <CTA />
    </>
  );
}

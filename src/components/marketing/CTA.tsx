import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl gradient-bg px-8 py-14 text-center shadow-2xl shadow-violet/25 sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <Sparkles className="mx-auto h-8 w-8 text-white/80" />
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to make someone&apos;s day?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Pick a template, add your personal touch, and create a gift
              they&apos;ll treasure forever.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-violet shadow-lg transition-all hover:bg-white/95 hover:shadow-xl"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Gift, Heart, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-violet/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-0 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet/15 bg-white/80 px-4 py-1.5 text-sm font-medium text-violet shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Personalised gift pages in minutes
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Make someone feel{" "}
            <span className="gradient-text">extra special</span> today
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-dim sm:text-xl">
            Choose a beautiful template, add your personal touch, and share a
            one-of-a-kind gift page they&apos;ll never forget.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet/25 transition-all hover:shadow-xl hover:shadow-violet/30 hover:brightness-110 sm:w-auto"
            >
              Browse templates
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/reviews"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-violet/20 bg-white px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-violet/5 sm:w-auto"
            >
              See what others made
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-dim">
            <span className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-violet" />
              20+ templates
            </span>
            <span className="hidden h-4 w-px bg-slate/30 sm:block" />
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-violet" />
              Ready in 30 seconds
            </span>
            <span className="hidden h-4 w-px bg-slate/30 sm:block" />
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet" />
              Lifetime validity
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute -inset-4 rounded-3xl gradient-bg opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-violet/15 bg-white p-2 shadow-2xl shadow-violet/15 sm:rounded-3xl sm:p-3">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-violet/5 via-white to-electric/5 sm:rounded-2xl">
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
                <div className="animate-float flex h-20 w-20 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-violet/30">
                  <Heart className="h-10 w-10" />
                </div>
                <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  Happy Birthday, Priya! 🎂
                </p>
                <p className="max-w-md text-center text-dim">
                  A tiny website made with love — just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-violet/10 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-lg font-semibold">Chayan</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dim">
              Create beautiful, personalised gift pages for the people you love — in minutes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-dim hover:text-violet transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-dim hover:text-violet transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-dim hover:text-violet transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-dim hover:text-violet transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Get started</h3>
            <p className="mt-3 text-sm text-dim">
              Pick a template and make someone&apos;s day unforgettable.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet/20 transition-all hover:brightness-110"
            >
              Browse templates
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-violet/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate">
            © {new Date().getFullYear()} Chayan. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-slate">
            Made with <Heart className="h-3.5 w-3.5 fill-violet text-violet" /> for special moments
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Templates" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet/10 bg-[#fffbf7]/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white shadow-md shadow-violet/25 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Chayan
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-violet/10 text-violet"
                  : "text-dim hover:bg-violet/5 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet/25 transition-all hover:shadow-lg hover:shadow-violet/30 hover:brightness-110"
          >
            Make yours
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-violet/10 bg-[#fffbf7] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-violet/10 text-violet"
                    : "text-dim hover:bg-violet/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full gradient-bg px-5 py-3 text-sm font-semibold text-white"
            >
              Make yours
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

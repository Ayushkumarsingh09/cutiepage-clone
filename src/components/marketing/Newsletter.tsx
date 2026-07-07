"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-violet/15 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10 text-violet">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-dim">
            Get notified when we launch new templates and features.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-violet/5 px-6 py-8">
              <p className="font-display text-lg font-semibold text-violet">
                Thank you for subscribing! 🎉
              </p>
              <p className="mt-2 text-sm text-dim">
                We&apos;ll keep you posted on all the cute new stuff.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-violet/15 bg-[#fffbf7] px-5 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-slate focus:border-violet/40 focus:ring-2 focus:ring-violet/10"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet/20 transition-all hover:brightness-110"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

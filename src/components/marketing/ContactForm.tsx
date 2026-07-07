"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-violet/15 bg-violet/5 px-8 py-12 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-violet" />
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          Message sent!
        </h3>
        <p className="mt-2 text-dim">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Your name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-violet/15 bg-[#fffbf7] px-4 py-3 text-sm outline-none transition-colors focus:border-violet/40 focus:ring-2 focus:ring-violet/10"
          placeholder="Priya Sharma"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-violet/15 bg-[#fffbf7] px-4 py-3 text-sm outline-none transition-colors focus:border-violet/40 focus:ring-2 focus:ring-violet/10"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full resize-none rounded-xl border border-violet/15 bg-[#fffbf7] px-4 py-3 text-sm outline-none transition-colors focus:border-violet/40 focus:ring-2 focus:ring-violet/10"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet/20 transition-all hover:brightness-110 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        Send message
      </button>
    </form>
  );
}

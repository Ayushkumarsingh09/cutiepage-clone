"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

const faqs = [
  {
    question: "What is a gift page?",
    answer:
      "A gift page is a beautiful, personalised mini-website you create for someone special. It can include photos, messages, music, animations, and more — all wrapped in a gorgeous template.",
  },
  {
    question: "How long does it take to create one?",
    answer:
      "Most people finish in under 30 seconds! Pick a template, fill in your details, and you're ready to share. You can always come back and edit later.",
  },
  {
    question: "Can I edit my page after publishing?",
    answer:
      "Yes! You can update your page anytime. Change text, swap images, or tweak any detail — your link stays the same.",
  },
  {
    question: "How do I share my gift page?",
    answer:
      "You'll get a unique link and a beautiful QR code. Share via WhatsApp, text message, social media, or print the QR code on a card.",
  },
  {
    question: "Do the pages work on mobile?",
    answer:
      "Absolutely. Every template is fully responsive and looks stunning on phones, tablets, and desktops.",
  },
  {
    question: "How long does my page stay live?",
    answer:
      "Your gift page has lifetime validity. Once published, it stays online so your recipient can revisit it whenever they want.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Got questions?
          </h2>
          <p className="mt-4 text-dim">
            Everything you need to know about creating gift pages.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-violet/10 bg-white transition-shadow hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={clsx(
                      "h-5 w-5 shrink-0 text-violet transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-all duration-200",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-dim">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface TemplateShellProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  children: ReactNode;
  accent?: string;
  showNav?: boolean;
  className?: string;
}

export default function TemplateShell({
  currentStep,
  totalSteps,
  onStepChange,
  children,
  accent = "#f4a6b8",
  showNav = true,
  className,
}: TemplateShellProps) {
  const canGoBack = currentStep > 0;
  const canGoForward = currentStep < totalSteps - 1;

  return (
    <div
      className={clsx(
        "relative flex min-h-dvh w-full flex-col overflow-hidden",
        className,
      )}
      style={{
        background:
          "linear-gradient(165deg, #fff9f5 0%, #ffeef3 35%, #f5f0ff 70%, #fff9f5 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div
          className="absolute -left-20 top-10 h-56 w-56 rounded-full blur-3xl"
          style={{ background: accent }}
        />
        <div className="absolute -right-16 bottom-24 h-48 w-48 rounded-full bg-[#c9e4ff] blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 py-6 pb-24 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-md flex-1 flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNav && totalSteps > 1 && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/60 bg-white/70 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => canGoBack && onStepChange(currentStep - 1)}
              disabled={!canGoBack}
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border transition",
                canGoBack
                  ? "border-[#f0d4dc] bg-white text-[#8b5a6b] hover:bg-[#fff5f8]"
                  : "border-transparent text-transparent",
              )}
              aria-label="Previous step"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex flex-1 items-center justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onStepChange(i)}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === currentStep ? "step" : undefined}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentStep ? 24 : 8,
                    height: 8,
                    background:
                      i === currentStep ? accent : "rgba(180, 140, 155, 0.35)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => canGoForward && onStepChange(currentStep + 1)}
              disabled={!canGoForward}
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border transition",
                canGoForward
                  ? "border-[#f0d4dc] bg-white text-[#8b5a6b] hover:bg-[#fff5f8]"
                  : "border-transparent text-transparent",
              )}
              aria-label="Next step"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface IntroScreenProps {
  tag?: string;
  headline: string;
  message: string;
  mediaUrl?: string;
  mediaAlt?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export default function IntroScreen({
  tag,
  headline,
  message,
  mediaUrl,
  mediaAlt = "",
  primaryLabel = "Continue",
  secondaryLabel,
  onPrimary,
  onSecondary,
}: IntroScreenProps) {
  const lines = message.split("\n").filter(Boolean);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-6 text-center">
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full bg-white/80 px-4 py-1.5 text-xs tracking-wide text-[#b07a8a] shadow-sm"
        >
          {tag}
        </motion.span>
      )}

      {mediaUrl && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-white shadow-lg sm:h-48 sm:w-48"
        >
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-semibold leading-tight text-[#5c3d4a] sm:text-3xl"
      >
        {headline}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="max-w-sm space-y-2 text-[15px] leading-relaxed text-[#7a5a65]"
      >
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-2 flex flex-wrap items-center justify-center gap-3"
      >
        {onPrimary && (
          <button
            type="button"
            onClick={onPrimary}
            className="rounded-full bg-[#f4a6b8] px-8 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#e890a5] active:scale-95"
          >
            {primaryLabel}
          </button>
        )}
        {secondaryLabel && onSecondary && (
          <button
            type="button"
            onClick={onSecondary}
            className="rounded-full border border-[#f0d4dc] bg-white/80 px-6 py-3 text-sm text-[#8b5a6b] transition hover:bg-white active:scale-95"
          >
            {secondaryLabel}
          </button>
        )}
      </motion.div>
    </div>
  );
}

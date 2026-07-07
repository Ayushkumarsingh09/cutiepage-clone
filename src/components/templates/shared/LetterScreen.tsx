"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LetterScreenProps {
  eyebrow?: string;
  intro?: string;
  greeting: string;
  body: string;
  closing?: string;
  signature: string;
  date?: string;
  imageUrl?: string;
  footer?: string;
}

export default function LetterScreen({
  eyebrow,
  intro,
  greeting,
  body,
  closing,
  signature,
  date,
  imageUrl,
  footer,
}: LetterScreenProps) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[#b07a8a]"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div
        initial={{ rotate: -1.5, opacity: 0, y: 20 }}
        animate={{ rotate: -0.5, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full rounded-2xl border border-[#e8dcc8] bg-[#fdf8ee] p-6 shadow-[0_8px_32px_rgba(180,140,100,0.15)] sm:p-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(200,180,150,0.15) 28px)",
        }}
      >
        <div className="absolute left-8 top-0 h-full w-px bg-[#f0c8c8]/50" />

        {imageUrl && (
          <div className="mb-4 flex justify-end">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-md">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}

        {intro && (
          <p className="mb-2 text-center text-sm italic text-[#a08070]">{intro}</p>
        )}

        {date && (
          <p className="mb-4 text-right text-xs text-[#a08070]">{date}</p>
        )}

        <p
          className="mb-4 text-lg text-[#5c4033]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {greeting}
        </p>

        <div
          className="space-y-4 text-[15px] leading-relaxed text-[#4a3728]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {closing && (
          <p
            className="mt-6 text-[15px] text-[#4a3728]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {closing}
          </p>
        )}

        <p
          className="mt-2 text-right text-lg italic text-[#8b5a6b]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {signature}
        </p>
      </motion.div>

      {footer && (
        <p className="mt-4 text-center text-xs text-[#b07a8a]">{footer}</p>
      )}
    </div>
  );
}

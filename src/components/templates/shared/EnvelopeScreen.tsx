"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EnvelopeScreenProps {
  forLabel?: string;
  title: string;
  subtitle?: string;
  hint?: string;
  sealLetter?: string;
  mascotUrl?: string;
  onOpen: () => void;
}

export default function EnvelopeScreen({
  forLabel,
  title,
  subtitle,
  hint = "Tap to open",
  sealLetter = "♥",
  mascotUrl,
  onOpen,
}: EnvelopeScreenProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
      {forLabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-[#b07a8a]"
        >
          {forLabel}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-medium text-[#5c3d4a] sm:text-2xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm italic text-[#a08090]"
        >
          {subtitle}
        </motion.p>
      )}

      {mascotUrl && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative my-2 h-24 w-24"
        >
          <Image src={mascotUrl} alt="" fill className="object-contain" unoptimized />
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        className="relative mt-4 cursor-pointer"
        whileTap={{ scale: 0.97 }}
        aria-label="Open envelope"
      >
        <AnimatePresence>
          {!opening ? (
            <motion.div
              key="closed"
              exit={{ rotateX: -120, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-44 w-72 overflow-hidden rounded-lg bg-[#f5e6d3] shadow-[0_12px_40px_rgba(140,100,80,0.2)] sm:w-80">
                <div className="absolute inset-x-0 top-0 h-24 origin-top bg-[#e8d5bc] [clip-path:polygon(0_0,50%_70%,100%_0)]" />
                <div className="absolute inset-x-4 bottom-4 top-16 rounded bg-[#faf3ea] border border-[#e0cfc0]" />
                <motion.div
                  className="absolute left-1/2 top-[42%] z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#c9a882] bg-[#d4a574] text-lg font-serif text-white shadow-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {sealLetter}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-44 w-72 items-center justify-center sm:w-80"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                className="text-4xl"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-[#a08090]"
      >
        {hint}
      </motion.p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
  url: string;
  caption?: string;
}

interface PhotoGalleryProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  photos: GalleryPhoto[];
  nextLabel?: string;
  onNext?: () => void;
}

export default function PhotoGallery({
  title,
  subtitle,
  eyebrow,
  photos,
  nextLabel,
  onNext,
}: PhotoGalleryProps) {
  const validPhotos = photos.filter((p) => p.url);
  const [index, setIndex] = useState(0);
  const current = validPhotos[index];

  if (!current) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-[#b07a8a]">{eyebrow}</p>
      )}
      {title && (
        <h2 className="text-center text-xl font-semibold text-[#5c3d4a]">{title}</h2>
      )}
      {subtitle && (
        <p className="max-w-sm text-center text-sm text-[#8b6a75]">{subtitle}</p>
      )}

      <div className="relative w-full max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotate: -3, x: 30 }}
            animate={{ opacity: 1, rotate: index % 2 === 0 ? -2 : 2, x: 0 }}
            exit={{ opacity: 0, rotate: 3, x: -30 }}
            transition={{ duration: 0.35 }}
            className="rounded-sm bg-white p-3 pb-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f5f0eb]">
              <Image
                src={current.url}
                alt={current.caption ?? "Photo"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {current.caption && (
              <p
                className="mt-3 text-center text-sm text-[#5c4033]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {current.caption}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {validPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + validPhotos.length) % validPhotos.length)}
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4 text-[#8b5a6b]" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % validPhotos.length)}
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4 text-[#8b5a6b]" />
            </button>
          </>
        )}
      </div>

      {validPhotos.length > 1 && (
        <div className="flex gap-1.5">
          {validPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 20 : 6,
                background: i === index ? "#f4a6b8" : "rgba(180,140,155,0.4)",
              }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}

      {nextLabel && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="mt-2 rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#e890a5]"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

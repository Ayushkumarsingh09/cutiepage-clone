"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface FlipCardItem {
  imageUrl: string;
  message: string;
}

interface FlipCardsProps {
  heading: string;
  subheading?: string;
  cards: FlipCardItem[];
}

export default function FlipCards({ heading, subheading, cards }: FlipCardsProps) {
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false));

  const toggle = (i: number) => {
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#5c3d4a]">{heading}</h2>
        {subheading && (
          <p className="mt-1 text-sm text-[#8b6a75]">{subheading}</p>
        )}
      </div>

      <div className="grid w-full gap-4">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className="relative h-44 w-full [perspective:1000px]"
            whileTap={{ scale: 0.98 }}
            aria-label={flipped[i] ? "Flip to image" : "Flip to message"}
          >
            <motion.div
              className="relative h-full w-full [transform-style:preserve-3d]"
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-white shadow-lg [backface-visibility:hidden]">
                <Image
                  src={card.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-[#8b5a6b]">
                  tap to flip
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-[#f0d4dc] bg-[#fff5f8] p-4 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-center text-sm leading-relaxed text-[#5c3d4a]">
                  {card.message}
                </p>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

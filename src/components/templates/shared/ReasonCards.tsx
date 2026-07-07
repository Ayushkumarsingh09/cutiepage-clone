"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export interface ReasonItem {
  title: string;
  body: string;
}

interface ReasonCardsProps {
  title?: string;
  reasons: ReasonItem[];
}

export default function ReasonCards({ title, reasons }: ReasonCardsProps) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="flex flex-1 flex-col gap-5 py-4">
      {title && (
        <h2 className="text-center text-xl font-semibold text-[#5c3d4a]">{title}</h2>
      )}

      <div className="space-y-3">
        {reasons.map((reason, i) => {
          const isOpen = expanded === i;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setExpanded(isOpen ? null : i)}
              layout
              className="w-full rounded-2xl border border-[#f0d4dc] bg-white/80 p-4 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffeef3] text-[#f4a6b8]">
                  <Heart className="h-4 w-4 fill-current" />
                </span>
                <span className="flex-1 font-medium text-[#5c3d4a]">{reason.title}</span>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="mt-3 pl-11 text-sm leading-relaxed text-[#7a5a65]">
                  {reason.body}
                </p>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

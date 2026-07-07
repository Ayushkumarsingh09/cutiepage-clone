"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  title: string;
  artist?: string;
  url?: string;
  coverUrl?: string;
  caption?: string;
}

export default function MusicPlayer({
  title,
  artist,
  url,
  coverUrl,
  caption,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!url) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      void audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-[#f0d4dc] bg-white/90 p-5 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#ffeef3]">
            {coverUrl ? (
              <Image src={coverUrl} alt="" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl">🎵</div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-[#5c3d4a]">{title}</p>
            {artist && (
              <p className="truncate text-sm text-[#a08090]">{artist}</p>
            )}
          </div>

          <button
            type="button"
            onClick={toggle}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4a6b8] text-white shadow-md transition hover:bg-[#e890a5]"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
          </button>
        </div>

        {caption && (
          <p className="mt-4 text-center text-xs leading-relaxed text-[#8b6a75]">{caption}</p>
        )}
      </motion.div>

      <audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} preload="metadata" />
    </div>
  );
}

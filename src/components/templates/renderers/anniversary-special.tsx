"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import LetterScreen from "../shared/LetterScreen";
import MusicPlayer from "../shared/MusicPlayer";
import PasswordGate from "../shared/PasswordGate";

function Countdown({ targetDate, eyebrow, subtitle }: { targetDate: string; eyebrow?: string; subtitle?: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
      {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-[#b07a8a]">{eyebrow}</p>}
      <div className="flex gap-4">
        {[
          { val: time.days, label: "days" },
          { val: time.hours, label: "hrs" },
          { val: time.mins, label: "min" },
        ].map(({ val, label }) => (
          <div key={label} className="rounded-2xl bg-white/80 px-4 py-3 shadow-md">
            <p className="text-2xl font-semibold text-[#5c3d4a]">{val}</p>
            <p className="text-[10px] uppercase text-[#a08090]">{label}</p>
          </div>
        ))}
      </div>
      {subtitle && <p className="text-sm text-[#8b6a75]">{subtitle}</p>}
    </div>
  );
}

export default function AnniversarySpecialRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -40]);

  const storyCards = [
    { title: v.storyCardOneTitle, text: v.storyCardOneText },
    { title: v.storyCardTwoTitle, text: v.storyCardTwoText },
    { title: v.storyCardThreeTitle, text: v.storyCardThreeText },
  ].filter((c) => c.title);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={5} onStepChange={setStep} accent="#e8b4b8">
        {step === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
            <motion.p
              style={{ y: parallaxY }}
              className="text-xs uppercase tracking-[0.25em] text-[#b07a8a]"
            >
              {v.brand}
            </motion.p>
            <h1 className="text-center text-2xl font-semibold text-[#5c3d4a]">{v.couple}</h1>
            {v.heroImageUrl && (
              <motion.div
                style={{ y: parallaxY }}
                className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border-4 border-white shadow-xl"
              >
                <Image src={v.heroImageUrl} alt="" fill className="object-cover" unoptimized />
              </motion.div>
            )}
            {v.introGifUrl && (
              <div className="relative h-20 w-20">
                <Image src={v.introGifUrl} alt="" fill className="object-contain" unoptimized />
              </div>
            )}
          </div>
        )}
        {step === 1 && (
          <Countdown
            targetDate={v.anniversaryDate}
            eyebrow={v.countdownEyebrow}
            subtitle={v.countdownSubtitle}
          />
        )}
        {step === 2 && (
          <div className="flex flex-1 flex-col gap-4 py-4">
            {v.storyEyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#b07a8a]">{v.storyEyebrow}</p>
            )}
            <h2 className="text-lg font-semibold text-[#5c3d4a]">{v.storyTitle}</h2>
            <div className="space-y-3">
              {storyCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-[#f0d4dc] bg-white/80 p-4 shadow-sm"
                >
                  <h3 className="font-medium text-[#5c3d4a]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#7a5a65]">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-1 flex-col gap-4 py-4">
            <h2 className="text-center text-lg font-semibold text-[#5c3d4a]">
              {v.playlistTitle}
            </h2>
            <MusicPlayer title={v.songOneTitle} url={v.songOneUrl} coverUrl={v.songOneCoverUrl} caption={v.songOneCaption} />
            <MusicPlayer title={v.songTwoTitle} url={v.songTwoUrl} coverUrl={v.songTwoCoverUrl} caption={v.songTwoCaption} />
            <MusicPlayer title={v.songThreeTitle} url={v.songThreeUrl} coverUrl={v.songThreeCoverUrl} caption={v.songThreeCaption} />
          </div>
        )}
        {step === 4 && (
          <LetterScreen
            eyebrow={v.noteEyebrow}
            greeting={v.noteGreeting}
            body={[v.noteParagraphOne, v.noteParagraphTwo, v.noteParagraphThree].filter(Boolean).join("\n\n")}
            signature={v.noteSignoff}
            imageUrl={v.letterStickerUrl}
          />
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

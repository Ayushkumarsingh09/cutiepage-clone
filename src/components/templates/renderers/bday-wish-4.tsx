"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import PhotoGallery from "../shared/PhotoGallery";
import MusicPlayer from "../shared/MusicPlayer";
import PasswordGate from "../shared/PasswordGate";

export default function BdayWish4Renderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={5} onStepChange={setStep} accent="#c9b1ff">
        {step === 0 && (
          <IntroScreen
            tag={v.introLabel}
            headline={v.introWindowTitle || "birthday-surprise.exe"}
            message="A little window into your birthday surprise."
            mediaUrl={v.introImageOneUrl || v.coverImageUrl}
            primaryLabel="Open →"
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-4 py-4">
            <div className="rounded-2xl border border-[#e0d4f0] bg-[#faf8ff] p-4 shadow-sm">
              <p className="text-[10px] uppercase text-[#a08090]">{v.songCardWindowTitle}</p>
              <MusicPlayer
                title={v.songCardTitle}
                artist={v.songCardSubtitle}
                url={v.backgroundMusicUrl}
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mx-auto rounded-full bg-[#c9b1ff] px-6 py-2.5 text-sm font-medium text-white"
            >
              {v.songCardFinalMessage || "Let's go!"}
            </button>
          </div>
        )}
        {step === 2 && v.transitionImageUrl && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
            <p className="text-sm text-[#8b6a75]">{v.transitionLabel}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-video w-full max-w-xs overflow-hidden rounded-2xl shadow-lg"
            >
              <Image src={v.transitionImageUrl} alt="" fill className="object-cover" unoptimized />
            </motion.div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-full bg-[#c9b1ff] px-6 py-2.5 text-sm text-white"
            >
              Continue →
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
            <h2 className="text-lg font-medium text-[#5c3d4a]">{v.balloonTitle}</h2>
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, delay: i * 0.15, duration: 1.5 }}
                  className="text-3xl"
                >
                  🎈
                </motion.span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-full bg-[#c9b1ff] px-6 py-2.5 text-sm text-white"
            >
              {v.balloonContinueButton || "Continue to Cake"}
            </button>
          </div>
        )}
        {step === 4 && (
          <PhotoGallery
            title={v.galleryTitle || "Memories"}
            photos={[
              { url: v.galleryPhotoOneUrl, caption: v.galleryPhotoOneCaption },
              { url: v.galleryPhotoTwoUrl, caption: v.galleryPhotoTwoCaption },
              { url: v.galleryPhotoThreeUrl, caption: v.galleryPhotoThreeCaption },
            ]}
          />
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

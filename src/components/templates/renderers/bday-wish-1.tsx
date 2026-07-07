"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import FlipCards from "../shared/FlipCards";
import LetterScreen from "../shared/LetterScreen";
import MusicPlayer from "../shared/MusicPlayer";
import PasswordGate from "../shared/PasswordGate";

export default function BdayWish1Renderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const actionLabels = (v.actionLabels ?? "").split("\n").filter(Boolean);
  const introMessages = (v.introMessages ?? v.introMessage ?? "").split("\n").filter(Boolean);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={4} onStepChange={setStep} accent="#ffb3c6">
        {step === 0 && (
          <IntroScreen
            tag={v.noteLabel}
            headline={`Hey ${v.recipientName}!`}
            message={introMessages.join("\n") || v.introMessage}
            mediaUrl={v.introMediaUrl}
            mediaAlt={v.introMediaAlt}
            primaryLabel={v.yesLabel || "Yes!"}
            secondaryLabel={v.noLabel}
            onPrimary={() => setStep(1)}
            onSecondary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
            {!celebrating ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-[#5c3d4a]">{v.surpriseHeadline}</h2>
                  <p className="mt-2 text-sm text-[#8b6a75]">{v.surpriseSubheadline}</p>
                </motion.div>
                {v.topStickerUrl && (
                  <div className="relative h-16 w-full max-w-xs">
                    <Image src={v.topStickerUrl} alt="" fill className="object-contain object-right" unoptimized />
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-2">
                  {(actionLabels.length ? actionLabels : ["Lights", "Music", "Decorate", "Balloons", "Cake"]).map(
                    (label, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => i === 4 && setCelebrating(true)}
                        className="rounded-full border border-[#f0d4dc] bg-white/80 px-4 py-2 text-xs text-[#8b5a6b] shadow-sm hover:bg-[#fff5f8]"
                      >
                        {label}
                      </motion.button>
                    ),
                  )}
                </div>
                {v.bottomStickerUrl && (
                  <div className="relative h-16 w-full max-w-xs">
                    <Image src={v.bottomStickerUrl} alt="" fill className="object-contain object-left" unoptimized />
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="text-lg font-medium text-[#5c3d4a]">{v.finalMessage}</p>
                <div className="flex gap-3">
                  {v.wishMediaOneUrl && (
                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
                      <Image src={v.wishMediaOneUrl} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                  {v.wishMediaTwoUrl && (
                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
                      <Image src={v.wishMediaTwoUrl} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white"
                >
                  Continue →
                </button>
              </motion.div>
            )}
            {v.musicUrl && celebrating && (
              <MusicPlayer title="Birthday vibes" url={v.musicUrl} />
            )}
          </div>
        )}
        {step === 2 && (
          <FlipCards
            heading={v.cardSectionHeading}
            subheading={v.cardSectionSubheading}
            cards={[
              { imageUrl: v.cardOneImageUrl, message: v.cardOneMessage },
              { imageUrl: v.cardTwoImageUrl, message: v.cardTwoMessage },
              { imageUrl: v.cardThreeImageUrl, message: v.cardThreeMessage },
            ]}
          />
        )}
        {step === 3 && (
          <LetterScreen
            date={v.letterDate}
            greeting={v.letterGreeting}
            body={v.letterBody}
            closing={v.letterClosing}
            signature={v.letterSignature}
          />
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

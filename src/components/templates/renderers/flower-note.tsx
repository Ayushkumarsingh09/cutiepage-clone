"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import LetterScreen from "../shared/LetterScreen";
import PasswordGate from "../shared/PasswordGate";

export default function FlowerNoteRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={3} onStepChange={setStep} accent="#c8e6c9">
        {step === 0 && (
          <IntroScreen
            tag={`for ${v.recipientName}`}
            headline={v.headline}
            message={v.introMessage}
            mediaUrl={v.introGifUrl}
            primaryLabel="Open the gift"
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-6 text-center">
            <h2 className="text-xl font-semibold text-[#4a6741]">A flower for you</h2>
            <motion.button
              type="button"
              onClick={() => setRevealed(true)}
              className="relative"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={revealed ? { scale: 1.1, rotate: 5 } : { scale: [1, 1.05, 1] }}
                transition={revealed ? { duration: 0.4 } : { repeat: Infinity, duration: 2 }}
                className="text-7xl"
              >
                {revealed ? "🌸" : "🎁"}
              </motion.div>
            </motion.button>
            {revealed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-sm rounded-2xl bg-white/80 p-5 text-sm leading-relaxed text-[#5c5c4a] shadow-md"
              >
                {v.flowerMessage}
              </motion.p>
            )}
            {v.introGifUrl && revealed && (
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image src={v.introGifUrl} alt="" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <LetterScreen
            greeting={v.letterGreeting}
            body={v.letterBody}
            closing={v.letterClosing}
            signature={v.letterSignature}
            imageUrl={v.introGifUrl}
          />
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

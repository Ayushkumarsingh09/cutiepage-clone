"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import ReasonCards from "../shared/ReasonCards";
import LetterScreen from "../shared/LetterScreen";
import PasswordGate from "../shared/PasswordGate";

export default function LoveNoteRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={4} onStepChange={setStep}>
        {step === 0 && (
          <IntroScreen
            tag={`for ${v.recipientName}`}
            headline={v.headline}
            message={v.introMessage}
            primaryLabel="Open my note"
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <ReasonCards
            title="Reasons I love you"
            reasons={[
              { title: v.reasonOneTitle, body: v.reasonOneBody },
              { title: v.reasonTwoTitle, body: v.reasonTwoBody },
              { title: v.reasonThreeTitle, body: v.reasonThreeBody },
            ]}
          />
        )}
        {step === 2 && v.photoUrl && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
            <h2 className="text-xl font-semibold text-[#5c3d4a]">A photo of us</h2>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-4 border-white shadow-lg"
            >
              <Image src={v.photoUrl} alt={v.photoCaption ?? ""} fill className="object-cover" unoptimized />
            </motion.div>
            {v.photoCaption && (
              <p className="text-center text-sm italic text-[#8b6a75]">{v.photoCaption}</p>
            )}
          </div>
        )}
        {step === 3 && (
          <LetterScreen
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

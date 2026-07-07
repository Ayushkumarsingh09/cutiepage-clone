"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import EnvelopeScreen from "../shared/EnvelopeScreen";
import IntroScreen from "../shared/IntroScreen";
import MusicPlayer from "../shared/MusicPlayer";
import PhotoGallery from "../shared/PhotoGallery";
import LetterScreen from "../shared/LetterScreen";
import PasswordGate from "../shared/PasswordGate";

function BouquetCards({
  title,
  subtitle,
  eyebrow,
  cards,
  onComplete,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  cards: { label: string; body: string }[];
  onComplete?: () => void;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const allPicked = picked.length >= cards.length;

  const pick = (i: number) => {
    if (!picked.includes(i)) setPicked((p) => [...p, i]);
    setActive(i);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-[#b07a8a]">{eyebrow}</p>
      )}
      <h2 className="text-center text-xl font-semibold text-[#5c3d4a]">{title}</h2>
      {subtitle && <p className="text-center text-sm text-[#8b6a75]">{subtitle}</p>}

      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => pick(i)}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-4xl">{picked.includes(i) ? "🌸" : "🌷"}</span>
            <span className="text-xs text-[#8b5a6b]">{card.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-sm rounded-2xl bg-white/90 p-5 text-center text-sm leading-relaxed text-[#5c3d4a] shadow-lg"
          >
            {cards[active].body}
          </motion.div>
        )}
      </AnimatePresence>

      {allPicked && onComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="button"
          onClick={onComplete}
          className="rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white"
        >
          Read the letter →
        </motion.button>
      )}
    </div>
  );
}

export default function BirthdayWish2Renderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const photos = [
    { url: v.galleryPhoto1Url, caption: v.galleryPhoto1Caption },
    { url: v.galleryPhoto2Url, caption: v.galleryPhoto2Caption },
    { url: v.galleryPhoto3Url, caption: v.galleryPhoto3Caption },
    { url: v.galleryPhoto4Url, caption: v.galleryPhoto4Caption },
  ].filter((p) => p.url);

  const steps = envelopeOpen ? 6 : 1;

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell
        currentStep={step}
        totalSteps={steps}
        onStepChange={setStep}
        showNav={envelopeOpen}
      >
        {!envelopeOpen ? (
          <EnvelopeScreen
            forLabel={v.envelopeForLabel}
            title={v.envelopeTitle}
            subtitle={v.envelopeSubtitle}
            hint={v.envelopeMessage}
            mascotUrl={v.envelopeMascotUrl}
            onOpen={() => {
              setEnvelopeOpen(true);
              setStep(0);
            }}
          />
        ) : (
          <>
            {step === 0 && (
              <IntroScreen
                tag={v.heroEyebrow}
                headline={v.heroHeadline}
                message={v.heroMessage}
                mediaUrl={v.heroPortraitUrl}
                primaryLabel={v.greetingNextButton || "Continue →"}
                onPrimary={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <MusicPlayer
                title={v.songTitle}
                artist={v.songArtist}
                url={v.songUrl}
                coverUrl={v.songCoverUrl}
                caption={v.songCaption}
              />
            )}
            {step === 2 && (
              <PhotoGallery
                eyebrow={v.galleryEyebrow}
                title={v.galleryTitle}
                subtitle={v.gallerySubtitle}
                photos={photos}
                nextLabel={v.galleryNextButton}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <BouquetCards
                eyebrow={v.bouquetEyebrow}
                title={v.bouquetTitle}
                subtitle={v.bouquetSubtitle}
                cards={[
                  { label: v.memory1Label, body: v.memory1Body },
                  { label: v.memory2Label, body: v.memory2Body },
                  { label: v.memory3Label, body: v.memory3Body },
                ]}
                onComplete={() => setStep(4)}
              />
            )}
            {step === 4 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-3xl bg-white/90 p-8 shadow-xl"
                >
                  <h2 className="text-2xl font-semibold text-[#5c3d4a]">{v.gratitudeHeadline}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#7a5a65]">{v.gratitudeMessage}</p>
                </motion.div>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white"
                >
                  Open the letter →
                </button>
              </div>
            )}
            {step === 5 && (
              <LetterScreen
                eyebrow={v.letterEyebrow}
                intro={v.letterIntro}
                greeting={v.letterGreeting}
                body={v.letterBody}
                closing={v.letterClosing}
                signature={v.letterSignature}
                imageUrl={v.letterFlowerUrl}
                footer={
                  v.fromName
                    ? `${v.letterFromPrefix || "with love"} ${v.fromName}`
                    : undefined
                }
              />
            )}
          </>
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

export { BouquetCards };

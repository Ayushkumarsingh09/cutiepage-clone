"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import EnvelopeScreen from "../shared/EnvelopeScreen";
import IntroScreen from "../shared/IntroScreen";
import PhotoGallery from "../shared/PhotoGallery";
import LetterScreen from "../shared/LetterScreen";
import MusicPlayer from "../shared/MusicPlayer";
import PasswordGate from "../shared/PasswordGate";

export default function ThinkingStyleRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const hasEnvelope = Boolean(v.envelopeHint || v.envelopeImageUrl || v.envelopeMessage);

  const photos = [
    { url: v.galleryPhotoOneUrl, caption: v.galleryPhotoOneCaption },
    { url: v.galleryPhotoTwoUrl, caption: v.galleryPhotoTwoCaption },
    { url: v.galleryPhotoThreeUrl, caption: v.galleryPhotoThreeCaption },
  ].filter((p) => p.url);

  const notes = [v.noteOne, v.noteTwo, v.noteThree].filter(Boolean);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell
        currentStep={step}
        totalSteps={hasEnvelope && !envelopeOpen ? 1 : 5}
        onStepChange={setStep}
        showNav={!hasEnvelope || envelopeOpen}
        accent="#d4b5ff"
      >
        {hasEnvelope && !envelopeOpen ? (
          <EnvelopeScreen
            title={v.greetingName || v.envelopePreview || "A letter for you"}
            hint={v.envelopeHint || v.envelopeMessage || "Click to open"}
            mascotUrl={v.envelopeImageUrl}
            onOpen={() => setEnvelopeOpen(true)}
          />
        ) : (
          <>
            {step === 0 && (
              <IntroScreen
                tag={v.coverLabel || v.landingWelcome}
                headline={v.coverHeadline || v.landingTitle || v.greetingName || "Hey you"}
                message={
                  v.coverDescription ||
                  [v.landingSubtitle, v.landingLastLine].filter(Boolean).join("\n") ||
                  v.greetingMessage ||
                  "I made something special for you."
                }
                mediaUrl={v.coverImageUrl || v.landingHeroImageUrl}
                primaryLabel={v.coverNextLabel || v.landingButtonLabel || "Continue →"}
                onPrimary={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <div className="flex flex-1 flex-col gap-4 py-4">
                {v.letterCardTitle && (
                  <h2 className="text-center text-xl font-semibold text-[#5c3d4a]">
                    {v.letterCardTitle}
                  </h2>
                )}
                <LetterScreen
                  eyebrow={v.letterSmallHeader || v.letterSectionTitle}
                  greeting={v.letterGreeting || v.letterRecipient || "Dear you,"}
                  body={
                    v.letterBody ||
                    [v.letterParagraphOne, v.letterParagraphTwo].filter(Boolean).join("\n\n")
                  }
                  signature={v.letterSignature}
                  imageUrl={v.letterImageUrl}
                />
              </div>
            )}
            {step === 2 && photos.length > 0 && (
              <PhotoGallery
                title={v.galleryTitle}
                subtitle={v.gallerySubtitle}
                photos={photos}
              />
            )}
            {step === 3 && notes.length > 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
                <h2 className="text-xl font-semibold text-[#5c3d4a]">Little notes</h2>
                <div className="space-y-3">
                  {notes.map((note, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl bg-white/80 px-5 py-3 text-sm text-[#5c3d4a] shadow-sm"
                    >
                      {note}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (v.songOneUrl || v.playlistHeading) && (
              <div className="flex flex-1 flex-col gap-4 py-4">
                {v.playlistHeading && (
                  <h2 className="text-center text-xl font-semibold text-[#5c3d4a]">
                    {v.playlistHeading}
                  </h2>
                )}
                {v.songOneUrl && (
                  <MusicPlayer
                    title={v.songOneTitle}
                    url={v.songOneUrl}
                    coverUrl={v.songOneCoverUrl}
                  />
                )}
                {v.songTwoUrl && (
                  <MusicPlayer
                    title={v.songTwoTitle}
                    url={v.songTwoUrl}
                    coverUrl={v.songTwoCoverUrl}
                  />
                )}
              </div>
            )}
          </>
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

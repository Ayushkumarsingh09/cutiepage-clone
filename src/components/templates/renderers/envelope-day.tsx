"use client";

import { useState } from "react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import EnvelopeScreen from "../shared/EnvelopeScreen";
import IntroScreen from "../shared/IntroScreen";
import MusicPlayer from "../shared/MusicPlayer";
import PhotoGallery from "../shared/PhotoGallery";
import LetterScreen from "../shared/LetterScreen";
import PasswordGate from "../shared/PasswordGate";
import { BouquetCards } from "./birthday-wish-2";

export default function EnvelopeDayRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const photos = [
    { url: v.galleryPhoto1Url, caption: v.galleryPhoto1Caption },
    { url: v.galleryPhoto2Url, caption: v.galleryPhoto2Caption },
    { url: v.galleryPhoto3Url, caption: v.galleryPhoto3Caption },
    { url: v.galleryPhoto4Url, caption: v.galleryPhoto4Caption },
  ].filter((p) => p.url);

  const sealLetter =
    v.envelopeSealLetter ||
    (v.brotherName?.[0] ?? v.envelopeForLabel?.[0] ?? "♥");

  const steps = envelopeOpen ? 5 : 1;

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
            sealLetter={sealLetter}
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
                tag={v.heroEyebrow || v.greetingForLabel}
                headline={v.heroHeadline}
                message={v.heroMessage}
                mediaUrl={v.heroPortraitUrl}
                primaryLabel={v.greetingNextButton || "Continue →"}
                onPrimary={() => setStep(1)}
              />
            )}
            {step === 1 && v.songUrl && (
              <MusicPlayer
                title={v.songTitle}
                artist={v.songArtist}
                url={v.songUrl}
                coverUrl={v.songCoverUrl}
                caption={v.songCaption}
              />
            )}
            {step === (v.songUrl ? 2 : 1) && (
              <PhotoGallery
                title={v.galleryTitle}
                subtitle={v.gallerySubtitle}
                photos={photos}
                nextLabel="Pick a card →"
                onNext={() => setStep(v.songUrl ? 3 : 2)}
              />
            )}
            {step === (v.songUrl ? 3 : 2) && (
              <BouquetCards
                title={v.bouquetTitle}
                subtitle={v.bouquetSubtitle}
                cards={[
                  { label: v.memory1Label, body: v.memory1Body },
                  { label: v.memory2Label, body: v.memory2Body },
                  { label: v.memory3Label, body: v.memory3Body },
                ]}
                onComplete={() => setStep(v.songUrl ? 4 : 3)}
              />
            )}
            {step === (v.songUrl ? 4 : 3) && (
              <LetterScreen
                eyebrow={v.letterEyebrow}
                greeting={v.letterGreeting}
                body={v.letterBody}
                closing={v.letterClosing}
                signature={v.letterSignature}
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

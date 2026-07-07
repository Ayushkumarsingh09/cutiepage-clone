"use client";

import { useState } from "react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import PhotoGallery from "../shared/PhotoGallery";
import MusicPlayer from "../shared/MusicPlayer";
import PasswordGate from "../shared/PasswordGate";

export default function BdayWish3Renderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  const introMessage = [v.introMessageOne, v.introMessageTwo, v.introMessageThree]
    .filter(Boolean)
    .join("\n");

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={4} onStepChange={setStep} accent="#a8d8ea">
        {step === 0 && (
          <IntroScreen
            headline="Birthday surprise!"
            message={introMessage}
            primaryLabel={v.introPrimaryButtonLabel || "Yes, please!"}
            secondaryLabel={v.introSecondaryButtonLabel}
            onPrimary={() => setStep(1)}
            onSecondary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <p className="text-sm text-[#5c3d4a]">{v.songPromptMessage}</p>
            <MusicPlayer
              title={v.songOneTitle || "Your song"}
              url={v.backgroundMusicUrl || v.songOneUrl}
            />
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white"
            >
              {v.introFinalMessage || "Continue →"}
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <h2 className="text-xl font-semibold text-[#5c3d4a]">{v.balloonGameTitle}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["🎈", "🎈", "🎈", "🎈", "🎈"].map((b, i) => (
                <button key={i} type="button" className="text-4xl transition hover:scale-125">
                  {b}
                </button>
              ))}
            </div>
            <p className="text-sm text-[#8b6a75]">{v.cakeInstructionText}</p>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-full bg-[#f4a6b8] px-6 py-2.5 text-sm font-medium text-white"
            >
              {v.balloonContinueButtonLabel || "Continue →"}
            </button>
          </div>
        )}
        {step === 3 && (
          <PhotoGallery
            title={v.galleryTitle}
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

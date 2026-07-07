"use client";

import { useState } from "react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import LetterScreen from "../shared/LetterScreen";
import PhotoGallery from "../shared/PhotoGallery";
import PasswordGate from "../shared/PasswordGate";

export default function CuteBirthdayRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  const galleryPhotos = [
    { url: v.galleryPhotoOneUrl, caption: v.galleryPhotoOneCaption },
    { url: v.galleryPhotoTwoUrl, caption: v.galleryPhotoTwoCaption },
    { url: v.galleryPhotoThreeUrl, caption: v.galleryPhotoThreeCaption },
  ].filter((p) => p.url);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={4} onStepChange={setStep} accent="#ffc8dd">
        {step === 0 && (
          <IntroScreen
            tag={v.landingFooter}
            headline={v.landingTitle}
            message={[v.landingSubtitle, v.landingLastLine].filter(Boolean).join("\n")}
            mediaUrl={v.landingHeroImageUrl}
            primaryLabel={v.landingButtonLabel || "Let's go!"}
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <LetterScreen
            eyebrow={v.letterSectionTitle}
            intro={v.letterSectionSubtitle}
            greeting={v.letterGreeting}
            body={v.letterBody}
            signature={v.letterSignature}
            imageUrl={v.letterImageUrl}
          />
        )}
        {step === 2 && galleryPhotos.length > 0 && (
          <PhotoGallery title={v.galleryTitle} photos={galleryPhotos} />
        )}
        {step === 3 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <span className="text-5xl">🎂</span>
            <h2 className="text-xl font-semibold text-[#5c3d4a]">{v.cakeHeading}</h2>
            <p className="text-sm text-[#8b6a75]">{v.cakeCelebrationMessage || v.cakeCongratulations}</p>
          </div>
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

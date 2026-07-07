"use client";

import { useState } from "react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import LetterScreen from "../shared/LetterScreen";
import PhotoGallery from "../shared/PhotoGallery";
import ReasonCards from "../shared/ReasonCards";
import PasswordGate from "../shared/PasswordGate";

export default function CuteWebsiteV2Renderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  const reasons = [
    { title: v.reasonOneTitle, body: v.reasonOneBody },
    { title: v.reasonTwoTitle, body: v.reasonTwoBody },
    { title: v.reasonThreeTitle, body: v.reasonThreeBody },
  ].filter((r) => r.title);

  const photos = [
    { url: v.photoOneUrl, caption: v.photoOneCaption },
    { url: v.photoTwoUrl, caption: v.photoTwoCaption },
    { url: v.photoThreeUrl, caption: v.photoThreeCaption },
  ].filter((p) => p.url);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={4} onStepChange={setStep} accent="#ffb3ba">
        {step === 0 && (
          <IntroScreen
            tag={v.introTag || v.recipientName}
            headline={v.headline || v.landingTitle || "For you"}
            message={v.introMessage || v.landingSubtitle || ""}
            mediaUrl={v.introGifUrl || v.landingHeroImageUrl}
            primaryLabel={v.primaryButtonLabel || "Continue →"}
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && reasons.length > 0 && (
          <ReasonCards title={v.reasonsTitle || "Why you're special"} reasons={reasons} />
        )}
        {step === 2 && photos.length > 0 && (
          <PhotoGallery title={v.galleryTitle} photos={photos} />
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

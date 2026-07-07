"use client";

import { useState } from "react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import IntroScreen from "../shared/IntroScreen";
import PhotoGallery from "../shared/PhotoGallery";
import LetterScreen from "../shared/LetterScreen";
import PasswordGate from "../shared/PasswordGate";

export default function SweetBirthdayRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={3} onStepChange={setStep} accent="#ffd6a5">
        {step === 0 && (
          <IntroScreen
            tag={v.introHappyBdayLabel}
            headline={v.greeting}
            message={v.introMessage}
            mediaUrl={v.introGifUrl}
            primaryLabel={`For ${v.recipientName} →`}
            onPrimary={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <PhotoGallery
            title="Little memories"
            photos={[
              { url: v.photoOneUrl, caption: v.photoOneCaption },
              { url: v.photoTwoUrl, caption: v.photoTwoCaption },
              { url: v.photoThreeUrl, caption: v.photoThreeCaption },
            ]}
          />
        )}
        {step === 2 && (
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

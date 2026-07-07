"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import type { PageSnapshot } from "@/types";
import { flattenSnapshotValues } from "@/lib/snapshot";
import TemplateShell from "../shared/TemplateShell";
import PhotoGallery from "../shared/PhotoGallery";
import PasswordGate from "../shared/PasswordGate";

function WeddingCountdown({ isoDate }: { isoDate: string }) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const diff = new Date(isoDate).getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
  }, [isoDate]);

  return (
    <div className="rounded-2xl bg-white/80 px-6 py-4 text-center shadow-md">
      <p className="text-3xl font-semibold text-[#5c3d4a]">{days}</p>
      <p className="text-xs uppercase tracking-wider text-[#a08090]">days to go</p>
    </div>
  );
}

export default function WeddingSpecialRenderer({ snapshot }: { snapshot: PageSnapshot }) {
  const v = flattenSnapshotValues(snapshot.sections);
  const [step, setStep] = useState(0);

  const galleryPhotos = [
    v.galleryImage1Url,
    v.galleryImage2Url,
    v.galleryImage3Url,
    v.galleryImage4Url,
    v.galleryImage5Url,
    v.galleryImage6Url,
    v.galleryImage7Url,
  ]
    .filter(Boolean)
    .map((url) => ({ url: url! }));

  const chapters = [1, 2, 3, 4]
    .map((n) => ({
      title: v[`storyChapter${n}Title`],
      date: v[`storyChapter${n}Date`],
      desc: v[`storyChapter${n}Desc`],
      image: v[`storyChapter${n}ImageUrl`],
      quote: v[`storyChapter${n}Quote`],
    }))
    .filter((c) => c.title);

  const events = [1, 2, 3]
    .map((n) => ({
      title: v[`event${n}Title`],
      time: v[`event${n}Time`],
      venue: v[`event${n}Venue`],
      address: v[`event${n}Address`],
      dresscode: v[`event${n}Dresscode`],
    }))
    .filter((e) => e.title);

  return (
    <PasswordGate password={snapshot.password}>
      <TemplateShell currentStep={step} totalSteps={5} onStepChange={setStep} accent="#d4af37">
        {step === 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-end gap-4 overflow-hidden rounded-3xl py-8">
            {v.heroBackgroundUrl && (
              <div className="absolute inset-0">
                <Image src={v.heroBackgroundUrl} alt="" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            )}
            <div className="relative z-10 px-4 text-center text-white">
              <p className="text-sm tracking-widest uppercase opacity-90">{v.heroSubtitle}</p>
              <h1 className="mt-2 font-serif text-3xl">
                {v.coupleName1} & {v.coupleName2}
              </h1>
              <p className="mt-2 text-lg opacity-90">{v.weddingDate}</p>
              <p className="mt-1 text-sm opacity-75">{v.heroLocationText}</p>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-5 py-4">
            <h2 className="text-center font-serif text-xl text-[#5c3d4a]">{v.storyTitle}</h2>
            <div className="space-y-4">
              {chapters.map((ch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 rounded-2xl bg-white/80 p-3 shadow-sm"
                >
                  {ch.image && (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image src={ch.image} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase text-[#a08090]">{ch.date}</p>
                    <h3 className="font-medium text-[#5c3d4a]">{ch.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#7a5a65]">{ch.desc}</p>
                    {ch.quote && (
                      <p className="mt-1 text-xs italic text-[#b07a8a]">{ch.quote}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <PhotoGallery title="Our moments" photos={galleryPhotos} />
        )}
        {step === 3 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-4">
            <WeddingCountdown isoDate={v.weddingDateISO} />
            <div className="w-full space-y-3">
              {events.map((ev, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#f0e6d0] bg-white/80 p-4 shadow-sm"
                >
                  <h3 className="font-medium text-[#5c3d4a]">{ev.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#8b6a75]">
                    <Clock className="h-3.5 w-3.5" />
                    {ev.time}
                  </div>
                  <div className="mt-1 flex items-start gap-2 text-xs text-[#8b6a75]">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      {ev.venue}
                      {ev.address && ` · ${ev.address}`}
                    </span>
                  </div>
                  {ev.dresscode && (
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-[#b07a8a]">
                      {ev.dresscode}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
            <p className="max-w-sm text-sm leading-relaxed text-[#5c3d4a]">{v.footerMessage}</p>
            {v.faqEmail && (
              <a
                href={`mailto:${v.faqEmail}`}
                className="text-sm text-[#b07a8a] underline"
              >
                {v.faqEmail}
              </a>
            )}
          </div>
        )}
      </TemplateShell>
    </PasswordGate>
  );
}

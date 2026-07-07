"use client";

import type { ComponentType } from "react";
import type { PageSnapshot } from "@/types";
import BdayWish1Renderer from "./renderers/bday-wish-1";
import BirthdayWish2Renderer from "./renderers/birthday-wish-2";
import BdayWish3Renderer from "./renderers/bday-wish-3";
import BdayWish4Renderer from "./renderers/bday-wish-4";
import CuteApologyRenderer from "./renderers/thinking-style";
import CuteBirthdayRenderer from "./renderers/cute-birthday";
import CuteWebsiteV2Renderer from "./renderers/cute-website-v2";
import ApologySiteRenderer from "./renderers/thinking-style";
import SpecialApologyRenderer from "./renderers/thinking-style";
import SweetBirthdayRenderer from "./renderers/sweet-birthday";
import LoveNoteRenderer from "./renderers/love-note";
import FlowerNoteRenderer from "./renderers/flower-note";
import SorryPetalsRenderer from "./renderers/thinking-style";
import MothersDayRenderer from "./renderers/envelope-day";
import MothersDaySpecialV2Renderer from "./renderers/envelope-day";
import BrothersDayRenderer from "./renderers/envelope-day";
import FathersDayRenderer from "./renderers/envelope-day";
import BestfriendsDayRenderer from "./renderers/envelope-day";
import AnniversarySpecialRenderer from "./renderers/anniversary-special";
import WeddingSpecialRenderer from "./renderers/wedding-special";

type RendererProps = { snapshot: PageSnapshot };

const RENDERER_MAP: Record<string, ComponentType<RendererProps>> = {
  "bday-wish-1": BdayWish1Renderer,
  "birthday-wish-2": BirthdayWish2Renderer,
  "bday-wish-3": BdayWish3Renderer,
  "bday-wish-4": BdayWish4Renderer,
  "cute-apology-website": CuteApologyRenderer,
  "cute-birthday": CuteBirthdayRenderer,
  "cute-website-v2": CuteWebsiteV2Renderer,
  "apology-site": ApologySiteRenderer,
  "special-apology": SpecialApologyRenderer,
  "sweet-birthday": SweetBirthdayRenderer,
  "love-note": LoveNoteRenderer,
  "flower-note": FlowerNoteRenderer,
  "sorry-petals": SorryPetalsRenderer,
  "mothers-day": MothersDayRenderer,
  "mothers-day-special-v2": MothersDaySpecialV2Renderer,
  "brothers-day": BrothersDayRenderer,
  "fathers-day": FathersDayRenderer,
  "bestfriends-day": BestfriendsDayRenderer,
  "anniversary-special": AnniversarySpecialRenderer,
  "wedding-special": WeddingSpecialRenderer,
};

interface TemplateRendererProps {
  snapshot: PageSnapshot;
  preview?: boolean;
}

export default function TemplateRenderer({ snapshot, preview = false }: TemplateRendererProps) {
  const slug = snapshot.renderConfig?.renderer ?? snapshot.templateSlug;
  const Renderer = RENDERER_MAP[slug] ?? RENDERER_MAP[snapshot.templateSlug];

  if (!Renderer) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fff9f5] px-4">
        <p className="text-center text-[#8b5a6b]">
          Template &ldquo;{snapshot.templateSlug}&rdquo; is not available yet.
        </p>
      </div>
    );
  }

  const liveSnapshot = preview ? { ...snapshot, password: undefined } : snapshot;
  return <Renderer snapshot={liveSnapshot} />;
}

export { RENDERER_MAP };

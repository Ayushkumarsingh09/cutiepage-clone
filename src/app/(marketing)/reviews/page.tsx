import { Star } from "lucide-react";
import CTA from "@/components/marketing/CTA";
import { reviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews - Chayan",
  description: "Read what creators are saying about their gift pages.",
};

export default function ReviewsPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            Reviews
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Loved by thousands of creators
          </h1>
          <p className="mt-4 text-lg text-dim">
            Real stories from people who made someone&apos;s day with a personalised gift page.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet/10 px-5 py-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">
              4.9 average rating
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-2xl border border-violet/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-violet/10"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-violet/10 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-xs font-semibold text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.name}
                    </p>
                    {review.template && (
                      <p className="text-xs text-dim">{review.template}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate">{review.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
}

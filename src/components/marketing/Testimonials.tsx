import { Star } from "lucide-react";
import { reviews } from "@/lib/reviews";

export default function Testimonials() {
  const featured = reviews.slice(0, 4);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            Loved by thousands
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Real stories, real smiles
          </h2>
          <p className="mt-4 text-dim">
            See what creators are saying about their gift pages.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-2xl border border-violet/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-violet/10"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-violet/10 pt-4">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

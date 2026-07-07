import { Edit3, LayoutTemplate, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Pick a template",
    description:
      "Browse our collection of gorgeous gift page templates for birthdays, anniversaries, apologies, and more.",
  },
  {
    number: "02",
    icon: Edit3,
    title: "Make it personal",
    description:
      "Add photos, messages, music, and all the little details that make your gift uniquely yours.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Publish instantly",
    description:
      "Hit publish and share your page instantly. Get a beautiful link and QR code to send to someone special.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Three simple steps to magic
          </h2>
          <p className="mt-4 text-dim">
            No design skills needed. Create a heartfelt gift page in under a minute.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-px w-full bg-gradient-to-r from-violet/30 to-transparent md:block" />
              )}
              <div className="relative rounded-2xl border border-violet/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md hover:shadow-violet/10">
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-bold text-violet/20">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg text-white shadow-md shadow-violet/20">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

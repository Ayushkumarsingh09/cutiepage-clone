import { Heart, Sparkles, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Happy creators",
  },
  {
    icon: Heart,
    value: "1,00,000+",
    label: "Gift pages made",
  },
  {
    icon: Sparkles,
    value: "20+",
    label: "Beautiful templates",
  },
  {
    icon: Zap,
    value: "30 sec",
    label: "Average build time",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-violet/10 bg-white/60 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-dim">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

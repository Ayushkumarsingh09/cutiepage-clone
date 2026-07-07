import { getAllTemplates } from "@/lib/templates";

export default function Marquee() {
  const templates = getAllTemplates();
  const names = templates.map((t) => t.name);
  const doubled = [...names, ...names];

  return (
    <section className="overflow-hidden border-y border-violet/10 bg-violet/[0.03] py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="mx-6 inline-flex items-center gap-3 text-sm font-medium text-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

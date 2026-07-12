import { Check, X } from "lucide-react";

const features = [
  { name: "Beautiful templates", chayan: true, diy: false, cards: false },
  { name: "Personalised photos & messages", chayan: true, diy: true, cards: true },
  { name: "Music & animations", chayan: true, diy: false, cards: false },
  { name: "QR code included", chayan: true, diy: false, cards: false },
  { name: "Ready in 30 seconds", chayan: true, diy: false, cards: true },
  { name: "Lifetime validity", chayan: true, diy: true, cards: false },
  { name: "Editable anytime", chayan: true, diy: true, cards: false },
  { name: "Mobile-optimised", chayan: true, diy: false, cards: false },
];

function Cell({ value, highlight }: { value: boolean; highlight?: boolean }) {
  return (
    <td className="px-4 py-4 text-center">
      {value ? (
        <Check
          className={`mx-auto h-5 w-5 ${highlight ? "text-violet" : "text-green-500"}`}
        />
      ) : (
        <X className="mx-auto h-5 w-5 text-slate/50" />
      )}
    </td>
  );
}

export default function Comparison() {
  return (
    <section className="bg-white/60 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            Why Chayan?
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            More meaningful than a text
          </h2>
          <p className="mt-4 text-dim">
            See how gift pages compare to other ways of showing you care.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-violet/10 bg-white shadow-sm">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-violet/10">
                <th className="px-4 py-4 text-left font-medium text-dim">
                  Feature
                </th>
                <th className="px-4 py-4 text-center">
                  <span className="inline-flex rounded-full gradient-bg px-4 py-1.5 text-xs font-semibold text-white">
                    Chayan
                  </span>
                </th>
                <th className="px-4 py-4 text-center font-medium text-dim">
                  DIY website
                </th>
                <th className="px-4 py-4 text-center font-medium text-dim">
                  Greeting card
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={index % 2 === 0 ? "bg-violet/[0.02]" : ""}
                >
                  <td className="px-4 py-4 font-medium text-foreground">
                    {feature.name}
                  </td>
                  <Cell value={feature.chayan} highlight />
                  <Cell value={feature.diy} />
                  <Cell value={feature.cards} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import TemplateCard from "@/components/marketing/TemplateCard";
import { getAllTemplates } from "@/lib/templates";

export const metadata = {
  title: "Templates - Chayan",
  description: "Browse all gift page templates for birthdays, anniversaries, apologies, and more.",
};

export default function ProductsPage() {
  const templates = getAllTemplates();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            Templates
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Find the perfect gift page
          </h1>
          <p className="mt-4 text-lg text-dim">
            {templates.length} beautiful templates for every occasion. Pick one,
            personalise it, and share the love.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}

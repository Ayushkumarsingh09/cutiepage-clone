import registry from "@/data/templates-registry.json";
import type { TemplateDefinition } from "@/types";

const templates = registry as Record<string, TemplateDefinition>;

export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(templates);
}

export function getTemplate(slug: string): TemplateDefinition | undefined {
  return templates[slug];
}

export function getTemplateSlugs(): string[] {
  return Object.keys(templates);
}

export function buildDefaultSections(template: TemplateDefinition) {
  return template.sections.map((section) => ({
    id: section.id,
    values: section.fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = template.defaultValues[field.id] ?? "";
      return acc;
    }, {}),
  }));
}

import { nanoid } from "nanoid";
import type { PageSection, PageSnapshot } from "@/types";
import { getTemplate } from "./templates";

export function createSnapshotFromTemplate(slug: string): PageSnapshot | null {
  const template = getTemplate(slug);
  if (!template) return null;

  const now = new Date().toISOString();
  return {
    id: nanoid(10),
    templateSlug: slug,
    title: `${template.name} for someone special`,
    sections: template.sections.map((section) => ({
      id: section.id,
      values: section.fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.id] = template.defaultValues[field.id] ?? "";
        return acc;
      }, {}),
    })),
    createdAt: now,
    updatedAt: now,
    renderConfig: { renderer: slug },
  };
}

export function flattenSnapshotValues(sections: PageSection[]) {
  return sections.reduce<Record<string, string>>((acc, section) => {
    Object.assign(acc, section.values);
    return acc;
  }, {});
}

export function updateSectionValue(
  sections: PageSection[],
  sectionId: string,
  fieldId: string,
  value: string,
): PageSection[] {
  return sections.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          values: {
            ...section.values,
            [fieldId]: value,
          },
        }
      : section,
  );
}

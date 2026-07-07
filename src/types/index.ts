export type FieldType = "text" | "textarea" | "image" | "audio" | "date" | "select";

export interface TemplateField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  helperText?: string;
  options?: string[];
}

export interface TemplateSection {
  id: string;
  label: string;
  blockType: string;
  description: string;
  fields: TemplateField[];
}

export interface TemplateDefinition {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  liveComponent: string;
  sections: TemplateSection[];
  defaultValues: Record<string, string>;
}

export interface PageSection {
  id: string;
  values: Record<string, string>;
}

export interface PageSnapshot {
  id: string;
  templateSlug: string;
  title: string;
  password?: string;
  sections: PageSection[];
  createdAt: string;
  updatedAt: string;
  renderConfig?: {
    renderer?: string;
  };
}

export interface PublishedPageMeta {
  id: string;
  templateSlug: string;
  title: string;
  hasPassword: boolean;
  createdAt: string;
}

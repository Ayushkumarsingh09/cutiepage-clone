"use client";

import type { TemplateField } from "@/types";

interface EditorFieldProps {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
}

export function EditorField({ field, value, onChange }: EditorFieldProps) {
  const baseClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--color-violet)] focus:ring-2 focus:ring-violet-100";

  if (field.type === "textarea") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} resize-y`}
          required={field.required}
        />
        {field.helperText && (
          <p className="mt-1 text-xs text-[var(--color-dim)]">{field.helperText}</p>
        )}
      </div>
    );
  }

  if (field.type === "image" || field.type === "audio") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            field.type === "audio"
              ? "Paste MP3 URL or upload elsewhere and paste link"
              : "Paste image URL or upload elsewhere and paste link"
          }
          className={baseClass}
          required={field.required}
        />
        {value && field.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />
        )}
        {field.helperText && (
          <p className="mt-1 text-xs text-[var(--color-dim)]">{field.helperText}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
      <input
        type={field.type === "date" ? "date" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        required={field.required}
      />
      {field.helperText && (
        <p className="mt-1 text-xs text-[var(--color-dim)]">{field.helperText}</p>
      )}
    </div>
  );
}

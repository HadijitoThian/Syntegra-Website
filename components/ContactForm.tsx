"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(8),
  business: z.string().optional(),
  industry: z.string().min(1),
  challenge: z.string().min(20),
  products: z.array(z.string()).min(1),
});

type Qualification = {
  summary: string;
  fit_score: number;
  recommended_product: "social-media-builder" | "pos" | "synthia" | "custom";
  urgency: "low" | "medium" | "high";
  next_step_id: string;
};

const PRODUCT_LABEL: Record<Qualification["recommended_product"], string> = {
  "social-media-builder": "Syntegra Social Media Builder",
  pos: "Syntegra POS",
  synthia: "Synthia AI Assistant",
  custom: "custom solution",
};

const PRODUCT_OPTIONS = [
  { id: "social-media-builder", labelKey: "social" },
  { id: "pos", labelKey: "pos" },
  { id: "synthia", labelKey: "synthia" },
  { id: "unsure", labelKey: "unsure" },
] as const;

const INDUSTRIES = ["retail", "fnb", "education", "services", "ecommerce", "other"] as const;

export default function ContactForm() {
  const t = useTranslations("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ name: string; q: Qualification } | null>(null);
  const [products, setProducts] = useState<string[]>([]);

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="font-display text-xl font-bold text-brand-ink">
          {t("successTitle", { name: success.name })}
        </h3>
        <p
          className="mt-3 text-slate-600"
          dangerouslySetInnerHTML={{
            __html: t.raw("successBody").replace("{product}", PRODUCT_LABEL[success.q.recommended_product]),
          }}
        />
        <p className="mt-3 text-sm text-slate-500 italic">{success.q.next_step_id}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      business: String(fd.get("business") ?? ""),
      industry: String(fd.get("industry") ?? ""),
      challenge: String(fd.get("challenge") ?? ""),
      products,
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      if (issue.path[0] === "challenge") setError(t("errorMinChars"));
      else if (issue.path[0] === "email") setError(t("errorEmail"));
      else setError(t("errorRequired"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("api");
      const json = (await res.json()) as { qualification: Qualification };
      if (process.env.NODE_ENV !== "production") {
        console.log("[lead-qualification]", json.qualification);
      }
      setSuccess({ name: parsed.data.name, q: json.qualification });
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label={t("name")} name="name" required />
        <Field label={t("email")} name="email" type="email" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label={t("whatsapp")} name="whatsapp" required />
        <Field label={t("business")} name="business" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t("industry")}
        </label>
        <select
          name="industry"
          required
          defaultValue=""
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal"
        >
          <option value="" disabled>
            {t("industryPlaceholder")}
          </option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {t(`industries.${i}`)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t("challenge")}
        </label>
        <textarea
          name="challenge"
          required
          rows={3}
          minLength={20}
          placeholder={t("challengePlaceholder")}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          {t("products")}
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {PRODUCT_OPTIONS.map((p) => (
            <label
              key={p.id}
              className="flex items-center gap-2 text-sm cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2"
            >
              <input
                type="checkbox"
                value={p.id}
                checked={products.includes(p.id)}
                onChange={(e) => {
                  setProducts((prev) =>
                    e.target.checked ? [...prev, p.id] : prev.filter((x) => x !== p.id)
                  );
                }}
                className="rounded text-brand-royal focus:ring-brand-royal/30"
              />
              <span>{t(`productOptions.${p.labelKey}`)}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-gradient text-white font-semibold py-3 rounded-xl shadow-soft hover:opacity-95 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal"
      />
    </div>
  );
}

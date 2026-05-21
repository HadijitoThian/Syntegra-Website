"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "id" ? "en" : "id";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="text-xs font-semibold tracking-wider text-slate-600 hover:text-brand-ink border border-slate-200 hover:border-slate-300 rounded-lg px-2.5 py-1.5 transition"
      aria-label="Switch language"
    >
      {locale === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
    </button>
  );
}

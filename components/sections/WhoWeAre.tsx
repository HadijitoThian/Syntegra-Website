import Image from "next/image";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/images";

export default function WhoWeAre() {
  const t = useTranslations("whoWeAre");
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-royal mb-3">
            {t("kicker")}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">{t("body")}</p>
        </div>
        <div className="relative h-80 lg:h-96">
          <div className="absolute -inset-4 bg-brand-gradient rounded-3xl opacity-20 blur-2xl" />
          <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={IMAGES.whoWeAre}
              alt="Syntegra team in Jakarta"
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-brand-ink">Made in Jakarta 🇮🇩</span>
          </div>
        </div>
      </div>
    </section>
  );
}

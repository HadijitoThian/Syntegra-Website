import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function TrustStrip() {
  const t = useTranslations("trustStrip");
  return (
    <section className="bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/40 via-transparent to-sky-50/40 pointer-events-none" />
      <div className="container-x py-10 relative">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">
          {t("tagline")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-display text-3xl lg:text-4xl font-bold text-brand-gradient">
              <AnimatedCounter end={2500} suffix="+" />
            </div>
            <div className="text-xs text-slate-500 mt-1">UMKM aktif</div>
          </div>
          <div>
            <div className="font-display text-3xl lg:text-4xl font-bold text-brand-gradient">
              &lt;<AnimatedCounter end={20} /> mnt
            </div>
            <div className="text-xs text-slate-500 mt-1">Setup time</div>
          </div>
          <div>
            <div className="font-display text-3xl lg:text-4xl font-bold text-brand-gradient">
              <AnimatedCounter end={4.9} decimals={1} />/5
            </div>
            <div className="text-xs text-slate-500 mt-1">Rating</div>
          </div>
          <div>
            <div className="font-display text-3xl lg:text-4xl font-bold text-brand-gradient">
              <AnimatedCounter end={3} />
            </div>
            <div className="text-xs text-slate-500 mt-1">Live products</div>
          </div>
        </div>
      </div>
    </section>
  );
}

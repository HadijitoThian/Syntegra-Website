"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import GridBackground from "@/components/GridBackground";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-br from-brand-navy via-brand-royal to-brand-navy"
      />
      <GridBackground />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-sky/20 blur-3xl -z-10"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-brand-amber/10 blur-3xl -z-10"
      />
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 shadow-sm"
          >
            <Sparkles size={14} className="text-brand-amber" />
            <span className="text-xs font-semibold text-white/90">AI Solutions · Made for Indonesian Businesses</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white"
          >
            {t("headlineStart")}
            <span className="bg-gradient-to-r from-brand-sky to-brand-amber bg-clip-text text-transparent">{t("headlineHighlight")}</span>
            {t("headlineEnd")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg text-blue-100 max-w-xl"
          >
            {t("sub")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/produk"
              className="bg-white text-brand-navy font-semibold px-6 py-3.5 rounded-xl shadow-soft hover:opacity-95 transition flex items-center gap-2"
            >
              {t("ctaPrimary")} <ArrowRight size={18} />
            </Link>
            <Link
              href="/kontak"
              className="bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/20 transition"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[460px] lg:h-[540px] hidden lg:block"
        >
          <div className="absolute -inset-6 bg-brand-gradient rounded-[3rem] opacity-15 blur-3xl" />
          <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={IMAGES.hero}
              alt="Indonesian entrepreneur using Syntegra"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <div>
              <div className="text-xs text-slate-500">Built with</div>
              <div className="text-sm font-bold text-brand-ink">AI Solutions</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-brand-ink">Live in Jakarta</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

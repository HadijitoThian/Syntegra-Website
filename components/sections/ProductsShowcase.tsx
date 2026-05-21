"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";
import TiltCard from "@/components/TiltCard";

type ProductKey = "socialBuilder" | "pos" | "synthia";

const PRODUCTS: {
  key: ProductKey;
  accent: string;
  href: keyof typeof PRODUCT_LINKS;
  image: string;
}[] = [
  { key: "socialBuilder", accent: "#2563eb", href: "social", image: IMAGES.productSocial },
  { key: "pos", accent: "#0d9488", href: "pos", image: IMAGES.productPos },
  { key: "synthia", accent: "#0f172a", href: "synthia", image: IMAGES.productSynthia },
];

export default function ProductsShowcase() {
  const t = useTranslations("products");

  return (
    <section id="produk" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-royal mb-3">
            {t("kicker")}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <motion.a
              key={p.key}
              href={PRODUCT_LINKS[p.href]}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-royal/30 rounded-3xl"
              aria-label={`${t(`${p.key}.name`)} — ${t("visit")}`}
            >
              <TiltCard className="group relative bg-white rounded-3xl shadow-soft hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-100 h-full cursor-pointer">
                <div
                  className="h-2 w-full"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, #38bdf8)` }}
                />
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={t(`${p.key}.name`)}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-20"
                    style={{ background: `linear-gradient(135deg, ${p.accent}, transparent)` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-brand-ink" />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-brand-royal transition-colors">
                    {t(`${p.key}.name`)}
                  </h3>
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    {t(`${p.key}.tagline`)}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {t(`${p.key}.desc`)}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-xl shadow-soft transition-all group-hover:gap-2.5"
                    style={{ background: `linear-gradient(135deg, ${p.accent}, #38bdf8)` }}
                  >
                    {t("visit")} <ExternalLink size={14} />
                  </span>
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

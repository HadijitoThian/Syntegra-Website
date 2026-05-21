"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PRODUCT_LINKS } from "@/lib/utils";
import { IMAGES } from "@/lib/images";
import TiltCard from "@/components/TiltCard";

type ProductKey = "socialBuilder" | "pos" | "synthia";

const PRODUCTS: {
  key: ProductKey;
  slug: string;
  accent: string;
  href: keyof typeof PRODUCT_LINKS;
  image: string;
}[] = [
  { key: "socialBuilder", slug: "social-media-builder", accent: "#2563eb", href: "social", image: IMAGES.productSocial },
  { key: "pos", slug: "pos", accent: "#0d9488", href: "pos", image: IMAGES.productPos },
  { key: "synthia", slug: "synthia", accent: "#0f172a", href: "synthia", image: IMAGES.productSynthia },
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
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="group relative bg-white rounded-3xl shadow-soft hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-100 h-full">
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
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-bold mb-2">
                  {t(`${p.key}.name`)}
                </h3>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  {t(`${p.key}.tagline`)}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {t(`${p.key}.desc`)}
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <Link
                    href={`/produk/${p.slug}` as never}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-royal hover:gap-2.5 transition-all"
                  >
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                  <a
                    href={PRODUCT_LINKS[p.href]}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-brand-ink transition-colors"
                  >
                    {t("visit")} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, AlertCircle } from "lucide-react";
import { IMAGES } from "@/lib/images";

const VIGNETTE_IMAGES = [
  IMAGES.painContent,
  IMAGES.painPos,
  IMAGES.painAdmin,
  IMAGES.painForeignTools,
];

export default function WhatWeSolve() {
  const t = useTranslations("whatWeSolve");
  const items = t.raw("items") as { pain: string; solution: string }[];

  return (
    <section className="py-24">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-48 h-44 md:h-auto shrink-0 overflow-hidden">
                <Image
                  src={VIGNETTE_IMAGES[i]}
                  alt={item.pain}
                  fill
                  sizes="(min-width: 768px) 200px, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle size={16} className="text-brand-amber mt-1 shrink-0" />
                  <p className="text-sm font-medium text-slate-600">{item.pain}</p>
                </div>
                <div className="flex items-start gap-2 pl-1">
                  <ArrowRight size={16} className="text-brand-royal mt-1 shrink-0" />
                  <p className="text-base text-brand-ink font-semibold leading-snug">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

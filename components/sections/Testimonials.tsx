"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Serius, dalam 20 menit landing page saya sudah jadi dan langsung bisa dipakai untuk iklan. Dulu bayar jutaan ke agency!",
    name: "Rina Susanti",
    role: "Warung Makan Bu Rina · Jakarta",
    initials: "RS",
    accent: "#2563eb",
  },
  {
    quote:
      "Fitur B2B-nya keren banget. Sekarang saya punya halaman khusus untuk cari reseller, hasilnya luar biasa!",
    name: "Budi Hartono",
    role: "Toko Fashion Budi · Surabaya",
    initials: "BH",
    accent: "#0d9488",
  },
  {
    quote:
      "Logo yang dihasilkan AI sangat profesional. Klien saya kira saya pakai jasa desainer mahal!",
    name: "Dewi Anggraini",
    role: "Klinik Kecantikan Dewi · Bandung",
    initials: "DA",
    accent: "#1e3a8a",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];
  const go = (dir: 1 | -1) =>
    setI((v) => (v + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      className="py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x max-w-4xl">
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-soft p-10 lg:p-14 overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10 blur-3xl"
            style={{ background: t.accent }}
          />
          <Quote className="w-10 h-10 text-brand-royal/20 mb-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className="fill-brand-amber text-brand-amber" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium text-brand-ink leading-relaxed">
                “{t.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full text-white font-bold flex items-center justify-center shadow-soft"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, #38bdf8)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-brand-ink">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === i ? "bg-brand-royal w-8" : "bg-slate-200 w-2"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

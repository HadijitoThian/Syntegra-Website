"use client";

const PARTNERS = [
  "Google Cloud",
  "Halo Syntia",
  "Midtrans",
  "Railway",
  "Postgres",
  "WhatsApp Business",
  "Shopee",
  "Tokopedia",
  "GoPay",
];

export default function Marquee() {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section className="py-12 bg-slate-50/60 border-y border-slate-100 overflow-hidden">
      <div className="container-x">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">
          Built with industry-leading tools
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {items.map((p, i) => (
            <span
              key={i}
              className="font-display text-2xl font-bold text-slate-400/70 hover:text-brand-royal transition-colors cursor-default"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

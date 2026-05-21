import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";

export type ProductDetailProps = {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  externalUrl: string;
  image?: string;
  features: { title: string; desc: string }[];
  ctaLabel: string;
  backLabel: string;
};

export default function ProductDetail(p: ProductDetailProps) {
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="container-x max-w-4xl">
          <Link
            href="/produk"
            className="text-sm text-slate-500 hover:text-brand-ink mb-6 inline-block"
          >
            ← {p.backLabel}
          </Link>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5 text-white"
            style={{ background: `linear-gradient(90deg, ${p.accent}, #38bdf8)` }}
          >
            Syntegra Product
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            {p.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-slate-700">{p.tagline}</p>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl">{p.description}</p>
          <a
            href={p.externalUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3 rounded-xl shadow-soft hover:opacity-95"
          >
            {p.ctaLabel} <ExternalLink size={16} />
          </a>
        </div>
      </section>
      {p.image && (
        <section className="pb-8">
          <div className="container-x max-w-5xl">
            <div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={p.image}
                alt={p.name}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-15"
                style={{ background: `linear-gradient(135deg, ${p.accent}, transparent)` }}
              />
            </div>
          </div>
        </section>
      )}
      <section className="py-16">
        <div className="container-x max-w-5xl grid md:grid-cols-2 gap-6">
          {p.features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-soft"
            >
              <div
                className="w-10 h-10 rounded-xl mb-4"
                style={{ background: `linear-gradient(135deg, ${p.accent}, #38bdf8)` }}
              />
              <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

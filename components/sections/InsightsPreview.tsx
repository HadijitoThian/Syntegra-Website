import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";

export default function InsightsPreview() {
  const t = useTranslations("insightsPreview");
  const locale = useLocale();
  const posts = getAllPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl">{t("subtitle")}</p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-royal hover:gap-2.5 transition-all"
          >
            {t("viewAll")} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}` as never}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.cover || IMAGES.blogAi}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-slate-500 mb-2">{post.date}</div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-brand-royal transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-royal">
                  {t("readMore")} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

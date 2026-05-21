import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";
import { IMAGES } from "@/lib/images";
import { ArrowRight } from "lucide-react";

export default function InsightsIndex() {
  const t = useTranslations("pages.insights");
  const tIp = useTranslations("insightsPreview");
  const locale = useLocale();
  const posts = getAllPosts(locale);

  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-brand-gradient">{t("title")}</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}` as never}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.cover || IMAGES.blogAi}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-500 mb-2">{post.date}</div>
                  <h2 className="font-display text-xl font-bold mb-2 group-hover:text-brand-royal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-royal">
                    {tIp("readMore")} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

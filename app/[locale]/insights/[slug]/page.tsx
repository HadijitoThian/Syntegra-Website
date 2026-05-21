import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { IMAGES } from "@/lib/images";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <Link
          href="/insights"
          className="text-sm text-slate-500 hover:text-brand-ink mb-6 inline-block"
        >
          ← Insights
        </Link>
        <header className="mb-10">
          <div className="text-sm text-slate-500 mb-3">{post.date}</div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
          )}
        </header>
        <div className="relative h-64 lg:h-80 rounded-3xl mb-10 overflow-hidden shadow-soft">
          <Image
            src={post.cover || IMAGES.blogAi}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-royal">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}

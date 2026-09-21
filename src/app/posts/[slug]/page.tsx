import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Markdown } from "@/components/markdown";
import { site } from "@/content/site";
import { getPublishedPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url }]
        : undefined,
      siteName: site.name,
    },
    twitter: {
      card: post.cover_image_url ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = post.published_at ?? post.created_at;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="animate-fade-in font-mono text-xs text-ink-muted transition-colors hover:text-accent"
      >
        ← Voltar ao início
      </Link>

      <header className="animate-fade-up mt-8 mb-10">
        <time className="font-mono text-xs text-ink-muted">
          {format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </time>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-muted">{post.excerpt}</p>
      </header>

      {post.cover_image_url ? (
        <div className="media-frame cover-reveal mb-10 aspect-[16/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image_url} alt="" />
        </div>
      ) : null}

      <div className="animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <Markdown content={post.body} />
      </div>
    </article>
  );
}

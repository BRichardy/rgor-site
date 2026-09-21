import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Post } from "@/lib/types";

function formatDate(value: string | null) {
  if (!value) return "";
  return format(new Date(value), "d MMM yyyy", { locale: ptBR });
}

export function PostFeed({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <p className="text-ink-muted">
        Nenhum post ainda. Volte em breve — ou publique o primeiro pelo admin.
      </p>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col gap-10">
      <article className="feed-item">
        <Link href={`/posts/${featured.slug}`} className="group block">
          {featured.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured.cover_image_url}
              alt=""
              className="mb-5 aspect-[21/9] w-full rounded-lg object-cover"
            />
          ) : null}
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            Destaque
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent sm:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-2 font-mono text-xs text-ink-muted">
            {formatDate(featured.published_at ?? featured.created_at)}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {featured.excerpt}
          </p>
        </Link>
      </article>

      {rest.length > 0 ? (
        <div className="flex flex-col divide-y divide-line">
          {rest.map((post) => (
            <article key={post.id} className="feed-item py-7 first:pt-0">
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-ink-muted">{post.excerpt}</p>
                  </div>
                  <time className="shrink-0 font-mono text-xs text-ink-muted">
                    {formatDate(post.published_at ?? post.created_at)}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

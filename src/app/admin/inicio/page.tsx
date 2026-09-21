import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAllPostsAdmin } from "@/lib/posts";

export default async function AdminInicioPage() {
  const posts = (await getAllPostsAdmin()).filter((p) => p.published);

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          Pré-visualização · feed público
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Início
        </h1>
        <p className="mt-2 text-ink-muted">
          Como os visitantes veem as notícias publicadas — sem sair do admin.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-muted">
          Nenhum post publicado.{" "}
          <Link href="/admin/posts/new" className="text-accent underline">
            Criar um
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-line">
          {posts.map((post, index) => (
            <article key={post.id} className="py-8 first:pt-0">
              <Link
                href={`/admin/posts/${post.id}/view`}
                className="group block"
              >
                {index === 0 && post.cover_image_url ? (
                  <div className="media-frame mb-5 aspect-[21/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.cover_image_url} alt="" />
                  </div>
                ) : null}
                {index === 0 ? (
                  <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                    Destaque
                  </p>
                ) : null}
                <h2
                  className={
                    index === 0
                      ? "title-link font-display text-3xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-4xl"
                      : "title-link font-display text-xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-2xl"
                  }
                >
                  {post.title}
                </h2>
                <p className="mt-2 font-mono text-xs text-ink-muted">
                  {format(
                    new Date(post.published_at ?? post.created_at),
                    "d MMM yyyy",
                    { locale: ptBR },
                  )}
                </p>
                <p className="mt-3 text-ink-muted">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

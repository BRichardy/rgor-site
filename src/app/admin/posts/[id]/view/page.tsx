import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PostBody } from "@/components/post-body";
import { getPostByIdAdmin } from "@/lib/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostViewPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);

  if (!post) {
    notFound();
  }

  const date = post.published_at ?? post.created_at;

  return (
    <article>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/posts"
          className="text-sm text-ink-muted hover:text-accent"
        >
          ← Todos os posts
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/admin/posts/${post.id}`}
            className="text-accent hover:underline"
          >
            Editar
          </Link>
          {post.published ? (
            <Link
              href={`/posts/${post.slug}`}
              className="text-ink-muted hover:text-accent"
              title="Abre a URL pública (sai do admin)"
            >
              URL pública
            </Link>
          ) : (
            <span className="font-mono text-xs text-ink-muted">Rascunho</span>
          )}
        </div>
      </div>

      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        Pré-visualização · dentro do admin
      </p>

      <header className="mb-8">
        <time className="font-mono text-xs text-ink-muted">
          {format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </time>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-5 max-w-2xl text-lg text-ink-muted">{post.excerpt}</p>
        ) : null}
      </header>

      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          className="mb-10 aspect-[16/9] w-full rounded-lg object-cover"
        />
      ) : null}

      <PostBody body={post.body} />
    </article>
  );
}

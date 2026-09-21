import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { redirect } from "next/navigation";
import { deletePostAction } from "@/app/admin/actions";
import { getAllPostsAdmin } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default async function AdminPostsPage() {
  if (!hasSupabaseEnv()) {
    redirect("/admin");
  }

  let posts;
  try {
    posts = await getAllPostsAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha ao carregar posts";
    return (
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Posts
        </h1>
        <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {message}. Confira se a migration SQL rodou no Supabase.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Posts
        </h1>
        <Link
          href="/admin/posts/new"
          className="bg-ink px-4 py-2 text-sm font-medium text-bg-elevated transition-colors hover:bg-accent"
        >
          Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-muted">
          Nenhum post ainda.{" "}
          <Link href="/admin/posts/new" className="text-accent underline">
            Criar o primeiro
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="font-medium text-ink hover:text-accent"
                >
                  {post.title}
                </Link>
                <p className="mt-1 font-mono text-xs text-ink-muted">
                  {post.published ? "Publicado" : "Rascunho"} ·{" "}
                  {format(new Date(post.updated_at), "d MMM yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {post.published ? (
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-ink-muted hover:text-accent"
                  >
                    Ver
                  </Link>
                ) : null}
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-accent hover:underline"
                >
                  Editar
                </Link>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="text-red-700 hover:underline">
                    Excluir
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

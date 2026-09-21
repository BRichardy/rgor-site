import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deletePostAction } from "@/app/admin/actions";
import { PostEditor } from "@/components/post-editor";
import { getPostByIdAdmin } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
};

export default async function EditPostPage({ params, searchParams }: Props) {
  if (!hasSupabaseEnv()) {
    redirect("/admin");
  }

  const { id } = await params;
  const { error, saved } = await searchParams;
  const post = await getPostByIdAdmin(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          href="/admin/posts"
          className="text-sm text-ink-muted hover:text-accent"
        >
          ← Todos os posts
        </Link>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={post.id} />
          <button type="submit" className="text-sm text-red-700 hover:underline">
            Excluir
          </button>
        </form>
      </div>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight">
        Editar post
      </h1>
      <PostEditor post={post} error={error} saved={saved === "1"} />
    </div>
  );
}

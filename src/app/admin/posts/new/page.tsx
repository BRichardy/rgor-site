import Link from "next/link";
import { redirect } from "next/navigation";
import { PostEditor } from "@/components/post-editor";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewPostPage({ searchParams }: Props) {
  if (!hasSupabaseEnv()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <div>
      <Link
        href="/admin/posts"
        className="text-sm text-ink-muted hover:text-accent"
      >
        ← Todos os posts
      </Link>
      <h1 className="mt-4 mb-8 font-display text-3xl font-semibold tracking-tight">
        Novo post
      </h1>
      <PostEditor error={error} />
    </div>
  );
}

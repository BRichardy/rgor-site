import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | null = null;

  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email ?? null;
    } catch {
      email = null;
    }
  }

  return (
    <div className="min-h-full bg-bg">
      <header className="border-b border-line bg-bg-elevated/80">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts"
              className="font-display text-xl font-semibold text-ink"
            >
              Admin
            </Link>
            <Link
              href="/"
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              Ver site
            </Link>
          </div>
          {email ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden font-mono text-xs text-ink-muted sm:inline">
                {email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Sair
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}

import { hasSupabaseEnv } from "@/lib/supabase/env";
import { isLocalAdminAuthenticated } from "@/lib/local-auth";
import { loginAction } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;
  const useCloud = hasSupabaseEnv();

  if (!useCloud && (await isLocalAdminAuthenticated())) {
    // middleware should redirect; keep page usable if cookie arrives mid-render
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Entrar
      </h1>
      <p className="mt-2 text-ink-muted">
        Acesso admin para publicar notícias. Só você entra aqui.
      </p>

      {!useCloud ? (
        <div className="mt-6 border border-line bg-bg-elevated p-4 text-sm leading-relaxed text-ink-muted">
          <p className="font-medium text-ink">Modo local</p>
          <p className="mt-1">
            Sem Supabase por enquanto. Use a senha do arquivo{" "}
            <code className="font-mono text-accent">.env.local</code> (
            <code className="font-mono text-accent">ADMIN_PASSWORD</code>
            ). Posts ficam salvos em{" "}
            <code className="font-mono text-accent">data/posts.json</code>.
          </p>
        </div>
      ) : null}

      <form action={loginAction} className="mt-8 flex flex-col gap-4">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {error ? (
          <p className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger">
            {error}
          </p>
        ) : null}
        {useCloud ? (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">E-mail</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none focus:border-accent"
            />
          </label>
        ) : null}
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Senha</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          className="btn-primary mt-2 bg-accent px-4 py-2.5 text-sm font-medium text-ink hover:bg-accent/85"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

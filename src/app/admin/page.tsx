import { hasSupabaseEnv } from "@/lib/supabase/env";
import { loginAction } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;
  const configured = hasSupabaseEnv();

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Entrar
      </h1>
      <p className="mt-2 text-ink-muted">
        Acesso admin para publicar posts. Só a sua conta entra aqui.
      </p>

      {!configured ? (
        <div className="mt-8 border border-line bg-bg-elevated p-5 text-sm leading-relaxed text-ink-muted">
          <p className="font-medium text-ink">Supabase ainda não configurado.</p>
          <p className="mt-2">
            Copie <code className="font-mono text-accent">.env.example</code> para{" "}
            <code className="font-mono text-accent">.env.local</code>, adicione a
            URL e a anon key do projeto, rode a migration SQL e crie um usuário no
            Auth do Supabase.
          </p>
        </div>
      ) : (
        <form action={loginAction} className="mt-8 flex flex-col gap-4">
          {next ? <input type="hidden" name="next" value={next} /> : null}
          {error ? (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
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
            className="mt-2 bg-ink px-4 py-2.5 text-sm font-medium text-bg-elevated transition-colors hover:bg-accent"
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}

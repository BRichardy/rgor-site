import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-5 py-24 sm:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Não encontrado
      </h1>
      <p className="mt-3 text-ink-muted">Essa página não existe.</p>
      <Link href="/" className="mt-8 text-accent underline underline-offset-4">
        Voltar ao início
      </Link>
    </div>
  );
}

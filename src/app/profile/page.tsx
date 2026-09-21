import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Perfil",
  description: `${profile.name} — ${profile.role}. Portfólio, projetos e trajetória.`,
  openGraph: {
    title: `${profile.shortName} · Portfólio`,
    description: profile.pitch,
  },
};

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Quem sou */}
      <section className="animate-fade-up mb-16 max-w-2xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Portfólio
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-accent">{profile.role}</p>
        <p className="mt-2 font-mono text-xs text-ink-muted">
          {profile.location} · {profile.availability}
        </p>
        <p className="mt-6 text-xl leading-relaxed text-ink-muted">
          {profile.pitch}
        </p>
        <ul className="mt-6 flex flex-col gap-2">
          {profile.focus.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-ink-muted before:mt-2 before:block before:size-1.5 before:shrink-0 before:rounded-full before:bg-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Sobre — narrativa, não CV */}
      <section
        className="animate-fade-up mb-16"
        style={{ animationDelay: "0.05s" }}
      >
        <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight">
          Sobre mim
        </h2>
        <div className="flex max-w-2xl flex-col gap-4 leading-relaxed text-ink-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Projetos — coração do portfólio */}
      <section className="mb-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Projetos
          </h2>
          <p className="mt-2 text-ink-muted">
            O que construí e coloco em produção — o centro deste portfólio.
          </p>
        </div>

        <div className="flex flex-col">
          {profile.projects.map((project) => (
            <article
              key={project.name}
              className="border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {project.href ? (
                        <Link
                          href={project.href}
                          className="transition-colors hover:text-accent"
                        >
                          {project.name}
                        </Link>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {project.status ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {project.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    {project.role}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-ink-muted">
                  {project.period}
                </span>
              </div>

              <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
                {project.summary}
              </p>

              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => {
                  const emphasize = tech.toLowerCase().includes("python");
                  return (
                    <li key={tech}>
                      <span
                        className={
                          emphasize
                            ? "rounded-md bg-accent-soft px-2 py-1 font-mono text-[11px] tracking-wide text-accent"
                            : "rounded-md border border-line px-2 py-1 font-mono text-[11px] tracking-wide text-ink-muted"
                        }
                      >
                        {tech}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Stack — ferramentas, não lista de currículo */}
      <section className="mb-16">
        <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">
          Stack
        </h2>
        <p className="mb-6 max-w-2xl text-ink-muted">
          Ferramentas que uso de verdade — com Python no centro do que mais gosto
          de construir.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(profile.stack).map(([group, items]) => (
            <div key={group}>
              <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                {group}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trajetória — contexto curto, não CV */}
      <section className="mb-16">
        <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">
          Trajetória
        </h2>
        <p className="mb-6 max-w-2xl text-ink-muted">
          Contexto profissional em poucas linhas — o detalhe fica nos projetos.
        </p>
        <ol className="flex flex-col border-l border-line pl-5">
          {profile.journey.map((item) => (
            <li key={`${item.org}-${item.period}`} className="relative pb-8 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[1.41rem] top-1.5 size-2 rounded-full bg-accent"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-medium text-ink">
                  {item.title}
                  <span className="font-normal text-ink-muted"> · {item.org}</span>
                </h3>
                <span className="font-mono text-xs text-ink-muted">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{item.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Formação + contato */}
      <section className="mb-16">
        <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight">
          Formação
        </h2>
        <ul className="flex flex-col gap-4">
          {profile.education.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">
          Contato
        </h2>
        <p className="mb-5 max-w-2xl text-ink-muted">
          Vamos conversar sobre oportunidades, produtos ou automações.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {profile.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

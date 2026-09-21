"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin/inicio", label: "Início", match: (p: string) => p.startsWith("/admin/inicio") },
  {
    href: "/admin/posts",
    label: "Posts",
    match: (p: string) => p.startsWith("/admin/posts"),
  },
  {
    href: "/admin/profile",
    label: "Perfil",
    match: (p: string) => p.startsWith("/admin/profile"),
  },
];

export function AdminHeader({ label }: { label: string | null }) {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return (
      <header className="border-b border-line bg-bg-elevated/80">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href="/admin"
            className="font-display text-xl font-semibold text-ink"
          >
            Admin
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-line bg-bg-elevated/80">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin/posts"
            className="font-display text-xl font-semibold text-ink"
          >
            Admin
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {links.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    active
                      ? "rounded-md bg-accent-soft px-3 py-1.5 text-accent"
                      : "rounded-md px-3 py-1.5 text-ink-muted transition-colors hover:bg-line/60 hover:text-ink"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="hidden text-ink-muted transition-colors hover:text-accent sm:inline"
            title="Sai do admin e abre o site público"
          >
            Site público
          </Link>
          {label ? (
            <>
              <span className="hidden font-mono text-xs text-ink-muted md:inline">
                {label}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Sair
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

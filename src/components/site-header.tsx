"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/", label: "Início" },
  { href: "/profile", label: "Perfil" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isProfile = pathname.startsWith("/profile");

  return (
    <header
      className={`site-header animate-fade-in sticky top-0 z-40 border-b border-line/90 bg-bg-elevated/80 backdrop-blur-xl ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        {isProfile ? (
          <Link href="/profile" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="brand-mark flex size-8 items-center justify-center rounded-md border border-line bg-accent-soft font-mono text-xs font-semibold text-accent"
            >
              {"</>"}
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                {site.name}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                tech · portfolio
              </span>
            </span>
          </Link>
        ) : (
          <Link href="/" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="brand-mark flex size-8 items-center justify-center rounded-md border border-line bg-accent-soft font-mono text-xs font-semibold text-accent"
            >
              ◈
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                Notícias
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                software · dados · tools
              </span>
            </span>
          </Link>
        )}
        <nav className="flex items-center gap-1 text-sm font-medium">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/posts")
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "rounded-md bg-accent-soft px-3 py-1.5 text-accent"
                    : "rounded-md px-3 py-1.5 text-ink-muted hover:bg-line/60 hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

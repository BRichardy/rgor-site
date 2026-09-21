"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-line/90">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-5 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs tracking-wide">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}

import Link from "next/link";

import { api } from "@/lib/api";

export async function Footer() {
  const site = await api.site();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="container py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Index
          </div>
          <p className="serif-display text-2xl mt-3 leading-tight">
            {site.full_name}
            <br />
            <span className="text-muted">— {site.role}.</span>
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Elsewhere
          </div>
          <ul className="mt-3 space-y-2">
            {site.social_links.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-ink hover:text-accent transition-colors"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle w-20">
                    {link.platform_label}
                  </span>
                  <span className="text-sm">{link.handle || link.url}</span>
                  <span aria-hidden className="opacity-0 group-hover:opacity-100 transition">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Colophon
          </div>
          <p className="mt-3 text-sm text-muted max-w-prose">
            Built with Next.js, Tailwind, and Framer Motion. Backed by Django and
            PostgreSQL. Hand-tuned typography, monochrome with a single muted accent.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            © {year} — Parsa Belab.
            <Link href="/resume" className="ml-3 text-ink hover:text-accent">
              Résumé ↗
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

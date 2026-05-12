import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Site } from "@/lib/types";

export function Contact({ site }: { site: Site }) {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title={
        <>
          Have something worth building? <br />
          <span className="text-muted">Let's talk.</span>
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-12 items-start">
        <Reveal className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted max-w-prose text-balance">
            I take on a small number of freelance engagements per quarter and
            am open to remote backend roles where the team cares about the
            systems they ship. The best way to reach me is email.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-flex items-center gap-3 font-serif italic text-3xl md:text-5xl text-ink hover:text-accent transition-colors"
          >
            {site.email}
            <span aria-hidden className="text-2xl">↗</span>
          </a>

          <div className="mt-10 flex items-center gap-4">
            {site.resume_url && (
              <a
                href={site.resume_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-ink text-bg px-5 font-mono text-[11px] uppercase tracking-[0.18em] hover:opacity-90 transition"
              >
                Download résumé (PDF)
              </a>
            )}
            <Link
              href="/resume"
              className="inline-flex h-11 items-center rounded-full border border-border px-5 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-ink/40 transition"
            >
              Read résumé ↗
            </Link>
          </div>
        </Reveal>

        <aside className="md:col-span-4 md:col-start-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Or find me on
          </div>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {site.social_links
              .filter((l) => l.platform !== "email")
              .map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                        {link.platform_label}
                      </div>
                      <div className="mt-1 text-base text-ink group-hover:text-accent transition-colors">
                        {link.handle || link.url}
                      </div>
                    </div>
                    <span aria-hidden className="text-ink/40 group-hover:text-accent transition">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}

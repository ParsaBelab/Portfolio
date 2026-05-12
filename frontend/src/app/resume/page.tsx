import type { Metadata } from "next";

import { api } from "@/lib/api";
import { formatYearRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Parsa Belab — résumé. Backend developer focused on clean architecture and system reliability.",
};

export const revalidate = 60;

export default async function ResumePage() {
  const [site, experience, skills, projects] = await Promise.all([
    api.site(),
    api.experience(),
    api.skills(),
    api.projects(),
  ]);

  const featured = projects.filter((p) => p.is_featured).slice(0, 4);
  const otherProjects = projects.filter((p) => !p.is_featured).slice(0, 4);

  return (
    <article className="container max-w-3xl py-32">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-10">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            Résumé / {new Date().getFullYear()}
          </div>
          <h1 className="mt-3 font-serif italic text-5xl text-balance leading-[1.02]">
            {site.full_name}.
          </h1>
          <p className="mt-3 text-lg text-muted max-w-prose">{site.tagline}</p>
        </div>
        <aside className="text-sm space-y-1 text-right md:text-left">
          <div>{site.location}</div>
          <a className="text-accent hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {site.social_links.slice(0, 3).map((s) => (
            <div key={s.platform}>
              <a className="hover:text-accent" href={s.url} target="_blank" rel="noreferrer">
                {s.platform_label} · {s.handle}
              </a>
            </div>
          ))}
        </aside>
      </header>

      {/* Bio */}
      <section className="py-10 border-b border-border">
        <Heading>Profile</Heading>
        <div className="space-y-4 text-base leading-relaxed max-w-prose">
          {site.bio.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-10 border-b border-border">
        <Heading>Experience</Heading>
        <ul className="space-y-8">
          {experience.map((e) => (
            <li key={e.id} className="grid grid-cols-[7rem_1fr] gap-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle pt-1">
                {formatYearRange(e.start_date, e.end_date)}
              </div>
              <div>
                <div className="font-serif italic text-xl">{e.role}</div>
                <div className="text-sm text-muted">
                  {e.company}{e.location ? ` · ${e.location}` : ""}
                </div>
                {e.summary && (
                  <p className="mt-2 text-base leading-relaxed max-w-prose">{e.summary}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="py-10 border-b border-border">
          <Heading>Selected projects</Heading>
          <ul className="space-y-6">
            {featured.map((p) => (
              <li key={p.id}>
                <div className="font-serif italic text-lg">{p.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle mt-0.5">
                  {p.category_label}{p.year ? ` · ${p.year}` : ""} · {p.tags.map((t) => t.name).join(" · ")}
                </div>
                <p className="mt-2 text-base leading-relaxed text-muted max-w-prose">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section className="py-10 border-b border-border">
        <Heading>Stack</Heading>
        <ul className="space-y-3">
          {skills.map((cat) => (
            <li key={cat.slug} className="grid grid-cols-[7rem_1fr] gap-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle pt-1">
                {cat.name}
              </div>
              <div className="text-base">
                {cat.items.map((i) => i.name).join(", ")}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Side projects */}
      {otherProjects.length > 0 && (
        <section className="py-10">
          <Heading>Other work</Heading>
          <ul className="space-y-2 text-base">
            {otherProjects.map((p) => (
              <li key={p.id}>
                <span className="font-serif italic">{p.title}</span>
                <span className="text-muted"> — {p.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Download */}
      <footer className="mt-10 pt-10 border-t border-border flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          End of résumé.
        </div>
        {site.resume_url ? (
          <a
            href={site.resume_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-ink text-bg px-4 font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            Download PDF ↗
          </a>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            PDF available on request
          </span>
        )}
      </footer>
    </article>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle mb-6">
      — {children}
    </h2>
  );
}

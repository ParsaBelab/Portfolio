import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Site } from "@/lib/types";

export function About({ site }: { site: Site }) {
  const paragraphs = site.bio.split(/\n\s*\n/).filter(Boolean);

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={<>An engineer who treats <em className="not-italic font-serif">systems</em> as the product.</>}
    >
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7 space-y-6 text-lg leading-relaxed text-ink">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-balance">
              {p}
            </p>
          ))}
        </Reveal>

        <aside className="md:col-span-4 md:col-start-9 space-y-8">
          <Reveal delay={0.1}>
            <Detail label="Based">{site.location}</Detail>
          </Reveal>
          <Reveal delay={0.15}>
            <Detail label="Status">
              {site.available_for_work
                ? "Open to freelance & remote roles"
                : "Currently engaged"}
            </Detail>
          </Reveal>
          <Reveal delay={0.2}>
            <Detail label="Reach">
              <a className="hover:text-accent" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </Detail>
          </Reveal>
        </aside>
      </div>
    </Section>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{label}</div>
      <div className="mt-2 text-base text-ink">{children}</div>
    </div>
  );
}

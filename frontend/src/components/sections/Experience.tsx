import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import type { ExperienceEntry } from "@/lib/types";
import { formatYearRange } from "@/lib/utils";

export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title={<>A short timeline.</>}
    >
      <StaggerGroup as="ul" className="relative">
        <span aria-hidden className="absolute left-0 md:left-[20%] top-0 bottom-0 w-px bg-border" />
        {entries.map((e) => (
          <Reveal as="li" key={e.id} className="grid gap-4 md:grid-cols-12 py-10 first:pt-0 last:pb-0">
            <div className="md:col-span-3 pl-6 md:pl-0 relative">
              <span
                aria-hidden
                className="absolute left-[-4px] md:left-[calc(100%-4px)] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-bg"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                {formatYearRange(e.start_date, e.end_date)}
              </div>
              {e.is_current && (
                <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  <span className="h-1 w-1 rounded-full bg-accent" /> Current
                </span>
              )}
            </div>

            <div className="md:col-span-9 md:pl-12">
              <h3 className="font-serif italic text-2xl text-ink">{e.role}</h3>
              <div className="mt-1 text-sm text-muted">
                {e.company}
                {e.location ? ` · ${e.location}` : ""}
              </div>
              {e.summary && (
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/90">
                  {e.summary}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </StaggerGroup>
    </Section>
  );
}

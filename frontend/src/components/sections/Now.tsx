import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import type { FocusItem } from "@/lib/types";

export function Now({ items }: { items: FocusItem[] }) {
  return (
    <Section
      id="now"
      index="06"
      eyebrow="Now — what I'm working on"
      title={<>Currently, in this season.</>}
      intro="A live note. Updated when the work shifts."
    >
      <StaggerGroup as="ul" className="grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} className="relative p-8 border border-border bg-surface/40 rounded-sm">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Now {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 font-serif italic text-xl text-ink">{item.title}</h3>
            {item.description && (
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
            )}
          </Reveal>
        ))}
      </StaggerGroup>
    </Section>
  );
}

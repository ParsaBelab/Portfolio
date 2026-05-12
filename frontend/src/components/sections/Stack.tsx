import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { reveal } from "@/lib/motion";
import type { TechCategory } from "@/lib/types";

export function Stack({ categories }: { categories: TechCategory[] }) {
  return (
    <Section
      id="stack"
      index="02"
      eyebrow="Tech stack"
      title={<>The tools I think and ship in.</>}
      intro="A working stack, not an exhaustive list. Strength biased toward backend; frontend is the half I'm sharpening right now."
    >
      <StaggerGroup className="divide-y divide-border border-y border-border">
        {categories.map((cat) => (
          <Reveal as="div" variants={reveal} key={cat.slug} className="grid gap-6 md:grid-cols-12 py-8">
            <div className="md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                {String(cat.order + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-serif italic text-2xl">{cat.name}</h3>
              {cat.description && (
                <p className="mt-2 text-sm text-muted max-w-xs">{cat.description}</p>
              )}
            </div>

            <ul className="md:col-span-9 flex flex-wrap gap-x-3 gap-y-3 items-start content-start">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="group inline-flex items-baseline gap-1 rounded-full border border-border px-3 py-1.5 text-sm hover:border-ink/40 transition"
                  title={item.level_label}
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-[10px] text-subtle">
                    {"·".repeat(item.level)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </StaggerGroup>
    </Section>
  );
}

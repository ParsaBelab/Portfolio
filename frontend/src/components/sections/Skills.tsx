import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";

const SKILLS = [
  {
    title: "System design",
    body: "Decomposing a problem into services with sharp boundaries — and resisting the urge to add another one before it earns its keep.",
  },
  {
    title: "API craft",
    body: "Resource modelling, versioning, idempotency, and pagination that age well. APIs are a contract; I write them like one.",
  },
  {
    title: "Data modelling",
    body: "Schemas that say what they mean. Constraints at the database layer, not just in application code.",
  },
  {
    title: "Reliability",
    body: "Retries, dead letters, structured logging, graceful degradation. Production is the only spec that matters.",
  },
  {
    title: "Automation",
    body: "n8n flows, Celery pipelines, and small CLIs that turn recurring work into deterministic processes.",
  },
  {
    title: "Pragmatism",
    body: "Picking boring technology when boring is what the problem asks for. Saving the novelty for where it actually pays.",
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="What I do"
      title={<>Capabilities, not buzzwords.</>}
    >
      <StaggerGroup className="grid gap-px bg-border border border-border md:grid-cols-3">
        {SKILLS.map((s, i) => (
          <Reveal key={s.title} className="bg-bg p-8 md:p-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 font-serif italic text-2xl">{s.title}</h3>
            <p className="mt-3 text-base text-muted leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </StaggerGroup>
    </Section>
  );
}

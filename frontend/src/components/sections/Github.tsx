import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "ParsaBelab";

/**
 * Lightweight GitHub presence — no client-side API calls, no rate-limit pain.
 * Uses well-known image services (cached by their CDNs) for the contribution
 * graph and stats card. The card itself is a hand-built editorial frame, not
 * an iframe.
 */
export function Github() {
  return (
    <Section
      id="github"
      index="07"
      eyebrow="GitHub"
      title={<>Where I commit, in the open.</>}
      intro={
        <>
          Most of my work is private client code, but the public corner of
          GitHub gives a sense of the rhythm.
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-8 border border-border rounded-sm overflow-hidden bg-surface/40">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              @{USERNAME} — contributions
            </div>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-accent"
            >
              Open ↗
            </a>
          </div>
          {/* ghchart.rshah.org renders a clean SVG contribution graph — no JS, no client API */}
          <div className="p-6 overflow-x-auto">
            <Image
              src={`https://ghchart.rshah.org/4e6b57/${USERNAME}`}
              alt={`GitHub contribution graph for ${USERNAME}`}
              width={720}
              height={120}
              unoptimized
              className="w-full h-auto opacity-90"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 border border-border rounded-sm p-6 bg-surface/40 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              Activity
            </div>
            <p className="mt-3 font-serif italic text-2xl leading-snug">
              Quiet weeks. Productive months. Few public stars — most of the work
              lives in private repos.
            </p>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-full border border-border px-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-ink/40 transition"
          >
            github.com/{USERNAME} ↗
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

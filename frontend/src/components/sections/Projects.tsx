"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Section } from "@/components/ui/Section";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

interface Filter { key: string; label: string; }

export function Projects({ projects }: { projects: Project[] }) {
  const filters: Filter[] = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => map.set(p.category, p.category_label));
    return [{ key: "all", label: "All" }, ...Array.from(map, ([key, label]) => ({ key, label }))];
  }, [projects]);

  const [active, setActive] = useState("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <Section
      id="work"
      index="04"
      eyebrow="Selected work"
      title={<>Things I've built, kept alive, and learned from.</>}
      intro="A short, working selection. Each one taught me something I now use on the next."
    >
      {/* Filter bar */}
      <div className="mb-12 flex flex-wrap gap-2 border-b border-border pb-6">
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={cn(
                "relative inline-flex h-8 items-center rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.18em] transition",
                isActive ? "text-bg" : "text-muted hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.ul layout className="grid gap-px bg-border md:grid-cols-2 border border-border">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
              className="bg-bg"
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative p-8 md:p-10 h-full flex flex-col gap-6 transition-colors hover:bg-surface">
      <header className="flex items-start justify-between gap-6">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
            {project.category_label} {project.year && `· ${project.year}`}
          </div>
          <h3 className="mt-3 font-serif italic text-3xl md:text-4xl text-balance leading-[1.05]">
            {project.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="mt-2 shrink-0 text-ink/30 transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </header>

      <p className="text-base leading-relaxed text-muted text-balance max-w-prose">
        {project.summary}
      </p>

      <footer className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {project.tags.slice(0, 6).map((tag) => (
          <span
            key={tag.slug}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle border border-border rounded-full px-2.5 py-1"
          >
            {tag.name}
          </span>
        ))}
      </footer>

      <div className="absolute inset-x-8 bottom-3 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-accent"
          >
            Code ↗
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-accent"
          >
            Live ↗
          </a>
        )}
      </div>
    </article>
  );
}

"use client";

import { motion } from "framer-motion";

import type { Site } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ site }: { site: Site }) {
  const firstName = site.full_name.split(" ")[0] ?? site.full_name;
  const lastName = site.full_name.split(" ").slice(1).join(" ");

  return (
    <section className="relative overflow-hidden">
      {/* Subtle architectural backdrop. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines" />
      <div aria-hidden className="noise" />

      <div className="container relative pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
        >
          <span>— Portfolio / 2025</span>
          <span className="hidden md:inline">{site.location}</span>
          <span className="flex items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent" />
              {site.available_for_work && (
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
              )}
            </span>
            {site.available_for_work ? "Available for work" : "Not available"}
          </span>
        </motion.div>

        {/* Display name */}
        <div className="mt-20 md:mt-28">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="font-serif italic text-display text-ink"
          >
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 28 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {firstName}
            </motion.span>
            <motion.span
              className="block pl-[12%] md:pl-[20%]"
              variants={{
                hidden: { opacity: 0, y: 28 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {lastName}
              <span className="text-accent">.</span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Lower row */}
        <div className="mt-16 md:mt-24 grid gap-12 md:grid-cols-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease }}
            className="md:col-span-7"
          >
            <div className="eyebrow">↳ {site.role}</div>
            <p className="mt-4 text-xl md:text-2xl leading-snug max-w-xl text-balance">
              {site.tagline}
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease }}
            className="md:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6"
          >
            <Stat n={`${site.stats.years_coding}+`}        label="Years coding" />
            <Stat n={`${site.stats.freelance_projects}+`}  label="Freelance projects" />
            <Stat n={`${site.stats.personal_projects}+`}   label="Personal projects" />
            <Stat n={`${site.stats.teams_collaborated}`}   label="Teams shipped with" />
          </motion.dl>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-20 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
        >
          <span className="h-px w-8 bg-border" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{label}</dt>
      <dd className="mt-1 font-serif italic text-3xl text-ink">{n}</dd>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useSite } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "work",       label: "Work" },
  { id: "about",      label: "About" },
  { id: "stack",      label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

export function Nav() {
  const { data: site } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "backdrop-blur-md bg-bg/75 border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.18em] text-ink"
          aria-label={`${site.full_name} — home`}
        >
          <span className="text-accent">●</span>
          <span className="ml-2">{site.full_name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex h-9 items-center rounded-full border border-ink/15 bg-ink text-bg px-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:opacity-90 transition"
          >
            Get in touch
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[3px]">
              <span className={cn("block h-px w-4 bg-ink transition", open && "translate-y-1 rotate-45")} />
              <span className={cn("block h-px w-4 bg-ink transition", open && "opacity-0")} />
              <span className={cn("block h-px w-4 bg-ink transition", open && "-translate-y-1 -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border bg-bg transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="container flex flex-col gap-4 py-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink"
            >
              {s.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-ink text-bg font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

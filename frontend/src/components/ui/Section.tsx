import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  index?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Editorial section frame.
 *
 *  ── 01 ──  Eyebrow                       (mono, caps)
 *  Title in display serif italic
 *  Optional intro paragraph                (muted, max prose)
 *  ────────────────────────────────────────────
 *  children
 */
export function Section({ id, eyebrow, title, intro, index, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("container scroll-mt-24 py-24 md:py-32", className)}>
      {(eyebrow || title || intro) && (
        <header className="mb-16 max-w-4xl">
          {(eyebrow || index) && (
            <div className="flex items-center gap-3 mb-6">
              {index && (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  — {index}
                </span>
              )}
              {eyebrow && (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                  {eyebrow}
                </span>
              )}
            </div>
          )}
          {title && (
            <h2 className="text-h1 font-serif italic leading-[1.02] text-balance">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-6 max-w-prose text-muted text-lg leading-relaxed text-balance">
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="container py-40 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        Error / 500
      </div>
      <h1 className="mt-6 font-serif italic text-h1 leading-none">
        Something gave way<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 text-muted max-w-md mx-auto">
        An unexpected error occurred. Try again — if it persists, ping me.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex h-11 items-center rounded-full bg-ink text-bg px-5 font-mono text-[11px] uppercase tracking-[0.18em]"
      >
        Retry
      </button>
    </div>
  );
}

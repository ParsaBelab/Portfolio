export default function Loading() {
  return (
    <div className="container py-40">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Loading
      </div>
      <div className="mt-8 grid gap-4 max-w-2xl">
        <div className="h-12 rounded bg-surface animate-pulse" />
        <div className="h-4 rounded bg-surface animate-pulse w-3/4" />
        <div className="h-4 rounded bg-surface animate-pulse w-1/2" />
      </div>
    </div>
  );
}

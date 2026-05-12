import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-40 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
        Error / 404
      </div>
      <h1 className="mt-6 font-serif italic text-display leading-none">
        Not found<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 text-muted max-w-md mx-auto">
        The page you're looking for doesn't exist — or hasn't been built yet.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center rounded-full bg-ink text-bg px-5 font-mono text-[11px] uppercase tracking-[0.18em]"
      >
        Back to the index
      </Link>
    </div>
  );
}

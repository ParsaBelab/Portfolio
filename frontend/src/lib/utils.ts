export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatYearRange(start: string, end: string | null): string {
  const startYear = new Date(start).getFullYear();
  if (!end) return `${startYear} — Present`;
  const endYear = new Date(end).getFullYear();
  return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
}

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${path}`;
}

import "server-only";

import type {
  ExperienceEntry, Project, ProjectDetail, Site, TechCategory,
} from "./types";
import { fallbackSite, fallbackProjects, fallbackExperience, fallbackSkills } from "./fallback";

/**
 * Server-side API client.
 *
 * In Docker the frontend container resolves the backend via `INTERNAL_API_URL`
 * (e.g. http://backend:8000/api). Outside Docker it falls back to
 * `NEXT_PUBLIC_API_URL`. When the backend is unreachable (first boot, demo
 * build, CI) we degrade to bundled fallback content so the site still renders.
 */

const BASE =
  process.env.INTERNAL_API_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost/api";

const VERSION = "/v1";

interface FetchOpts { revalidate?: number; }

async function get<T>(path: string, fallback: T, opts: FetchOpts = {}): Promise<T> {
  const url = `${BASE}${VERSION}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: opts.revalidate ?? 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return (await res.json()) as T;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[api] ${path} unavailable — serving fallback.`, (err as Error).message);
    }
    return fallback;
  }
}

export const api = {
  site:        () => get<Site>("/site/", fallbackSite),
  projects:    () => get<Project[]>("/projects/", fallbackProjects),
  project:     (slug: string) =>
    get<ProjectDetail | null>(`/projects/${slug}/`, null),
  experience:  () => get<ExperienceEntry[]>("/experience/", fallbackExperience),
  skills:      () => get<TechCategory[]>("/skills/", fallbackSkills),
};

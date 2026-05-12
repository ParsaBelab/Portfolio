/**
 * Browser-side API client.
 *
 * Mirrors `lib/api.ts` but runs in the client. Reads `NEXT_PUBLIC_API_URL` only
 * (it must be reachable from the user's browser, not from inside a container).
 *
 * Falls back to the bundled content in `lib/fallback.ts` if the request fails,
 * so the UI never renders an empty/broken state.
 */
import type {
  ExperienceEntry, Project, ProjectDetail, Site, TechCategory,
} from "./types";
import {
  fallbackExperience, fallbackProjects, fallbackSite, fallbackSkills,
} from "./fallback";

const BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

const VERSION = "/v1";

async function get<T>(path: string, fallback: T, signal?: AbortSignal): Promise<T> {
  try {
    const res = await fetch(`${BASE}${VERSION}${path}`, {
      headers: { Accept: "application/json" },
      signal,
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[client-api] ${path} unavailable — using fallback.`);
    }
    return fallback;
  }
}

export const clientApi = {
  site:       (signal?: AbortSignal) => get<Site>("/site/", fallbackSite, signal),
  projects:   (signal?: AbortSignal) => get<Project[]>("/projects/", fallbackProjects, signal),
  project:    (slug: string, signal?: AbortSignal) =>
    get<ProjectDetail | null>(`/projects/${slug}/`, null, signal),
  experience: (signal?: AbortSignal) => get<ExperienceEntry[]>("/experience/", fallbackExperience, signal),
  skills:     (signal?: AbortSignal) => get<TechCategory[]>("/skills/", fallbackSkills, signal),
};

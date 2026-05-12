"use client";

import { useEffect, useState } from "react";

import { clientApi } from "@/lib/client-api";
import {
  fallbackExperience, fallbackProjects, fallbackSite, fallbackSkills,
} from "@/lib/fallback";
import type {
  ExperienceEntry, Project, Site, TechCategory,
} from "@/lib/types";

interface QueryState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Generic fetch-on-mount hook. Seeds with `initial` so SSR + first paint never
 * render an empty state, then revalidates from the API on the client.
 */
function useResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  initial: T,
): QueryState<T> {
  const [data, setData]       = useState<T>(initial);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetcher(controller.signal)
      .then((value) => {
        setData(value);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err as Error);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  // We intentionally bind to the fetcher reference once per hook instance.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
}

export function useSite():       QueryState<Site>              { return useResource(clientApi.site,       fallbackSite); }
export function useProjects():   QueryState<Project[]>         { return useResource(clientApi.projects,   fallbackProjects); }
export function useExperience(): QueryState<ExperienceEntry[]> { return useResource(clientApi.experience, fallbackExperience); }
export function useSkills():     QueryState<TechCategory[]>    { return useResource(clientApi.skills,     fallbackSkills); }

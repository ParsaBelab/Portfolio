/**
 * Bundled fallback content — mirrors the seed_demo command on the backend.
 * Renders the site even when the API is unreachable (first boot, CI, demo).
 */
import type {
  ExperienceEntry, Project, Site, TechCategory,
} from "./types";

export const fallbackSite: Site = {
  full_name: "Parsa Belab",
  role: "Backend Developer",
  tagline: "Backend Developer focused on clean architecture and system reliability.",
  location: "Remote",
  available_for_work: true,
  bio:
    "I'm a backend engineer who treats systems as the product. I care about boundaries, " +
    "invariants, and the small choices in a schema that decide whether a codebase still " +
    "feels good two years later.\n\n" +
    "Over four years I've shipped APIs, CMSs, and automation pipelines for small teams and " +
    "freelance clients — twenty-plus personal projects in the margins, learning broadly so " +
    "the production work has weight behind it.\n\n" +
    "Right now I'm deepening into system architecture and the React ecosystem, so that the " +
    "things I design and the things I ship are equally considered.",
  email: "work.parsabelab@gmail.com",
  stats: { years_coding: 4, freelance_projects: 5, personal_projects: 20, teams_collaborated: 3 },
  resume_url: null,
  avatar_url: null,
  social_links: [
    { platform: "github",   platform_label: "GitHub",     handle: "ParsaBelab",       url: "https://github.com/ParsaBelab",            order: 0 },
    { platform: "linkedin", platform_label: "LinkedIn",   handle: "parsa-belab",      url: "https://www.linkedin.com/in/parsa-belab/", order: 1 },
    { platform: "x",        platform_label: "X / Twitter", handle: "mrinloop",        url: "https://x.com/mrinloop",                   order: 2 },
    { platform: "telegram", platform_label: "Telegram",   handle: "ParsaBelab",       url: "https://t.me/ParsaBelab",                  order: 3 },
    { platform: "email",    platform_label: "Email",      handle: "work.parsabelab",  url: "mailto:work.parsabelab@gmail.com",         order: 4 },
  ],
  current_focus: [
    { id: 1, title: "Scalable backend systems", description: "Designing services that stay calm under load.", order: 0 },
    { id: 2, title: "System architecture",       description: "Studying distributed patterns and tradeoffs.", order: 1 },
    { id: 3, title: "React ecosystem",           description: "Sharpening the frontend half of the stack.",   order: 2 },
  ],
  updated_at: new Date().toISOString(),
};

const t = (...names: string[]) => names.map((name) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));

export const fallbackProjects: Project[] = [
  {
    id: 1, title: "Atlas — Async task pipeline", slug: "atlas-async-task-pipeline",
    summary: "A Celery + Redis pipeline that processes 100k jobs/day with at-least-once delivery and dead-letter recovery.",
    role: "Backend engineer", year: 2025, category: "backend", category_label: "Backend",
    tags: t("Python", "Django", "Celery", "Redis", "PostgreSQL"),
    cover: null, repo_url: "", live_url: "", is_featured: true,
  },
  {
    id: 2, title: "Ledger API", slug: "ledger-api",
    summary: "Double-entry accounting service with strict invariants, idempotent writes, and signed audit logs.",
    role: "Backend engineer", year: 2025, category: "backend", category_label: "Backend",
    tags: t("Python", "Django REST Framework", "PostgreSQL"),
    cover: null, repo_url: "", live_url: "", is_featured: true,
  },
  {
    id: 3, title: "Quiet — minimalist CMS", slug: "quiet-cms",
    summary: "Headless content backend for editorial sites. Django + DRF, image pipeline, and a tiny admin.",
    role: "Engineer", year: 2024, category: "fullstack", category_label: "Full-stack",
    tags: t("Django", "PostgreSQL", "Next.js", "Docker"),
    cover: null, repo_url: "", live_url: "", is_featured: true,
  },
  {
    id: 4, title: "Relay — webhook fan-out", slug: "relay-webhook-fanout",
    summary: "A self-hosted webhook relay with signing, replay, and per-subscriber rate limits.",
    role: "Backend engineer", year: 2024, category: "infra", category_label: "Infrastructure",
    tags: t("Python", "Django", "Redis", "Nginx", "Docker"),
    cover: null, repo_url: "", live_url: "", is_featured: false,
  },
  {
    id: 5, title: "n8n studio workflows", slug: "n8n-studio-workflows",
    summary: "A catalogue of production n8n automations: CRM sync, invoicing, content pipelines.",
    role: "Automation engineer", year: 2024, category: "automation", category_label: "Automation",
    tags: t("n8n", "JavaScript", "PostgreSQL"),
    cover: null, repo_url: "", live_url: "", is_featured: false,
  },
  {
    id: 6, title: "Threadline — studio site", slug: "threadline-studio",
    summary: "Freelance build: editorial marketing site with a custom Django CMS and a Next.js front.",
    role: "Full-stack engineer", year: 2023, category: "fullstack", category_label: "Full-stack",
    tags: t("Django", "Next.js", "PostgreSQL", "Docker"),
    cover: null, repo_url: "", live_url: "", is_featured: false,
  },
];

export const fallbackExperience: ExperienceEntry[] = [
  {
    id: 1, role: "Backend Engineer — Freelance", company: "Independent", location: "Remote",
    summary: "Five-plus shipped client projects: APIs, CMS, automation pipelines. Lead engineer on most; sole engineer on several.",
    start_date: "2023-01-01", end_date: null, is_current: true, order: 0,
  },
  {
    id: 2, role: "Backend Developer", company: "Collaborative team projects", location: "Remote",
    summary: "Worked across three product teams on Django services — API design, data modelling, and the unglamorous infra that keeps things alive.",
    start_date: "2022-01-01", end_date: "2023-12-31", is_current: false, order: 1,
  },
  {
    id: 3, role: "Self-directed engineering", company: "20+ personal projects", location: "Anywhere",
    summary: "Built broadly to learn deeply — schedulers, parsers, ETL jobs, small CMSs. Most of what I know now started as a weekend prototype.",
    start_date: "2021-01-01", end_date: null, is_current: false, order: 2,
  },
];

export const fallbackSkills: TechCategory[] = [
  { name: "Languages",      slug: "languages", description: "The tools I think in.",       order: 0,
    items: [
      { name: "Python", level: 4, level_label: "Expert",     note: "", order: 0 },
      { name: "JavaScript", level: 3, level_label: "Proficient", note: "", order: 1 },
      { name: "TypeScript", level: 3, level_label: "Proficient", note: "", order: 2 },
      { name: "SQL", level: 3, level_label: "Proficient", note: "", order: 3 },
      { name: "Bash", level: 3, level_label: "Proficient", note: "", order: 4 },
    ]},
  { name: "Backend",        slug: "backend",   description: "Where most of my work lives.", order: 1,
    items: [
      { name: "Django", level: 4, level_label: "Expert",     note: "", order: 0 },
      { name: "Django REST Framework", level: 4, level_label: "Expert", note: "", order: 1 },
      { name: "Celery", level: 3, level_label: "Proficient", note: "", order: 2 },
      { name: "REST APIs", level: 4, level_label: "Expert",  note: "", order: 3 },
    ]},
  { name: "Data & Storage", slug: "data",      description: "Persistence, caching, queues.", order: 2,
    items: [
      { name: "PostgreSQL", level: 3, level_label: "Proficient", note: "", order: 0 },
      { name: "Redis", level: 3, level_label: "Proficient", note: "", order: 1 },
    ]},
  { name: "Infrastructure", slug: "infra",     description: "Shipping it and keeping it up.", order: 3,
    items: [
      { name: "Docker", level: 3, level_label: "Proficient", note: "", order: 0 },
      { name: "Linux", level: 3, level_label: "Proficient", note: "", order: 1 },
      { name: "Nginx", level: 3, level_label: "Proficient", note: "", order: 2 },
      { name: "Git", level: 4, level_label: "Expert",       note: "", order: 3 },
    ]},
  { name: "Frontend",       slug: "frontend",  description: "Currently sharpening.",       order: 4,
    items: [
      { name: "Next.js", level: 2, level_label: "Working knowledge", note: "", order: 0 },
      { name: "React",   level: 2, level_label: "Working knowledge", note: "", order: 1 },
    ]},
  { name: "Tools",          slug: "tools",     description: "Automation & workflow.",      order: 5,
    items: [
      { name: "n8n", level: 3, level_label: "Proficient", note: "", order: 0 },
    ]},
];

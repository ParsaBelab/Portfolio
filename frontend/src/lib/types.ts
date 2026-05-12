// Mirror of backend DRF response shapes. Hand-maintained — small surface.

export type SocialPlatform =
  | "github" | "linkedin" | "x" | "telegram" | "email" | "website";

export interface SocialLink {
  platform: SocialPlatform;
  platform_label: string;
  handle: string;
  url: string;
  order: number;
}

export interface FocusItem {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface SiteStats {
  years_coding: number;
  freelance_projects: number;
  personal_projects: number;
  teams_collaborated: number;
}

export interface Site {
  full_name: string;
  role: string;
  tagline: string;
  location: string;
  available_for_work: boolean;
  bio: string;
  email: string;
  stats: SiteStats;
  resume_url: string | null;
  avatar_url: string | null;
  social_links: SocialLink[];
  current_focus: FocusItem[];
  updated_at: string;
}

export interface Tag { name: string; slug: string; }

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  role: string;
  year: number | null;
  category: string;
  category_label: string;
  tags: Tag[];
  cover: string | null;
  repo_url: string;
  live_url: string;
  is_featured: boolean;
}

export interface ProjectImage { image: string; caption: string; order: number; }
export interface ProjectDetail extends Project { description: string; images: ProjectImage[]; }

export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  location: string;
  summary: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  order: number;
}

export interface TechItem {
  name: string;
  level: 1 | 2 | 3 | 4;
  level_label: string;
  note: string;
  order: number;
}

export interface TechCategory {
  name: string;
  slug: string;
  description: string;
  order: number;
  items: TechItem[];
}

"""Seed the database with realistic placeholder content.

Idempotent — safe to run multiple times. Existing records are left untouched.
"""
from __future__ import annotations

from datetime import date

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.core.models import CurrentFocusItem, SiteSettings, SocialLink
from apps.experience.models import Experience
from apps.projects.models import Project, Tag
from apps.skills.models import TechCategory, TechItem


SOCIAL = [
    ("github",   "ParsaBelab",      "https://github.com/ParsaBelab",          0),
    ("linkedin", "parsa-belab",     "https://www.linkedin.com/in/parsa-belab/", 1),
    ("x",        "mrinloop",        "https://x.com/mrinloop",                  2),
    ("telegram", "ParsaBelab",      "https://t.me/ParsaBelab",                 3),
    ("email",    "work.parsabelab", "mailto:work.parsabelab@gmail.com",        4),
]

FOCUS = [
    ("Scalable backend systems", "Designing services that stay calm under load."),
    ("System architecture",       "Studying distributed patterns and tradeoffs."),
    ("React ecosystem",           "Sharpening the frontend half of the stack."),
]

CATEGORIES = [
    ("Languages",       "languages", "The tools I think in.", [
        ("Python", 4), ("JavaScript", 3), ("TypeScript", 3), ("SQL", 3), ("Bash", 3),
    ]),
    ("Backend",         "backend",   "Where most of my work lives.", [
        ("Django", 4), ("Django REST Framework", 4), ("Celery", 3), ("REST APIs", 4),
    ]),
    ("Data & Storage",  "data",      "Persistence, caching, queues.", [
        ("PostgreSQL", 3), ("Redis", 3),
    ]),
    ("Infrastructure",  "infra",     "Shipping it and keeping it up.", [
        ("Docker", 3), ("Linux", 3), ("Nginx", 3), ("Git", 4),
    ]),
    ("Frontend",        "frontend",  "Currently sharpening.", [
        ("Next.js", 2), ("React", 2),
    ]),
    ("Tools",           "tools",     "Automation & workflow.", [
        ("n8n", 3),
    ]),
]

PROJECTS = [
    {
        "title": "Atlas — Async task pipeline",
        "summary": "A Celery + Redis pipeline that processes 100k jobs/day with at-least-once delivery and dead-letter recovery.",
        "description": (
            "Atlas began as an internal need: reliable background processing for a "
            "Django product where naive task chains kept failing silently.\n\n"
            "I built a typed task envelope, structured retries with exponential backoff, "
            "and a dead-letter table that an operator can replay from. Observability is "
            "via structured JSON logs and a Postgres-backed audit trail."
        ),
        "category": "backend", "role": "Backend engineer", "year": 2025,
        "is_featured": True, "tags": ["Python", "Django", "Celery", "Redis", "PostgreSQL"],
    },
    {
        "title": "Ledger API",
        "summary": "Double-entry accounting service with strict invariants, idempotent writes, and signed audit logs.",
        "description": (
            "A small, opinionated accounting backend. Every mutation goes through a "
            "ledger entry that respects double-entry invariants enforced at the DB layer "
            "with check constraints. Idempotency keys make retries safe."
        ),
        "category": "backend", "role": "Backend engineer", "year": 2025,
        "is_featured": True, "tags": ["Python", "Django REST Framework", "PostgreSQL"],
    },
    {
        "title": "Quiet — minimalist CMS",
        "summary": "Headless content backend for editorial sites. Django + DRF, image pipeline, and a tiny admin.",
        "description": (
            "A pared-down CMS for writers and small studios. Versioned drafts, "
            "scheduled publish, and a thumbnail pipeline built on Pillow + a "
            "background worker."
        ),
        "category": "fullstack", "role": "Engineer", "year": 2024,
        "is_featured": True, "tags": ["Django", "PostgreSQL", "Next.js", "Docker"],
    },
    {
        "title": "Relay — webhook fan-out",
        "summary": "A self-hosted webhook relay with signing, replay, and per-subscriber rate limits.",
        "description": (
            "Sits in front of any service that emits webhooks. Verifies signatures, "
            "fans out to subscribers with isolated queues, and exposes a replay UI."
        ),
        "category": "infra", "role": "Backend engineer", "year": 2024,
        "tags": ["Python", "Django", "Redis", "Nginx", "Docker"],
    },
    {
        "title": "n8n studio workflows",
        "summary": "A catalogue of production n8n automations: CRM sync, invoicing, content pipelines.",
        "description": (
            "Internal automations I've built for freelance clients. Each one trims a "
            "recurring manual task — quote generation, content publishing, "
            "cross-tool sync — into a single deterministic flow."
        ),
        "category": "automation", "role": "Automation engineer", "year": 2024,
        "tags": ["n8n", "JavaScript", "PostgreSQL"],
    },
    {
        "title": "Threadline — studio site",
        "summary": "Freelance build: editorial marketing site with a custom Django CMS and a Next.js front.",
        "description": (
            "Built for a small design studio. The brief was 'fast, quiet, easy to "
            "edit.' Page-level CMS, ISR on the front end, and a deploy that survives "
            "the studio's worst-case Friday."
        ),
        "category": "fullstack", "role": "Full-stack engineer", "year": 2023,
        "tags": ["Django", "Next.js", "PostgreSQL", "Docker"],
    },
]

EXPERIENCE = [
    {
        "role": "Backend Engineer — Freelance",
        "company": "Independent",
        "location": "Remote",
        "summary": (
            "Five-plus shipped client projects: APIs, CMS, automation pipelines. "
            "Lead engineer on most; sole engineer on several."
        ),
        "start_date": date(2023, 1, 1), "end_date": None, "is_current": True, "order": 0,
    },
    {
        "role": "Backend Developer",
        "company": "Collaborative team projects",
        "location": "Remote",
        "summary": (
            "Worked across three product teams on Django services — API design, "
            "data modelling, and the unglamorous infra that keeps things alive."
        ),
        "start_date": date(2022, 1, 1), "end_date": date(2023, 12, 31), "order": 1,
    },
    {
        "role": "Self-directed engineering",
        "company": "20+ personal projects",
        "location": "Anywhere",
        "summary": (
            "Built broadly to learn deeply — schedulers, parsers, ETL jobs, small CMSs. "
            "Most of what I know now started as a weekend prototype."
        ),
        "start_date": date(2021, 1, 1), "end_date": None, "order": 2,
    },
]


class Command(BaseCommand):
    help = "Seed the portfolio with realistic placeholder content."

    @transaction.atomic
    def handle(self, *args, **options) -> None:
        site = SiteSettings.load()
        if not site.bio:
            site.bio = (
                "I'm a backend engineer who treats systems as the product. "
                "I care about boundaries, invariants, and the small choices in a schema "
                "that decide whether a codebase still feels good two years later.\n\n"
                "Over four years I've shipped APIs, CMSs, and automation pipelines for "
                "small teams and freelance clients — twenty-plus personal projects in "
                "the margins, learning broadly so the production work has weight behind it.\n\n"
                "Right now I'm deepening into system architecture and the React ecosystem, "
                "so that the things I design and the things I ship are equally considered."
            )
            site.save()
            self.stdout.write(self.style.SUCCESS("✓ Seeded SiteSettings bio."))

        for platform, handle, url, order in SOCIAL:
            SocialLink.objects.get_or_create(
                platform=platform,
                defaults={"handle": handle, "url": url, "order": order, "is_active": True},
            )
        self.stdout.write(self.style.SUCCESS("✓ Social links."))

        for i, (title, desc) in enumerate(FOCUS):
            CurrentFocusItem.objects.get_or_create(
                title=title,
                defaults={"description": desc, "order": i, "is_active": True},
            )
        self.stdout.write(self.style.SUCCESS("✓ Current focus."))

        for i, (name, slug, desc, items) in enumerate(CATEGORIES):
            cat, _ = TechCategory.objects.get_or_create(
                slug=slug,
                defaults={"name": name, "description": desc, "order": i},
            )
            for j, (item_name, level) in enumerate(items):
                TechItem.objects.get_or_create(
                    category=cat, name=item_name,
                    defaults={"level": level, "order": j},
                )
        self.stdout.write(self.style.SUCCESS("✓ Tech stack."))

        tag_cache: dict[str, Tag] = {}
        def tag(name: str) -> Tag:
            if name not in tag_cache:
                tag_cache[name], _ = Tag.objects.get_or_create(name=name)
            return tag_cache[name]

        for i, p in enumerate(PROJECTS):
            obj, created = Project.objects.get_or_create(
                title=p["title"],
                defaults={
                    "summary": p["summary"], "description": p["description"],
                    "category": p["category"], "role": p["role"], "year": p["year"],
                    "is_featured": p.get("is_featured", False),
                    "is_published": True, "order": i,
                },
            )
            if created:
                obj.tags.set([tag(t) for t in p["tags"]])
        self.stdout.write(self.style.SUCCESS("✓ Projects."))

        for e in EXPERIENCE:
            Experience.objects.get_or_create(
                role=e["role"], company=e["company"],
                defaults=e,
            )
        self.stdout.write(self.style.SUCCESS("✓ Experience."))

        self.stdout.write(self.style.SUCCESS("\nSeed complete."))

# Parsa Belab — Portfolio

A production-grade personal portfolio for a backend engineer. Editorial, restrained, technically credible.

**Stack**

- **Frontend** — Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend** — Django 5, Django REST Framework, PostgreSQL, Pillow
- **Infra** — Docker, docker-compose, Nginx reverse proxy
- **Auth** — Django admin (single-operator CMS)

---

## Architecture

```
┌──────────────┐   ┌────────────────┐   ┌──────────────┐
│   Browser    │──▶│  Nginx (80/443)│──▶│ Next.js (3000)│
└──────────────┘   └────────┬───────┘   └──────────────┘
                            │
                            ├──▶ /api/    ──▶ Django (8000)
                            ├──▶ /admin/  ──▶ Django (8000)
                            └──▶ /media/  ──▶ static files
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │ PostgreSQL   │
                                       └──────────────┘
```

---

## Quick start (development)

```bash
cp .env.example .env
docker compose up --build
```

- Frontend → http://localhost
- Admin    → http://localhost/admin (created via `createsuperuser`)

Create the superuser the first time:

```bash
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py seed_demo   # optional
```

---

## Project layout

```
.
├── frontend/             # Next.js application
│   ├── src/app/          # App Router pages
│   ├── src/components/   # Reusable UI
│   ├── src/lib/          # API client, utilities, types
│   └── src/styles/
├── backend/              # Django project
│   ├── portfolio/        # Settings, URLs
│   └── apps/
│       ├── core/         # SiteSettings, social links
│       ├── projects/     # Projects + tags
│       ├── experience/   # Timeline entries
│       └── skills/       # Tech stack & focus items
├── nginx/                # Reverse proxy config
├── docker-compose.yml
└── .env.example
```

---

## Frontend

```bash
cd frontend
pnpm install        # or npm / yarn
pnpm dev
```

Environment:

```
NEXT_PUBLIC_API_URL=http://localhost/api
NEXT_PUBLIC_SITE_URL=http://localhost
```

Build:

```bash
pnpm build && pnpm start
```

## Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Environment (see `.env.example`):

```
DJANGO_SECRET_KEY=...
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=localhost,parsabelab.com
POSTGRES_DB=portfolio
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=...
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## API

All endpoints are read-only and unauthenticated (public portfolio data). Writes happen through Django admin.

| Method | Path                          | Returns                                     |
|--------|-------------------------------|---------------------------------------------|
| GET    | `/api/v1/site/`               | SiteSettings + social links + current focus |
| GET    | `/api/v1/projects/`           | Ordered list of published projects          |
| GET    | `/api/v1/projects/<slug>/`    | Project detail                              |
| GET    | `/api/v1/experience/`         | Experience timeline                         |
| GET    | `/api/v1/skills/`             | Tech stack grouped by category              |
| GET    | `/api/v1/resume/`             | Current resume PDF metadata + URL           |

API is versioned under `/api/v1/` to leave room for migration.

---

## Deployment (Linux VPS)

1. Provision a VPS with Docker + Docker Compose.
2. Point DNS A-record to the server.
3. Clone the repo, copy `.env.example` → `.env`, fill secrets.
4. `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`
5. Issue TLS via `certbot` (host) and mount the certs into the nginx container — see `nginx/prod.conf`.

---

## Design system

- **Type** — Inter (body) + Instrument Serif (display) + JetBrains Mono (technical)
- **Palette** — Monochrome foundation, single muted-sage accent (`--accent`)
- **Motion** — Framer Motion with low-amplitude reveals, spring physics, prefers-reduced-motion respected
- **Themes** — Light + dark, system-aware, persisted

---

## License

MIT © Parsa Belab

# Singularity Lab

Singularity Lab is my personal experimental lab and living learning journal. This project tracks my growth across computer science, coding, mathematics, physics, and chess, through structured notes, practical explanations, and linked knowledge paths.

The experience is designed like a deep-space research terminal: fast, immersive, and content-first.

## Overview

- Personal knowledge base focused on continuous learning
- Topic and entry architecture for scalable content organization
- Search, section drill-down, and detailed entry pages
- Production-focused setup with SEO, security headers, and performance tuning

## Tech Stack

- Framework: React 18 + TypeScript
- Build Tool: Vite 5
- Routing: React Router DOM
- Animations: Framer Motion
- Metadata/SEO: react-helmet-async
- Styling: Tailwind CSS + custom CSS variables and utility styles
- Tooling: TypeScript compiler, ESLint script support, Terser minification

## Project Structure

```text
.
|-- index.html
|-- package.json
|-- vercel.json
|-- public/
|   |-- _headers
|   |-- favicon.svg
|   |-- manifest.webmanifest
|   |-- robots.txt
|   `-- sitemap.xml
|-- scripts/
|   `-- generate-sitemap.mjs
`-- src/
    |-- App.tsx
    |-- main.tsx
    |-- index.css
    |-- vite-env.d.ts
    |-- components/
    |   |-- layout/
    |   `-- ui/
    |-- data/
    |   `-- curriculum.ts
    |-- pages/
    |   |-- Home.tsx
    |   |-- Section.tsx
    |   |-- Entry.tsx
    |   `-- Search.tsx
    |-- types/
    |   `-- index.ts
    `-- utils/
        `-- seo.ts
```

## Key Features

- Curriculum-driven content model (sections -> topics -> entries)
- Dynamic SEO metadata per route (title, description, canonical, OG/Twitter)
- Article structured data (JSON-LD) on entry pages
- Auto-generated sitemap and robots file during build
- SPA fallback routing for production deployment
- Security and caching headers configured for production

## Production Readiness

### Security

- Hardened response headers (CSP, X-Frame-Options, HSTS, COOP, CORP, nosniff)
- Restrictive permissions policy for browser capabilities
- Strict referrer policy

### SEO

- Canonical URLs on indexable pages
- Open Graph and Twitter metadata coverage
- JSON-LD article schema for content entries
- `sitemap.xml` and `robots.txt` generated from project data

### Performance

- Code splitting and manual vendor chunking
- Terser compression with debugger/console stripping in production
- Reduced animation work on constrained devices and hidden tabs
- Long-term caching for immutable build assets

## Environment Variables

Create a `.env` file for local overrides (optional):

```bash
VITE_SITE_URL=https://your-domain.com
```

This value is used for canonical URLs, sitemap generation, and robots sitemap links.

## Local Development

```bash
npm install
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

`npm run build` executes:

1. sitemap + robots generation (`scripts/generate-sitemap.mjs`)
2. TypeScript checks
3. Vite production build

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. In Project Settings -> Environment Variables, set:
   - `VITE_SITE_URL=https://your-production-domain.com`
4. Deploy.

`vercel.json` already includes:

- build/output configuration for Vite
- security and caching headers
- filesystem-first SPA fallback routing

## GitHub Push Checklist

- Ensure `.gitignore` is present (already included)
- Confirm `.env` files are not committed
- Run a final production check:

```bash
npm run build
```

## Roadmap Ideas

- Add content authoring workflow with markdown/MDX ingestion
- Add automated quality gates (ESLint config + CI checks)
- Add Lighthouse CI for performance/SEO regression tracking

## License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project for personal or commercial purposes, provided the original copyright notice and license terms are included.

If you want, I can also add a dedicated LICENSE file in the repository root with the full MIT text.

---

Built as an ongoing, personal R&D journal for deliberate learning and experimentation.

# Daisy Milan — Portfolio

Personal portfolio and case-study site for Daisy Milan (AI Systems Engineer /
Automation Architect), built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, and Framer Motion.

**Live:** [daisy-portfolio-rho.vercel.app](https://daisy-portfolio-rho.vercel.app) ·
**Stack:** Next.js · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Mermaid · MDX

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/            Routes (App Router). Each folder = a URL segment.
  components/     UI components, grouped by page/section they belong to.
    ui/           Shared primitives (Container, Section, Reveal, TechPill…)
    layout/       Navbar, Footer, ThemeProvider, CommandPalette
    home/ about/ work/ contact/   Page-specific components
  content/        All site copy and data — projects, skills, timeline, services.
                  Edit these files to change what the site says; no component
                  code needs to change.
  content/blog/   Drop .mdx files here to publish articles (see its README).
  lib/            Small utilities (cn, blog loader, hooks).
```

Nothing is hardcoded in components — copy, project data, skills, and nav
links all live in `src/content/`. To update the site's content (a new
project, a résumé link, a bio tweak), start there.

### Adding a project

Edit `src/content/projects.ts`. Set `featured: true` for a project that
should get a full case-study page at `/work/[slug]` (with an architecture
diagram, challenges, impact, etc.) — otherwise it renders as a lighter card
on `/work` with an expandable detail panel.

### Adding a blog post

Drop a `.mdx` file in `src/content/blog/` with `title`/`excerpt`/`date`
frontmatter. See `src/content/blog/README.md`.

## Tech notes

- **Next.js 16** — dynamic route `params` are async (`await params`); this
  project follows that convention throughout.
- **Tailwind v4** — CSS-first config; design tokens live in
  `src/app/globals.css` under `@theme`, not `tailwind.config.js`.
- **Architecture diagrams** render from Mermaid syntax stored directly in
  `src/content/projects.ts` via `src/components/ui/mermaid-diagram.tsx`.
- **OG images** are generated at request/build time from
  `src/app/opengraph-image.tsx` and `src/app/work/[slug]/opengraph-image.tsx`
  using `next/og` — no static image assets to keep in sync.

## Deploying

This is a standard Next.js app — push to GitHub and import the repo on
[Vercel](https://vercel.com/new). No environment variables are required for
the base site.

## License

MIT — see [LICENSE](LICENSE). Content in `src/content/` (résumé, project
descriptions, bio) is personal to Daisy Milan and not covered by the MIT
license; the code and component architecture are free to reuse.

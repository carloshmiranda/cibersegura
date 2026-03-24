# CiberSegura

> Blog de ciberseguranca e recursos para PMEs portuguesas

## Identity
- **Slug**: cibersegura
- **Type**: blog
- **Target audience**: pequenas e medias empresas portuguesas
- **Status**: mvp
- **Hive company ID**: 445a5486-197f-47cc-be0d-410639ffbe26

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- Neon serverless Postgres (newsletter signups via waitlist table)
- Resend for transactional email
- Deployed on Vercel

## Current Priorities
<!-- Updated by CEO agent each nightly cycle -->
1. Publish more cybersecurity articles targeting Portuguese SME keywords
2. SEO optimization — meta tags, structured data, internal linking
3. Build email newsletter flow for subscribers
4. Add more categories and resource pages

## Coding Standards
- TypeScript strict mode
- No ORMs — raw SQL with @neondatabase/serverless
- All API routes return `{ ok: boolean, data?: any, error?: string }`
- Use parameterized queries, never string interpolation for SQL
- Tailwind for all styling, no CSS modules
- Components in src/components/, pages in src/app/
- Keep bundle small — no heavy dependencies without justification

## Playbook Insights
<!-- Injected from Hive's shared playbook, filtered by relevance -->
Aguardando primeira extração de insights do playbook Hive.

## Design & UX Requirements
- **Read `globals.css` before ANY UI work** — it contains design tokens (@theme) and 10 design rules. Follow them strictly.
- Use design token classes (`text-brand`, `bg-accent`, `text-text-secondary`, `border-border`) — NEVER raw hex values or arbitrary Tailwind colors in components.
- NO gradients. No `bg-gradient-to-*`, no gradient text. Solid colors only.
- Max 2 font weights per page: `font-normal` (400) and `font-bold` (700).
- Visual design must be allusive to the business domain — use colors, imagery, and language that evoke the industry
- ONE brand color for all interactive elements (buttons, links, highlights) — defined as `--color-accent` in globals.css
- Landing page follows conversion-optimized structure: hero → social proof (real data only) → problem → features (max 3, SVG icons) → how-it-works → FAQ → final CTA
- Headlines must be specific and pass the "so what?" test — no generic "Get started" or "Save time"
- Single conversion goal: every CTA leads to the same action (waitlist or checkout)
- One CTA per viewport. Never two solid-colored buttons adjacent.
- No duplicate components on the same page (two feature grids, two CTA blocks = violation).
- Server Components by default — only use "use client" when interactivity is needed
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<button>` — never `<div onClick>`
- Color contrast: minimum 4.5:1 for all text
- Every page: unique `<title>`, meta description, OG tags, proper heading hierarchy
- JSON-LD structured data on layout (Organization + WebSite) and FAQ sections

## Blog Structure
- `src/lib/posts.ts` — static post data (title, slug, excerpt, content, category, publishedAt, readingTime)
- `src/app/blog/page.tsx` — blog listing with category filters
- `src/app/blog/[slug]/page.tsx` — individual article pages
- `src/app/newsletter-form.tsx` — client component for newsletter signup (uses /api/waitlist)
- Categories: ameacas, boas-praticas, ferramentas, legislacao

## Constraints
- ALL content must be in Portuguese
- Blog articles must provide genuine, useful cybersecurity advice for SMEs
- Each article needs proper SEO: unique title, meta description, OG tags
- Budget: minimal — free tier infrastructure until revenue justifies upgrades
- No external dependencies unless absolutely necessary
- Mobile-responsive from day one — `flex-col md:flex-row` for stacking, `px-4 sm:px-6` on containers
- SEO: every page needs proper meta tags, OG images, structured data, sitemap.ts, robots.ts
- `<html lang="pt">` — all content in Portuguese
- One CTA per viewport — newsletter signup is the single conversion goal

## Infrastructure
- **Vercel project**: TBD
- **Neon project**: TBD
- **GitHub repo**: carloshmiranda/cibersegura
- **Stripe account**: TBD
- **URL**: https://cibersegura.vercel.app

## Search Engine Discovery (Day 1 Requirements)
- sitemap.xml must list ALL pages (landing, tools, blog posts, legal)
- robots.txt must reference sitemap URL and allow all crawlers (including AI bots)
- llms.txt must exist in public/ for AI crawler optimization
- IndexNow key must exist in public/ for instant Bing/Yandex indexing
- Google Search Console: add verification meta tag to layout (Carlos verifies ownership)
- After every deploy with new pages: ping IndexNow with new URLs
- Every page needs: unique title, meta description, canonical URL, OG image

## Do NOT
- Install packages without justification
- Store secrets in code — use Vercel env vars
- Make breaking API changes without updating the frontend
- Deploy without running `npm run build` successfully
- Ignore TypeScript errors
- Claim legal compliance, certifications, or guarantees the product cannot deliver
- State features as existing when they are not yet built — be honest about roadmap vs reality
- Mix languages on the same page — ALL copy must match the target audience language
- Show "Start Free Trial" or checkout CTAs when LAUNCH_MODE is "waitlist" — all CTAs should lead to the waitlist

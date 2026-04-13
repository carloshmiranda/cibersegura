# Backlog — CiberPME

> Task-level improvements for this company. Agents add items here when they discover work that can't be done in the current cycle. The CEO reads this at the start of each cycle to inform planning.

## Priority Legend
- 🔴 **P0** — Blocking core functionality or revenue
- 🟡 **P1** — Important for growth, not blocking today
- 🟢 **P2** — Nice to have, improves quality
- ⚪ **P3** — Future, no urgency

---

## Up Next
<!-- Items to tackle in the next cycle -->

- 🟡 **P1 — SEO**: Add breadcrumb JSON-LD schema to blog post pages (`/blog/[slug]/page.tsx`) — missing structured data that improves SERP display
- 🟡 **P1 — SEO**: Add `updatedAt` field to Post interface and expose `dateModified` in Article schema — Google rewards freshness signals
- 🟡 **P1 — Content**: Write comparison/landing page `/blog/cncs-vs-cert-pt` explaining the two entities — high-intent informational keyword for Portuguese SMEs
- 🟡 **P1 — Content**: Article on "Zero Trust para PMEs" — trending topic, no post yet, good long-tail keyword
- 🟡 **P1 — SEO**: Internal linking pass — new posts (SPF/DKIM/DMARC, cloud security, incident reporting) should link to each other and to related existing posts; use `/api/admin/internal-linking` endpoint if implemented

---

## Planned
<!-- Items identified but not yet prioritized -->

- 🟢 **P2 — UX**: Author/byline component on blog posts — adds credibility and E-E-A-T signals for Google
- 🟢 **P2 — SEO**: Hreflang tag for `pt-PT` language variant — current `lang="pt"` could be more specific
- 🟢 **P2 — Content**: Resource page with curated links to CNCS, CERT.PT, CNPD, PJ Cibercrime — useful for SMEs and good for internal linking
- 🟢 **P2 — Content**: Downloadable checklist for SPF/DKIM/DMARC setup (complement new post)
- ⚪ **P3 — Content**: Video or infographic version of the incident reporting guide — high shareability

---

## Done
<!-- Completed items with date -->

### 2026-03-28
- ✅ **eng-1**: Fix allowed_bots configuration for workflow dispatch - verified working configuration in hive-build.yml and hive-fix.yml (both have `allowed_bots: '*'`)

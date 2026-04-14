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

- 🟡 **P1 — SEO**: Submeter novos URLs ao IndexNow após cada deploy com conteúdo novo (endpoint `/api/indexnow-submit` já existe)

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

### 2026-04-14
- ✅ **growth**: Article "ISO 27001 para PMEs Portuguesas: Vale a Pena Certificar a Empresa?" — `/blog/iso-27001-pme-portugal-vale-pena-certificar`; covers costs, NIS2 link, and decision framework
- ✅ **growth**: Article "Dark Web e a Sua Empresa: Como Saber se os Seus Dados Foram Expostos" — `/blog/monitorizar-dark-web-empresa-dados-expostos-pme`; HIBP, infostealers, 6-step response protocol
- ✅ **growth**: Article "Segurança em E-commerce: Como Proteger a Sua Loja Online em Portugal" — `/blog/seguranca-ecommerce-loja-online-pme-portugal`; PCI DSS, Magecart, WooCommerce/Shopify hardening, chargeback prevention
- ✅ **bugfix**: Fixed duplicate slug `nis2-entrou-em-vigor` — second post (2026-04-09 comprehensive guide) renamed to `nis2-decreto-lei-125-2025-obrigacoes-pme`
- ✅ **growth**: Article "EDR vs Antivírus Tradicional: O Que a Sua PME Realmente Precisa para Proteger os Endpoints" — `/blog/edr-vs-antivirus-seguranca-endpoints-pme`
- ✅ **internal-linking-pass**: Added strategic internal links to 6 new posts (Zero Trust, CNCS/CERT.PT, AI phishing, SPF/DKIM/DMARC, cloud security, incident reporting) — 10+ contextual links between related content for improved SEO and user experience
- ✅ **growth**: Article "Firewall Empresarial para PMEs: UTM vs NGFW — Qual Escolher?" — `/blog/firewall-empresarial-utm-ngfw-pme`; back-links added from EDR, Zero Trust, and WiFi posts

### 2026-04-13
- ✅ **seo-updated-at**: Add `updatedAt` field to Post interface and expose `dateModified` in Article schema — Implemented optional updatedAt field for posts and updated JSON-LD schema to use it for Google freshness signals
- ✅ **growth**: Article "Zero Trust para PMEs: O Que É e Como Implementar Sem Gastar Uma Fortuna" — `/blog/zero-trust-pme-guia-pratico`
- ✅ **growth**: Article "CNCS e CERT.PT: O Que São e Como Podem Ajudar a sua PME" — `/blog/cncs-cert-pt-o-que-sao-como-ajudam-pme`
- ✅ **growth**: Article "IA ao Serviço dos Atacantes: As Novas Ameaças de Phishing e Deepfake para PMEs" — `/blog/ciberataques-ia-phishing-deepfake-pme`

### 2026-03-28
- ✅ **eng-1**: Fix allowed_bots configuration for workflow dispatch - verified working configuration in hive-build.yml and hive-fix.yml (both have `allowed_bots: '*'`)

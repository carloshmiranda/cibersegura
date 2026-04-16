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

### 2026-04-16 (session 7)
- ✅ **growth**: Article "Ransomware: O Que Fazer Quando a Sua PME É Atacada" — `/blog/ransomware-o-que-fazer-pme-guia-resposta`; isolation protocol (first 10 min), ID Ransomware tool, CERT.PT contact, CNPD 72h notification obligation, recovery options (backups vs free decryptors via nomoreransom.org vs ransom negotiation), post-incident prevention checklist
- ✅ **growth**: Article "Teletrabalho Seguro para PMEs: Como Proteger Colaboradores que Trabalham em Casa" — `/blog/teletrabalho-seguro-pme-trabalho-remoto`; VPN vs ZTNA (Cloudflare Access), home router hardening, BYOD vs company device, BitLocker/FileVault/MDM, M365/Google Workspace Conditional Access, public Wi-Fi rules, remote work policy template
- ✅ **growth**: Article "Gestor de Passwords para Empresas: Bitwarden, 1Password ou Keeper" — `/blog/gestor-passwords-empresa-bitwarden-1password-keeper`; LastPass breach warning, comparison table (price/open-source/UX/audit/SSO/PAM), selection guide by use case, 4-phase migration playbook, offboarding process, passkeys integration

### 2026-04-16 (session 6)
- ✅ **growth**: Article "Análise de Risco de Cibersegurança para PMEs: Como Identificar e Priorizar Ameaças" — `/blog/analise-risco-ciberseguranca-pme`; ISO 27005/NIST CSF methodology, asset inventory with criticality scoring, threat catalogue, vulnerability checklist, risk matrix (probability × impact × criticality), 4 treatment options, RGPD documentation guide, ENISA/CNCS resources
- ✅ **growth**: Article "Passkeys para PMEs: Como Eliminar Passwords e Acabar com o Phishing de Credenciais" — `/blog/passkeys-autenticacao-sem-senha-pme`; FIDO2/WebAuthn mechanics, Microsoft Entra step-by-step config, Google Workspace setup, 1Password/Bitwarden/iCloud Keychain support, comparison table vs SMS OTP/TOTP/push MFA, 3-phase migration plan, FIDO2 hardware keys for admins
- ✅ **growth**: Article "Auditoria de Cibersegurança Interna para PMEs: Checklist e Guia Passo a Passo" — `/blog/auditoria-ciberseguranca-interna-pme`; 7-block audit covering IAM (accounts, MFA, privileges, passwords), network (router, Wi-Fi, VPN), endpoints (OS, AV, BitLocker), email (SPF/DKIM/DMARC, anti-phishing), cloud (M365/Google Workspace, SaaS), backups, RGPD; remediation tracking table, executive summary template

### 2026-04-16 (session 5)
- ✅ **growth**: Article "Segurança no Google Workspace para PMEs: Guia Completo de Configuração" — `/blog/seguranca-google-workspace-pme-guia-completo`; Admin Console hardening, 2SV enforcement (passkeys, TOTP), Drive sharing restrictions, Gmail anti-spoofing + DMARC, OAuth app controls, endpoint management, offboarding checklist
- ✅ **growth**: Article "DLP para PMEs: Como Evitar Fugas de Dados Sensíveis e Cumprir o RGPD" — `/blog/dlp-prevencao-perda-dados-pme`; M365 Purview DLP setup (audit → enforce phases), Google Workspace DLP for Gmail+Drive, endpoint DLP (USB/print blocking), data classification taxonomy, RGPD compliance angle, rollout plan
- ✅ **growth**: Article "Simulações de Phishing para PMEs: Como Testar e Formar os Colaboradores" — `/blog/simulacao-phishing-empresa-como-fazer-pme`; GoPhish (free/self-hosted), Microsoft Attack Simulator (M365 Business Premium), KnowBe4 free tier, template effectiveness guide, PT labor law + RGPD considerations, 12-month program metrics, phishing report button setup

### 2026-04-16 (session 4)
- ✅ **growth**: Article "SIEM Gratuito para PMEs: Monitorização de Segurança com Wazuh" — `/blog/siem-wazuh-pme-monitorizacao-seguranca-gratis`; Wazuh architecture, all-in-one install, Windows/Linux agent deployment, priority rules (brute force, FIM, ClamAV, M365), email alerting, dashboard daily review workflow, comparison table
- ✅ **growth**: Article "Segurança em Redes Sociais para Empresas: Como Proteger as Contas da Sua PME" — `/blog/seguranca-redes-sociais-empresas-pme-portugal`; LinkedIn Company Page admin hygiene, Meta Business Manager setup, X delegated access, account takeover patterns (SIM swap, phishing, sessions), offboarding checklist, monitoring strategy
- ✅ **growth**: Article "MSSP vs SOC Interno: Como as PMEs Podem Externalizar a Cibersegurança" — `/blog/mssp-soc-externalizar-ciberseguranca-pme`; MSSP vs MDR vs vCISO differences, SLA requirements, contract red flags, Portugal pricing guide (€300-2500/mês), evaluation questions, provider list, what to keep internal

### 2026-04-15 (session 3)
- ✅ **growth**: Article "Criptografia de Dados para PMEs: Como Proteger Informação em Portáteis, Discos e Email" — `/blog/criptografia-dados-pme-guia-completo`; BitLocker/FileVault/VeraCrypt, encrypted USB drives, email encryption (TLS/S/MIME/M365), key management, phased implementation plan
- ✅ **growth**: Article "Filtragem de DNS para PMEs: Bloqueie Malware e Phishing Antes de Chegarem aos Dispositivos" — `/blog/filtragem-dns-seguranca-pme`; how DNS filtering works, Cloudflare Gateway (free), NextDNS, Cisco Umbrella, router/DHCP/per-device config, DoH bypass mitigation, log analysis
- ✅ **growth**: Article "DORA: O Que as PMEs do Setor Financeiro Precisam de Saber em 2026" — `/blog/dora-regulamento-resiliencia-digital-pme-financeiro`; 5 DORA pillars, who is covered (banks, PSPs, fintechs, crypto, ICT providers), incident reporting deadlines (4h/72h/1 month), third-party ICT contract requirements, NIS2/RGPD overlap, 3-month compliance plan

### 2026-04-15 (session 2)
- ✅ **growth**: Article "Plano de Continuidade de Negócio para PMEs: Como Manter a Empresa a Funcionar Após um Ciberataque" — `/blog/plano-continuidade-negocio-bcp-ciberataque-pme`; BCP vs DRP, RTO/RPO, crisis team, communication plan, CNPD/CNCS notifications, recovery checklist
- ✅ **growth**: Article "Segurança WordPress para PMEs: Guia Completo para Proteger o Seu Site em 2026" — `/blog/seguranca-wordpress-pme-portugal`; credential hardening, auto-updates, file permissions, Wordfence, SSL/HTTPS, malware monitoring, incident response
- ✅ **growth**: Article "Gestão de Risco de Fornecedores para PMEs: Como Avaliar e Controlar Terceiros" — `/blog/gestao-risco-fornecedores-terceiros-pme`; TPRM, 3-tier vendor classification, 15-question security questionnaire, contract clauses, access management, NIS2/RGPD context

### 2026-04-15
- ✅ **growth**: Article "Gestão de Identidade e Acessos para PMEs: Controlar Quem Acede ao Quê (e Porquê)" — `/blog/gestao-identidade-acessos-iam-pme`; RBAC, onboarding/offboarding, contas privilegiadas, PIM Entra ID, plano de implementação por fases
- ✅ **growth**: Article "Segurança em IoT para PMEs: Como Gerir Dispositivos Inteligentes Sem Criar Brechas" — `/blog/seguranca-iot-dispositivos-inteligentes-pme`; câmaras IP, impressoras, NAS, VLANs de segmentação, firmware, RGPD videovigilância
- ✅ **growth**: Article "Política de Cibersegurança para PMEs: Como Criar do Zero (com Estrutura Completa)" — `/blog/politica-ciberseguranca-pme-template`; PSI estrutura secção a secção, template de índice, plano de implementação faseado
- ✅ **growth**: Article "BYOD: Como Gerir Dispositivos Pessoais no Trabalho Sem Comprometer a Segurança da Empresa" — `/blog/byod-politica-dispositivos-pessoais-trabalho-pme`; BYOD vs COPE, MDM vs MAM, Intune MAM config, RGPD implications, offboarding process
- ✅ **growth**: Article "Teste de Penetração para PMEs: Quando Contratar, O Que Esperar e Quanto Custa" — `/blog/teste-penetracao-pentest-pme-quando-contratar`; pentest types, black/grey/white box, scoping, Portugal pricing guide, provider selection criteria
- ✅ **growth**: Article "Segurança em Videoconferências: Como Proteger as Reuniões Online da Sua Empresa" — `/blog/seguranca-videoconferencias-teams-zoom-meet-pme`; Teams/Zoom/Meet admin hardening, meeting classification policy, RGPD recording consent

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

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

---

## Planned
<!-- Items identified but not yet prioritized -->
- 🟢 **P2 — Content**: Downloadable checklist for SPF/DKIM/DMARC setup (complement new post)
- ⚪ **P3 — Content**: Video or infographic version of the incident reporting guide — high shareability

---

## Done
<!-- Completed items with date -->

### 2026-04-17 (session 14)
- ✅ **growth**: Article "Quanto Custa um Ciberataque a uma PME Portuguesa? Impacto Real em 2026" — `/blog/custo-ciberataque-pme-portugal-2026`; decomposição de custos diretos (recuperação, downtime, forense, multas CNPD, resgate) vs indiretos (perda de clientes, dano reputacional, produtividade); custo por tipo de ataque (ransomware €30K-350K, BEC médiana €47K, violação de dados + CNPD); tabela ROI de medidas preventivas (€1.7K-9K/ano vs €80K-200K de incidente); estatística 60% PMEs fecham em 6 meses após ransomware grave
- ✅ **growth**: Article "Programa de Sensibilização em Cibersegurança: Plano de 12 Meses para PMEs" — `/blog/programa-sensibilizacao-ciberseguranca-pme-12-meses`; calendário mês a mês (Jan: passwords/MFA, Fev: phishing, Mar: BYOD, Abr: engenharia social, Mai: backup, Jun: teletrabalho, Jul: viagens, Ago: auditoria, Set: onboarding, Out: ECSM, Nov: fraudes fim-de-ano, Dez: balanço); métricas acompanhamento (taxa clique phishing, % MFA, incidentes reportados); tabela custos por nível (básico grátis → plataforma €2-4.5K/ano); formatos sessão (15-30 min, integrar em reuniões existentes)
- ✅ **growth**: Article "Cibersegurança para Empresas de Construção e Indústria em Portugal: Guia Prático" — `/blog/ciberseguranca-industria-construcao-portugal`; ameaças específicas (ransomware em ficheiros BIM/AutoCAD/Revit, fraude BEC via alteração de IBAN de fornecedores, roubo propriedade intelectual, phishing a imitar IMPIC/câmaras, OT/IT convergência em manufatura); controlos prioritários (backup projetos com imutabilidade, segmentação VLAN OT/IT, contas individuais por subcontratante, verificação telefónica de IBANs, MFA em acesso remoto, política dispositivos em obra); requisitos RGPD (dados saúde categoria especial, videovigilância 30 dias, CNPD 72h); NIS2 para indústria transformadora (expressamente incluída como setor importante)

### 2026-04-17 (session 13)
- ✅ **Content**: Resource page enhancement with official Portuguese entities — Enhanced `/recursos` page with detailed sections for CNCS, CERT.PT, CNPD, PJ Cibercrime including SME-specific guidance on when to contact each entity, practical escalation procedures, and extensive internal linking to relevant blog posts. Added "Quick Implementation Guides" section linking to 6 key topic areas for improved user journey and SEO internal linking structure.
- ✅ **SEO**: Hreflang tag for `pt-PT` language variant — Updated lang attribute from 'pt' to 'pt-PT' in 3 files (downloadable checklist + email templates) for better local SEO targeting of Portuguese PME audience
- ✅ **UX**: Author/byline component on blog posts — Added AuthorByline and AuthorCard components with 3 expert profiles (Carlos Miranda, Rita Santos, Miguel Ferreira), updated Post interface, blog post template, and JSON-LD schema for improved credibility and E-E-A-T signals
- ✅ **growth**: Article "Microsoft Intune para PMEs: Gestão de Endpoints Incluída no Microsoft 365 Business Premium" — `/blog/microsoft-intune-pme-gestao-endpoints-seguranca`; MDM vs MAM, enrollment Windows/iOS/Android (manual, Autopilot, bulk), compliance policies (BitLocker, OS mínimo, Secure Boot), App Protection Policies para BYOD, Conditional Access (report-only → enforce), Update Rings, remote actions (Retire vs Wipe para BYOD/RGPD), plano de implementação 4 semanas, erros comuns (CA antes de enrollment, Wipe em BYOD, sem break-glass)
- ✅ **growth**: Article "Linux Server Hardening para PMEs: Guia de Segurança para Ubuntu e Debian" — `/blog/linux-hardening-servidores-pme-ubuntu-debian`; modelo de ameaças (força bruta SSH, software desatualizado, webshells, cryptomining), utilizador sudo + SSH hardening (chaves ed25519, root login desativado), UFW deny-all + exceções, fail2ban com jail.local, unattended-upgrades, desativar serviços (bluetooth/avahi/cups), SUID/SGID audit, AppArmor, auditd com regras críticas, AIDE filesystem integrity, rkhunter/chkrootkit, sysctl hardening (SYN flood, IP spoofing, ASLR), CIS Benchmark com OpenSCAP
- ✅ **growth**: Article "Gestão de Certificados SSL/TLS para PMEs: Monitorizar, Renovar e Evitar Interrupções" — `/blog/gestao-certificados-ssl-tls-pme-guia-completo`; DV/OV/EV vs cobertura single/wildcard/SAN, Let's Encrypt + Certbot (nginx/apache), wildcard via DNS challenge (Cloudflare plugin), renovação automática + hook reload, configuração Nginx A+ (TLS 1.2/1.3, cipher suites, HSTS, OCSP stapling), HSTS preloading caveats, monitorização (UptimeRobot, script bash cron), certificados cloud (Cloudflare/Azure ACM/cPanel AutoSSL), PKI interna com OpenSSL, inventário de certificados, erros comuns (chain incompleto, sem reload, wildcard não cobre raiz)

### 2026-04-17 (session 12)
- ✅ **growth**: Article "Estratégia de Backup para PMEs: Regra 3-2-1, Ferramentas e Como Testar a Recuperação" — `/blog/estrategia-backup-pme-regra-3-2-1-recuperacao`; regra 3-2-1 e variante 3-2-1-1-0, RPO/RTO para PMEs, tipos de backup (full/incremental/diferencial), ferramentas (Veeam Community, Windows Server Backup, Synology Active Backup, Azure Backup, Backblaze B2, Duplicati), imutabilidade via S3 Object Lock e Linux Hardened Repository, testes de restauro (mensal/trimestral/anual), RGPD e backup de dados pessoais, exemplo de estratégia para PME de 20 pessoas com custo €83/mês
- ✅ **growth**: Article "Seguro de Cibersegurança para PMEs: O Que Cobre, Quanto Custa e Se Vale a Pena" — `/blog/seguro-ciberseguranca-pme-portugal`; first-party vs third-party coverage, exclusões críticas (guerra cibernética, falta de MFA, patches, forwarding), cobertura de ransomware (debate pagar vs não pagar), fornecedores em Portugal (AXA, Allianz, Hiscox, Zurich, Fidelidade, Tranquilidade), tabela de prémios por perfil de PME (€400-8000/ano), questionário típico da seguradora como guia de hardening, quando contratar vs quando esperar
- ✅ **growth**: Article "Microsoft 365 Email Security: Proteção Avançada Contra Phishing, BEC e Malware" — `/blog/microsoft-365-email-security-anti-phishing-safe-links-bec`; stack EOP/Defender Plan 1/Plan 2, Safe Links (modo tracking → bloqueio), Safe Attachments (Dynamic Delivery vs Block, SharePoint/OneDrive/Teams), anti-phishing com proteção de impersonação (CEO fraud/BEC), spoof intelligence, mailbox intelligence, Priority Accounts, bloqueio de forwarding automático, external email warnings, quarantena e notificações, relatórios (Threat Protection Status), plano de implementação em 4 semanas

### 2026-04-17 (session 11)
- ✅ **growth**: Article "Segmentação de Redes para PMEs: VLANs, Microsegmentação e Isolamento de Ameaças" — `/blog/segmentacao-redes-vlans-pme`; zonas recomendadas (utilizadores/servidores/gestão/IoT/convidados/DMZ), configuração OPNsense/pfSense com DHCP por VLAN, regras de firewall inter-VLAN (negar tudo, permitir o necessário), switches geridos (TP-Link/Ubiquiti/Cisco), Wi-Fi segmentado por SSID→VLAN, validação com Nmap, casos de uso reais (ransomware contido, câmera IP comprometida, auditor externo), integração com segmentação mencionada em outros artigos
- ✅ **growth**: Article "Cibersegurança para Clínicas e Serviços de Saúde em Portugal: Guia Prático" — `/blog/ciberseguranca-clinicas-saude-portugal`; dados de saúde como categoria especial RGPD (art. 9º), valor dos registos médicos no dark web, ransomware em SGC (Glintt/Alert), phishing a imitar Ordem dos Médicos/seguradoras, DPO obrigatório para tratamento em larga escala, backup 3-2-1 do SGC, MFA em portais de seguradoras (Multicare/Médis/AdvanceCare), controlo de acesso ao historial clínico por função, CNPD 72h notification, prazos de conservação (5yr registos / 10yr imagiologia), DPA com fornecedor do SGC, procedimento de offboarding de colaboradores
- ✅ **growth**: Article "Windows 11 Hardening para Empresas: Configurações de Segurança Essenciais" — `/blog/windows-11-hardening-seguranca-pme`; BitLocker com TPM/PIN + chaves no Entra ID, Credential Guard via VBS, Attack Surface Reduction (7 regras críticas em Audit→Block), SMBv1/NetBIOS/WSH desativados, GPO password/lockout/UAC, LAPS para passwords únicas de admin local, AppLocker para bloquear execução de %APPDATA%/%TEMP%, Smart App Control, Windows Update sem deferral para security updates, Microsoft Security Baseline Toolkit

### 2026-04-17 (session 10)
- ✅ **growth**: Article "Active Directory: Guia de Hardening para PMEs com Windows Server" — `/blog/active-directory-hardening-pme`; contas administrativas separadas, Microsoft LAPS, Fine-Grained Password Policies, desativar NTLMv1/LM, Protected Users Security Group, Credential Guard, gMSA para contas de serviço, Event IDs críticos para alertar (4625/4720/4728/4769/7045), PingCastle e BloodHound para avaliação
- ✅ **growth**: Article "Segurança no Azure para PMEs: Microsoft Defender for Cloud Passo a Passo" — `/blog/seguranca-azure-pme-microsoft-defender-for-cloud`; Defender for Cloud CSPM gratuito vs Defender for Servers, Secure Score, Azure RBAC princípio menor privilégio, PIM para Azure, NSGs e JIT VM Access, Azure Key Vault, Storage Account hardening (desativar acesso público, TLS 1.2), Log Analytics + KQL queries para alertas, Azure Policy guardrails
- ✅ **growth**: Article "Ataques de Supply Chain: O Que São e Como as PMEs Podem Proteger-se" — `/blog/ataques-supply-chain-como-proteger-pme`; casos reais SolarWinds/Kaseya/Log4Shell/XZ Utils/npm typosquatting, 3 vetores (software updates, open source deps, acesso MSP), npm audit/pip-audit/Dependabot/Snyk/OWASP Dependency-Check, SBOM com Syft, controlos para fornecedores MSP (MFA, contas separadas, JIT, logs), cláusulas contratuais, NIS2 supply chain

### 2026-04-16 (session 9)
- ✅ **growth**: Article "Microsoft Defender for Business: O EDR para PMEs Incluído no Microsoft 365" — `/blog/microsoft-defender-for-business-pme-guia-completo`; ativação via Intune, onboarding Windows/macOS, Threat & Vulnerability Management (Secure Score), Attack Surface Reduction rules (Audit → Block), investigação automática e remediação, Live Response, isolamento de dispositivos, comparação com CrowdStrike Falcon Go e SentinelOne
- ✅ **growth**: Article "CIS Controls v8 para PMEs: Os 56 Controlos Essenciais do Grupo IG1" — `/blog/cis-controls-v8-pme-implementacao-ig1`; todos os 18 controlos CIS v8 com foco no IG1, passos concretos por controlo, priorização em 3 fases (30 dias / 1-3 meses / 3-6 meses), mapeamento para RGPD/NIS2/ISO 27001/DORA
- ✅ **growth**: Article "Copilot e IA Generativa nas PMEs: Riscos de Segurança e Como Usar com Segurança" — `/blog/copilot-ia-generativa-pme-riscos-seguranca`; Shadow AI, fuga de dados por serviço (ChatGPT free vs Enterprise vs M365 Copilot vs Gemini Workspace), prompt injection, RGPD e IA (base legal, transferências internacionais, DPA), oversharing SharePoint com Copilot, política de IA verde/amarelo/vermelho, configuração segura M365 Copilot com auditoria de permissões

### 2026-04-16 (session 8)
- ✅ **seo**: IndexNow automation after deployments — Enhanced existing `/api/deploy-hook` and `/api/indexnow-deploy` system for automatic URL submission after new content deploys. Added comprehensive documentation (`INDEXNOW_AUTOMATION.md`), test script (`npm run test-indexnow`), improved error handling and logging. System uses Vercel deploy hooks to automatically detect and submit new/updated blog posts to IndexNow API for instant search engine indexing
- ✅ **growth**: Article "Inventário de Ativos de TI para PMEs: Como Controlar Tudo o Que Está na Sua Rede" — `/blog/inventario-ativos-ti-pme`; Nmap discovery, Lansweeper free tier (100 assets), Snipe-IT open source ITAM, shadow IT problem, 5-step process (scan → enrich → cloud/accounts → criticality classification → integrate with security processes), NIS2 asset management obligation, maintenance cadence
- ✅ **growth**: Article "Gestão de Vulnerabilidades para PMEs: Como Encontrar e Corrigir Falhas Antes dos Atacantes" — `/blog/gestao-vulnerabilidades-pme-guia-completo`; CVSS 3.1 scoring explained (critical/high/medium/low), CISA KEV catalog (exploit-confirmed = always priority), Greenbone Community Edition (OpenVAS), Nessus Essentials (free for 16 IPs), Microsoft Defender Vulnerability Management (included in M365 Business Premium), authenticated vs unauthenticated scans, prioritization matrix (CVSS × KEV × exposure × criticality), 3 remediation paths (patch/compensating control/accept), false positives, KPIs
- ✅ **growth**: Article "Cibersegurança para Escritórios de Advogados e Contabilistas em Portugal" — `/blog/ciberseguranca-advocacia-contabilidade-portugal`; why targeted (M&A insider info, client financials, settlement pressures), BEC impersonation of partners, ransomware dual extortion, RGPD 72h notification, segredo profissional, PBCFT obligations, email encryption (M365 Purview, Proton Business, S/MIME), secure document sharing (SharePoint vs email attachments), per-client file permissions, full disk encryption mandate, backup legal retention periods (10yr accounting / 20yr litigation), offboarding protocol, sector-specific checklist

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

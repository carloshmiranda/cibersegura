export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "ameacas" | "legislacao" | "boas-praticas" | "ferramentas";
  categoryLabel: string;
  publishedAt: string;
  readingTime: number;
}

export const CATEGORIES: Record<string, string> = {
  ameacas: "Ameacas",
  legislacao: "Legislacao RGPD",
  "boas-praticas": "Boas Praticas",
  ferramentas: "Ferramentas",
};

export const posts: Post[] = [
  {
    slug: "checklist-nis2-conformidade",
    title: "Checklist NIS2: 10 Passos para Conformidade",
    excerpt:
      "Guia prático completo para PMEs portuguesas implementarem conformidade NIS2 antes da data limite de 3 de abril de 2026. Lista de verificação detalhada com modelos e recursos gratuitos.",
    content: `Com a entrada em vigor da Diretiva NIS2 em Portugal a 3 de abril de 2026, as empresas têm apenas algumas semanas para implementar as medidas necessárias de cibersegurança. Este checklist prático oferece um roteiro estruturado para PMEs portuguesas garantirem conformidade com o Decreto-Lei 125/2025 de forma eficiente e económica.

## Antes de Começar: Determine se Está Abrangido

Antes de implementar qualquer medida, confirme se a sua empresa está sujeita à NIS2. Como explicamos no nosso [guia sobre NIS2 em Portugal](/blog/nis2-portugal-o-que-pmes-precisam-saber), empresas médias (50-249 trabalhadores ou volume de negócios entre 10-50 milhões) em setores críticos são automaticamente abrangidas. Mesmo empresas não diretamente regulamentadas podem ser afetadas através de contratos com entidades NIS2.

**Setores abrangidos incluem:**
- Energia (eletricidade, gás, petróleo, hidrogênio)
- Transportes (aéreo, rodoviário, ferroviário, fluvial)
- Saúde (prestadores de cuidados de saúde, farmácias)
- Infraestruturas digitais (IXPs, DNS, TLD, cloud computing, data centers)
- Água potável e águas residuais
- Serviços postais e de correio
- Gestão de resíduos
- Fabricação (química, farmacêutica, dispositivos médicos, informática)
- Fornecedores de serviços digitais (e-commerce, motores de busca, redes sociais)

## Passo 1: Designe um Responsável pela Cibersegurança

**Prazo: Imediato (Abril 2026)**

A primeira obrigação NIS2 é designar formalmente um responsável pela cibersegurança. Esta pessoa não precisa de ser um especialista técnico, mas deve ter autoridade para implementar políticas e acesso direto à administração.

**Checklist:**
- [ ] Identifique um colaborador com disponibilidade para dedicar pelo menos 20% do tempo à cibersegurança
- [ ] Formalize a nomeação por escrito com descrição de funções específicas
- [ ] Garanta que tem orçamento e autoridade para implementar medidas de segurança
- [ ] Inscreva o responsável na formação NIS2 do Centro Nacional de Cibersegurança (CNCS)
- [ ] Configure acesso às ferramentas de monitorização e gestão de incidentes

**Modelo de nomeação:**
"[Nome] é designado responsável pela cibersegurança da empresa, com competência para: definir políticas de segurança, coordenar a resposta a incidentes, reportar ao CNCS, e liderar a implementação das medidas NIS2."

## Passo 2: Realize uma Avaliação de Riscos Inicial

**Prazo: 30 dias após designação do responsável**

A avaliação de riscos é a base de toda a estratégia de cibersegurança NIS2. Deve ser documentada, revista anualmente, e atualizada sempre que há mudanças significativas nos sistemas.

**Checklist:**
- [ ] Inventarie todos os sistemas informáticos críticos para a operação
- [ ] Identifique dados pessoais e informações sensíveis processadas
- [ ] Mapeie conexões externas (fornecedores, clientes, internet)
- [ ] Avalie vulnerabilidades conhecidas em software e hardware
- [ ] Documente potenciais impactos de cada risco identificado
- [ ] Priorize riscos por probabilidade e impacto (matriz de risco)
- [ ] Defina níveis de risco aceitáveis para a organização

**Ferramentas gratuitas:**
- Framework NIST para pequenas empresas
- Modelo de avaliação de riscos da ENISA
- Checklist do CNCS para entidades NIS2

## Passo 3: Implemente Políticas de Controlo de Acesso

**Prazo: 60 dias**

O controlo de acesso inadequado é uma das principais vulnerabilidades em PMEs. A NIS2 exige políticas claras sobre quem pode aceder a que sistemas e quando.

**Checklist:**
- [ ] Defina políticas de criação, modificação e eliminação de contas de utilizador
- [ ] Implemente o princípio do menor privilégio (acesso mínimo necessário)
- [ ] Configure autenticação multi-fator (MFA) em todas as contas administrativas
- [ ] Estabeleça procedimentos de revisão de acessos (pelo menos de 6 em 6 meses)
- [ ] Documente acessos de emergência e procedimentos de aprovação
- [ ] Remova imediatamente acessos de colaboradores que saem da empresa

**Implementação prática:**
Para Microsoft 365: ative MFA em security.microsoft.com > MFA
Para Google Workspace: configure em admin.google.com > Segurança > 2-Step Verification
Para sistemas locais: use ferramentas como Authy ou Google Authenticator

## Passo 4: Estabeleça Proteção e Monitorização de Redes

**Prazo: 90 dias**

A segurança da rede é fundamental para prevenir ataques e detetar intrusões precocemente.

**Checklist:**
- [ ] Configure firewalls nas ligações à internet (hardware ou software)
- [ ] Segmente a rede separando sistemas críticos de computadores de utilizadores
- [ ] Implemente monitorização de tráfego de rede (logs de firewall mínimo)
- [ ] Configure alertas automáticos para atividade suspeita
- [ ] Estabeleça políticas de segurança para redes Wi-Fi empresariais
- [ ] Documente a topologia de rede e pontos de acesso críticos

**Soluções acessíveis:**
- Firewalls: SonicWall TZ ou Fortinet FortiGate série entrada
- Monitorização: PRTG Network Monitor (gratuito até 100 sensores)
- Segmentação: VLANs em switches geridos (TP-Link ou Netgear)

## Passo 5: Implemente Criptografia e Proteção de Dados

**Prazo: 90 dias**

A NIS2 exige proteção adequada de dados em trânsito e em repouso através de criptografia.

**Checklist:**
- [ ] Configure HTTPS (SSL/TLS) em todos os websites e aplicações web
- [ ] Ative criptografia em emails (S/MIME ou PGP quando necessário)
- [ ] Implemente criptografia de disco em computadores portáteis
- [ ] Configure backups encriptados automáticos (locais e cloud)
- [ ] Use protocolos seguros para transferências de ficheiros (SFTP, não FTP)
- [ ] Documente chaves de criptografia e procedimentos de recuperação

**Ferramentas recomendadas:**
- SSL/TLS: Let's Encrypt (gratuito) via Cloudflare ou cPanel
- Backup encriptado: Veeam Backup, Acronis, ou Backblaze Business
- Criptografia de disco: BitLocker (Windows) ou FileVault (Mac)

## Passo 6: Desenvolva Procedimentos de Gestão de Vulnerabilidades

**Prazo: 60 dias**

A gestão proativa de vulnerabilidades previne exploração de falhas de segurança conhecidas.

**Checklist:**
- [ ] Estabeleça cronograma regular de atualizações de software (mensal mínimo)
- [ ] Configure atualizações automáticas para sistemas críticos quando possível
- [ ] Subscreva alertas de segurança dos fornecedores principais
- [ ] Implemente sistema de gestão de patches para servidores
- [ ] Documente procedimentos de aplicação de patches críticos (24-48h)
- [ ] Teste atualizações em ambiente de desenvolvimento quando possível

**Fontes de informação:**
- Microsoft Security Response Center (MSRC)
- CVE Database (Common Vulnerabilities and Exposures)
- CERT-PT alertas de vulnerabilidades

## Passo 7: Configure Sistemas de Backup e Recuperação

**Prazo: 45 dias**

Backups adequados são essenciais para recuperação de incidentes, especialmente ransomware.

**Checklist:**
- [ ] Implemente estratégia 3-2-1: 3 cópias, 2 suportes diferentes, 1 offsite
- [ ] Configure backups automáticos diários de dados críticos
- [ ] Teste restauros mensalmente para validar integridade dos backups
- [ ] Mantenha pelo menos um backup offline ou imutável
- [ ] Documente procedimentos completos de recuperação
- [ ] Defina RTOs (Recovery Time Objectives) e RPOs (Recovery Point Objectives)

**Soluções empresariais:**
- Cloud: Microsoft Azure Backup, AWS Backup, Google Cloud Backup
- Local: Synology NAS, QNAP, ou Veeam Backup & Replication

## Passo 8: Estabeleça Procedimentos de Resposta a Incidentes

**Prazo: 30 dias**

A NIS2 exige reporte de incidentes ao CNCS em 24 horas. Ter procedimentos claros é crucial.

**Checklist:**
- [ ] Defina o que constitui um incidente de cibersegurança para a organização
- [ ] Estabeleça contactos de emergência disponíveis 24/7
- [ ] Configure canais de comunicação para situações de crise
- [ ] Prepare modelos de relatórios para o CNCS
- [ ] Treine a equipa nos procedimentos de resposta
- [ ] Documente procedimentos de contenção e erradicação de ameaças

**Fluxo de resposta:**
1. Deteção → 2. Avaliação (15 min) → 3. Contenção → 4. Reporte CNCS (24h) → 5. Investigação → 6. Recuperação → 7. Lições aprendidas

## Passo 9: Forme a Equipa em Consciencialização de Cibersegurança

**Prazo: 90 dias**

O fator humano continua a ser o elo mais fraco. A NIS2 exige formação regular de todos os colaboradores.

**Checklist:**
- [ ] Desenvolva programa de formação em cibersegurança adaptado à empresa
- [ ] Realize sessões de consciencialização trimestrais
- [ ] Implemente simulações de phishing mensais
- [ ] Documente participação e resultados da formação
- [ ] Estabeleça políticas de segurança para colaboradores remotos
- [ ] Treine especificamente responsáveis por operações críticas

**Recursos gratuitos:**
- Portal de formação do CNCS
- Materiais da ENISA (European Union Agency for Cybersecurity)
- Campanha "Stop. Think. Connect." adaptada para Portugal

## Passo 10: Documente Tudo e Prepare Auditorias

**Prazo: Contínuo**

A conformidade NIS2 exige documentação detalhada de todas as medidas implementadas.

**Checklist:**
- [ ] Compile dossiê de conformidade com todas as políticas e procedimentos
- [ ] Mantenha logs de segurança por pelo menos 12 meses
- [ ] Documente todas as avaliações de risco e revisões
- [ ] Prepare evidências de formação e consciencialização
- [ ] Estabeleça cronograma de revisões internas (semestrais)
- [ ] Designe responsável por manter documentação atualizada

## Cronograma de Implementação Recomendado

**Semanas 1-2:**
- Designar responsável (Passo 1)
- Iniciar avaliação de riscos (Passo 2)

**Semanas 3-6:**
- Completar avaliação de riscos
- Implementar controlos de acesso básicos (Passo 3)
- Estabelecer procedimentos de resposta a incidentes (Passo 8)

**Semanas 7-12:**
- Implementar proteção de redes (Passo 4)
- Configurar criptografia e backups (Passos 5 e 7)
- Iniciar formação da equipa (Passo 9)

**Semanas 13-16:**
- Finalizar gestão de vulnerabilidades (Passo 6)
- Completar documentação (Passo 10)
- Teste completo de todos os sistemas

## Custos Estimados para PMEs

**Investimento mínimo (empresa 10-50 colaboradores):**
- Software de segurança: €200-500/mês
- Formação: €500-1.000 inicial
- Hardware (firewall, backup): €2.000-5.000
- Consultoria pontual: €2.000-5.000
- **Total primeiro ano: €8.000-15.000**

**Investimento recomendado:**
- Soluções empresariais: €500-1.500/mês
- Formação profissional: €2.000-5.000
- Hardware redundante: €5.000-10.000
- Consultoria especializada: €5.000-10.000
- **Total primeiro ano: €20.000-35.000**

## Recursos e Apoio Disponíveis

**Entidades oficiais:**
- Centro Nacional de Cibersegurança (CNCS): orientações e formação gratuita
- IAPMEI: apoios financeiros para digitalização e cibersegurança de PMEs
- Portugal Digital: programa de apoio à transformação digital

**Certificações reconhecidas:**
- ISO/IEC 27001: sistema de gestão de segurança da informação
- NIS Toolkit: conformidade específica com diretiva NIS2
- NIST Cybersecurity Framework: framework americano adaptável

## Próximos Passos

A conformidade NIS2 não é um projeto único, mas um processo contínuo de melhoria. Após implementar este checklist, as empresas devem:

1. **Monitorizá** sistemas e indicadores de segurança continuamente
2. **Rever** políticas e avaliações de risco pelo menos anualmente
3. **Atualizar** medidas técnicas conforme evolução das ameaças
4. **Formar** regularmente colaboradores e responsáveis
5. **Testar** procedimentos de resposta a incidentes semestralmente

Com a data limite da NIS2 a aproximar-se rapidamente, é crucial começar a implementação imediatamente. As empresas que adiarem podem enfrentar não apenas penalizações regulamentares, mas também riscos operacionais significativos. Lembre-se: a cibersegurança não é um custo, é um investimento na continuidade e credibilidade do seu negócio.

Para mais informações sobre os requisitos específicos da NIS2, consulte o nosso [guia completo sobre NIS2 em Portugal](/blog/nis2-portugal-o-que-pmes-precisam-saber) e mantenha-se atualizado com as orientações do CNCS.`,
    category: "legislacao",
    categoryLabel: "Legislacao RGPD",
    publishedAt: "2026-03-28",
    readingTime: 15,
  },
  {
    slug: "nis2-portugal-o-que-pmes-precisam-saber",
    title: "NIS2 em Portugal: O que as PMEs Precisam de Saber sobre a Nova Diretiva",
    excerpt:
      "A Diretiva NIS2 entra em vigor em Portugal a 3 de abril de 2026 através do Decreto-Lei 125/2025. Saiba se a sua empresa está abrangida e quais os passos para garantir conformidade.",
    content: `A Diretiva NIS2 (Network and Information Security) representa uma evolução significativa na regulamentação de cibersegurança na União Europeia, e Portugal transpôs-a para o direito nacional através do Decreto-Lei 125/2025, que entra em vigor a 3 de abril de 2026. Esta nova legislação expande drasticamente o âmbito das organizações obrigadas a cumprir requisitos de cibersegurança, afetando diretamente milhares de PMEs portuguesas.

## Quem está abrangido pela NIS2?

Ao contrário da diretiva anterior, a NIS2 não se limita a operadores de serviços essenciais. Agora, empresas médias (50-249 trabalhadores ou volume de negócios entre 10-50 milhões de euros) em setores críticos são automaticamente abrangidas. Os setores incluem energia, transportes, saúde, águas, infraestruturas digitais, serviços postais e de correio, gestão de resíduos, fabricação (produtos químicos, farmacêuticos, dispositivos médicos, informática, maquinaria, automóvel, equipamento elétrico), fornecimento de serviços digitais, e administração pública.

Mais importante para as PMEs: mesmo empresas não diretamente regulamentadas podem ser afetadas através de requisitos contratuais de fornecedores. Se a sua empresa presta serviços a uma entidade NIS2, provavelmente terá de demonstrar conformidade com padrões de cibersegurança equivalentes.

## Principais obrigações

As entidades abrangidas devem implementar medidas técnicas e organizacionais apropriadas para gerir riscos de cibersegurança, incluindo: políticas de análise e avaliação de riscos de cibersegurança; políticas e procedimentos de cibersegurança para recursos humanos; políticas de controlo de acesso; criptografia e segurança das comunicações; segurança de sistemas, software e ativos; políticas de divulgação coordenada de vulnerabilidades e gestão de ativos; autenticação multi-fator; comunicações seguras de voz, vídeo e texto; e sistemas seguros de comunicação de emergência.

Além disso, devem reportar incidentes significativos ao Centro Nacional de Cibersegurança (CNCS) num prazo máximo de 24 horas após terem conhecimento do incidente, e fornecer relatórios intermédios e finais detalhados.

## Penalizações e prazos

As penalizações são severas: coimas até 10 milhões de euros ou 2% do volume de negócios anual global, sendo aplicado o valor mais elevado. Para administradores, as coimas pessoais podem chegar a 5 milhões de euros. No entanto, existe um período de graça de 12 meses para penalizações administrativas, o que oferece tempo às empresas para se adaptarem.

O primeiro passo é determinar se a sua empresa está abrangida. Se sim, deve designar um responsável pela cibersegurança, realizar uma avaliação de riscos, implementar as medidas técnicas necessárias, e preparar procedimentos de reporte de incidentes. O CNCS disponibiliza orientações específicas no seu website, e existem recursos gratuitos para ajudar na implementação.`,
    category: "legislacao",
    categoryLabel: "Legislacao RGPD",
    publishedAt: "2026-03-28",
    readingTime: 8,
  },
  {
    slug: "10-ameacas-ciberseguranca-pmes-portuguesas",
    title: "10 Ameacas de Ciberseguranca que as PMEs Portuguesas Ignoram",
    excerpt:
      "A maioria das pequenas e medias empresas portuguesas subestima os riscos de ciberseguranca. Descubra as 10 ameacas mais comuns e como se proteger.",
    content: `As pequenas e medias empresas (PMEs) portuguesas sao alvos cada vez mais frequentes de ataques informaticos. Ao contrario do que muitos empresarios pensam, nao e preciso ser uma grande corporacao para atrair a atencao de cibercriminosos. Na verdade, as PMEs sao frequentemente preferidas precisamente porque tendem a ter menos proteccoes.

Entre as ameacas mais ignoradas estao o phishing direcionado (spear phishing), onde os atacantes enviam emails personalizados que parecem vir de fornecedores ou clientes reais. Outra ameaca crescente e o ransomware, que encripta todos os ficheiros da empresa e exige um resgate para os desbloquear. Em 2024, Portugal registou um aumento de 35% neste tipo de ataques.

O comprometimento de emails corporativos (BEC) e particularmente perigoso para PMEs que fazem transferencias bancarias regulares. Os atacantes infiltram-se nas comunicacoes por email e alteram dados de pagamento, desviando fundos para contas fraudulentas. Alem disso, muitas empresas ignoram ameacas internas, como colaboradores que inadvertidamente partilham credenciais ou utilizam passwords fracas.

Outras ameacas incluem ataques a cadeias de fornecimento digitais, exploracao de vulnerabilidades em software desatualizado, ataques DDoS a lojas online, roubo de dados de clientes por falta de encriptacao, e a utilizacao de redes Wi-Fi empresariais sem segmentacao adequada. A boa noticia e que a maioria destas ameacas pode ser mitigada com medidas simples e acessiveis.`,
    category: "ameacas",
    categoryLabel: "Ameacas",
    publishedAt: "2026-03-20",
    readingTime: 6,
  },
  {
    slug: "guia-rgpd-pequenas-empresas-portugal",
    title: "Guia RGPD para Pequenas Empresas em Portugal",
    excerpt:
      "O RGPD aplica-se a todas as empresas que tratam dados pessoais, independentemente da dimensao. Saiba o que a sua PME precisa de fazer para estar em conformidade.",
    content: `O Regulamento Geral sobre a Proteccao de Dados (RGPD) entrou em vigor em maio de 2018 e continua a ser uma das maiores preocupacoes para as PMEs portuguesas. Muitos empresarios acreditam erradamente que o RGPD so se aplica a grandes empresas, mas a verdade e que qualquer organizacao que trate dados pessoais de cidadaos europeus esta abrangida.

Para as PMEs portuguesas, os passos essenciais para a conformidade incluem: fazer um inventario de todos os dados pessoais que a empresa recolhe e armazena, identificar a base legal para cada tratamento de dados, implementar medidas tecnicas de seguranca adequadas (como encriptacao e backups regulares), e designar um responsavel pela proteccao de dados, mesmo que seja uma funcao acumulada.

A Comissao Nacional de Proteccao de Dados (CNPD) tem aumentado as fiscalizacoes a PMEs, e as coimas podem ir ate 20 milhoes de euros ou 4% do volume de negocios anual. No entanto, a CNPD tem adoptado uma abordagem proporcional, focando-se inicialmente em orientacao e avisos para empresas mais pequenas. O importante e demonstrar boa-fe e esforco genuino de conformidade.

Comece por rever as suas politicas de privacidade, garantir que tem consentimento valido para todas as comunicacoes de marketing, implementar procedimentos para responder a pedidos de acesso ou eliminacao de dados, e formar a sua equipa sobre boas praticas de proteccao de dados. Existem modelos gratuitos disponiveis no site da CNPD que podem ajudar neste processo.`,
    category: "legislacao",
    categoryLabel: "Legislacao RGPD",
    publishedAt: "2026-03-18",
    readingTime: 7,
  },
  {
    slug: "proteger-empresa-contra-phishing",
    title: "Como Proteger a sua Empresa contra Phishing",
    excerpt:
      "O phishing e a porta de entrada para a maioria dos ataques informaticos. Aprenda estrategias praticas para proteger a sua equipa e os seus sistemas.",
    content: `O phishing continua a ser o metodo de ataque mais utilizado contra empresas portuguesas. Segundo dados do Centro Nacional de Ciberseguranca (CNCS), mais de 60% dos incidentes reportados em Portugal em 2025 envolveram alguma forma de phishing. Para as PMEs, onde frequentemente nao existe uma equipa de TI dedicada, o risco e ainda maior.

A primeira linha de defesa e a formacao da equipa. Todos os colaboradores devem saber identificar sinais de phishing: enderecos de email suspeitos (mesmo que parecam legitimos), pedidos urgentes de acao, links que nao correspondem ao texto visivel, e anexos inesperados. Realize simulacoes regulares de phishing para testar e reforcar esta consciencializacao.

Do ponto de vista tecnico, implemente autenticacao multi-fator (MFA) em todas as contas corporativas, especialmente email e ferramentas financeiras. Configure filtros de spam avancados e proteccao de dominio com SPF, DKIM e DMARC para evitar que terceiros enviem emails em nome da sua empresa. Estas configuracoes sao gratuitas e podem ser implementadas pelo seu fornecedor de email.

Crie um procedimento claro para reportar emails suspeitos. Quanto mais facil for para um colaborador reportar, mais rapidamente a ameaca pode ser contida. Ferramentas como o Microsoft Defender for Office 365 ou equivalentes do Google Workspace oferecem proteccao automatizada acessivel mesmo para pequenas empresas. O investimento em prevencao e sempre inferior ao custo de um ataque bem-sucedido.`,
    category: "boas-praticas",
    categoryLabel: "Boas Praticas",
    publishedAt: "2026-03-15",
    readingTime: 5,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category);
}

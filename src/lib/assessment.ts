export interface Question {
  id: string;
  text: string;
  explanation?: string; // Why this question matters
  options: {
    value: number;
    label: string;
    description?: string;
    explanation?: string; // Why this answer affects security
  }[];
  category: "basic" | "network" | "data" | "access" | "incident";
  weight?: number; // Relative importance (default 1)
}

export interface CategoryScore {
  category: "basic" | "network" | "data" | "access" | "incident";
  name: string;
  icon: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: "critical" | "basic" | "good" | "excellent";
  recommendations: string[];
  relatedResources: { title: string; url: string; type: "article" | "tool" | "resource" }[];
}

export interface AssessmentResult {
  score: number;
  maxScore: number;
  percentage: number;
  level: "critical" | "basic" | "good" | "excellent";
  title: string;
  description: string;
  recommendations: string[];
  priority: string[];
  categoryScores: CategoryScore[];
  nextSteps: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export const CATEGORY_INFO = {
  basic: {
    name: "Segurança Básica",
    icon: "🛡️",
    description: "Proteções fundamentais que toda empresa deve ter"
  },
  network: {
    name: "Segurança de Rede",
    icon: "🌐",
    description: "Proteção das comunicações e infraestrutura de rede"
  },
  data: {
    name: "Proteção de Dados",
    icon: "🗂️",
    description: "Backup, encriptação e gestão de dados sensíveis"
  },
  access: {
    name: "Controlo de Acessos",
    icon: "🔐",
    description: "Gestão de utilizadores, passwords e autenticação"
  },
  incident: {
    name: "Resposta a Incidentes",
    icon: "🚨",
    description: "Preparação e resposta a ataques de cibersegurança"
  }
};

export const questions: Question[] = [
  {
    id: "antivirus",
    text: "A sua empresa utiliza software antivírus atualizado em todos os computadores?",
    explanation: "O antivírus é a primeira linha de defesa contra malware e ransomware, responsável por 95% das ameaças conhecidas.",
    category: "basic",
    weight: 1.2, // Higher weight as it's fundamental
    options: [
      {
        value: 3,
        label: "Sim, em todos os dispositivos e sempre atualizado",
        explanation: "Excelente! Proteção completa contra ameaças conhecidas."
      },
      {
        value: 2,
        label: "Sim, mas nem sempre atualizado",
        explanation: "Bom, mas atualizações são críticas para detectar novas ameaças."
      },
      {
        value: 1,
        label: "Apenas em alguns computadores",
        explanation: "Dispositivos sem proteção são pontos de entrada para ataques."
      },
      {
        value: 0,
        label: "Não temos antivírus",
        explanation: "CRÍTICO: Empresa completamente exposta a malware e ransomware."
      },
    ],
  },
  {
    id: "backup",
    text: "Com que frequência fazem backup dos dados empresariais críticos?",
    explanation: "Backups são essenciais para recuperação após ataques de ransomware ou falhas de sistema.",
    category: "data",
    weight: 1.5, // Highest weight - data loss is catastrophic
    options: [
      {
        value: 3,
        label: "Diariamente e testamos a recuperação",
        explanation: "Perfeito! Protegido contra ransomware e falhas de sistema."
      },
      {
        value: 2,
        label: "Semanalmente",
        explanation: "Adequado para a maioria das PMEs, mas considere backups mais frequentes."
      },
      {
        value: 1,
        label: "Mensalmente ou menos",
        explanation: "Risco elevado de perda significativa de dados."
      },
      {
        value: 0,
        label: "Não fazemos backups regulares",
        explanation: "CRÍTICO: Impossível recuperar de ransomware ou falhas graves."
      },
    ],
  },
  {
    id: "passwords",
    text: "Como gerem as passwords na empresa?",
    explanation: "Passwords fracas são responsáveis por 81% das violações empresariais.",
    category: "access",
    weight: 1.3,
    options: [
      {
        value: 3,
        label: "Usamos um gestor de passwords empresarial",
        explanation: "Excelente! Passwords únicas e fortes em todos os serviços."
      },
      {
        value: 2,
        label: "Temos políticas de passwords fortes",
        explanation: "Bom, mas um gestor facilitaria a implementação e conformidade."
      },
      {
        value: 1,
        label: "Cada pessoa gere as suas passwords",
        explanation: "Risco de passwords fracas ou reutilizadas."
      },
      {
        value: 0,
        label: "Usamos passwords simples ou partilhadas",
        explanation: "CRÍTICO: Violação de uma conta pode comprometer toda a empresa."
      },
    ],
  },
  {
    id: "mfa",
    text: "Utilizam autenticação de dois fatores (2FA) nos serviços principais?",
    explanation: "O 2FA previne 99.9% dos ataques automáticos, mesmo com passwords comprometidas.",
    category: "access",
    weight: 1.4,
    options: [
      {
        value: 3,
        label: "Sim, em todos os serviços críticos",
        explanation: "Excelente proteção contra ataques de força bruta e phishing."
      },
      {
        value: 2,
        label: "Em alguns serviços importantes",
        explanation: "Bom início, mas expande para todos os serviços críticos."
      },
      {
        value: 1,
        label: "Apenas no email",
        explanation: "Email é importante, mas outros serviços ficam vulneráveis."
      },
      {
        value: 0,
        label: "Não usamos 2FA",
        explanation: "Alto risco de comprometimento de contas empresariais."
      },
    ],
  },
  {
    id: "updates",
    text: "Com que frequência atualizam o sistema operativo e software?",
    explanation: "80% dos ataques exploram vulnerabilidades conhecidas que já têm correções disponíveis.",
    category: "basic",
    weight: 1.1,
    options: [
      {
        value: 3,
        label: "Automaticamente ou dentro de 1 semana",
        explanation: "Excelente! Proteção rápida contra vulnerabilidades conhecidas."
      },
      {
        value: 2,
        label: "Mensalmente",
        explanation: "Adequado, mas considere atualizações de segurança mais frequentes."
      },
      {
        value: 1,
        label: "Quando nos lembramos",
        explanation: "Inconsistente - cria janelas de oportunidade para atacantes."
      },
      {
        value: 0,
        label: "Raramente atualizamos",
        explanation: "Alto risco de exploração de vulnerabilidades conhecidas."
      },
    ],
  },
  {
    id: "wifi",
    text: "Como está configurada a rede Wi-Fi da empresa?",
    explanation: "Redes Wi-Fi mal configuradas podem expor todo o tráfego empresarial a interceptação.",
    category: "network",
    weight: 1.2,
    options: [
      {
        value: 3,
        label: "WPA3 com password forte e rede separada para visitantes",
        explanation: "Configuração ideal com segmentação de rede."
      },
      {
        value: 2,
        label: "WPA2 com password forte",
        explanation: "Adequado, mas considere atualizar para WPA3 e separar visitantes."
      },
      {
        value: 1,
        label: "Password simples ou WEP",
        explanation: "WEP é facilmente quebrado. Passwords simples são vulneráveis."
      },
      {
        value: 0,
        label: "Wi-Fi aberto ou não sabemos",
        explanation: "CRÍTICO: Todo o tráfego pode ser interceptado."
      },
    ],
  },
  {
    id: "training",
    text: "Os colaboradores recebem formação sobre cibersegurança?",
    explanation: "95% dos ataques bem-sucedidos envolvem erro humano que poderia ser prevenido com formação.",
    category: "basic",
    weight: 1.3,
    options: [
      {
        value: 3,
        label: "Formação regular e testes de phishing",
        explanation: "Excelente! Colaboradores preparados para identificar ameaças."
      },
      {
        value: 2,
        label: "Formação anual",
        explanation: "Bom, mas formação mais frequente aumenta a eficácia."
      },
      {
        value: 1,
        label: "Formação ocasional",
        explanation: "Inconsistente - conhecimento pode ficar desatualizado."
      },
      {
        value: 0,
        label: "Sem formação específica",
        explanation: "Colaboradores não sabem como identificar e responder a ameaças."
      },
    ],
  },
  {
    id: "incident-plan",
    text: "Têm um plano para responder a incidentes de cibersegurança?",
    explanation: "Empresas com plano de resposta reduzem o impacto de ataques em 2-3 milhões de euros em média.",
    category: "incident",
    weight: 1.4,
    options: [
      {
        value: 3,
        label: "Plano detalhado e testado regularmente",
        explanation: "Preparação ideal para minimizar impacto de incidentes."
      },
      {
        value: 2,
        label: "Plano básico documentado",
        explanation: "Bom início, mas testes regulares são essenciais."
      },
      {
        value: 1,
        label: "Sabemos quem contactar em caso de problema",
        explanation: "Insuficiente - contactos não substituem procedimentos estruturados."
      },
      {
        value: 0,
        label: "Não temos plano",
        explanation: "Resposta lenta pode multiplicar o impacto de ataques."
      },
    ],
  },
  {
    id: "data-access",
    text: "Como controlam o acesso aos dados sensíveis?",
    explanation: "Controlos de acesso inadequados facilitam o roubo de dados e propagação de ataques internos.",
    category: "data",
    weight: 1.2,
    options: [
      {
        value: 3,
        label: "Acesso baseado em funções com revisão regular",
        explanation: "Excelente! Princípio do menor privilégio implementado corretamente."
      },
      {
        value: 2,
        label: "Permissões definidas por departamento",
        explanation: "Adequado, mas refine para funções específicas e reveja regularmente."
      },
      {
        value: 1,
        label: "Alguns controlos básicos",
        explanation: "Insuficiente - dados sensíveis podem ser acessados inapropriadamente."
      },
      {
        value: 0,
        label: "Todos têm acesso a quase tudo",
        explanation: "CRÍTICO: Um utilizador comprometido pode aceder a todos os dados."
      },
    ],
  },
  {
    id: "remote-access",
    text: "Como acedem aos sistemas da empresa remotamente?",
    explanation: "Acesso remoto inseguro é um dos principais vetores de ataque em empresas modernas.",
    category: "network",
    weight: 1.3,
    options: [
      {
        value: 3,
        label: "VPN empresarial com autenticação forte",
        explanation: "Segurança ideal para trabalho remoto."
      },
      {
        value: 2,
        label: "Acesso direto com passwords fortes",
        explanation: "Funcional, mas VPN adiciona camada extra de proteção."
      },
      {
        value: 1,
        label: "Acesso direto com controlos básicos",
        explanation: "Risco moderado de interceptação de credenciais."
      },
      {
        value: 0,
        label: "Acesso aberto pela internet",
        explanation: "CRÍTICO: Sistemas expostos a ataques diretos da internet."
      },
    ],
  },
];

function calculateCategoryScore(
  answers: Record<string, number>,
  category: string
): CategoryScore {
  const categoryQuestions = questions.filter(q => q.category === category);
  const categoryAnswers = categoryQuestions.map(q => ({
    question: q,
    answer: answers[q.id] || 0,
    weight: q.weight || 1
  }));

  const totalWeightedScore = categoryAnswers.reduce(
    (sum, qa) => sum + (qa.answer * qa.weight), 0
  );
  const maxWeightedScore = categoryAnswers.reduce(
    (sum, qa) => sum + (3 * qa.weight), 0
  );

  const percentage = maxWeightedScore > 0 ? (totalWeightedScore / maxWeightedScore) * 100 : 0;

  let level: CategoryScore["level"];
  if (percentage >= 85) level = "excellent";
  else if (percentage >= 65) level = "good";
  else if (percentage >= 40) level = "basic";
  else level = "critical";

  // Category-specific recommendations
  const recommendations = getCategoryRecommendations(category as any, level, answers);
  const relatedResources = getCategoryResources(category as any);

  return {
    category: category as CategoryScore["category"],
    name: CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].name,
    icon: CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].icon,
    score: Math.round(totalWeightedScore),
    maxScore: Math.round(maxWeightedScore),
    percentage,
    level,
    recommendations,
    relatedResources,
  };
}

function getCategoryRecommendations(
  category: CategoryScore["category"],
  level: CategoryScore["level"],
  answers: Record<string, number>
): string[] {
  const baseRecommendations: Record<CategoryScore["category"], Record<CategoryScore["level"], string[]>> = {
    basic: {
      critical: [
        "Instalar antivírus empresarial imediatamente",
        "Ativar atualizações automáticas de segurança",
        "Implementar formação urgente de segurança"
      ],
      basic: [
        "Melhorar política de atualizações",
        "Estabelecer cronograma de formação regular",
        "Auditar software instalado"
      ],
      good: [
        "Implementar testes de segurança regulares",
        "Considerar soluções de endpoint avançadas",
        "Expandir programa de formação"
      ],
      excellent: [
        "Manter excelência operacional",
        "Considerar certificações de segurança",
        "Implementar monitorização avançada"
      ]
    },
    network: {
      critical: [
        "Configurar firewall empresarial urgentemente",
        "Implementar VPN para acesso remoto",
        "Substituir Wi-Fi inseguro por WPA3"
      ],
      basic: [
        "Melhorar configuração de Wi-Fi",
        "Implementar segregação básica de rede",
        "Configurar VPN empresarial"
      ],
      good: [
        "Implementar monitorização de rede",
        "Considerar soluções SIEM básicas",
        "Melhorar documentação de rede"
      ],
      excellent: [
        "Implementar Zero Trust Network",
        "Monitorização avançada de tráfego",
        "Auditorias de segurança trimestrais"
      ]
    },
    data: {
      critical: [
        "Implementar backups automáticos IMEDIATAMENTE",
        "Estabelecer estratégia 3-2-1 de backup",
        "Inventariar e classificar dados críticos"
      ],
      basic: [
        "Melhorar frequência de backups",
        "Implementar controlos de acesso granulares",
        "Testar procedimentos de recuperação"
      ],
      good: [
        "Implementar encriptação de dados",
        "Automatizar governança de dados",
        "Considerar DLP (Data Loss Prevention)"
      ],
      excellent: [
        "Implementar Data Governance avançada",
        "Monitorização de anomalias de dados",
        "Certificação ISO 27001"
      ]
    },
    access: {
      critical: [
        "Implementar política de passwords forte urgentemente",
        "Ativar 2FA em todos os serviços críticos",
        "Auditar e remover acessos desnecessários"
      ],
      basic: [
        "Implementar gestor de passwords empresarial",
        "Expandir uso de 2FA",
        "Implementar revisões de acesso regulares"
      ],
      good: [
        "Implementar SSO (Single Sign-On)",
        "Automatizar gestão de acessos",
        "Considerar autenticação biométrica"
      ],
      excellent: [
        "Implementar Identity Governance",
        "Zero Trust Access Controls",
        "Continuous Authentication"
      ]
    },
    incident: {
      critical: [
        "Criar plano básico de resposta a incidentes",
        "Identificar contactos de emergência",
        "Estabelecer procedimentos de comunicação"
      ],
      basic: [
        "Documentar plano de resposta completo",
        "Realizar exercícios de simulação",
        "Treinar equipa de resposta"
      ],
      good: [
        "Implementar ferramentas de forensics",
        "Automatizar detecção de incidentes",
        "Expandir capacidades de resposta"
      ],
      excellent: [
        "Implementar threat hunting",
        "SOC (Security Operations Center)",
        "Integração com threat intelligence"
      ]
    }
  };

  return baseRecommendations[category][level] || [];
}

function getCategoryResources(category: CategoryScore["category"]): CategoryScore["relatedResources"] {
  const resources: Record<CategoryScore["category"], CategoryScore["relatedResources"]> = {
    basic: [
      { title: "Guia de Antivírus", url: "/recursos", type: "resource" },
      { title: "Lista de Verificação", url: "/ferramentas", type: "tool" },
      { title: "Formação de Colaboradores", url: "/blog/formacao-ciberseguranca-colaboradores-pme", type: "article" }
    ],
    network: [
      { title: "Configuração Wi-Fi Seguro", url: "/blog/wifi-empresarial-seguro", type: "article" },
      { title: "Guia de Firewall", url: "/recursos", type: "resource" },
      { title: "VPN Empresarial", url: "/recursos", type: "resource" }
    ],
    data: [
      { title: "Estratégia Backup 3-2-1", url: "/ferramentas", type: "tool" },
      { title: "Proteção RGPD", url: "/blog/rgpd", type: "article" },
      { title: "Soluções Backup", url: "/recursos", type: "resource" }
    ],
    access: [
      { title: "Gestores Password", url: "/recursos", type: "resource" },
      { title: "Guia 2FA", url: "/blog/autenticacao-multifator", type: "article" },
      { title: "Políticas Acesso", url: "/ferramentas", type: "tool" }
    ],
    incident: [
      { title: "Plano Resposta", url: "/ferramentas", type: "tool" },
      { title: "Contactos Emergência", url: "/blog/plano-resposta-incidentes", type: "article" },
      { title: "CNCS Portugal", url: "https://cncs.gov.pt", type: "resource" }
    ]
  };

  return resources[category] || [];
}

export function calculateAssessmentResult(answers: Record<string, number>): AssessmentResult {
  // Calculate overall weighted score
  const weightedScores = questions.map(q => ({
    score: (answers[q.id] || 0) * (q.weight || 1),
    maxScore: 3 * (q.weight || 1)
  }));

  const totalScore = weightedScores.reduce((sum, ws) => sum + ws.score, 0);
  const maxScore = weightedScores.reduce((sum, ws) => sum + ws.maxScore, 0);
  const percentage = (totalScore / maxScore) * 100;

  // Determine overall level
  let level: AssessmentResult["level"];
  let title: string;
  let description: string;

  if (percentage >= 85) {
    level = "excellent";
    title = "Excelente - Segurança Robusta";
    description = "A sua empresa demonstra uma postura de cibersegurança exemplar. Continue a manter estas boas práticas e mantenha-se atualizado sobre as mais recentes ameaças e tecnologias de proteção.";
  } else if (percentage >= 65) {
    level = "good";
    title = "Bom - Segurança Adequada";
    description = "A sua empresa tem uma base sólida de segurança com a maioria dos controlos essenciais implementados. Algumas melhorias direcionadas irão fortalecer significativamente a sua postura de segurança.";
  } else if (percentage >= 40) {
    level = "basic";
    title = "Básico - Necessita Melhorias";
    description = "A sua empresa tem algumas medidas de segurança implementadas, mas existem lacunas significativas que expõem o negócio a riscos consideráveis. Ação corretiva é necessária.";
  } else {
    level = "critical";
    title = "Crítico - Ação Urgente Necessária";
    description = "A sua empresa está exposta a riscos críticos de cibersegurança. É essencial implementar medidas básicas de proteção imediatamente para prevenir potenciais ataques devastadores.";
  }

  // Calculate category scores
  const categoryScores = Object.keys(CATEGORY_INFO).map(category =>
    calculateCategoryScore(answers, category)
  );

  // Generate recommendations and priorities based on worst categories
  const criticalCategories = categoryScores.filter(cs => cs.level === "critical");
  const basicCategories = categoryScores.filter(cs => cs.level === "basic");

  const priority: string[] = [];
  const recommendations: string[] = [];

  if (criticalCategories.length > 0) {
    priority.push("Resolver vulnerabilidades críticas identificadas");
    priority.push("Implementar medidas de proteção básicas urgentemente");
  }
  if (basicCategories.length > 0) {
    priority.push("Fortalecer controlos de segurança básicos");
  }
  if (level === "good" || level === "excellent") {
    priority.push("Manter e aperfeiçoar controlos existentes");
    priority.push("Considerar implementação de medidas avançadas");
  }

  // Generate specific recommendations
  if (level === "critical") {
    recommendations.push(
      "URGENTE: Implementar backups automáticos de dados críticos",
      "Instalar e configurar antivírus empresarial em todos os dispositivos",
      "Estabelecer política de passwords fortes com 2FA",
      "Contactar especialista em cibersegurança para auditoria urgente"
    );
  } else if (level === "basic") {
    recommendations.push(
      "Implementar estratégia completa de backup (regra 3-2-1)",
      "Estabelecer políticas formais de segurança da informação",
      "Implementar formação regular de cibersegurança",
      "Melhorar controlos de acesso e gestão de utilizadores"
    );
  } else if (level === "good") {
    recommendations.push(
      "Implementar monitorização proativa de ameaças",
      "Estabelecer testes regulares de penetração",
      "Considerar certificações de segurança (ISO 27001)",
      "Expandir programa de formação e awareness"
    );
  } else {
    recommendations.push(
      "Manter excelência operacional em cibersegurança",
      "Implementar threat intelligence e hunting",
      "Considerar role-model para outras empresas do sector",
      "Partilhar boas práticas com community empresarial"
    );
  }

  // Generate next steps
  const nextSteps = {
    immediate: level === "critical" ? [
      "Implementar backups de emergência dos dados críticos",
      "Auditar e corrigir controlos básicos de segurança",
      "Estabelecer contactos de emergência para incidentes"
    ] : [
      "Revisar e atualizar políticas de segurança existentes",
      "Verificar estado de todas as ferramentas de proteção",
      "Agendar formação de atualização para a equipa"
    ],

    shortTerm: level === "critical" || level === "basic" ? [
      "Implementar gestor de passwords empresarial",
      "Estabelecer procedimentos formais de resposta a incidentes",
      "Configurar monitorização básica de sistemas críticos"
    ] : [
      "Implementar ferramentas avançadas de detecção de ameaças",
      "Estabelecer programa de testes de penetração regulares",
      "Expandir formação especializada da equipa"
    ],

    longTerm: [
      "Desenvolver programa de melhoria contínua de cibersegurança",
      "Considerar certificação em standards internacionais",
      "Estabelecer parcerias com fornecedores especializados em segurança"
    ]
  };

  return {
    score: Math.round(totalScore),
    maxScore: Math.round(maxScore),
    percentage,
    level,
    title,
    description,
    recommendations,
    priority,
    categoryScores,
    nextSteps,
  };
}
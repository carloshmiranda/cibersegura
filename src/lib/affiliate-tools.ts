interface Tool {
  name: string;
  benefit: string;
  url: string;
  category: string;
}

export const nis2Tools: Tool[] = [
  {
    name: "Wazuh SIEM",
    benefit: "Monitorização de segurança e deteção de incidentes em tempo real",
    url: "https://wazuh.com/platform/",
    category: "SIEM"
  },
  {
    name: "1Password Business",
    benefit: "Gestão segura de passwords e controlo de acesso empresarial",
    url: "https://1password.com/business/",
    category: "Controlo de Acesso"
  },
  {
    name: "Proton Business",
    benefit: "Email encriptado e comunicações seguras para empresas",
    url: "https://proton.me/business",
    category: "Email Seguro"
  },
  {
    name: "Acronis Cyber Backup",
    benefit: "Backup automático e recuperação de desastres certificado",
    url: "https://www.acronis.com/products/backup/",
    category: "Backup"
  },
  {
    name: "Cloudflare for Teams",
    benefit: "Proteção de rede e filtragem de DNS para toda a empresa",
    url: "https://www.cloudflare.com/teams/",
    category: "Segurança de Rede"
  },
  {
    name: "CrowdStrike Falcon Go",
    benefit: "Proteção avançada contra malware e ameaças para PMEs",
    url: "https://www.crowdstrike.com/products/endpoint-security/falcon-go/",
    category: "Antivírus Enterprise"
  },
  {
    name: "Microsoft Defender Business",
    benefit: "Segurança endpoint integrada para pequenas e médias empresas",
    url: "https://www.microsoft.com/microsoft-365/business/microsoft-defender-business",
    category: "Endpoint Protection"
  },
  {
    name: "Veeam Backup & Replication",
    benefit: "Solução enterprise de backup para conformidade NIS2",
    url: "https://www.veeam.com/backup-replication.html",
    category: "Backup Enterprise"
  }
];

// Tools organized by use case for different contexts
export const toolsByCategory = {
  siem: nis2Tools.filter(tool => tool.category === "SIEM"),
  access: nis2Tools.filter(tool => tool.category.includes("Acesso") || tool.category.includes("Endpoint")),
  email: nis2Tools.filter(tool => tool.category === "Email Seguro"),
  backup: nis2Tools.filter(tool => tool.category.includes("Backup")),
  network: nis2Tools.filter(tool => tool.category.includes("Rede") || tool.category.includes("Antivírus"))
};

// Get a curated set of 2-3 tools for specific contexts
export function getToolsForContext(context: 'basic' | 'sme' | 'comprehensive' = 'sme'): Tool[] {
  switch (context) {
    case 'basic':
      return [
        nis2Tools.find(tool => tool.name === "1Password Business")!,
        nis2Tools.find(tool => tool.name === "Microsoft Defender Business")!,
        nis2Tools.find(tool => tool.name === "Acronis Cyber Backup")!
      ];
    case 'comprehensive':
      return [
        nis2Tools.find(tool => tool.name === "Wazuh SIEM")!,
        nis2Tools.find(tool => tool.name === "CrowdStrike Falcon Go")!,
        nis2Tools.find(tool => tool.name === "Veeam Backup & Replication")!
      ];
    default: // sme
      return [
        nis2Tools.find(tool => tool.name === "1Password Business")!,
        nis2Tools.find(tool => tool.name === "Proton Business")!,
        nis2Tools.find(tool => tool.name === "Acronis Cyber Backup")!
      ];
  }
}
export interface AffiliateTool {
  name: string;
  description: string;
  category: "siem" | "passwords" | "email" | "backup";
  url: string;
  recommended?: boolean;
}

export interface AffiliateTool {
  name: string;
  description: string;
  category: "siem" | "passwords" | "email" | "backup";
  url: string;
  affiliateUrl: string; // Direct affiliate URL for redirects
  recommended?: boolean;
  commission?: string; // Expected commission rate for transparency
}

// NIS2-focused affiliate tools with tracking redirects
export const nis2Tools: AffiliateTool[] = [
  {
    name: "Wazuh",
    description: "SIEM open-source para monitorização de segurança e deteção de ameaças em tempo real",
    category: "siem",
    url: "/go/wazuh",
    affiliateUrl: "https://wazuh.com/?utm_source=ciberpme&utm_medium=affiliate&utm_campaign=siem-guide",
    recommended: true
  },
  {
    name: "1Password Business",
    description: "Gestor de palavras-passe empresarial com autenticação multi-fator e políticas centralizadas",
    category: "passwords",
    url: "/go/1password",
    affiliateUrl: "https://start.1password.com/sign-up/business?utm_source=ciberpme&utm_medium=affiliate&utm_campaign=password-guide",
    recommended: true,
    commission: "30% recurring"
  },
  {
    name: "Proton Business",
    description: "Email empresarial seguro e VPN com encriptação end-to-end para comunicações protegidas",
    category: "email",
    url: "/go/proton",
    affiliateUrl: "https://proton.me/business?ref=ciberpme&utm_source=ciberpme&utm_medium=affiliate&utm_campaign=email-security",
    recommended: true,
    commission: "25% recurring"
  },
  {
    name: "Acronis Cyber Protect",
    description: "Solução de backup e proteção com IA integrada contra ransomware e conformidade",
    category: "backup",
    url: "/go/acronis",
    affiliateUrl: "https://www.acronis.com/products/cyber-protect/?utm_source=ciberpme&utm_medium=affiliate&utm_campaign=backup-guide",
    recommended: true,
    commission: "Up to 50%"
  },
  {
    name: "Bitwarden Business",
    description: "Gestor de palavras-passe open-source com auditoria de segurança e conformidade avançada",
    category: "passwords",
    url: "/go/bitwarden",
    affiliateUrl: "https://bitwarden.com/products/business/?utm_source=ciberpme&utm_medium=affiliate&utm_campaign=password-alternative",
    recommended: false,
    commission: "20% recurring"
  },
  {
    name: "Backblaze B2",
    description: "Armazenamento cloud seguro para backups offsite com encriptação e imutabilidade",
    category: "backup",
    url: "/go/backblaze",
    affiliateUrl: "https://www.backblaze.com/b2/cloud-storage.html?utm_source=ciberpme&utm_medium=affiliate&utm_campaign=cloud-backup",
    recommended: false,
    commission: "Variable"
  }
];

// Get tools by category for targeted recommendations
export const getToolsByCategory = (category: string): AffiliateTool[] => {
  return nis2Tools.filter(tool => tool.category === category);
};

// Get recommended tools only
export const getRecommendedTools = (): AffiliateTool[] => {
  return nis2Tools.filter(tool => tool.recommended);
};

// Get all tools
export const getAllNIS2Tools = (): AffiliateTool[] => {
  return nis2Tools;
};